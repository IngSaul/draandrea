import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { Logo } from './Logo'
import { BotonWhatsApp } from './ui'
import { NAV } from '../data/sitio'

export function Header() {
  const [desplazado, setDesplazado] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 12)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Cierra el menú al navegar y bloquea el scroll mientras está abierto.
  useEffect(() => setAbierto(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        desplazado
          ? 'bg-white/92 shadow-[0_6px_24px_-14px_rgba(74,47,128,0.45)] backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="contenedor flex h-[4.75rem] items-center justify-between gap-4 md:h-[5.5rem]">
        <Logo compacto />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group relative block rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors duration-250 ${
                      isActive ? 'text-rosa' : 'text-tinta hover:text-morado-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-rosa transition-transform duration-250 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <BotonWhatsApp
            className="hidden md:inline-flex"
            tamano="sm"
            mensaje="Hola doctora, me gustaría agendar una consulta."
          />

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            className="relative flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-lavanda-200 transition-colors duration-250 hover:bg-lavanda lg:hidden"
          >
            <span className="sr-only">Menú</span>
            <span aria-hidden className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 block h-[2px] w-5 rounded-full bg-morado-900 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{
                    top: abierto ? '7px' : `${i * 7}px`,
                    transform: abierto
                      ? i === 1
                        ? 'scaleX(0)'
                        : `rotate(${i === 0 ? 45 : -45}deg)`
                      : 'none',
                    opacity: abierto && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-lavanda-200 bg-white transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:hidden ${
          abierto ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Navegación móvil" className="contenedor py-5">
          <ul className="flex flex-col gap-1">
            {NAV.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  style={{ transitionDelay: abierto ? `${60 + i * 45}ms` : '0ms' }}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-all duration-250 ${
                      abierto ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                    } ${
                      isActive
                        ? 'bg-lavanda text-rosa'
                        : 'text-tinta hover:bg-lavanda hover:text-morado-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <BotonWhatsApp
            className="mt-4 w-full"
            tamano="md"
            mensaje="Hola doctora, me gustaría agendar una consulta."
          />
        </nav>
      </div>
    </header>
  )
}
