import { HiArrowRight } from "react-icons/hi";
export default function FinalCTA() {
  return (
    <section className="text-[var(--color-quinary)] text-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título central */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          "Redactar nunca fue tan fácil...
          <br />
          <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
            ni tan efectivo"
          </span>
        </h2>

        {/* Descripción */}
        <p className="max-w-7xl mx-auto mt-6 text-lg md:text-lg leading-relaxed font-normal text-[var(--color-quinary)]">
          Descubre el poder de transformar ideas sueltas en correos
          profesionales y persuasivos.
          <br />
          Con{" "}
          <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text font-bold">
            Maily
          </span>
          , redactar mensajes de alto impacto es tan fácil como llenar un
          formulario.
          <br />
          Ahorra tiempo, gana claridad y haz que tus comunicaciones trabajen por
          ti.
        </p>

        {/* Beneficios destacados */}
        <div className="mt-6 flex justify-center flex-wrap gap-6 text-sm md:text-xl font-semibold text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
          <span>Precisión.</span>
          <span>Tono perfecto.</span>
          <span>Resultados inmediatos.</span>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button className="bg-white cursor-pointer inline-flex items-center text-primary px-6 py-3 rounded-2xl font-bold text-sm md:text-base hover:opacity-90 transition">
            Empieza tu prueba gratis por 15 días <HiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
