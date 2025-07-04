import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png"; // Asegúrate de que la ruta sea correcta

export default function Navbar() {
  return (
    <div className="navbar text-white px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="">
          <img
            src={logo1}
            alt="Maily1 Logo"
            className="w-[99px] object-contain"
          />
        </Link>
      </div>

      {/* Menú de navegación */}
      <ul className="flex gap-6 text-base font-semibold">
        <li>
          <a href="#hero" className="hover:text-secondary">
            Inicio
          </a>
        </li>
        <li>
          <a href="#servicios" className="hover:text-secondary">
            Servicios
          </a>
        </li>
        <li>
          <a href="#planes" className="hover:text-secondary">
            Planes
          </a>
        </li>
        <li>
          <a href="#nosotros" className="hover:text-secondary">
            Nosotros
          </a>
        </li>
      </ul>

      {/* Botones de sesión */}
      <div className="flex gap-4 ml-28">
        <Link
          to="/"
          className="text-base font-semibold hover:text-secondary px-6 py-2 transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/"
          className="text-base font-semibold px-6 py-2 rounded-full text-white bg-gradient-custom hover:opacity-90 transition"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
