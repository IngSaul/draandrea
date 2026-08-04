import { Link } from 'react-router'
import { LogoMarca } from './Logo'
import {
  IconFacebook,
  IconInstagram,
  IconTikTok,
  IconTelefono,
  IconWhatsApp,
} from './icons'
import { NAV, TELEFONO_TEL, TELEFONO_VISIBLE, whatsapp } from '../data/sitio'

const INFORMACION = [
  { label: 'Consulta médica', to: '/servicios' },
  { label: 'Consulta a domicilio', to: '/servicios#domicilio' },
  { label: 'Horarios', to: '/consultorios' },
  { label: 'Aviso de privacidad', to: '/contacto#privacidad' },
]

const REDES = [
  { label: 'Facebook', href: 'https://facebook.com', Icono: IconFacebook },
  { label: 'Instagram', href: 'https://instagram.com', Icono: IconInstagram },
  { label: 'TikTok', href: 'https://tiktok.com', Icono: IconTikTok },
]

const enlace =
  'inline-flex items-center gap-2 text-[0.95rem] text-morado-900/75 transition-all duration-250 hover:translate-x-1 hover:text-rosa'

export function Footer() {
  return (
    <footer className="patron-marca bg-lavanda">
      <div className="contenedor py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMarca className="h-12 w-12" />
              <div className="leading-tight">
                <p className="text-[1.05rem] font-semibold text-morado-900">
                  Dra. Andrea <span className="text-rosa">García</span> Hernández
                </p>
                <p className="text-[0.6rem] font-medium tracking-[0.28em] text-tinta-60 uppercase">
                  Médico general
                </p>
              </div>
            </div>
            <p className="mt-5 font-script text-2xl text-morado">Tu salud es mi prioridad</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-60">
              Atención médica general para toda la familia, en consultorio y a domicilio, sin
              largas esperas.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={whatsapp('Hola doctora, me gustaría agendar una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-morado px-4 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-morado-700"
              >
                <IconWhatsApp className="h-4 w-4" />
                Agenda tu cita por WhatsApp
              </a>
              <a href={TELEFONO_TEL} className={enlace}>
                <IconTelefono className="h-4 w-4 text-morado" />
                {TELEFONO_VISIBLE}
              </a>
            </div>
          </div>

          <nav aria-labelledby="pie-navegacion">
            <h2
              id="pie-navegacion"
              className="text-[0.7rem] font-semibold tracking-[0.22em] text-rosa uppercase"
            >
              Navegación
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={enlace}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="pie-informacion">
            <h2
              id="pie-informacion"
              className="text-[0.7rem] font-semibold tracking-[0.22em] text-rosa uppercase"
            >
              Información
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {INFORMACION.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={enlace}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] font-semibold tracking-[0.22em] text-rosa uppercase">
              Síguenos
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {REDES.map(({ label, href, Icono }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={enlace}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-morado shadow-suave transition-colors duration-250 hover:text-rosa">
                      <Icono className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separador elegante */}
        <div className="mt-14 flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-morado-300/60" />
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-rosa" fill="currentColor">
            <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.6 12 20 12 20z" />
          </svg>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-morado-300/60" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-[0.85rem] text-tinta-60 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Dra. Andrea García Hernández. Todos los derechos
            reservados.
          </p>
          <p>
            Diseñado por{' '}
            <a
              href="https://avalonnova.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors duration-250 hover:text-rosa hover:underline"
            >
              avalonnova.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
