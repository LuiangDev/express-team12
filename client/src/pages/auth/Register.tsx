import logo1 from "../../assets/logo1.png";
import logo3 from "../../assets/logo3.png";
import googleIcon from "../../assets/google.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const existingUser = localStorage.getItem("user");

if (existingUser) {
  Swal.fire({
    icon: "warning",
    title: "Usuario existente",
    text: "Ya hay un usuario registrado en este navegador.",
  });
  return;
}


  localStorage.setItem("user", JSON.stringify(form));
  localStorage.setItem("isLoggedIn", "true"); 
Swal.fire({
  icon: "success",
  title: "¡Registro exitoso!",
  text: "Bienvenido a Maily, estás logueado.",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
}).then(() => {
  window.location.href = "/profile";
});

};


  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative px-4">
      {/* Logo superior izquierdo */}
      <div className="absolute top-4 left-6 ">
        <Link to="/" className="">
        <img
          src={logo1}
          alt="Maily1 Logo"
          className="w-[99px] object-contain"
        />
        </Link>
      </div>
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative px-4 my-10">
        {/* Card de Register */}
        <div className="bg-[var(--color-quinary)] rounded-3xl shadow-xl p-10 w-full max-w-md text-center space-y-6">
          <div>
            <div className="flex justify-center mb-4">
              <img
                src={logo3}
                alt="Maily2 Logo"
                className="w-[99px] object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              Comienza tu prueba gratis de 15 días
            </h1>
            <p className="text-base font-medium text-primary/80 mt-1">
              Regístrate y comienza a generar correos con propósito.
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-left">
              <label
                htmlFor="name"
                className="text-base font-bold block mb-1 text-primary"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Luis Angel"
                className="input input-bordered text-primary text-base w-full bg-[var(--color-quinary)] rounded-lg border-[var(--color-quaternary)] focus:border-[var(--color-quaternary)] focus:ring-[var(--color-quaternary)]"
                required
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="email"
                className="text-base font-bold block mb-1 text-primary"
              >
                Correo
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="luis@example.com"
                className="input input-bordered text-primary text-base w-full bg-[var(--color-quinary)] rounded-lg border-[var(--color-quaternary)] focus:border-[var(--color-quaternary)] focus:ring-[var(--color-quaternary)]"
                required
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="password"
                className="text-base font-bold block mb-1 text-primary"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="●●●●●●●●●●●"
                className="input input-bordered text-primary text-base w-full bg-[var(--color-quinary)] rounded-lg border-[var(--color-quaternary)] focus:border-[var(--color-quaternary)] focus:ring-[var(--color-quaternary)]"
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-primary text-white rounded-lg w-full font-normal text-base tracking-wide"
            >
              Registrarse
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-xs text-gray-500">o</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Register */}
          <button className="btn btn-outline text-primary/80 text-base font-normal w-full flex items-center justify-center gap-2 bg-[var(--color-quinary)] rounded-lg border-[var(--color-quaternary)] focus:border-[var(--color-quaternary)] focus:ring-[var(--color-quaternary)]">
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            Registrarse con Google
          </button>

          {/* Enlace a Login */}
          <p className="text-sm text-gray-700">
            <Link
              to="/login"
              className="underline font-bold text-base hover:text-primary"
            >
              Ya tengo una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
