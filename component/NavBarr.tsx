"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCarrito } from '@/store/useCarrito'
import { useAuth } from '@/store/useAuth'
import { useEffect, useState } from 'react'

export default function NavBarr() {
  const pathname = usePathname()
  const { carrito } = useCarrito()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [vibrar, setVibrar] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const authenticated = mounted && isAuthenticated()
  const admin = mounted && isAdmin()

  useEffect(() => {
    const interval = setInterval(() => {
      setVibrar(true)
      setTimeout(() => setVibrar(false), 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="w-full flex items-center px-3 sm:px-6 py-3 sm:py-4 shadow relative">
      {/* Botón hamburguesa - solo visible en móviles */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden z-50 p-2"
        aria-label="Menú"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Panel de Admin - visible en desktop, oculto en móvil */}
      <div className="hidden md:flex gap-6 flex-1 items-center pt-2">
        {admin && (
          <Link 
            href="/admin" 
            className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition ${
              pathname === '/admin' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-red-700 text-white hover:bg-red-600 shadow-md'
            }`}
          >
            Panel de Admin
          </Link>
        )}
      </div>
      
      {/* Logo - centrado, más pequeño en móvil */}
      <Link href="/" className="absolute left-1/2 top-3 sm:top-4 transform -translate-x-1/2 transition-transform hover:scale-105 duration-300 z-40">
        <img 
          src="/add/logo.jpg" 
          alt="eGSEVEN" 
          className="h-10 sm:h-14 md:h-16 w-auto"
        />
      </Link>

      {/* Menú desktop - oculto en móviles */}
      <div className="hidden md:flex gap-4 lg:gap-6 flex-1 justify-end items-center pt-2">
        <Link 
          href="/" 
          className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
            pathname === '/' ? 'text-primary underline decoration-primary underline-offset-4' : ''
          }`}
        >
          Inicio
        </Link>
        <Link 
          href="/carro" 
          className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
            pathname === '/carro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
          }`}
        >
          Carro
          {totalItems > 0 && (
            <span 
              className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                vibrar ? 'animate-shake' : ''
              }`}
            >
              {totalItems}
            </span>
          )}
        </Link>
        {!mounted ? (
          <>
            <Link 
              href="/login" 
              className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
                pathname === '/login' ? 'text-primary underline decoration-primary underline-offset-4' : ''
              }`}
            >
              Login
            </Link>
            <Link 
              href="/registro" 
              className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
                pathname === '/registro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
              }`}
            >
              Registro
            </Link>
          </>
        ) : !authenticated ? (
          <>
            <Link 
              href="/login" 
              className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
                pathname === '/login' ? 'text-primary underline decoration-primary underline-offset-4' : ''
              }`}
            >
              Login
            </Link>
            <Link 
              href="/registro" 
              className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
                pathname === '/registro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
              }`}
            >
              Registro
            </Link>
          </>
        ) : (
          <>
            <Link 
              href="/perfil" 
              className={`relative text-sm lg:text-base font-medium transition hover:text-primary ${
                pathname === '/perfil' ? 'text-primary underline decoration-primary underline-offset-4' : ''
              }`}
            >
              Perfil
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="transition-transform hover:scale-110 duration-300"
              title="Cerrar sesión"
            >
              <img 
                src="/add/logout.jpg" 
                alt="Cerrar sesión" 
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </button>
          </>
        )}
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-card shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col p-6 gap-4 mt-16">
          {admin && (
            <Link 
              href="/admin" 
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                pathname === '/admin' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-700 text-white hover:bg-red-600'
              }`}
            >
              Panel de Admin
            </Link>
          )}
          <Link 
            href="/" 
            onClick={() => setMenuOpen(false)}
            className={`text-base font-medium py-2 transition hover:text-primary ${
              pathname === '/' ? 'text-primary underline decoration-primary underline-offset-4' : ''
            }`}
          >
            Inicio
          </Link>
          <Link 
            href="/carro" 
            onClick={() => setMenuOpen(false)}
            className={`text-base font-medium py-2 transition hover:text-primary relative ${
              pathname === '/carro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
            }`}
          >
            Carro
            {totalItems > 0 && (
              <span 
                className={`ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 inline-flex items-center justify-center ${
                  vibrar ? 'animate-shake' : ''
                }`}
              >
                {totalItems}
              </span>
            )}
          </Link>
          {!mounted ? (
            <>
              <Link 
                href="/login" 
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 transition hover:text-primary ${
                  pathname === '/login' ? 'text-primary underline decoration-primary underline-offset-4' : ''
                }`}
              >
                Login
              </Link>
              <Link 
                href="/registro" 
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 transition hover:text-primary ${
                  pathname === '/registro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
                }`}
              >
                Registro
              </Link>
            </>
          ) : !authenticated ? (
            <>
              <Link 
                href="/login" 
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 transition hover:text-primary ${
                  pathname === '/login' ? 'text-primary underline decoration-primary underline-offset-4' : ''
                }`}
              >
                Login
              </Link>
              <Link 
                href="/registro" 
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 transition hover:text-primary ${
                  pathname === '/registro' ? 'text-primary underline decoration-primary underline-offset-4' : ''
                }`}
              >
                Registro
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/perfil" 
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 transition hover:text-primary ${
                  pathname === '/perfil' ? 'text-primary underline decoration-primary underline-offset-4' : ''
                }`}
              >
                Perfil
              </Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="flex items-center gap-2 text-base font-medium py-2 transition hover:text-primary text-left"
                title="Cerrar sesión"
              >
                <img 
                  src="/add/logout.jpg" 
                  alt="Cerrar sesión" 
                  className="h-6 w-6"
                />
                <span>Cerrar sesión</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
