import { Seo } from '../components/Seo'
import {
  Aparece,
  BannerCTA,
  Seccion,
  TarjetaServicio,
  TituloSeccion,
} from '../components/ui'
import { Foto } from '../components/Foto'
import { FOTOS } from '../data/sitio'
import {
  IconAnalisis,
  IconAplicaciones,
  IconCanalizacion,
  IconCertificados,
  IconConsulta,
  IconCuraciones,
  IconDomicilio,
  IconGota,
  IconOido,
  IconReceta,
  IconSutura,
} from '../components/icons'

const CATEGORIAS = [
  {
    id: 'consulta-medica',
    titulo: 'Consulta médica',
    descripcion: 'La base de todo: escucharte, revisarte y darte un plan claro.',
    servicios: [
      {
        icono: IconConsulta,
        titulo: 'Consulta general',
        descripcion:
          'Valoración completa con exploración física, diagnóstico y tratamiento explicado paso a paso.',
      },
      {
        icono: IconAnalisis,
        titulo: 'Revisión de análisis',
        descripcion:
          'Interpreto tus estudios de laboratorio o gabinete y te explico qué significan en tu caso.',
      },
      {
        icono: IconReceta,
        titulo: 'Recetas controladas',
        descripcion:
          'Emisión de recetas controladas con folio vigente, previa valoración médica.',
      },
    ],
  },
  {
    id: 'procedimientos',
    titulo: 'Procedimientos',
    descripcion: 'Procedimientos menores con material estéril y sin tiempos de espera.',
    servicios: [
      {
        icono: IconAplicaciones,
        titulo: 'Aplicaciones',
        descripcion:
          'Aplicación de medicamentos intramusculares e intravenosos indicados por receta.',
      },
      {
        icono: IconCanalizacion,
        titulo: 'Canalización',
        descripcion:
          'Canalización y suero para deshidratación, cuadros gastrointestinales o refuerzo.',
      },
      {
        icono: IconOido,
        titulo: 'Lavados óticos',
        descripcion:
          'Extracción de tapón de cerumen con técnica suave; alivio inmediato de la audición.',
      },
      {
        icono: IconGota,
        titulo: 'Lavados nasales',
        descripcion:
          'Higiene nasal profunda para congestión, alergias y cuadros respiratorios.',
      },
    ],
  },
  {
    id: 'curaciones',
    titulo: 'Curaciones',
    descripcion: 'Desde una raspadura hasta el retiro de puntos, con seguimiento incluido.',
    servicios: [
      {
        icono: IconCuraciones,
        titulo: 'Curaciones menores',
        descripcion: 'Limpieza y cobertura de heridas superficiales, quemaduras leves y abrasiones.',
      },
      {
        icono: IconCuraciones,
        titulo: 'Curaciones mayores',
        descripcion: 'Manejo de heridas extensas o infectadas con revisiones programadas.',
      },
      {
        icono: IconSutura,
        titulo: 'Suturas',
        descripcion: 'Sutura de heridas con anestesia local, cuidando el resultado estético.',
      },
      {
        icono: IconSutura,
        titulo: 'Retiro de puntos',
        descripcion: 'Retiro de puntos con revisión de la cicatriz y recomendaciones de cuidado.',
      },
    ],
  },
  {
    id: 'otros',
    titulo: 'Otros servicios',
    descripcion: 'Trámites y atención especial que resuelvo el mismo día.',
    servicios: [
      {
        icono: IconCertificados,
        titulo: 'Certificados médicos',
        descripcion:
          'Certificados para escuela, trabajo, deporte o trámites, expedidos al momento.',
      },
      {
        icono: IconCertificados,
        titulo: 'Justificantes médicos',
        descripcion: 'Justificantes por incapacidad temporal respaldados por la consulta.',
      },
      {
        icono: IconAplicaciones,
        titulo: 'Retiro de implante',
        descripcion: 'Retiro de implante subdérmico con procedimiento breve y ambulatorio.',
      },
      {
        icono: IconDomicilio,
        titulo: 'Consulta a domicilio',
        descripcion: 'La misma consulta completa, en tu casa, para quien no puede trasladarse.',
      },
    ],
  },
]

export default function Servicios() {
  return (
    <>
      <Seo
        titulo="Servicios médicos"
        descripcion="Consulta general, procedimientos, curaciones, suturas, certificados médicos y consulta a domicilio. Agenda cualquier servicio por WhatsApp."
        ruta="/servicios"
      />

      <section className="patron-marca relative overflow-hidden bg-gradient-to-b from-lavanda to-white">
        <span
          aria-hidden
          className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-morado-300/25 blur-3xl"
        />
        <div className="contenedor relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Aparece>
            <TituloSeccion
              nivel="h1"
              sobretitulo="Servicios"
              titulo="Todo lo que puedo resolver en una sola visita"
              descripcion="Cada servicio incluye valoración médica y explicación clara del tratamiento. Elige el que necesitas y agenda directamente por WhatsApp."
            />

            <nav aria-label="Categorías de servicios" className="mt-9">
              <ul className="flex flex-wrap gap-2.5">
                {CATEGORIAS.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-morado-900 shadow-suave ring-1 ring-lavanda-200 transition-all duration-250 hover:-translate-y-0.5 hover:bg-morado hover:text-white hover:ring-morado"
                    >
                      {c.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Aparece>

          <Aparece delay={120} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            {/*
              El encuadre se acerca a la esquina superior izquierda del original: así
              entra el rostro y quedan fuera el campo quirúrgico del borde derecho y las
              manos enguantadas del pie. `sizes` va inflado en la misma proporción que la
              escala para que el navegador pida una variante con píxeles suficientes.
            */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-lavanda-200 shadow-suave-lg">
              <Foto
                foto={FOTOS.procedimiento}
                sizes="(min-width: 1024px) 39rem, (min-width: 640px) 34rem, 140vw"
                prioridad
                className="h-full w-full origin-top-left scale-[1.4] object-cover object-top-left"
              />
            </div>
          </Aparece>
        </div>
      </section>

      {CATEGORIAS.map((categoria, indice) => (
        <Seccion
          key={categoria.id}
          id={categoria.id}
          fondo={indice % 2 === 0 ? 'blanco' : 'lavanda'}
          className="scroll-mt-24"
        >
          <Aparece>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <TituloSeccion titulo={categoria.titulo} descripcion={categoria.descripcion} />
              <p className="shrink-0 text-[0.75rem] font-semibold tracking-[0.22em] text-morado-300 uppercase">
                {String(indice + 1).padStart(2, '0')} / {String(CATEGORIAS.length).padStart(2, '0')}
              </p>
            </div>
          </Aparece>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoria.servicios.map((servicio, i) => (
              <Aparece key={servicio.titulo} delay={i * 70}>
                <TarjetaServicio
                  icono={servicio.icono}
                  titulo={servicio.titulo}
                  descripcion={servicio.descripcion}
                  mensaje={`Hola doctora, me interesa el servicio de ${servicio.titulo.toLowerCase()}.`}
                />
              </Aparece>
            ))}
          </div>
        </Seccion>
      ))}

      <BannerCTA
        titulo="¿No sabes qué servicio necesitas?"
        texto="Cuéntame qué te pasa y yo te digo qué servicio corresponde, cuánto tarda y qué debes llevar."
        mensaje="Hola doctora, no sé qué servicio necesito. ¿Me puede orientar?"
      />
    </>
  )
}
