/** Formato internacional sin «+», espacios ni guiones: 52 (México) + 10 dígitos. */
export const WHATSAPP = 'https://wa.me/523334884828'
export const TELEFONO_VISIBLE = '+52 33 3488 4828'
export const TELEFONO_TEL = 'tel:+523334884828'

/** Abre WhatsApp con un mensaje previo según el contexto del botón. */
export function whatsapp(mensaje?: string) {
  return mensaje ? `${WHATSAPP}?text=${encodeURIComponent(mensaje)}` : WHATSAPP
}

export const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/consultorios', label: 'Consultorios' },
  { to: '/contacto', label: 'Contacto' },
] as const

/**
 * Fotografía propia con variantes responsivas ya optimizadas.
 * Se generan con `scripts/optimizar-imagenes.sh` y viven en `public/imagenes/`.
 */
export type Foto = {
  /** Ruta sin el sufijo de ancho ni la extensión. */
  base: string
  /** Anchos disponibles en disco, de menor a mayor. */
  anchos: number[]
  /** Dimensiones del original, para reservar el espacio y evitar saltos de layout. */
  ancho: number
  alto: number
  alt: string
}

export const FOTOS = {
  retrato: {
    base: '/imagenes/retrato/retrato',
    anchos: [480, 768, 1086],
    ancho: 1086,
    alto: 1448,
    alt: 'La Dra. Andrea García Hernández, médico general, en su consultorio',
  },
  retratoSecundario: {
    base: '/imagenes/retrato-secundario/retrato-secundario',
    anchos: [480, 768, 1076],
    ancho: 1076,
    alto: 1600,
    alt: 'La Dra. Andrea García Hernández de pie con bata blanca, a la entrada del hospital donde ejerce',
  },
  retratoConsultorio: {
    base: '/imagenes/retrato-consultorio/retrato-consultorio',
    anchos: [480, 768, 1036],
    ancho: 1036,
    alto: 1518,
    alt: 'La Dra. Andrea García Hernández sentada al escritorio de su consultorio, con uniforme clínico morado',
  },
  procedimiento: {
    base: '/imagenes/procedimiento/procedimiento',
    anchos: [480, 768, 1200],
    ancho: 1200,
    alto: 1600,
    alt: 'La Dra. Andrea García Hernández, con uniforme quirúrgico, gorro y cubrebocas, realiza un procedimiento menor con material estéril',
  },
  domicilio: {
    base: '/imagenes/domicilio/domicilio',
    anchos: [480, 768, 1232, 1536],
    ancho: 1536,
    alto: 1024,
    alt: 'La Dra. Andrea García Hernández toma notas durante una consulta a domicilio con un paciente adulto mayor en la sala de su casa',
  },
} satisfies Record<string, Foto>

/** Imágenes de archivo pendientes de sustituir por fotografía propia. */
export const IMAGENES = {
  consultorioCentro:
    'https://images.unsplash.com/photo-1776886099265-6366478b341b?w=1100&h=760&fit=crop&auto=format&q=80',
  consultorioNorte:
    'https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1100&h=760&fit=crop&auto=format&q=80',
}

export type Consultorio = {
  id: string
  nombre: string
  zona: string
  direccion: string
  /** Punto de referencia para llegar. Opcional: no siempre hay uno. */
  referencia?: string
  /**
   * Coordenadas exactas del lugar en Google Maps. Úsalas cuando la búsqueda
   * por texto de `direccion` no geolocaliza el punto correcto (Google puede
   * ubicar la calle sin acertar el número exacto).
   */
  coords?: { lat: number; lng: number }
  horarios: { dias: string; horas: string }[]
  imagen: string
  alt: string
  /** Enlace a Google Maps para abrir la ruta en una pestaña nueva. */
  mapa: string
  /** Mismo punto, en la variante que Google admite dentro de un `iframe`. */
  mapaIncrustado: string
}

const SEDES: Omit<Consultorio, 'mapa' | 'mapaIncrustado'>[] = [
  {
    id: 'beatriz-hernandez',
    nombre: 'Consultorio Beatriz Hernández',
    zona: 'Col. Beatriz Hernández',
    direccion: 'Calle Pedro Sánchez 2400, Col. Beatriz Hernández, 44768 Guadalajara, Jal.',
    coords: { lat: 20.6852148, lng: -103.2812853 },
    horarios: [
      { dias: 'Lunes a viernes', horas: '12:00 – 13:45 y 18:00 – 20:30' },
      { dias: 'Jueves', horas: 'Descanso' },
    ],
    imagen: IMAGENES.consultorioCentro,
    alt: 'Sala de espera luminosa del consultorio con sillones claros y plantas',
  },
  {
    id: 'arandas',
    nombre: 'Consultorio Arandas',
    zona: 'Col. Arandas',
    direccion: 'Calle Hacienda La Calera 2910, Col. Arandas, 44720 Guadalajara, Jal.',
    referencia: 'En el cruce con Plutarco Elías Calles.',
    coords: { lat: 20.6961449, lng: -103.2875175 },
    horarios: [
      { dias: 'Sábado', horas: '10:00 – 21:00' },
      { dias: 'Domingo', horas: '10:00 – 20:00' },
    ],
    imagen: IMAGENES.consultorioNorte,
    alt: 'Recepción del consultorio con sillas modernas y señalización cálida',
  },
]

/**
 * Ambos mapas se derivan de un único punto por sede para que no puedan
 * desincronizarse. Se usan `coords` cuando existen porque la búsqueda por
 * texto de `direccion` a veces geolocaliza mal (Google ubica la calle pero
 * falla el número exacto); si no hay coordenadas, se cae a buscar por texto.
 */
export const CONSULTORIOS: Consultorio[] = SEDES.map((sede) => {
  const consulta = sede.coords
    ? `${sede.coords.lat},${sede.coords.lng}`
    : encodeURIComponent(sede.direccion)
  return {
    ...sede,
    mapa: `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    mapaIncrustado: `https://www.google.com/maps?q=${consulta}&z=17&hl=es&output=embed`,
  }
})
