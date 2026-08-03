import { IconFlecha, IconReloj, IconUbicacion } from './icons'
import { BotonWhatsApp, MapaPlaceholder } from './ui'
import type { Consultorio } from '../data/sitio'

export function TarjetaConsultorio({
  consultorio,
  compacto = false,
}: {
  consultorio: Consultorio
  compacto?: boolean
}) {
  const { nombre, zona, direccion, referencia, horarios, imagen, alt, mapa } = consultorio

  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-suave ring-1 ring-lavanda-200/70 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:shadow-suave-lg">
      {!compacto && (
        <div className="relative overflow-hidden">
          <img
            src={imagen}
            alt={alt}
            width={1100}
            height={760}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full bg-lavanda-200 object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.14em] text-morado-900 uppercase backdrop-blur">
            {zona}
          </span>
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl">{nombre}</h3>

        <p className="mt-3 flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-tinta-60">
          <IconUbicacion className="mt-0.5 h-5 w-5 shrink-0 text-rosa" />
          <span>
            {direccion}
            {referencia && (
              <span className="mt-1 block text-[0.85rem] text-tinta-60/80">{referencia}</span>
            )}
          </span>
        </p>

        <div className="mt-6 rounded-2xl bg-lavanda/70 p-5">
          <h4 className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-morado uppercase">
            <IconReloj className="h-4 w-4" />
            Horarios
          </h4>
          <dl className="mt-3 space-y-2">
            {horarios.map((h) => (
              <div key={h.dias} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                <dt className="text-[0.9rem] font-medium text-morado-900">{h.dias}</dt>
                <dd className="text-[0.9rem] text-tinta-60">{h.horas}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6">
          <MapaPlaceholder nombre={nombre} mapa={mapa} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BotonWhatsApp
            className="flex-1"
            mensaje={`Hola doctora, quiero agendar una consulta en el ${nombre}.`}
          >
            Agendar aquí
          </BotonWhatsApp>
          <a
            href={mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="group/enlace inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[0.95rem] font-medium text-morado-900 ring-1 ring-lavanda-200 transition-all duration-250 hover:-translate-y-0.5 hover:ring-morado-300"
          >
            Cómo llegar
            <IconFlecha className="h-4 w-4 transition-transform duration-250 group-hover/enlace:translate-x-1" />
            <span className="sr-only">a {nombre}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
