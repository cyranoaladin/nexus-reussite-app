"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Brain, Target, Zap } from "lucide-react"

const pillars = [
  {
    icon: Users,
    title: "Accompagnement Humain d'Élite",
    description: "Des coachs agrégés et certifiés, experts dans leur domaine, qui connaissent parfaitement les enjeux du système français en Tunisie.",
    features: ["Professeurs Agrégés", "Méthodes Éprouvées", "Suivi Personnalisé"],
    color: "primary"
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle ARIA",
    description: "Notre IA révolutionnaire, entraînée sur nos contenus pédagogiques exclusifs, disponible 24/7 pour un soutien instantané.",
    features: ["Disponible 24/7", "Réponses Personnalisées", "Base de Connaissances Exclusive"],
    color: "secondary"
  },
  {
    icon: Target,
    title: "Plateforme Intelligente",
    description: "Un écosystème numérique complet qui s'adapte au rythme et aux besoins spécifiques de chaque élève.",
    features: ["Suivi en Temps Réel", "Gamification", "Rapports Détaillés"],
    color: "primary"
  }
]

export function PillarsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Les 3 Piliers de Notre Révolution
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une <span className="text-primary-600">Approche Unique</span> en Son Genre
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous combinons le meilleur de l'humain et de la technologie pour créer 
            une expérience d'apprentissage sans précédent.
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
                <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center">
                    {/* Icône */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                      pillar.color === 'primary' 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Titre */}
                    <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Caractéristiques */}
                    <div className="space-y-2">
                      {pillar.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center justify-center space-x-2 text-sm text-gray-700"
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            pillar.color === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'
                          }`} />
                          <span>{feature}</span>
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