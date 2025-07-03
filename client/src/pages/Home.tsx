import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto -mt-2">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Hero />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}
