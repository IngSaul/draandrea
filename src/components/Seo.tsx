import { useEffect } from 'react'
import { metadatos, pagina, type Etiqueta } from '../data/seo'

/**
 * Mantiene el `head` al día cuando se navega dentro de la aplicación.
 *
 * Al compilar, `scripts/prerenderizar.ts` deja estas mismas etiquetas ya
 * escritas en el HTML de cada ruta —es lo único que ven WhatsApp, Facebook, X y
 * LinkedIn, que no ejecutan JavaScript—. Este componente sirve para después:
 * cuando el visitante cambia de página sin recargar, aquí se actualizan el
 * título, la canónica y las tarjetas.
 *
 * Por eso reutiliza las etiquetas que ya existen en lugar de agregar otras: si
 * las duplicara, el `head` acumularía una `og:title` por cada página visitada.
 */
function aplicar(etiqueta: Etiqueta) {
  if (etiqueta.tipo === 'meta') {
    const selector = `meta[${etiqueta.atributo}="${etiqueta.clave}"]`
    let nodo = document.head.querySelector<HTMLMetaElement>(selector)
    if (!nodo) {
      nodo = document.createElement('meta')
      nodo.setAttribute(etiqueta.atributo, etiqueta.clave)
      document.head.appendChild(nodo)
    }
    nodo.setAttribute('content', etiqueta.contenido)
    return
  }

  if (etiqueta.tipo === 'link') {
    let nodo = document.head.querySelector<HTMLLinkElement>(`link[rel="${etiqueta.rel}"]`)
    if (!nodo) {
      nodo = document.createElement('link')
      nodo.rel = etiqueta.rel
      document.head.appendChild(nodo)
    }
    nodo.href = etiqueta.href
    return
  }

  let nodo = document.head.querySelector<HTMLScriptElement>('script[data-seo="ld"]')
  if (!nodo) {
    nodo = document.createElement('script')
    nodo.type = 'application/ld+json'
    nodo.dataset.seo = 'ld'
    document.head.appendChild(nodo)
  }
  nodo.textContent = JSON.stringify(etiqueta.datos)
}

/**
 * El texto de cada ruta vive en `data/seo.ts`, no en las props: es la única
 * forma de que el prerenderizado y la navegación digan exactamente lo mismo.
 */
export function Seo({ ruta }: { ruta: string }) {
  useEffect(() => {
    const { titulo, etiquetas } = metadatos(pagina(ruta))
    document.title = titulo
    etiquetas.forEach(aplicar)
  }, [ruta])

  return null
}
