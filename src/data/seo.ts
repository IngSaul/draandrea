// La extensión es explícita —a diferencia del resto de `src`— porque
// `vite.config.ts` importa este módulo, y el cargador de configuración de Vite
// resuelve las rutas como Node: sin extensión no las encuentra.
import { TELEFONO_VISIBLE } from './sitio.ts'

/**
 * Fuente única de los metadatos del sitio.
 *
 * La consumen dos lugares que no pueden desincronizarse:
 *
 *   - `components/Seo.tsx`, que las escribe en el `head` al navegar entre rutas.
 *   - `scripts/prerenderizar.ts`, que las deja ya escritas en el HTML de cada
 *     ruta al compilar.
 *
 * El prerenderizado es el que importa para compartir: WhatsApp, Facebook, X y
 * LinkedIn leen el HTML crudo y no ejecutan JavaScript, así que nunca verían lo
 * que escribe el componente. Por eso las etiquetas se declaran como datos y no
 * como llamadas al DOM: así una misma definición sirve para los dos caminos.
 */

export const SITIO = 'https://dra-andreagarcia.mx'
export const NOMBRE = 'Dra. Andrea García Hernández'

/**
 * Tarjeta de previsualización, en la proporción 1.91:1 que piden las redes.
 * Se genera con `scripts/generar-og.sh` a partir de `originales/draandrea1.png`.
 */
export const OG_IMAGEN = {
  ruta: '/og/portada.jpg',
  tipo: 'image/jpeg',
  ancho: 1200,
  alto: 630,
  alt: `${NOMBRE}, médico general en Guadalajara — atención médica cercana y sin largas esperas`,
} as const

export type Pagina = {
  /** Ruta absoluta, tal como aparece en el router. */
  ruta: string
  titulo: string
  descripcion: string
  /** Imagen propia de la página; si falta se usa la tarjeta de portada. */
  imagen?: string
}

/** Rutas que se prerenderizan, en el orden en que aparecen en el menú. */
export const PAGINAS: Pagina[] = [
  {
    ruta: '/',
    titulo: 'Médico general con atención el mismo día',
    descripcion:
      'Consulta médica general en dos consultorios y a domicilio. Atención cercana, profesional y sin largas esperas para toda la familia. Agenda por WhatsApp.',
  },
  {
    ruta: '/servicios',
    titulo: 'Servicios médicos',
    descripcion:
      'Consulta general, procedimientos, curaciones, suturas, certificados médicos y consulta a domicilio. Agenda cualquier servicio por WhatsApp.',
  },
  {
    ruta: '/consultorios',
    titulo: 'Consultorios y horarios',
    descripcion:
      'Dos consultorios médicos en Guadalajara: Col. Beatriz Hernández y Col. Arandas. Consulta direcciones, horarios de atención y cómo llegar.',
  },
  {
    ruta: '/contacto',
    titulo: 'Contacto por WhatsApp',
    descripcion:
      'Contacta a la Dra. Andrea García Hernández por WhatsApp o teléfono. Horarios de atención, ubicación de ambos consultorios y consulta a domicilio.',
  },
]

/**
 * Página de error. Vive aparte de `PAGINAS` porque no es una ruta que se anuncie:
 * se escribe como `404.html` y se marca `noindex`.
 */
export const PAGINA_404: Pagina = {
  ruta: '/404',
  titulo: 'Página no encontrada',
  descripcion:
    'La página que buscas no existe. Vuelve al inicio o escribe por WhatsApp para agendar tu consulta.',
}

const POR_RUTA = new Map([...PAGINAS, PAGINA_404].map((pagina) => [pagina.ruta, pagina]))

/** Busca los metadatos de una ruta; cae en la página de error si no la conoce. */
export function pagina(ruta: string): Pagina {
  return POR_RUTA.get(ruta) ?? PAGINA_404
}

/** Cada etiqueta del `head`, como dato: el DOM y el HTML la escriben distinto. */
export type Etiqueta =
  | { tipo: 'meta'; atributo: 'name' | 'property'; clave: string; contenido: string }
  | { tipo: 'link'; rel: string; href: string }
  | { tipo: 'ld'; datos: Record<string, unknown> }

export type Metadatos = {
  /** Lo que va en `<title>`, ya con el nombre de la doctora. */
  titulo: string
  etiquetas: Etiqueta[]
}

/** Ficha del consultorio para Google. Las direcciones son las de `CONSULTORIOS`. */
function datosEstructurados(descripcion: string, imagen: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: NOMBRE,
    medicalSpecialty: 'PrimaryCare',
    url: SITIO,
    image: imagen,
    description: descripcion,
    telephone: TELEFONO_VISIBLE,
    availableService: [
      'Consulta médica general',
      'Consulta a domicilio',
      'Curaciones y suturas',
      'Aplicaciones y canalización',
      'Certificados médicos',
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Pedro Sánchez 2400, Col. Beatriz Hernández',
        addressLocality: 'Guadalajara',
        addressRegion: 'Jalisco',
        postalCode: '44768',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Hacienda La Calera 2910, Col. Arandas',
        addressLocality: 'Guadalajara',
        addressRegion: 'Jalisco',
        postalCode: '44720',
        addressCountry: 'MX',
      },
    ],
  }
}

/**
 * Arma el `head` completo de una ruta: título, descripción, canónica, Open
 * Graph, Twitter Cards y datos estructurados.
 *
 * Las URL salen absolutas porque los rastreadores de las redes no resuelven
 * rutas relativas: una `og:image` que empiece con `/` se descarta sin más.
 */
export function metadatos({ ruta, titulo, descripcion, imagen }: Pagina): Metadatos {
  const url = `${SITIO}${ruta}`
  const og = imagen ?? `${SITIO}${OG_IMAGEN.ruta}`
  const completo = `${titulo} | ${NOMBRE}`
  const indexable = ruta !== PAGINA_404.ruta

  const meta = (
    atributo: 'name' | 'property',
    clave: string,
    contenido: string,
  ): Etiqueta => ({ tipo: 'meta', atributo, clave, contenido })

  return {
    titulo: completo,
    etiquetas: [
      meta('name', 'description', descripcion),
      meta(
        'name',
        'robots',
        indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
      ),
      meta('name', 'author', NOMBRE),
      meta('name', 'theme-color', '#7E57C2'),

      meta('property', 'og:type', 'website'),
      meta('property', 'og:site_name', NOMBRE),
      meta('property', 'og:locale', 'es_MX'),
      meta('property', 'og:title', completo),
      meta('property', 'og:description', descripcion),
      meta('property', 'og:url', url),
      meta('property', 'og:image', og),
      meta('property', 'og:image:secure_url', og),
      meta('property', 'og:image:type', OG_IMAGEN.tipo),
      // Sin ancho y alto, WhatsApp a veces dibuja la tarjeta chica la primera
      // vez que lee el enlace, antes de alcanzar a descargar la imagen.
      meta('property', 'og:image:width', String(OG_IMAGEN.ancho)),
      meta('property', 'og:image:height', String(OG_IMAGEN.alto)),
      meta('property', 'og:image:alt', OG_IMAGEN.alt),

      meta('name', 'twitter:card', 'summary_large_image'),
      meta('name', 'twitter:title', completo),
      meta('name', 'twitter:description', descripcion),
      meta('name', 'twitter:image', og),
      meta('name', 'twitter:image:alt', OG_IMAGEN.alt),

      { tipo: 'link', rel: 'canonical', href: url },
      { tipo: 'ld', datos: datosEstructurados(descripcion, og) },
    ],
  }
}
