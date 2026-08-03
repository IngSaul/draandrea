export const WHATSAPP = 'https://wa.me/XXXXXXXXXXX'
export const TELEFONO_VISIBLE = '+52 XXX XXX XXXX'
export const TELEFONO_TEL = 'tel:+52XXXXXXXXXX'

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

export const IMAGENES = {
  retrato:
    'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=1000&h=1250&fit=crop&auto=format&q=80',
  retratoSecundario:
    'https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?w=900&h=1100&fit=crop&auto=format&q=80',
  domicilio:
    'https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?w=1200&h=900&fit=crop&auto=format&q=80',
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
  referencia: string
  horarios: { dias: string; horas: string }[]
  imagen: string
  alt: string
  mapa: string
}

export const CONSULTORIOS: Consultorio[] = [
  {
    id: 'centro',
    nombre: 'Consultorio Centro',
    zona: 'Zona Centro',
    direccion: 'Av. Hidalgo 245, local 3, Col. Centro, C.P. 00000',
    referencia: 'A media cuadra de la Plaza Principal, junto a la farmacia.',
    horarios: [
      { dias: 'Lunes a viernes', horas: '9:00 – 14:00 y 16:00 – 20:00' },
      { dias: 'Sábado', horas: '9:00 – 14:00' },
      { dias: 'Domingo', horas: 'Solo urgencias con cita' },
    ],
    imagen: IMAGENES.consultorioCentro,
    alt: 'Sala de espera luminosa del consultorio del Centro con sillones claros y plantas',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Hidalgo+245+Centro',
  },
  {
    id: 'norte',
    nombre: 'Consultorio Norte',
    zona: 'Fraccionamiento Las Palmas',
    direccion: 'Calle Palma Real 18, Fracc. Las Palmas, C.P. 00000',
    referencia: 'Frente al parque Las Palmas, con estacionamiento propio.',
    horarios: [
      { dias: 'Lunes a viernes', horas: '10:00 – 14:00 y 17:00 – 21:00' },
      { dias: 'Sábado', horas: '10:00 – 15:00' },
      { dias: 'Domingo', horas: 'Cerrado' },
    ],
    imagen: IMAGENES.consultorioNorte,
    alt: 'Recepción del consultorio Norte con sillas modernas y señalización cálida',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Calle+Palma+Real+18+Las+Palmas',
  },
]
