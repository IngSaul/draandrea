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
  components/    Layout, Header, Footer, Logo, Seo, TarjetaConsultorio, ui.tsx (botones,
                 secciones, tarjetas, banner CTA), icons.tsx
  data/sitio.ts  Datos del sitio: navegación, teléfono/WhatsApp, imágenes y consultorios
  pages/         Home, Servicios, Consultorios, Contacto, NoEncontrado
  index.css      Sistema de diseño: tokens de marca (@theme), utilidades .contenedor,
                 .patron-marca y .aparece
```

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

Los datos de contacto son marcadores de posición en
[src/data/sitio.ts](src/data/sitio.ts): `WHATSAPP`, `TELEFONO_VISIBLE`, `TELEFONO_TEL`, las
direcciones de los consultorios y la cédula profesional del pie de página.
