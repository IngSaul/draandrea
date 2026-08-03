import { useEffect } from 'react'

const SITIO = 'https://dra-andreagarcia.mx'
const NOMBRE = 'Dra. Andrea García Hernández'

function meta(selector: string, attr: 'name' | 'property', valor: string, contenido: string) {
  let etiqueta = document.head.querySelector<HTMLMetaElement>(selector)
  if (!etiqueta) {
    etiqueta = document.createElement('meta')
    etiqueta.setAttribute(attr, valor)
    document.head.appendChild(etiqueta)
  }
  etiqueta.setAttribute('content', contenido)
}

type SeoProps = {
  titulo: string
  descripcion: string
  ruta: string
  imagen?: string
}

/**
 * Metadatos por página: title, description, canonical, Open Graph, Twitter
 * Cards, robots y datos estructurados (JSON-LD) para el consultorio médico.
 * Escrito en el head para que el prerenderizado estático lo capture.
 */
export function Seo({ titulo, descripcion, ruta, imagen }: SeoProps) {
  useEffect(() => {
    const url = `${SITIO}${ruta}`
    const og =
      imagen ??
      'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=1200&h=630&fit=crop&auto=format&q=80'

    document.title = `${titulo} | ${NOMBRE}`
    document.documentElement.lang = 'es-MX'

    meta('meta[name="description"]', 'name', 'description', descripcion)
    meta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large')
    meta('meta[name="author"]', 'name', 'author', NOMBRE)
    meta('meta[name="theme-color"]', 'name', 'theme-color', '#7E57C2')

    meta('meta[property="og:type"]', 'property', 'og:type', 'website')
    meta('meta[property="og:site_name"]', 'property', 'og:site_name', NOMBRE)
    meta('meta[property="og:locale"]', 'property', 'og:locale', 'es_MX')
    meta('meta[property="og:title"]', 'property', 'og:title', `${titulo} | ${NOMBRE}`)
    meta('meta[property="og:description"]', 'property', 'og:description', descripcion)
    meta('meta[property="og:url"]', 'property', 'og:url', url)
    meta('meta[property="og:image"]', 'property', 'og:image', og)
    meta(
      'meta[property="og:image:alt"]',
      'property',
      'og:image:alt',
      `${NOMBRE}, médico general — atención médica cercana y sin largas esperas`,
    )

    meta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    meta('meta[name="twitter:title"]', 'name', 'twitter:title', `${titulo} | ${NOMBRE}`)
    meta('meta[name="twitter:description"]', 'name', 'twitter:description', descripcion)
    meta('meta[name="twitter:image"]', 'name', 'twitter:image', og)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const datos = {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: NOMBRE,
      medicalSpecialty: 'PrimaryCare',
      url: SITIO,
      image: og,
      description: descripcion,
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
          streetAddress: 'Av. Hidalgo 245, local 3',
          addressLocality: 'Zona Centro',
          addressCountry: 'MX',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Palma Real 18',
          addressLocality: 'Fracc. Las Palmas',
          addressCountry: 'MX',
        },
      ],
    }

    let ld = document.head.querySelector<HTMLScriptElement>('script[data-seo="ld"]')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.dataset.seo = 'ld'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(datos)
  }, [titulo, descripcion, ruta, imagen])

  return null
}
