import type { CSSProperties } from 'react'
import type { Foto as DatosFoto } from '../data/sitio'

/**
 * Fotografía propia servida como <picture> con AVIF y WebP, y JPG de respaldo.
 * El <picture> usa `display: contents` para no introducir ninguna caja extra:
 * el <img> se maquetea exactamente igual que si estuviera suelto.
 */
export function Foto({
  foto,
  sizes,
  className = '',
  style,
  prioridad = false,
}: {
  foto: DatosFoto
  /** Ancho que ocupará la imagen en cada punto de ruptura, p. ej. '(min-width: 1024px) 36rem, 100vw'. */
  sizes: string
  className?: string
  style?: CSSProperties
  /** Actívalo solo en la imagen visible al cargar la página (LCP). */
  prioridad?: boolean
}) {
  const conjunto = (extension: string) =>
    foto.anchos.map((ancho) => `${foto.base}-${ancho}.${extension} ${ancho}w`).join(', ')

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={conjunto('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={conjunto('webp')} sizes={sizes} />
      <img
        src={`${foto.base}-${foto.anchos[foto.anchos.length - 1]}.jpg`}
        srcSet={conjunto('jpg')}
        sizes={sizes}
        alt={foto.alt}
        width={foto.ancho}
        height={foto.alto}
        loading={prioridad ? 'eager' : 'lazy'}
        fetchPriority={prioridad ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}
