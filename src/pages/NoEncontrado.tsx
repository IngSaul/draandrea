import { Seo } from '../components/Seo'
import { Boton, BotonWhatsApp } from '../components/ui'

export default function NoEncontrado() {
  return (
    <>
      <Seo ruta="/404" />
      <section className="patron-marca bg-gradient-to-b from-lavanda to-white">
        <div className="contenedor flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="font-script text-6xl text-morado-300">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl">Esta página no existe</h1>
          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-tinta-60">
            Puede que el enlace haya cambiado. Vuelve al inicio o escríbeme directamente y te
            oriento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Boton to="/" tamano="lg" variante="secundario">
              Volver al inicio
            </Boton>
            <BotonWhatsApp tamano="lg" mensaje="Hola doctora, me gustaría agendar una consulta." />
          </div>
        </div>
      </section>
    </>
  )
}
