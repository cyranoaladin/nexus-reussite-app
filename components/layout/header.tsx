"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Notre Équipe", href: "/equipe" },
    { name: "Offres & Tarifs", href: "/offres" },
    { name: "Notre Centre", href: "/notre-centre" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Nexus Réussite"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-gray-900">Nexus Réussite</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/auth/signin">
                Se Connecter
              </Link>
            </Button>
            <Button asChild>
              <Link href="/bilan-gratuit">
                Bilan Gratuit
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#4F46E5] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button asChild variant="outline" className="w-full mb-2">
                  <Link href="/auth/signin">
                    Se Connecter
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/bilan-gratuit">
                    Bilan Gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}