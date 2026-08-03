import { Link } from 'react-router'

/** Marca: estetoscopio en forma de corazón con cruz médica, según la identidad. */
export function LogoMarca({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path
        d="M32 55C21 47 9 38.5 9 26.5 9 18.5 15 13 22 13c4.3 0 8 2.2 10 5.6C34 15.2 37.7 13 42 13c7 0 13 5.5 13 13.5 0 5.6-2.6 10.3-6.2 14.4"
        fill="none"
        stroke="#7E57C2"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M22 20v9.5a7.5 7.5 0 0 0 15 0V20"
        fill="none"
        stroke="#7E57C2"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M29.5 37v3.5a8.5 8.5 0 0 0 8.5 8.5 5.5 5.5 0 0 0 5.5-5.5v-2"
        fill="none"
        stroke="#7E57C2"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="43.5" cy="39" r="4" fill="none" stroke="#7E57C2" strokeWidth="3.4" />
      <path
        d="M31 25h-4.5v4.5h-4V34H18v-4.5h-4.5V25H18v-4.5h4.5V25z"
        transform="translate(11 3)"
        fill="#E91E63"
      />
    </svg>
  )
}

export function Logo({ compacto = false }: { compacto?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 rounded-2xl transition-transform duration-250 hover:-translate-y-0.5"
      aria-label="Dra. Andrea García Hernández — Inicio"
    >
      <LogoMarca className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12" />
      <span className={`leading-none ${compacto ? 'hidden sm:block' : ''}`}>
        <span className="block text-[0.6rem] font-semibold tracking-[0.3em] text-rosa uppercase">
          Dra.
        </span>
        <span className="block text-[1.05rem] font-semibold text-morado-900 md:text-[1.15rem]">
          Andrea <span className="text-rosa">García</span> Hernández
        </span>
        <span className="mt-0.5 block text-[0.58rem] font-medium tracking-[0.28em] text-tinta-60 uppercase">
          Médico general
        </span>
      </span>
    </Link>
  )
}
