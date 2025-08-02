"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, ShieldCheck, BrainCircuit, Network, Code2, HelpCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Composant Tooltip pour DIU NSI
function DIUTooltip() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 ml-1 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <HelpCircle size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-4 w-80 text-left">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-slate-900 text-sm">
                Qu'est-ce que le DIU NSI ?
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 ml-2"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le DIU "Enseigner l'informatique au lycée" est un diplôme national qui garantit 
              que l'enseignant possède les connaissances et les compétences pédagogiques requises 
              pour enseigner la spécialité Numérique et Sciences Informatiques (NSI) en 1ère et 
              Terminale, conformément aux exigences de la réforme du lycée.
            </p>
            {/* Flèche du tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-200 -mt-1"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
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

            {/* Feature Grid - Nouvelle grille 2x2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {/* Rangée 1, Colonne 1 */}
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-600" size={20} />
                <p className="text-slate-900 font-medium">
                  Coachs <span className="text-blue-600 font-semibold">Agrégés & Certifiés</span> du système français
                </p>
              </div>
              
              {/* Rangée 1, Colonne 2 */}
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-blue-600" size={20} />
                <p className="text-slate-900 font-medium">
                  <span className="text-blue-600 font-semibold">IA ARIA</span> : Votre assistant personnel 24/7
                </p>
              </div>
              
              {/* Rangée 2, Colonne 1 */}
              <div className="flex items-center gap-3">
                <Network className="text-blue-600" size={20} />
                <p className="text-slate-900 font-medium">
                  Expertise <span className="text-blue-600 font-semibold">Réseau AEFE</span> & Titulaires
                </p>
              </div>
              
              {/* Rangée 2, Colonne 2 - avec tooltip */}
              <div className="flex items-center gap-3">
                <Code2 className="text-blue-600" size={20} />
                <p className="text-slate-900 font-medium">
                  Spécialistes <span className="text-blue-600 font-semibold">DIU NSI</span> certifiés
                  <DIUTooltip />
                </p>
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