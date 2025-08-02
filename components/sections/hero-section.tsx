"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-orange-50/30 pt-20 pb-16">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge d'innovation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center mb-6"
            >
              <Badge variant="outline" className="text-sm px-4 py-2 border-primary-200 text-primary-700 bg-primary-50">
                <Sparkles className="w-4 h-4 mr-2" />
                Pédagogie Augmentée par l'IA
              </Badge>
            </motion.div>

            {/* Titre Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              La Pédagogie Augmentée
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                de Référence
              </span>
            </motion.h1>

            {/* Logo avec slogan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <Image
                src="/images/logo_slogan.svg"
                alt="Nexus Réussite - Pédagogie Augmentée"
                width={300}
                height={80}
                className="h-16 w-auto"
              />
            </motion.div>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              La première plateforme qui fusionne un accompagnement humain d'élite, 
              une technologie intelligente et l'assistance IA révolutionnaire ARIA 
              pour garantir la réussite de votre enfant.
            </motion.p>

            {/* Piliers de confiance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Coachs d'Élite</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Brain className="w-5 h-5 text-secondary-500" />
                <span className="font-medium">IA ARIA</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Résultats Garantis</span>
              </div>
            </motion.div>

            {/* CTA Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="group">
                <Link href="/bilan-gratuit">
                  Commencer mon Bilan Stratégique Gratuit
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/offres">
                  Découvrir nos Offres
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visuel Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-strong p-8 border border-gray-100">
              {/* ARIA Mascotte */}
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/aria.png"
                  alt="ARIA - Assistant IA Pédagogique"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center bg-white/90 rounded-lg p-2">
                  <h3 className="font-heading font-semibold text-sm text-gray-800 mb-1">
                    ARIA, votre IA Pédagogique
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Assistance intelligente 24/7
                  </p>
                </div>
              </div>
              
              {/* Éléments flottants */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                IA Révolutionnaire
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                Coachs Experts
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}