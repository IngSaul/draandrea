import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import {
  Aparece,
  BannerCTA,
  BloqueIcono,
  Boton,
  BotonWhatsApp,
  Seccion,
  Tarjeta,
  TituloSeccion,
} from '../components/ui'
import {
  IconAplicaciones,
  IconCedula,
  IconCertificados,
  IconCorazon,
  IconCuraciones,
  IconDigestivo,
  IconDomicilio,
  IconEscudo,
  IconFamilia,
  IconGraduacion,
  IconMano,
  IconMismoDia,
  IconRespiratorio,
  IconUbicacion,
} from '../components/icons'
import { Foto } from '../components/Foto'
import { FOTOS } from '../data/sitio'

const CONFIANZA = [
  {
    icono: IconFamilia,
    titulo: 'Atención para toda la familia',
    texto: 'Niños, adultos y adultos mayores en un mismo lugar de confianza.',
  },
  {
    icono: IconMismoDia,
    titulo: 'Atención el mismo día',
    texto: 'Escribe por WhatsApp y en la mayoría de los casos te atiendo hoy.',
  },
  {
    icono: IconUbicacion,
    titulo: 'Dos consultorios',
    texto: 'Beatriz Hernández entre semana y Arandas los fines de semana.',
  },
  {
    icono: IconDomicilio,
    titulo: 'Consulta a domicilio',
    texto: 'Si no puedes trasladarte, la consulta llega hasta tu casa.',
  },
]

const PADECIMIENTOS = [
  {
    icono: IconRespiratorio,
    titulo: 'Enfermedades respiratorias',
    texto: 'Cuadros de vías respiratorias que aparecen de un día para otro.',
    items: ['Gripe', 'Tos', 'Faringitis', 'Infecciones'],
  },
  {
    icono: IconDigestivo,
    titulo: 'Problemas digestivos',
    texto: 'Molestias estomacales que no te dejan hacer tu día normal.',
    items: ['Gastritis', 'Colitis', 'Diarrea'],
  },
  {
    icono: IconCuraciones,
    titulo: 'Heridas',
    texto: 'Manejo cuidadoso de heridas, desde la limpieza hasta el alta.',
    items: ['Curaciones', 'Suturas', 'Retiro de puntos'],
  },
  {
    icono: IconAplicaciones,
    titulo: 'Procedimientos',
    texto: 'Procedimientos menores realizados con material estéril.',
    items: ['Aplicaciones', 'Canalización', 'Lavados óticos', 'Lavados nasales'],
  },
  {
    icono: IconCertificados,
    titulo: 'Documentación',
    texto: 'Documentos médicos válidos, emitidos el mismo día de tu consulta.',
    items: ['Certificados médicos', 'Justificantes', 'Recetas controladas'],
  },
]

const VALORES = [
  {
    icono: IconCorazon,
    titulo: 'Atención personalizada',
    texto: 'Consultas sin prisa, con el tiempo necesario para escucharte.',
  },
  {
    icono: IconMano,
    titulo: 'Trato humano',
    texto: 'Explicaciones claras, sin tecnicismos y sin hacerte sentir un número.',
  },
  {
    icono: IconFamilia,
    titulo: 'Medicina familiar',
    texto: 'Conozco el historial de tu familia y doy seguimiento a cada caso.',
  },
  {
    icono: IconEscudo,
    titulo: 'Prevención',
    texto: 'Revisiones y hábitos que evitan complicaciones más adelante.',
  },
  {
    icono: IconGraduacion,
    titulo: 'Egresada de UNIVA',
    texto:
      'Médico General por la Universidad del Valle de Atemajac (UNIVA), con formación orientada a la atención integral del paciente.',
  },
  {
    icono: IconCedula,
    titulo: 'Cédula Profesional',
    texto: 'Cédula Profesional: 15292478',
  },
]

export default function Home() {
  return (
    <>
      <Seo ruta="/" />

      {/* ------------------------------------------------------------ Hero */}
      <section className="patron-marca relative overflow-hidden bg-gradient-to-b from-lavanda via-lavanda/60 to-white">
        <span
          aria-hidden
          className="absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-morado-300/25 blur-3xl"
        />
        <div className="contenedor relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <Aparece>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.78rem] font-medium text-morado-900 shadow-suave ring-1 ring-lavanda-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rosa opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rosa" />
              </span>
              Citas disponibles hoy
            </p>

            <h1 className="mt-6 text-[2.1rem] leading-[1.12] sm:text-5xl lg:text-[3.4rem]">
              Atención médica cercana, profesional y{' '}
              <span className="text-rosa">sin largas esperas.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-tinta-60 md:text-lg">
              Soy la <strong className="font-medium text-morado-900">Dra. Andrea García
              Hernández</strong>, médico general. Atiendo consultas para toda la familia en mis dos
              consultorios y también a domicilio: desde una gripe o una curación hasta tus
              certificados médicos, con el tiempo que tu caso necesita.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BotonWhatsApp
                tamano="lg"
                mensaje="Hola doctora, me gustaría agendar una consulta."
              />
              <Boton to="/servicios" variante="secundario" tamano="lg">
                Ver servicios
              </Boton>
            </div>

            <p className="mt-8 font-script text-2xl text-morado md:text-[1.75rem]">
              Tu salud es mi prioridad
            </p>
          </Aparece>

          <Aparece delay={120} className="relative">
            {/* Curva de marca detrás del retrato */}
            <span
              aria-hidden
              className="absolute -inset-x-6 -top-6 bottom-8 rounded-[3rem] bg-gradient-to-br from-morado via-morado-700 to-rosa opacity-90"
              style={{ borderTopLeftRadius: '14rem', borderBottomRightRadius: '14rem' }}
            />
            <Foto
              foto={FOTOS.retrato}
              sizes="(min-width: 1024px) 37rem, (min-width: 640px) 90vw, 100vw"
              prioridad
              className="relative aspect-[4/5] w-full rounded-[2.5rem] bg-lavanda-200 object-cover shadow-suave-lg"
              style={{ borderTopLeftRadius: '13rem' }}
            />
            <div className="relative -mt-10 ml-auto w-fit max-w-[15rem] rounded-2xl bg-white p-4 shadow-suave-lg ring-1 ring-lavanda-200 md:-mt-12">
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-rosa uppercase">
                Médico general
              </p>
              <p className="mt-1 text-[0.95rem] leading-snug font-medium text-morado-900">
                Consulta, curaciones y visitas a domicilio
              </p>
            </div>
          </Aparece>
        </div>
      </section>

      {/* -------------------------------------------------- Barra de confianza */}
      <div className="contenedor -mt-2 md:-mt-8">
        <Aparece>
          <ul className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-suave-lg ring-1 ring-lavanda-200 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:divide-x lg:divide-lavanda-200 lg:gap-0">
            {CONFIANZA.map((item) => (
              <li
                key={item.titulo}
                className="group flex gap-4 rounded-2xl p-3 transition-colors duration-250 hover:bg-lavanda/70 lg:px-6"
              >
                <BloqueIcono icono={item.icono} tamano="sm" />
                <div>
                  <h2 className="text-[0.98rem] leading-snug">{item.titulo}</h2>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-tinta-60">{item.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </Aparece>
      </div>

      {/* -------------------------------------------------------- Qué atendemos */}
      <Seccion fondo="blanco">
        <Aparece>
          <TituloSeccion
            sobretitulo="Qué atendemos"
            titulo="Empezamos por lo que te está pasando, no por el procedimiento"
            descripcion="Si no sabes en qué categoría entra tu caso, escríbeme y lo revisamos juntos por WhatsApp."
            centrado
          />
        </Aparece>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PADECIMIENTOS.map((grupo, i) => (
            <Aparece key={grupo.titulo} delay={i * 70}>
              <Tarjeta as="article" className="group h-full">
                <BloqueIcono icono={grupo.icono} tono={i % 2 === 0 ? 'morado' : 'rosa'} />
                <h3 className="mt-5 text-lg">{grupo.titulo}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-tinta-60">{grupo.texto}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {grupo.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-lavanda px-3 py-1.5 text-[0.82rem] font-medium text-morado-900 transition-colors duration-250 group-hover:bg-rosa-100/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Tarjeta>
            </Aparece>
          ))}

          <Aparece delay={350}>
            <Tarjeta
              as="article"
              className="flex h-full flex-col justify-between bg-gradient-to-br from-morado to-morado-700 ring-0"
            >
              <div>
                <h3 className="text-lg text-white">¿Tu caso no aparece aquí?</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-white/80">
                  Cuéntame tus síntomas por WhatsApp. Te oriento sin costo y te digo si necesitas
                  consulta, domicilio o estudios previos.
                </p>
              </div>
              <BotonWhatsApp
                tamano="sm"
                variante="claro"
                mensaje="Hola doctora, quiero contarle mis síntomas para saber si necesito consulta."
                className="mt-6 self-start"
              >
                Consultar mi caso
              </BotonWhatsApp>
            </Tarjeta>
          </Aparece>
        </div>
      </Seccion>

      {/* ------------------------------------------------------------ Domicilio */}
      <Seccion fondo="lavanda" id="domicilio">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Aparece className="relative order-2 lg:order-1">
            <span
              aria-hidden
              className="absolute -bottom-5 -left-5 h-40 w-40 rounded-[2rem] bg-rosa-100/70"
            />
            <Foto
              foto={FOTOS.domicilio}
              sizes="(min-width: 1024px) 39rem, (min-width: 768px) 92vw, 100vw"
              className="relative aspect-[4/3] w-full rounded-[2rem] bg-lavanda-200 object-cover shadow-suave-lg transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.015]"
            />
          </Aparece>

          <Aparece delay={90} className="order-1 lg:order-2">
            <TituloSeccion
              sobretitulo="Consulta a domicilio"
              titulo="Cuando salir de casa no es una opción, la consulta va contigo"
              descripcion="Ideal para adultos mayores, personas con movilidad reducida, pacientes en recuperación o familias con varios enfermos al mismo tiempo."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Valoración completa en tu domicilio',
                'Aplicaciones y curaciones en casa',
                'Receta y certificado al momento',
                'Seguimiento posterior por WhatsApp',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 text-[0.92rem] leading-snug text-morado-900 shadow-suave"
                >
                  <IconCorazon className="mt-0.5 h-5 w-5 shrink-0 text-rosa" />
                  {item}
                </li>
              ))}
            </ul>
            <BotonWhatsApp
              className="mt-8"
              tamano="lg"
              mensaje="Hola doctora, quiero solicitar una consulta a domicilio."
            >
              Solicitar visita a domicilio
            </BotonWhatsApp>
          </Aparece>
        </div>
      </Seccion>

      {/* --------------------------------------------------------- Sobre la Dra */}
      <Seccion fondo="blanco">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Aparece className="relative mx-auto w-full max-w-sm">
            <span
              aria-hidden
              className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-lavanda"
            />
            <Foto
              foto={FOTOS.retratoSecundario}
              sizes="(min-width: 26rem) 24rem, 100vw"
              className="relative aspect-[4/5] w-full rounded-[2rem] bg-lavanda-200 object-cover shadow-suave-lg"
              style={{ borderBottomRightRadius: '11rem' }}
            />
          </Aparece>

          <Aparece delay={90}>
            <TituloSeccion
              sobretitulo="Sobre mí"
              titulo="Dra. Andrea García Hernández"
              descripcion="Soy médico general y llevo la consulta como me gustaría que atendieran a mi propia familia: escuchando primero, explicando después y dando seguimiento hasta que estés bien. Atiendo en dos consultorios y a domicilio, con horarios pensados para quienes trabajan."
            />

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {VALORES.map((valor) => (
                <div
                  key={valor.titulo}
                  className="group flex gap-4 rounded-2xl bg-lavanda/70 p-5 transition-colors duration-250 hover:bg-lavanda"
                >
                  <BloqueIcono icono={valor.icono} tono="claro" tamano="sm" />
                  <div>
                    <h3 className="text-[0.98rem] leading-snug">{valor.titulo}</h3>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-tinta-60">
                      {valor.texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[0.95rem] text-tinta-60">
              ¿Quieres conocer los consultorios?{' '}
              <Link
                to="/consultorios"
                className="font-medium text-rosa underline-offset-4 transition-colors duration-250 hover:text-rosa-700 hover:underline"
              >
                Ver direcciones y horarios
              </Link>
              .
            </p>
          </Aparece>
        </div>
      </Seccion>

      <BannerCTA />
    </>
  )
}
