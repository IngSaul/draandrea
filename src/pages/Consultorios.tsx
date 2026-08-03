import { Seo } from '../components/Seo'
import { TarjetaConsultorio } from '../components/TarjetaConsultorio'
import { Aparece, BannerCTA, Seccion, TituloSeccion } from '../components/ui'
import { IconDomicilio, IconMismoDia, IconUbicacion } from '../components/icons'
import { CONSULTORIOS } from '../data/sitio'

const NOTAS = [
  {
    icono: IconMismoDia,
    titulo: 'Sin cita también te atiendo',
    texto: 'Puedes llegar directo dentro del horario, aunque agendar reduce tu tiempo de espera.',
  },
  {
    icono: IconUbicacion,
    titulo: 'Dos zonas de la ciudad',
    texto: 'Entre semana te atiendo en Beatriz Hernández y el fin de semana en Arandas; tu expediente es el mismo en ambos.',
  },
  {
    icono: IconDomicilio,
    titulo: 'Domicilio bajo agenda',
    texto: 'Las visitas a domicilio se programan por WhatsApp según la zona y el horario.',
  },
]

export default function Consultorios() {
  return (
    <>
      <Seo
        titulo="Consultorios y horarios"
        descripcion="Dos consultorios médicos en Guadalajara: Col. Beatriz Hernández y Col. Arandas. Consulta direcciones, horarios de atención y cómo llegar."
        ruta="/consultorios"
      />

      <section className="patron-marca bg-gradient-to-b from-lavanda to-white">
        <div className="contenedor py-14 md:py-20">
          <Aparece>
            <TituloSeccion
              nivel="h1"
              sobretitulo="Consultorios"
              titulo="Dos consultorios pensados para quedarte cerca"
              descripcion="Uno para entre semana y otro para el fin de semana, con acceso sencillo y la misma atención personalizada en ambos."
              centrado
            />
          </Aparece>
        </div>
      </section>

      <Seccion fondo="blanco" className="pt-2 md:pt-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {CONSULTORIOS.map((consultorio, i) => (
            <Aparece key={consultorio.id} delay={i * 100}>
              <TarjetaConsultorio consultorio={consultorio} />
            </Aparece>
          ))}
        </div>
      </Seccion>

      <Seccion fondo="lavanda">
        <Aparece>
          <TituloSeccion
            sobretitulo="Antes de venir"
            titulo="Tres cosas que conviene saber"
            centrado
          />
        </Aparece>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {NOTAS.map((nota, i) => (
            <Aparece key={nota.titulo} delay={i * 80}>
              <div className="group h-full rounded-card bg-white p-7 shadow-suave ring-1 ring-lavanda-200/70 transition-all duration-250 hover:-translate-y-1 hover:shadow-suave-lg">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lavanda text-morado transition-transform duration-250 group-hover:scale-105">
                  <nota.icono className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg">{nota.titulo}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-tinta-60">{nota.texto}</p>
              </div>
            </Aparece>
          ))}
        </div>
      </Seccion>

      <BannerCTA
        titulo="Te espero en el consultorio"
        texto="Dime qué consultorio te queda mejor y te confirmo el horario disponible más próximo."
        mensaje="Hola doctora, quiero saber la disponibilidad de sus consultorios."
      />
    </>
  )
}
