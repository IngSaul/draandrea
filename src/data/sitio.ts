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
    anchos: [480, 768, 1023],
    ancho: 1023,
    alto: 1537,
    alt: 'La Dra. Andrea García Hernández de pie, con camisa blanca y una laptop bajo el brazo',
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
  horarios: { dias: string; horas: string }[]
  imagen: string
  alt: string
  mapa: string
}

const SEDES: Omit<Consultorio, 'mapa'>[] = [
  {
    id: 'beatriz-hernandez',
    nombre: 'Consultorio Beatriz Hernández',
    zona: 'Col. Beatriz Hernández',
    direccion: 'Calle Pedro Sánchez 2400, Col. Beatriz Hernández, 44768 Guadalajara, Jal.',
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
    horarios: [
      { dias: 'Sábado', horas: '10:00 – 21:00' },
      { dias: 'Domingo', horas: '10:00 – 20:00' },
    ],
    imagen: IMAGENES.consultorioNorte,
    alt: 'Recepción del consultorio con sillas modernas y señalización cálida',
  },
]

/** El enlace al mapa se deriva de la dirección para que no puedan desincronizarse. */
export const CONSULTORIOS: Consultorio[] = SEDES.map((sede) => ({
  ...sede,
  mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.direccion)}`,
}))
