import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin, PreviewServer, ResolvedConfig } from 'vite'
import {
  metadatos,
  PAGINA_404,
  PAGINAS,
  SITIO,
  type Etiqueta,
  type Pagina,
} from '../src/data/seo.ts'

/**
 * Todo lo que este sitio necesita generar en `dist` a partir de `data/seo.ts`:
 * el `head` de cada ruta, `sitemap.xml` y `robots.txt`. Comparten fuente —las
 * mismas `PAGINAS` y el mismo `SITIO`— así que van en un solo plugin: agregar
 * una ruta a `PAGINAS` alcanza para que aparezca en las tres cosas a la vez.
 *
 * ## El `head` por ruta
 *
 * Vite compila una sola `index.html` con el `head` vacío: el sitio es una SPA y
 * los metadatos los escribe React al montar. Eso alcanza para Google, que sí
 * ejecuta JavaScript, pero no para los rastreadores de WhatsApp, Facebook, X y
 * LinkedIn, que sólo leen el HTML tal como llega del servidor. Sin este paso, el
 * enlace compartido no muestra previsualización.
 *
 * Al terminar la compilación este plugin escribe una copia de esa `index.html`
 * por cada ruta, con las etiquetas de `data/seo.ts` ya puestas:
 *
 *   dist/index.html            →  /
 *   dist/servicios/index.html  →  /servicios
 *   dist/404.html              →  página de error
 *
 * El cuerpo sigue siendo la SPA; lo que cambia es el `head`. Los archivos JS y
 * CSS son los mismos en todas, así que el navegador los reutiliza al navegar.
 *
 * Importante al publicar: el hosting debe servir estos archivos, no reescribir
 * todo hacia `/index.html`. Con la reescritura típica de SPA, cada ruta acabaría
 * devolviendo los metadatos de la portada. Los hostings estáticos (Netlify,
 * Vercel, Cloudflare Pages, nginx con `try_files`) ya prefieren el archivo real
 * cuando existe.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}

function escapar(texto: string) {
  return texto.replace(/[&<>"]/g, (caracter) => ESCAPES[caracter])
}

function serializar(etiqueta: Etiqueta): string {
  if (etiqueta.tipo === 'meta') {
    return `<meta ${etiqueta.atributo}="${etiqueta.clave}" content="${escapar(etiqueta.contenido)}" />`
  }

  if (etiqueta.tipo === 'link') {
    return `<link rel="${etiqueta.rel}" href="${escapar(etiqueta.href)}" />`
  }

  // Dentro de un `<script>` el navegador corta en el primer `</`, venga de donde
  // venga; escaparlo evita que una barra en los datos rompa el documento.
  const datos = JSON.stringify(etiqueta.datos).replace(/<\//g, '<\\/')
  return `<script type="application/ld+json" data-seo="ld">${datos}</script>`
}

const INICIO = '<!-- seo:inicio -->'
const FIN = '<!-- seo:fin -->'

function cabecera(pagina: Pagina) {
  const { titulo, etiquetas } = metadatos(pagina)
  return [INICIO, `<title>${escapar(titulo)}</title>`, ...etiquetas.map(serializar), FIN]
    .map((linea) => `    ${linea}`)
    .join('\n')
    .trimStart()
}

const YA_ESCRITO = new RegExp(`[ \\t]*${INICIO}.*?${FIN}`, 's')
const TITULO = /[ \t]*<title>.*?<\/title>/s

/**
 * Cambia el `<title>` de la plantilla por el `head` completo de la ruta.
 *
 * Los marcadores hacen la operación repetible: normalmente Vite vacía `dist` en
 * cada compilación y la plantilla llega limpia, pero si no lo hiciera —con
 * `emptyOutDir` apagado— reemplaza el bloque anterior en vez de escribir otro
 * juego de etiquetas encima del que ya estaba.
 */
function documento(plantilla: string, pagina: Pagina) {
  const patron = YA_ESCRITO.test(plantilla) ? YA_ESCRITO : TITULO
  // La cabecera se pasa como función: si un texto trajera `$&` o `$1`, en un
  // reemplazo literal se interpretaría como referencia a lo encontrado.
  const html = plantilla.replace(patron, () => cabecera(pagina))

  if (html === plantilla) {
    throw new Error('La plantilla index.html ya no tiene <title>: no sé dónde poner el head.')
  }

  return html
}

/** Ruta del archivo que le toca a cada página dentro de `dist`. */
function destino(ruta: string) {
  if (ruta === PAGINA_404.ruta) return '404.html'
  return ruta === '/' ? 'index.html' : `${ruta.replace(/^\//, '')}/index.html`
}

/**
 * Solo las páginas reales, en las mismas URL absolutas que ya llevan `og:url`
 * y la canónica de cada una —para que un buscador nunca vea una versión
 * distinta de la URL en el sitemap que en la propia página—. La 404 queda
 * fuera: no es una página que se anuncie, y ya lleva `noindex`.
 */
function sitemap(): string {
  const urls = PAGINAS.map(
    (pagina) => `  <url>\n    <loc>${escapar(SITIO + pagina.ruta)}</loc>\n  </url>`,
  ).join('\n')

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n'
  )
}

/** Todo el sitio es público, así que no hay nada que restringir aquí. */
function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITIO}/sitemap.xml\n`
}

export function prerenderizar(): Plugin {
  let config: ResolvedConfig

  return {
    // Sin `apply`: cada hook ya se limita solo. `closeBundle` corre al compilar
    // y `configurePreviewServer` al previsualizar; en desarrollo no hace nada.
    name: 'draandrea:prerenderizar',

    configResolved(resuelta) {
      config = resuelta
    },

    /**
     * `vite preview` trae el reenvío típico de SPA: manda cualquier ruta a
     * `/index.html` y nunca llega a los archivos que acabamos de escribir, así
     * que /servicios mostraría los metadatos de la portada. Este middleware se
     * adelanta a ese reenvío y sirve el archivo real, que es lo que hace un
     * hosting estático. Sin esto, la vista previa mentiría sobre el resultado.
     */
    configurePreviewServer(servidor: PreviewServer) {
      servidor.middlewares.use((peticion, _respuesta, siguiente) => {
        const ruta = peticion.url?.split('?')[0]?.replace(/\/$/, '') || '/'
        const pagina = PAGINAS.find((candidata) => candidata.ruta === ruta)

        if (pagina && pagina.ruta !== '/') {
          peticion.url = `/${destino(pagina.ruta)}`
        }

        siguiente()
      })
    },

    closeBundle() {
      const salida = join(config.root, config.build.outDir)
      const plantilla = readFileSync(join(salida, 'index.html'), 'utf8')

      for (const pagina of [...PAGINAS, PAGINA_404]) {
        const archivo = join(salida, destino(pagina.ruta))
        mkdirSync(dirname(archivo), { recursive: true })
        writeFileSync(archivo, documento(plantilla, pagina))
        config.logger.info(`  prerenderizado  ${destino(pagina.ruta)}`)
      }

      writeFileSync(join(salida, 'sitemap.xml'), sitemap())
      writeFileSync(join(salida, 'robots.txt'), robots())
      config.logger.info('  prerenderizado  sitemap.xml')
      config.logger.info('  prerenderizado  robots.txt')
    },
  }
}
