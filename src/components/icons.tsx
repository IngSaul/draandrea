import type { SVGProps } from 'react'

/**
 * Iconografía de la identidad: trazo fino, esquinas redondeadas y motivos
 * de corazón. Todos comparten viewBox 24 y heredan el color del contenedor.
 */
type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconConsulta(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 3v4a4 4 0 0 0 8 0V3" />
      <path d="M10 11v2a5 5 0 0 0 5 5 3 3 0 0 0 3-3v-1.2" />
      <circle cx="18" cy="10" r="2.2" />
      <path d="M4.6 18.2a1.9 1.9 0 0 1 2.7-2.7l.4.4.4-.4a1.9 1.9 0 0 1 2.7 2.7L7.7 21z" />
    </Base>
  )
}

export function IconAplicaciones(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m17.5 3.5 3 3" />
      <path d="m15 6 3 3" />
      <path d="M18.5 8.5 9 18l-4 1 1-4 9.5-9.5z" />
      <path d="m11 10 3 3" />
      <path d="m9 12 2 2" />
    </Base>
  )
}

export function IconCertificados(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="17" rx="3" />
      <path d="M9 4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6H9z" />
      <path d="M8.6 13.6a1.7 1.7 0 0 1 2.4-2.4l.5.5.5-.5a1.7 1.7 0 0 1 2.4 2.4L11.5 17z" />
    </Base>
  )
}

export function IconOido(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 9a5 5 0 0 1 10 0c0 2.6-1.6 3.6-2.7 4.7-1 1-1.3 1.8-1.5 2.9A3 3 0 0 1 9 19" />
      <path d="M10.5 9.2a1.7 1.7 0 0 1 3.3.5c0 1-.8 1.5-1.4 2" />
    </Base>
  )
}

export function IconDomicilio(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M9.6 14.4a1.8 1.8 0 0 1 2.4-2.6 1.8 1.8 0 0 1 2.4 2.6L12 17z" />
    </Base>
  )
}

export function IconCuraciones(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="1.8" y="8.4" width="20.4" height="7.2" rx="3.6" transform="rotate(-45 12 12)" />
      <path d="m8.5 8.5 7 7" />
      <path d="M11 12h.01M13 10h.01M13 14h.01M15 12h.01M9 10h.01M9 14h.01" strokeWidth={1.8} />
    </Base>
  )
}

export function IconFamilia(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 14.2A4.4 4.4 0 0 1 20.5 19" />
    </Base>
  )
}

export function IconMismoDia(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 9.5h17M8 3.5V6M16 3.5V6" />
      <path d="m9 14.5 2 2 4-4" />
    </Base>
  )
}

export function IconUbicacion(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19 10.2c0 4.7-5.4 9.4-6.6 10.4a.6.6 0 0 1-.8 0C10.4 19.6 5 14.9 5 10.2a7 7 0 0 1 14 0z" />
      <circle cx="12" cy="10" r="2.4" />
    </Base>
  )
}

export function IconReloj(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Base>
  )
}

export function IconRespiratorio(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4.5v5" />
      <path d="M8.5 9.5C8.5 6.8 6 5.5 5 6.6c-.9 1-.6 3.4-.6 5.6 0 3.6.8 7 3 7 1.6 0 2.1-1.6 2.1-3.6V9.5z" />
      <path d="M15.5 9.5c0-2.7 2.5-4 3.5-2.9.9 1 .6 3.4.6 5.6 0 3.6-.8 7-3 7-1.6 0-2.1-1.6-2.1-3.6V9.5z" />
    </Base>
  )
}

export function IconDigestivo(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 3.5v3.2c0 3 4.5 2.6 4.5 5.6S8.5 15 8.5 18a2.5 2.5 0 0 0 5 0" />
      <path d="M16.5 6.5c1.8.6 2.8 2.2 2.8 4.2 0 3.6-3.6 4.6-3.6 7.3" />
    </Base>
  )
}

export function IconReceta(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5.5 3.5h9L19 8v12.5H5.5z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 12.5h7M8.5 16h4.5" />
    </Base>
  )
}

export function IconAnalisis(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M10 3.5v6.2L5.8 17a3 3 0 0 0 2.6 4.5h7.2A3 3 0 0 0 18.2 17L14 9.7V3.5" />
      <path d="M8.5 3.5h7" />
      <path d="M7.2 14.5h9.6" />
    </Base>
  )
}

export function IconGota(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5c3 3.7 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-5.9 5.5-9.6z" />
      <path d="M9.5 13.5a2.6 2.6 0 0 0 2.6 2.6" />
    </Base>
  )
}

export function IconCanalizacion(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 3.5h6v5.8l-3 3.2-3-3.2z" />
      <path d="M11 12.5V21" />
      <path d="M8 21h6" />
      <path d="M8 6.5h6" />
    </Base>
  )
}

export function IconSutura(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h16" strokeDasharray="0.1 4" strokeWidth={1.8} />
      <path d="M7 8.5 10 15M13 9l3 6.5" />
      <path d="M4.5 8c2.5 1.6 3 6.4 0 8M19.5 8c-2.5 1.6-3 6.4 0 8" />
    </Base>
  )
}

export function IconCorazon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.6 12 20 12 20z" />
    </Base>
  )
}

export function IconEscudo(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.2 5 6v6c0 4.3 3 7.4 7 8.8 4-1.4 7-4.5 7-8.8V6z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </Base>
  )
}

export function IconGraduacion(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4 2.8 8.2 12 12.4l9.2-4.2z" />
      <path d="M6.5 10.4V15c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.6" />
      <path d="M21.2 8.2v5" />
    </Base>
  )
}

export function IconCedula(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="3" />
      <circle cx="8.6" cy="11" r="2.1" />
      <path d="M5.2 16.2a3.6 3.6 0 0 1 6.8 0" />
      <path d="M14.8 10.2h3.8" />
      <path d="m14.8 14 1.2 1.2 2.6-2.6" />
    </Base>
  )
}

export function IconMano(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8.5 11V5.2a1.6 1.6 0 0 1 3.2 0V10" />
      <path d="M11.7 10V4.6a1.6 1.6 0 0 1 3.2 0V10" />
      <path d="M14.9 10.4V6.8a1.6 1.6 0 0 1 3.2 0v7.4c0 3.6-2.4 6.3-5.9 6.3-3.2 0-4.6-1.7-6-4.3l-1.6-3a1.6 1.6 0 0 1 2.6-1.8l1.3 1.7" />
    </Base>
  )
}

export function IconTelefono(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4.5h3.2l1.6 4-2 1.4a11 11 0 0 0 5.3 5.3l1.4-2 4 1.6V18a1.6 1.6 0 0 1-1.7 1.6C9.9 19.1 4.9 14.1 4.4 6.2A1.6 1.6 0 0 1 5 4.5z" />
    </Base>
  )
}

export function IconFlecha(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Base>
  )
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}

export function IconFacebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22C18.34 21.21 22 17.06 22 12.06z" />
    </svg>
  )
}

export function IconInstagram(props: IconProps) {
  return (
    <Base strokeWidth={1.6} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </Base>
  )
}

export function IconTikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M16.6 2h-3v13.2a2.6 2.6 0 1 1-2-2.53V9.6a5.7 5.7 0 1 0 5 5.65V8.9a6.6 6.6 0 0 0 3.9 1.26V7.1a3.75 3.75 0 0 1-3.9-3.6V2z" />
    </svg>
  )
}
