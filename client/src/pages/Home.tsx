import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Plans from "../components/Plans";
import About from "../components/About";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto -mt-2">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Hero />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Services />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Plans />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <About />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <FinalCTA />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}
