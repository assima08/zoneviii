import { Menu } from "lucide-react"

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="text-3xl font-black tracking-tight text-white cursor-pointer">
          ZoneVIII
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] text-white/80">

          <li className="hover:text-blue-500 transition duration-300 cursor-pointer">
            Services
          </li>

          <li className="hover:text-blue-500 transition duration-300 cursor-pointer">
            Tarifs
          </li>

          <li className="hover:text-blue-500 transition duration-300 cursor-pointer">
            Réservations
          </li>

          <li className="hover:text-blue-500 transition duration-300 cursor-pointer">
            Nous contacter
          </li>

        </ul>

        {/* Mobile menu icon */}
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>

      </div>
    </nav>
  )
}

export default Navbar