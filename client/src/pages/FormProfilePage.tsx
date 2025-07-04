import { FormProfile } from "../components/form/FormProfile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const FormProfilePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto -mt-2">
        <Navbar />

        <section className="text-center pt-36 pb-24 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-semibold">
            Generamos resultados <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] bg-clip-text">
              orientados a tu tipo de empresa.
            </span>
          </h2>

          <p className="text-base md:text-xl font-normal text-[var(--color-quinary)] mt-8 mb-10 text-left">
            Para poder brindarte resultados muchísimos más personalizados,
            necesitamos que nos brindes los siguientes datos relacionados al
            perfil de tu empresa.
          </p>
          <FormProfile />
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};
