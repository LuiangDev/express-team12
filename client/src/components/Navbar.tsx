import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setIsLoggedIn(loggedIn);
    setUserName(user.name || null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    Swal.fire({
      icon: "info",
      title: "Sesión cerrada",
      text: "Tu sesión se cerró correctamente.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/60 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between text-white">
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
        <div className="flex gap-4 ml-28 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-white font-semibold">
                ¡Hola, {userName || "usuario"}!
              </span>
              <Link
                onClick={handleLogout}
                to="/"
                className="text-sm font-semibold px-6 py-2 rounded-full text-white cursor-pointer bg-gradient-custom hover:opacity-90 transition"
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-base font-semibold hover:text-secondary px-6 py-2 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="text-base font-semibold px-6 py-2 rounded-full text-white bg-gradient-custom hover:opacity-90 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
