import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoSparkles } from "react-icons/io5";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";

export default function Hero() {
  return (
    <section className="relative text-[var(--color-quinary)] px-6 py-14 overflow-hidden">
      {/* Fondo difuminado */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 -mt-10">
        <div className="w-[300px] h-[300px] rounded-full blur-[50px] opacity-50 bg-gradient-custom" />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Botón superior */}
        <div className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full border border-[var(--color-quinary)] text-[var(--color-quinary)] mb-4">
          Personalización impulsada por IA
          <IoSparkles className="ml-2 text-[var(--color-quinary)]" />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Ideas claras, correos efectivos. <br />
          <span className="text-secondary">Maily los genera por ti.</span>
        </h1>

        {/* Descripción */}
        <p className="text-[var(--color-quinary)] text-base md:text-xl font-normal max-w-4xl mx-auto">
          Deja atrás el bloqueo al escribir. <strong>Maily</strong> genera
          correos personalizados y listos para enviar con solo ingresar un
          prompt. Rápido, intuitivo y hecho para ayudarte a vender más.
        </p>

        {/* Botón de acción */}
        <div className="mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center bg-white text-primary text-base font-bold px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            15 días gratuitos{" "}
            <HiOutlineArrowNarrowRight className="ml-2 text-2xl" />
          </a>
        </div>

        {/* Avatares + confianza */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {/* Avatares */}
          <div className="flex -space-x-2">
            <img src={user1} alt="User 1" className="w-10 h-10 rounded-full" />
            <img src={user2} alt="User 2" className="w-10 h-10 rounded-full" />
            <img src={user3} alt="User 3" className="w-10 h-10 rounded-full" />
          </div>
          {/* Texto de confianza */}
          <p className="text-sm text-[var(--color-quinary)]">
            <strong className="text-white">+1,200 usuarios</strong> ya confían
            en <span className="text-secondary font-semibold">Maily</span>
          </p>
        </div>
      </div>
    </section>
  );
}
