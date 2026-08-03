import { Seo } from '../components/Seo'
import { TarjetaConsultorio } from '../components/TarjetaConsultorio'
import { Aparece, BannerCTA, Boton, BotonWhatsApp, Seccion, TituloSeccion } from '../components/ui'
import { IconReloj, IconTelefono, IconWhatsApp } from '../components/icons'
import { CONSULTORIOS, TELEFONO_TEL, TELEFONO_VISIBLE } from '../data/sitio'

const HORARIOS_GENERALES = [
  { dias: 'Lunes a viernes', horas: '9:00 – 14:00 · 16:00 – 21:00' },
  { dias: 'Sábado', horas: '9:00 – 15:00' },
  { dias: 'Domingo', horas: 'Urgencias con cita previa' },
]

export default function Contacto() {
  return (
    <>
      <Seo
        titulo="Contacto por WhatsApp"
        descripcion="Contacta a la Dra. Andrea García Hernández por WhatsApp o teléfono. Horarios de atención, ubicación de ambos consultorios y consulta a domicilio."
        ruta="/contacto"
      />

      <section className="patron-marca bg-gradient-to-b from-lavanda to-white">
        <div className="contenedor py-14 md:py-20">
          <Aparece>
            <TituloSeccion
              nivel="h1"
              sobretitulo="Contacto"
              titulo="Un solo mensaje y agendamos tu consulta"
              descripcion="Todo el contacto ocurre por WhatsApp: es más rápido, te contesto personalmente y ahí mismo te confirmo horario, consultorio y lo que debes llevar."
              centrado
            />
          </Aparece>

          <Aparece delay={100}>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
              <div className="rounded-card bg-gradient-to-br from-morado to-morado-700 p-7 text-center shadow-suave-lg md:col-span-1">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <IconWhatsApp className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-lg text-white">WhatsApp</h2>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-white/80">
                  Respuesta habitual en menos de 30 minutos en horario de consulta.
                </p>
                <BotonWhatsApp
                  tamano="sm"
                  variante="claro"
                  className="mt-5"
                  mensaje="Hola doctora, me gustaría agendar una consulta."
                >
                  Escribir ahora
                </BotonWhatsApp>
              </div>

              <div className="rounded-card bg-white p-7 text-center shadow-suave ring-1 ring-lavanda-200">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lavanda text-morado">
                  <IconTelefono className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-lg">Teléfono</h2>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-tinta-60">
                  Si prefieres llamar, marca directo al consultorio.
                </p>
                <a
                  href={TELEFONO_TEL}
                  className="mt-5 inline-block font-medium text-rosa underline-offset-4 transition-colors duration-250 hover:text-rosa-700 hover:underline"
                >
                  {TELEFONO_VISIBLE}
                </a>
              </div>

              <div className="rounded-card bg-white p-7 shadow-suave ring-1 ring-lavanda-200">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lavanda text-morado">
                  <IconReloj className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-center text-lg">Horarios</h2>
                <dl className="mt-3 space-y-1.5 text-left">
                  {HORARIOS_GENERALES.map((h) => (
                    <div key={h.dias}>
                      <dt className="text-[0.85rem] font-medium text-morado-900">{h.dias}</dt>
                      <dd className="text-[0.85rem] text-tinta-60">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Aparece>
        </div>
      </section>

      <Seccion fondo="blanco">
        <Aparece>
          <TituloSeccion
            sobretitulo="Ubicaciones"
            titulo="Dónde encontrarme"
            descripcion="Ambos consultorios atienden con y sin cita dentro del horario publicado."
            centrado
          />
        </Aparece>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {CONSULTORIOS.map((consultorio, i) => (
            <Aparece key={consultorio.id} delay={i * 100}>
              <TarjetaConsultorio consultorio={consultorio} />
            </Aparece>
          ))}
        </div>
      </Seccion>

      <Seccion fondo="lavanda" id="privacidad" className="scroll-mt-24">
        <Aparece>
          <div className="mx-auto max-w-3xl rounded-card bg-white p-8 shadow-suave ring-1 ring-lavanda-200 md:p-10">
            <h2 className="text-xl md:text-2xl">Aviso de privacidad</h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-tinta-60">
              La información que compartas por WhatsApp o durante la consulta se utiliza
              únicamente con fines médicos: integrar tu expediente clínico, dar seguimiento a tu
              tratamiento y emitir la documentación que solicites. No se comparte con terceros ni
              se usa con fines publicitarios.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-60">
              Puedes solicitar la consulta, corrección o eliminación de tus datos escribiendo por
              WhatsApp en cualquier momento.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BotonWhatsApp
                mensaje="Hola doctora, tengo una duda sobre el aviso de privacidad."
                tamano="sm"
              >
                Consultar sobre mis datos
              </BotonWhatsApp>
              <Boton to="/servicios" variante="secundario" tamano="sm">
                Ver servicios
              </Boton>
            </div>
          </div>
        </Aparece>
      </Seccion>

      <BannerCTA
        titulo="Estoy a un mensaje de distancia"
        texto="Escríbeme y en el mismo chat resolvemos la cita, la ubicación y tus dudas antes de la consulta."
        mensaje="Hola doctora, me gustaría agendar una consulta."
      />
    </>
  )
}
