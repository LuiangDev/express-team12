export default function Plans() {
  return (
    <section
      className="bg-primary text-[var(--color-quinary)] px-6 py-16"
      id="planes"
    >
      {/* Etiqueta superior */}
      <div className="flex justify-center mb-14">
        <span className="px-8 py-1.5 border font-medium text-sm rounded-full border-[var(--color-quinary)]">
          Planes
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_3fr] gap-12">
        {/* Texto lateral izquierdo */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
            Elige el plan que se <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              ajusta a tu negocio
            </span>
          </h2>
          <p className="mt-4 text-base font-medium text-[var(--color-quinary)]">
            Desde proyectos personales hasta operaciones empresariales, Maily
            tiene una solución para ti. Comienza gratis y escala cuando lo
            necesites.
          </p>
        </div>

        {/* Tarjetas de planes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="bg-[var(--color-quinary)] text-primary rounded-xl p-6 flex flex-col justify-between max-h-[290px]">
            <div>
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="text-3xl font-semibold mt-2">
                $0{" "}
                <span className="text-xl font-medium text-primary">/mes</span>
              </p>
              <p className="mt-4 text-md  text-primary/80 font-normal">
                Para quienes están comenzando. Genera hasta 15 correos al mes de
                forma gratuita.
              </p>
            </div>
            <button className="mt-6 cursor-pointer w-fit px-4 py-2 border border-primary text-primary rounded-2xl text-sm font-semibold hover:bg-primary hover:text-white transition">
              Comenzar gratis
            </button>
          </div>

          {/* Pro */}
          <div className="bg-primary border border-[var(--color-quinary)] text-[var(--color-quinary)] rounded-xl p-6 flex flex-col justify-between max-h-[290px]">
            <div>
              <h3 className="text-2xl font-semibold">Pro</h3>
              <p className="text-3xl font-semibold mt-2">
                $19 <span className="text-sm font-medium">/mes</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Ideal para freelancers o pequeñas empresas que necesitan correos
                constantes.
              </p>
            </div>
            <button className="mt-6 cursor-pointer w-fit px-4 py-2 border border-[var(--color-quinary)] text-[var(--color-quinary)] rounded-2xl text-sm font-semibold hover:bg-[var(--color-quinary)] hover:text-primary transition">
              Probar 7 días gratis
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] text-primary rounded-xl p-6 flex flex-col justify-between max-h-[290px]">
            <div>
              <h3 className="text-2xl font-semibold">Enterprise</h3>
              <p className="text-sm font-medium mt-2">
                Desde <span className="text-3xl font-semibold">$99 </span>{" "}
                <span className="text-sm font-medium">/mes</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Para empresas que requieren escalabilidad, equipos y
                funcionalidades premium.
              </p>
            </div>
            <button className="mt-6 cursor-pointer w-fit px-4 py-2 bg-primary text-[var(--color-quinary)] rounded-full text-sm font-semibold hover:opacity-90 transition">
              Solicitar demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
