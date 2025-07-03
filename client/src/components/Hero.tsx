import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Automatiza tus campañas de correo con IA
          </h1>
          <p className="text-lg text-gray-700">
            Genera mails inteligentes con IA y RAG en segundos. Ahorra tiempo,
            potencia tus ventas.
          </p>
        </div>
        <div className="relative w-[400px] h-[460px] overflow-hidden">
          <img
            src={hero}
            alt="Hero"
            className="absolute top-0 mt-10 left-0 w-full h-full object-cover z-10"
          />
        </div>
      </div>
      <div className=" text-center">
        <Link
          to="/generate"
          className="btn btn-primary mb-10 text-white font-semibold bg-gray-900 cursor-pointer px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform inline-flex items-center justify-center"
        >
          Generar Correo
        </Link>
      </div>
    </section>
  );
}
