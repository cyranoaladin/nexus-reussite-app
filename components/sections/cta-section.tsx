"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const benefits = [
    {
      icon: CheckCircle,
      text: "Bilan personnalisé gratuit"
    },
    {
      icon: Clock,
      text: "Réponse sous 24h"
    },
    {
      icon: Shield,
      text: "Sans engagement"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-red-500 relative overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à Conquérir le <span className="text-blue-100">Bac</span> et Vos <span className="text-blue-100">Objectifs</span> ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Commencez par un bilan stratégique gratuit et découvrez comment 
              notre approche unique peut garantir votre <span className="text-blue-100 font-semibold">réussite au Baccalauréat</span> et votre <span className="text-blue-100 font-semibold">excellence à Parcoursup</span>.
            </p>
          </motion.div>

          {/* Avantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center space-x-2 text-white/90">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              )
            })}
          </motion.div>

          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg group font-semibold"
            >
              <Link href="/bilan-gratuit">
                Commencer mon Bilan Stratégique Gratuit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold">
              <Link href="/contact">
                Poser une Question
              </Link>
            </Button>
          </motion.div>

          {/* Note de confiance */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-white/70 text-sm mt-6"
          >
            Rejoignez les centaines de familles qui nous font déjà confiance
          </motion.p>
        </div>
      </div>
    </section>
  )
}