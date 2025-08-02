"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-red-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-red-200/20 to-blue-200/20 rounded-full blur-3xl" />
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
              <Badge variant="default">
                <Sparkles className="w-4 h-4 mr-2" />
                Pédagogie Augmentée par l'IA
              </Badge>
            </motion.div>

            {/* Titre Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                <div className="flex-1">
                  <span className="block text-slate-900">
                    La <span className="text-blue-600">Pédagogie Augmentée</span>
                  </span>
                  <span className="block text-slate-900">
                    de Référence
                  </span>
                </div>
                
                {/* Logo avec slogan intégré */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex-shrink-0 mt-4 lg:mt-0"
                >
                  <Image
                    src="/images/logo_slogan_nexus.png"
                    alt="Nexus Réussite - Pédagogie Augmentée"
                    width={400}
                    height={120}
                    className="h-20 lg:h-24 w-auto"
                  />
                </motion.div>
              </div>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-slate-900 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              La première plateforme qui fusionne un <span className="text-blue-600 font-semibold">accompagnement humain d'élite</span>, 
              une <span className="text-blue-600 font-semibold">plateforme intelligente</span> et l'assistance <span className="text-blue-600 font-semibold">IA révolutionnaire ARIA</span> 
              pour garantir la <span className="text-blue-600 font-semibold">réussite au Baccalauréat</span> et l'<span className="text-blue-600 font-semibold">excellence à Parcoursup</span>.
            </motion.p>

            {/* Piliers de confiance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center space-x-2 text-slate-900">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Professeurs <span className="text-blue-600">Agrégés</span></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-900">
                <Brain className="w-5 h-5 text-red-500" />
                <span className="font-medium">IA ARIA</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-medium"><span className="text-blue-600">Excellence</span> Garantie</span>
              </div>
            </motion.div>

            {/* CTA Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
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
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-slate-200">
              {/* ARIA Mascotte */}
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-red-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/aria.png"
                  alt="ARIA - Assistant IA Pédagogique"
                  width={280}
                  height={280}
                  className="object-contain"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center bg-white/90 rounded-lg p-2">
                  <h3 className="font-heading font-semibold text-sm text-gray-800 mb-1">
                    ARIA, votre IA Pédagogique
                  </h3>
                  <p className="text-slate-900 text-xs">
                    Assistance intelligente 24/7
                  </p>
                </div>
              </div>
              
              {/* Éléments flottants */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                IA Révolutionnaire
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
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