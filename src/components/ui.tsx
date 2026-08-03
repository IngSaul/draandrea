import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
  type SVGProps,
} from 'react'
import { Link } from 'react-router'
import {
  IconDomicilio,
  IconFlecha,
  IconMismoDia,
  IconUbicacion,
  IconWhatsApp,
} from './icons'
import { IMAGENES, whatsapp } from '../data/sitio'

/* ---------------------------------------------------------------- Botones */

type Variante = 'primario' | 'secundario' | 'fantasma' | 'claro'

const BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-250 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus-visible:outline-offset-4'

const VARIANTES: Record<Variante, string> = {
  primario:
    'bg-morado text-white shadow-[0_10px_24px_-10px_rgba(126,87,194,0.65)] hover:bg-morado-700 hover:shadow-[0_16px_34px_-12px_rgba(126,87,194,0.7)] hover:-translate-y-0.5 active:translate-y-0',
  secundario:
    'bg-white text-morado-900 ring-1 ring-lavanda-200 shadow-suave hover:ring-morado-300 hover:-translate-y-0.5 hover:text-morado-700',
  fantasma:
    'bg-transparent text-morado-900 ring-1 ring-white/45 hover:bg-white/12 hover:-translate-y-0.5',
  // Botón blanco para fondos morados: no puede heredar el `text-white` de
  // `primario`, o el texto queda invisible sobre el propio fondo del botón.
  claro:
    'bg-white text-morado-900 hover:bg-rosa-100 hover:-translate-y-0.5 active:translate-y-0',
}

const TAMANOS = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[0.95rem]',
  lg: 'px-7 py-4 text-base',
}

type BotonProps = {
  children: ReactNode
  variante?: Variante
  tamano?: keyof typeof TAMANOS
  href?: string
  to?: string
  className?: string
  ariaLabel?: string
  icono?: ComponentType<SVGProps<SVGSVGElement>>
}

export function Boton({
  children,
  variante = 'primario',
  tamano = 'md',
  href,
  to,
  className = '',
  ariaLabel,
  icono: Icono,
}: BotonProps) {
  const clases = `${BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`
  const contenido = (
    <>
      {Icono && (
        <Icono className="h-5 w-5 shrink-0 transition-transform duration-250 group-hover:scale-110" />
      )}
      <span>{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={clases} aria-label={ariaLabel}>
        {contenido}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={clases}
      aria-label={ariaLabel}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {contenido}
    </a>
  )
}

/** Atajo para el CTA repetido en todo el sitio. */
export function BotonWhatsApp({
  mensaje,
  children = 'Agendar por WhatsApp',
  ...resto
}: Omit<BotonProps, 'href' | 'icono' | 'children'> & { mensaje?: string; children?: ReactNode }) {
  return (
    <Boton href={whatsapp(mensaje)} icono={IconWhatsApp} {...resto}>
      {children}
    </Boton>
  )
}

/* ------------------------------------------------------ Aparición suave */

export function Aparece({
  children,
  as = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observador.observe(nodo)
    return () => observador.disconnect()
  }, [])

  return createElement(
    as,
    {
      ref,
      className: `aparece ${className}`,
      'data-visible': visible,
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  )
}

/* -------------------------------------------------------------- Secciones */

export function Seccion({
  children,
  className = '',
  id,
  fondo = 'blanco',
}: {
  children: ReactNode
  className?: string
  id?: string
  fondo?: 'blanco' | 'lavanda' | 'degradado'
}) {
  const fondos = {
    blanco: 'bg-white',
    lavanda: 'bg-lavanda',
    degradado: 'bg-gradient-to-b from-lavanda to-white',
  }
  return (
    <section id={id} className={`${fondos[fondo]} py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="contenedor">{children}</div>
    </section>
  )
}

export function TituloSeccion({
  sobretitulo,
  titulo,
  descripcion,
  centrado = false,
  nivel = 'h2',
}: {
  sobretitulo?: string
  titulo: ReactNode
  descripcion?: string
  centrado?: boolean
  nivel?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={`max-w-2xl ${centrado ? 'mx-auto text-center' : ''}`}>
      {sobretitulo && (
        <p
          className={`mb-3 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.22em] text-rosa uppercase ${
            centrado ? 'justify-center' : ''
          }`}
        >
          <span aria-hidden className="h-px w-7 bg-rosa-100" />
          {sobretitulo}
          <span aria-hidden className="h-px w-7 bg-rosa-100" />
        </p>
      )}
      {createElement(
        nivel,
        { className: 'text-[1.75rem] leading-[1.2] md:text-4xl lg:text-[2.6rem]' },
        titulo,
      )}
      {descripcion && (
        <p className="mt-4 text-[1.02rem] leading-relaxed text-tinta-60 md:text-lg">
          {descripcion}
        </p>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Tarjetas */

export function Tarjeta({
  children,
  className = '',
  interactiva = true,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  interactiva?: boolean
  as?: ElementType
}) {
  return createElement(
    as,
    {
      className: `rounded-card bg-white p-6 shadow-suave ring-1 ring-lavanda-200/70 transition-all duration-250 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:p-7 ${
        interactiva ? 'hover:-translate-y-1 hover:shadow-suave-lg hover:ring-morado-300/70' : ''
      } ${className}`,
    },
    children,
  )
}

export function BloqueIcono({
  icono: Icono,
  tono = 'morado',
  tamano = 'md',
}: {
  icono: ComponentType<SVGProps<SVGSVGElement>>
  tono?: 'morado' | 'rosa' | 'claro'
  tamano?: 'sm' | 'md'
}) {
  const tonos = {
    morado: 'bg-gradient-to-br from-morado to-morado-700 text-white',
    rosa: 'bg-rosa-100 text-rosa-700',
    claro: 'bg-lavanda text-morado ring-1 ring-lavanda-200',
  }
  const medidas = tamano === 'sm' ? 'h-11 w-11 rounded-xl' : 'h-14 w-14 rounded-2xl'
  const iconoMedida = tamano === 'sm' ? 'h-5 w-5' : 'h-7 w-7'
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${medidas} ${tonos[tono]} transition-transform duration-250 group-hover:scale-105`}
    >
      <Icono className={iconoMedida} />
    </span>
  )
}

export function TarjetaServicio({
  icono,
  titulo,
  descripcion,
  mensaje,
}: {
  icono: ComponentType<SVGProps<SVGSVGElement>>
  titulo: string
  descripcion: string
  mensaje: string
}) {
  return (
    <Tarjeta as="article" className="group flex h-full flex-col gap-4">
      <BloqueIcono icono={icono} tono="claro" />
      <div className="flex-1">
        <h3 className="text-lg leading-snug">{titulo}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta-60">{descripcion}</p>
      </div>
      <a
        href={whatsapp(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start rounded-full bg-lavanda px-4 py-2 text-sm font-medium text-morado-900 transition-all duration-250 hover:bg-morado hover:text-white"
      >
        <IconWhatsApp className="h-4 w-4" />
        Agendar
        <span className="sr-only"> {titulo} por WhatsApp</span>
      </a>
    </Tarjeta>
  )
}

/* ------------------------------------------------------------- Mapa y CTA */

export function MapaPlaceholder({ nombre, mapa }: { nombre: string; mapa: string }) {
  return (
    <div
      role="img"
      aria-label={`Mapa de ubicación de ${nombre}`}
      className="patron-marca relative flex h-52 items-center justify-center overflow-hidden rounded-2xl bg-lavanda ring-1 ring-lavanda-200 md:h-full md:min-h-[15rem]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(179,157,219,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(179,157,219,0.22) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-rosa shadow-suave">
          <IconUbicacion className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium text-morado-900">{nombre}</p>
        <a
          href={mapa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-rosa underline-offset-4 transition-colors duration-250 hover:text-rosa-700 hover:underline"
        >
          Cómo llegar
          <IconFlecha className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

/** Ventajas fijas del consultorio, con los mismos iconos que la barra de confianza. */
const VENTAJAS = [
  { icono: IconMismoDia, texto: 'Atención el mismo día' },
  { icono: IconUbicacion, texto: 'Dos consultorios' },
  { icono: IconDomicilio, texto: 'Consulta a domicilio' },
]

export function BannerCTA({
  sobretitulo = 'Atención médica cercana',
  titulo = 'Agenda tu consulta por WhatsApp',
  texto = 'Escríbeme directamente por WhatsApp para agendar tu cita, resolver dudas o conocer cuál de mis consultorios te queda más cerca.',
  mensaje = 'Hola doctora, me gustaría agendar una consulta.',
}: {
  sobretitulo?: string
  titulo?: string
  texto?: string
  mensaje?: string
}) {
  return (
    <section className="contenedor py-16 md:py-24">
      <Aparece>
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 shadow-suave-lg md:p-12 lg:p-20"
          style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #faf7ff 55%, #f4eeff 100%)',
          }}
        >
          {/* Fondo decorativo: textura de marca y halos difusos, nunca compiten con el texto. */}
          <span aria-hidden className="patron-marca absolute inset-0 opacity-30" />
          <span
            aria-hidden
            className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-morado-300/25 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-rosa-100/40 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <TituloSeccion sobretitulo={sobretitulo} titulo={titulo} descripcion={texto} />

              <ul className="mt-8 flex flex-col gap-3">
                {VENTAJAS.map(({ icono: Icono, texto: ventaja }) => (
                  <li
                    key={ventaja}
                    className="flex items-center gap-3 text-[0.98rem] font-medium text-morado-900"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-morado shadow-suave">
                      <Icono className="h-4 w-4" />
                    </span>
                    {ventaja}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <BotonWhatsApp tamano="lg" mensaje={mensaje} />
                <Boton to="/consultorios" variante="secundario" tamano="lg">
                  Ver consultorios
                </Boton>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <img
                src={IMAGENES.retrato}
                alt="La Dra. Andrea García Hernández, médico general, en su consultorio"
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[2rem] bg-lavanda-200 object-cover shadow-suave-lg"
              />
            </div>
          </div>
        </div>
      </Aparece>
    </section>
  )
}
