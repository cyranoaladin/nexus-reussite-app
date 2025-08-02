"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Zap, Compass, Check, HelpCircle, X } from "lucide-react"

const pillars = [
  {
    icon: ShieldCheck,
    title: "Des Coachs d'Exception",
    description: "Nous ne recrutons que l'élite. Chaque intervenant est rigoureusement sélectionné pour son expertise et son expérience du système éducatif français.",
    features: [
      "Professeurs **Agrégés & Certifiés** de l'Éducation Nationale française",
      "Longue expérience dans le réseau **AEFE** à l'international",
      "Spécialistes NSI titulaires du **DIU NSI**",
      "Pédagogie active et suivi **bienveillant**"
    ],
    color: "primary",
    category: "La Garantie Humaine"
  },
  {
    icon: Zap,
    title: "Une Technologie Qui Fait la Différence",
    description: "Nous avons développé des outils propriétaires qui vous donnent un avantage décisif, disponibles 24/7 pour ne jamais être bloqué.",
    features: [
      "**IA ARIA** entraînée sur nos contenus exclusifs",
      "Plateforme de suivi de progression **en temps réel**",
      "Visioconférence intégrée et **sécurisée**",
      "Ressources et quiz **interactifs**"
    ],
    color: "secondary",
    category: "Le Levier Technologique"
  },
  {
    icon: Compass,
    title: "Votre Parcours, Votre Stratégie",
    description: "Il n'y a pas de solution unique pour la réussite. Nous construisons avec vous un plan d'action sur-mesure, du premier jour jusqu'à Parcoursup.",
    features: [
      "**Bilan Stratégique** initial complet et gratuit",
      "Constitution de groupes de travail **homogènes**",
      "**Flexibilité totale** grâce au système de crédits",
      "Accompagnement **dédié à l'orientation**"
    ],
    color: "primary",
    category: "La Stratégie Personnalisée"
  }
]

// Composant Tooltip pour DIU NSI
function DIUTooltip() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span className="relative inline-block">
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
              pour enseigner la spécialité Numérique et Sciences Informatiques (NSI) en classes 
              de 1ère et de Terminale, conformément aux exigences de la réforme du lycée.
            </p>
            {/* Flèche du tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-200 -mt-1"></div>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}

// Fonction pour parser le texte avec markdown simple
function parseMarkdownText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2)
      if (content === 'DIU NSI') {
        return (
          <span key={index} className="font-semibold text-blue-600">
            {content}
            <DIUTooltip />
          </span>
        )
      }
      return (
        <span key={index} className="font-semibold text-blue-600">
          {content}
        </span>
      )
    }
    return part
  })
}

export function PillarsSection() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="default" className="mb-4">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Notre Promesse
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            L'<span className="text-blue-600">Excellence</span> Augmentée
          </h2>
          <p className="text-xl text-slate-900 max-w-4xl mx-auto">
            Nous avons construit un écosystème unique où l'expertise humaine, la puissance technologique 
            et la stratégie personnalisée convergent vers un seul objectif : votre réussite.
          </p>
        </motion.div>

        {/* Grille des piliers */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white border-slate-200 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-8">
                    {/* Catégorie */}
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-4">
                      {pillar.category}
                    </div>

                    {/* Icône */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                      pillar.color === 'primary' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Titre */}
                    <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-900 mb-6 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Liste de preuves */}
                    <div className="space-y-3">
                      {pillar.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-900 leading-relaxed">
                            {parseMarkdownText(feature)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}