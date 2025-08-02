"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SUBSCRIPTION_PLANS } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { Check, Star, CreditCard, Calendar, Zap } from "lucide-react"
import Link from "next/link"

export function BusinessModelSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête explicative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <CreditCard className="w-4 h-4 mr-2" />
            Modèle Transparent & Flexible
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Abonnement + Crédits : Comment ça marche ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              Notre modèle unique combine la sécurité d'un abonnement mensuel avec 
              la flexibilité d'un système de crédits pour les prestations humaines.
            </p>
            
            {/* Infographie explicative */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-soft border border-primary-100"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-primary-500 mr-3" />
                  <h3 className="font-heading font-semibold text-lg">L'Abonnement (Le Socle)</h3>
                </div>
                <p className="text-gray-600">
                  Accès complet à la plateforme, ARIA, suivi personnalisé + 
                  un budget mensuel de crédits inclus selon votre formule.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-soft border border-secondary-100"
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-secondary-500 mr-3" />
                  <h3 className="font-heading font-semibold text-lg">Les Crédits (La Flexibilité)</h3>
                </div>
                <p className="text-gray-600">
                  1 crédit = 1h de cours particulier en ligne. Utilisez vos crédits 
                  quand vous en avez besoin, pour les prestations humaines.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Grille des formules */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:shadow-medium ${
                plan.popular 
                  ? 'border-secondary-200 shadow-medium scale-105' 
                  : 'border-gray-200 shadow-soft hover:scale-105'
              }`}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-heading text-xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-600">/mois</span>
                  </div>
                  {plan.credits > 0 && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {plan.credits} crédits inclus
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/bilan-gratuit">
                      Commencer
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note explicative sur les crédits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-xl p-6 text-center"
        >
          <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
            💡 Bon à savoir sur les crédits
          </h3>
          <p className="text-gray-600 text-sm">
            <strong>Cours en ligne :</strong> 1 crédit • 
            <strong> Cours en présentiel :</strong> 1,25 crédit • 
            <strong> Atelier de groupe :</strong> 1,5 crédit<br/>
            Les crédits non utilisés sont reportés 1 mois. Besoin de plus ? Achetez des packs supplémentaires !
          </p>
        </motion.div>
      </div>
    </section>
  )
}