import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 max-w-5xl mx-auto -mt-2">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
