"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, UserPlus, CreditCard, Calendar, Users, MessageCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    title: "Bilan Stratégique Gratuit",
    description: "Créez votre compte et celui de votre enfant en quelques minutes. Notre équipe analyse le profil et vous contacte sous 24h.",
    color: "primary"
  },
  {
    number: "02", 
    icon: CreditCard,
    title: "Choisissez Votre Formule",
    description: "Sélectionnez l'abonnement qui correspond à vos besoins. Chaque formule inclut un budget mensuel de crédits.",
    color: "secondary"
  },
  {
    number: "03",
    icon: Calendar,
    title: "Réservez Vos Sessions",
    description: "Utilisez vos crédits pour réserver des cours particuliers, ateliers ou sessions de coaching selon vos disponibilités.",
    color: "primary"
  },
  {
    number: "04",
    icon: Users,
    title: "Rencontrez Vos Coachs",
    description: "Nos experts vous accompagnent avec des méthodes personnalisées, en ligne ou en présentiel selon vos préférences.",
    color: "secondary"
  },
  {
    number: "05",
    icon: MessageCircle,
    title: "ARIA, Votre IA 24/7",
    description: "Posez vos questions à tout moment à ARIA, notre assistant IA entraîné sur nos contenus pédagogiques exclusifs.",
    color: "primary"
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Suivez Vos Progrès",
    description: "Tableau de bord complet, rapports détaillés, badges de progression et communication fluide avec vos coachs.",
    color: "secondary"
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <ArrowRight className="w-4 h-4 mr-2" />
            Comment ça marche ?
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Votre Parcours vers <span className="text-primary-600">l'Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple et transparent, conçu pour vous accompagner 
            de la découverte jusqu'à la réussite de vos objectifs.
          </p>
        </motion.div>

        {/* Grille des étapes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    {/* Numéro et icône */}
                    <div className="flex items-center mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mr-4 ${
                        step.color === 'primary' 
                          ? 'bg-primary-100 text-primary-600' 
                          : 'bg-secondary-100 text-secondary-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-2xl font-bold ${
                        step.color === 'primary' ? 'text-primary-500' : 'text-secondary-500'
                      }`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Prêt à Commencer Votre Transformation ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Rejoignez les centaines de familles qui nous font déjà confiance. 
              Votre bilan stratégique gratuit vous attend.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/bilan-gratuit">
                Commencer mon Bilan Stratégique Gratuit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}