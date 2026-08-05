# draandrea

Sitio de la **Dra. Andrea García Hernández**, médico general.

React 19 + Vite + Tailwind CSS v4 + React Router.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview
```

## Estructura

```
src/
  components/    Layout, Header, Footer, Logo, Seo, Foto, TarjetaConsultorio, ui.tsx
                 (botones, secciones, tarjetas, banner CTA), icons.tsx
  data/sitio.ts  Datos del sitio: navegación, teléfono/WhatsApp, fotos y consultorios
  data/seo.ts    Título, descripción y etiquetas de cada ruta (Open Graph, JSON-LD)
  pages/         Home, Servicios, Consultorios, Contacto, NoEncontrado
  index.css      Sistema de diseño: tokens de marca (@theme), utilidades .contenedor,
                 .patron-marca y .aparece
originales/      Fotografías sin optimizar (fuente de verdad, no se publican)
public/imagenes/ Variantes optimizadas que sí se sirven, una carpeta por foto
public/og/       Tarjeta de previsualización para redes sociales
public/favicon.* Favicon (SVG + ICO) y apple-touch-icon.png
scripts/         Utilidades de mantenimiento
```

## Imágenes

Las fotografías propias se guardan sin optimizar en `originales/` y se convierten a
variantes responsivas con:

```bash
scripts/optimizar-imagenes.sh originales/draandrea1.png retrato 480 768 1086
```

Eso genera, en `public/imagenes/retrato/`, un `.avif`, un `.webp` y un `.jpg` de respaldo
por cada ancho. Después se declara la foto en `FOTOS` ([src/data/sitio.ts](src/data/sitio.ts))
y se pinta con el componente [`<Foto>`](src/components/Foto.tsx), que arma el `<picture>`
con `srcset` y deja que el navegador elija formato y tamaño:

```tsx
<Foto foto={FOTOS.retrato} sizes="(min-width: 1024px) 37rem, 100vw" prioridad />
```

Usa `prioridad` solo en la imagen visible al cargar la página.

## Metadatos y previsualización al compartir

El texto de cada ruta —título, descripción y las etiquetas que la acompañan— vive en
[src/data/seo.ts](src/data/seo.ts). Para cambiar lo que se lee al compartir un enlace, se
edita ahí y en ningún otro lado: las páginas solo declaran a qué ruta pertenecen.

```tsx
<Seo ruta="/servicios" />
```

Esa definición se usa por dos caminos distintos:

- **Al compilar**, el plugin [scripts/prerenderizar.ts](scripts/prerenderizar.ts) escribe una
  `index.html` por ruta (`dist/servicios/index.html`, `dist/contacto/index.html`, `dist/404.html`…)
  con las etiquetas ya puestas en el `head`.
- **Al navegar**, el componente [`<Seo>`](src/components/Seo.tsx) actualiza esas mismas
  etiquetas cuando se cambia de página sin recargar.

El prerenderizado es el que importa para compartir: WhatsApp, Facebook, X y LinkedIn leen el
HTML tal como llega del servidor y no ejecutan JavaScript, así que nunca verían lo que escribe
React. Se puede comprobar sin navegador:

```bash
npm run build && npm run preview
curl -s http://localhost:4173/servicios | grep 'og:'
```

**Al publicar**, el hosting debe servir esos archivos y no reescribir todo hacia `/index.html`.
Con la reescritura típica de SPA, cada ruta devolvería los metadatos de la portada. Netlify,
Vercel, Cloudflare Pages y nginx con `try_files $uri $uri/index.html /index.html` ya prefieren
el archivo real cuando existe; el problema aparece solo si se agrega un reenvío general `/* → /index.html`.

### La tarjeta

La imagen que aparece en la previsualización es `public/og/portada.jpg` (1200×630, la
proporción que piden las redes) y se genera desde `originales/draandrea1.png` con:

```bash
scripts/generar-og.sh
```

La tarjeta se arma como HTML con la identidad del sitio —Poppins, Dancing Script, morado y
rosa— y se fotografía con Chrome a 2x. Hay que volver a correrlo cuando cambie la fotografía,
el lema o el dominio. Ojo: **las redes cachean la imagen por URL**; después de reemplazarla,
revalida el enlace en el [depurador de Facebook](https://developers.facebook.com/tools/debug/)
para que WhatsApp la vuelva a leer.

### Favicon, robots.txt y sitemap.xml

El favicon sale del mismo mark que el logo del encabezado ([`LogoMarca`](src/components/Logo.tsx)):
el estetoscopio en forma de corazón, aquí en blanco sobre un círculo morado sólido —a
16 y 32px un ícono de dos colores sobre fondo claro se vuelve ilegible; un círculo de un
solo color con el trazo en blanco se sigue leyendo—. Vive en tres archivos en `public/`:

| Archivo | Para qué |
| --- | --- |
| `favicon.svg` | Navegadores modernos; escala sin perder nitidez |
| `favicon.ico` | Respaldo para navegadores viejos y lo que piden por convención en `/favicon.ico` |
| `apple-touch-icon.png` (180×180) | Ícono al agregar el sitio a la pantalla de inicio en iOS |

Para regenerar los dos últimos después de cambiar `favicon.svg`, se renderiza a 1024px con
Chrome sin cabeza y se reduce con ImageMagick (mismo método que `generar-og.sh`, sin script
propio porque no hace falta volver a tocarlo a menos que cambie el mark):

```bash
google-chrome --headless=new --window-size=512,512 --force-device-scale-factor=2 \
  --screenshot=favicon-1024.png "file://$PWD/favicon.svg"
magick favicon-1024.png -filter Lanczos -resize 16x16 favicon-16.png   # y 32, 48
magick favicon-16.png favicon-32.png favicon-48.png public/favicon.ico
magick favicon-1024.png -filter Lanczos -resize 180x180 \
  -background "#7E57C2" -alpha remove -alpha off public/apple-touch-icon.png
```

`robots.txt` y `sitemap.xml` no son archivos en `public/`: los escribe el mismo plugin
[scripts/prerenderizar.ts](scripts/prerenderizar.ts) al compilar, a partir de `SITIO` y
`PAGINAS` de [src/data/seo.ts](src/data/seo.ts). Agregar una ruta a `PAGINAS` alcanza para
que aparezca en el sitemap sin tocar nada más; la 404 queda fuera de las dos cosas, porque
ya lleva `noindex` y no es una página que se anuncie.

## Sistema de diseño

Los tokens viven en el bloque `@theme` de [src/index.css](src/index.css) y generan las
utilidades de Tailwind (`bg-morado`, `text-rosa`, `shadow-suave`, `rounded-card`, `font-script`…).

| Token | Valor |
| --- | --- |
| `--color-morado` / `-900` / `-700` / `-300` | `#7e57c2` · `#4a2f80` · `#63449f` · `#b39ddb` |
| `--color-rosa` / `-700` / `-100` | `#e91e63` · `#c2185b` · `#f8bbd0` |
| `--color-lavanda` / `-200` | `#f3eeff` · `#e4dbfa` |
| `--color-tinta` / `-60` | `#2b2b2b` · `#6a6472` |
| Tipografías | Poppins (texto) · Dancing Script (`font-script`) |

## Pendientes de contenido

Dos imágenes siguen siendo de archivo (Unsplash) en `IMAGENES`: `consultorioCentro` y
`consultorioNorte`. Al recibir la fotografía propia, pásala por el script y muévela de
`IMAGENES` a `FOTOS`.

Los datos de contacto son marcadores de posición en
[src/data/sitio.ts](src/data/sitio.ts): `WHATSAPP`, `TELEFONO_VISIBLE`, `TELEFONO_TEL` y las
direcciones de los consultorios. `TELEFONO_VISIBLE` también alimenta la ficha de Google
(`Physician`), así que al corregirlo se corrige en los dos lados.

El dominio definitivo es `https://draandreagarciahernandez.com`, en `SITIO`
([src/data/seo.ts](src/data/seo.ts)). De él salen todas las URL absolutas de las etiquetas
—`og:url`, `og:image`, la canónica, el sitemap y el `Sitemap:` de `robots.txt`— y va impreso en
la tarjeta. Si algún día cambia, se edita ahí y se vuelve a correr `scripts/generar-og.sh`.
