"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Contactez-Nous
            </h1>
            <div className="bg-white rounded-xl p-12 shadow-soft max-w-2xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Page en construction
              </p>
              <div className="space-y-4 text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+216 XX XXX XXX</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@nexus-reussite.tn</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Centre de Tunis, Tunisie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}