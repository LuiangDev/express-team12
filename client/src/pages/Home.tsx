import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
