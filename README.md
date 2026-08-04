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
  pages/         Home, Servicios, Consultorios, Contacto, NoEncontrado
  index.css      Sistema de diseño: tokens de marca (@theme), utilidades .contenedor,
                 .patron-marca y .aparece
originales/      Fotografías sin optimizar (fuente de verdad, no se publican)
public/imagenes/ Variantes optimizadas que sí se sirven, una carpeta por foto
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
direcciones de los consultorios.
