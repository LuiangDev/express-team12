import logo from "../assets/logo2.png";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-quinary)] text-primary px-10 rounded-t-3xl w-full">
      {/* Sección superior */}
      <div className="w-full flex flex-col md:flex-row justify-between gap-10 mb-8">
        {/* Logo + Descripción + Redes */}
        <div className="max-w-xs">
          <img
            src={logo}
            alt="Maily2 Logo"
            className="w-[143px] object-contain"
          />
          <p className="text-base font-normal mb-6 -mt-8">
            Maily transforma tus ideas en correos profesionales con ayuda de IA.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="btn btn-circle btn-md bg-primary text-[var(--color-quinary)] hover:bg-gray-900"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-md bg-primary text-[var(--color-quinary)] hover:bg-gray-900"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="btn btn-circle btn-md bg-primary text-[var(--color-quinary)] hover:bg-gray-900"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Columnas de enlaces */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-22 text-sm w-full md:w-auto mt-20">
          <div className="text-base">
            <h3 className="font-semibold mb-4 text-base">Recursos</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#">Guía de uso</a>
              </li>
            </ul>
          </div>
          <div className="text-base">
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Sobre nosotros</a>
              </li>
              <li>
                <a href="#">Contacto</a>
              </li>
              <li>
                <a href="#">Prensa</a>
              </li>
            </ul>
          </div>
          <div className="text-base">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Términos de uso</a>
              </li>
              <li>
                <a href="#">Política de privacidad</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Separador */}
      <hr className="border-t border-[var(--color-quaternary)] mb-4" />

      {/* Copyright */}
      <p className="text-center text-base text-primary font-normal pt-2 pb-6">
        © 2025 Maily. Todos los derechos reservados.
      </p>
    </footer>
  );
}
