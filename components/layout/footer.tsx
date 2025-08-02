import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Nexus Réussite"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl">Nexus Réussite</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              La plateforme de pédagogie augmentée de référence pour les lycéens du système français en Tunisie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/equipe" className="text-gray-300 hover:text-white transition-colors">Notre Équipe</Link></li>
              <li><Link href="/offres" className="text-gray-300 hover:text-white transition-colors">Offres & Tarifs</Link></li>
              <li><Link href="/notre-centre" className="text-gray-300 hover:text-white transition-colors">Notre Centre</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#F97316]" />
                <span className="text-gray-300">+216 XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#F97316]" />
                <span className="text-gray-300">contact@nexus-reussite.tn</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#F97316] mt-1" />
                <span className="text-gray-300">Centre de Tunis<br />Tunisie</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Nexus Réussite. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}