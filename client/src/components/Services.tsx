import { HiArrowRight } from "react-icons/hi";

export default function Services() {
  return (
    <section id="servicios" className="bg-primary text-[var(--color-quinary)] px-6 py-16">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Encabezado */}
        <div className="space-y-6">
          <div className="inline-block px-8 py-1.5 text-sm font-medium rounded-full border border-[var(--color-quinary)]">
            Servicios
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Automatiza tus correos con{" "} <br></br>
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              inteligencia artificial
            </span>
          </h2>
          <p className="text-[var(--color-quinary)] text-base md:text-xl font-normal max-w-4xl mx-auto">
            Redacta emails efectivos en segundos. Personaliza el tipo, tono y objetivo del mensaje para obtener resultados precisos, rápidos y profesionales.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {/* Tarjeta 1 */}
          <div className="border border-[var(--color-quinary)] rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              Generación Inteligente <br /> de Correos
            </h3>
            <p className="text-base font-normal text-[var(--color-quaternary)]">
              Redacta emails en tiempo récord completando unos simples campos.
              Maily se encarga del resto con IA avanzada que adapta el contenido
              a tus necesidades.
            </p>
            <ul className="text-base font-semibold list-disc pl-4 space-y-1">
              <li>Tipo de email</li>
              <li>Tono de comunicación</li>
              <li>Longitud del mensaje</li>
              <li>Objetivo del mensaje</li>
            </ul>
            <button className="mt-4 cursor-pointer inline-flex items-center text-sm font-bold bg-white text-primary px-6 py-2 rounded-2xl shadow-sm hover:opacity-90 transition">
              Conocer más <HiArrowRight className="ml-2" />
            </button>
          </div>

          {/* Tarjeta 2 (ACTIVA) */}
          <div className="border border-[var(--color-quinary)] rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              Personalización a tu <br /> Medida
            </h3>
            <p className="text-base font-normal text-[var(--color-quaternary)]">
              Define el propósito, estilo y estructura del correo para lograr un
              mensaje alineado con tu marca, el contenido se adapta a ti.
            </p>
            <ul className="text-base font-semibold list-disc pl-4 space-y-1">
              <li>Correos comerciales, informativos, de bienvenida, recordatorios, y más.</li>
              <li>Tonos: formal, casual, empático, directo, etc.</li>
            </ul>
            <button className="mt-4 cursor-pointer inline-flex items-center text-sm font-bold bg-white text-primary px-6 py-2 rounded-2xl shadow-sm hover:opacity-90 transition">
              Explorar <HiArrowRight className="ml-2" />
            </button>
          </div>

          {/* Tarjeta 3 */}
          <div className="border border-[var(--color-quinary)] rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              Resultados Listos <br /> para Enviar
            </h3>
            <p className="text-base font-normal text-[var(--color-quaternary)]">
              Una vez rellenados los campos, Maily genera tu correo instantáneamente.
              Puedes copiar, editar o enviarlo desde tu plataforma preferida.
            </p>
            <ul className="text-base font-semibold list-disc pl-4 space-y-1">
              <li>Eficiencia al máximo.</li>
              <li>Ahorra tiempo y mejora la calidad de tus comunicaciones.</li>
            </ul>
            <button className="mt-4 cursor-pointer inline-flex items-center text-sm font-bold bg-white text-primary px-6 py-2 rounded-2xl shadow-sm hover:opacity-90 transition">
              Ver cómo funciona <HiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
