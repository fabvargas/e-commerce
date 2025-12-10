
import Link from 'next/link'

export default function NavBarr() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-primary">eGSEVEN</h1>

        <div className="flex gap-4">
          <Link href="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-primary transition">
            Productos
          </Link>
          <Link href="/login" className="hover:text-primary transition">
            Login
          </Link>
        </div>
      </nav>
  )
}
