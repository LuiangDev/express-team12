import mockup from "../assets/mockup.png";
export default function About() {
  return (
    <section
      className="bg-primary text-[var(--color-quinary)] px-6 py-10"
      id="nosotros"
    >
      {/* Etiqueta superior */}
      <div className="flex justify-center mb-14">
        <span className="px-8 py-1.5 border font-medium text-sm rounded-full border-[var(--color-quinary)]">
          Nosotros
        </span>
      </div>

      <div className="max-w-7xl mx-auto items-center flex flex-col md:flex-row justify-center -mr-20">
        {/* Columna izquierda - Texto */}
        <div className="max-w-7xl flex-1 mb-10 md:mb-0 ">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Nuestra visión: <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              revolucionar la forma de comunicar
            </span>
          </h2>

          <p className="mt-3 font-bold text-base">
            Un email puede abrir puertas. Nosotros te ayudamos a que lo escribas
            mejor.
          </p>

          <p className="mt-3 text-base font-medium leading-relaxed mb-3">
            Maily nace con una misión clara: simplificar el marketing outbound
            para emprendedores y PyMEs, brindando una herramienta impulsada por
            inteligencia artificial que transforma ideas en correos efectivos.
            Creemos que una buena comunicación puede marcar la diferencia, y que
            la tecnología debe facilitar, no complicar.
            <br />
            <br />
            Por eso, diseñamos{" "}
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text font-semibold">
              Maily
            </span>{" "}
            con un enfoque minimalista, funcional y potente.
          </p>

          <div className="mt-4">
            <h3 className="text-3xl font-semibold">Valores Clave:</h3>
            <ul className="mt-4 space-y-2 text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text font-semibold text-2xl">
              <li>Enfoque en el usuario</li>
              <li>Tecnología útil y transparente</li>
              <li>Compromiso con las pequeñas empresas</li>
              <li>Innovación con propósito</li>
            </ul>
          </div>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="flex justify-center">
          <img
            src={mockup}
            alt="Vista previa de Maily"
            className=" max-w-lg object-contain "
          />
        </div>
      </div>
    </section>
  );
}
