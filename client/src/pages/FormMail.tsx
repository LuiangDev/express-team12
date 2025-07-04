import { FormGenerateMail } from "../components/form/FormGenerateMail";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const FormMail = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto -mt-2">
        <Navbar />

        <section className="text-center pt-36 pb-24 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-semibold">
            ¡Listo! Ahora genera <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              tu email perfecto en segundos.
            </span>
          </h2>

          <p className="text-base md:text-xl font-normal text-[var(--color-quinary)] mt-8 mb-10 text-left">
            Completa los campos con los datos que necesitas comunicar.
            <br className="hidden md:block" />
            Nuestra IA procesará tu solicitud y generará un email listo para
            copiar, enviar o adaptar.
          </p>
          <FormGenerateMail />
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};
