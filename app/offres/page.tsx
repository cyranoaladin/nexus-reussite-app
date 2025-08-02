'use client'

import { Star, Users, Clock, Target, ArrowRight, Check } from "lucide-react"
 import { Badge } from "@/components/ui/badge"
 import { Button } from "@/components/ui/button"
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
 import { SUBSCRIPTION_PLANS, SPECIAL_PACKS, ARIA_ADDONS } from "@/lib/constants"
import { motion } from "framer-motion"

const formatPrice = (price: number) => `${price}€`

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Offres d'Accompagnement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos formules d'accompagnement personnalisé pour réussir votre parcours scolaire
          </p>
        </div>

        <div className="space-y-12">
          {/* Abonnements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-soft"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6 text-center">
              Abonnements Mensuels
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Un accompagnement régulier adapté à vos besoins
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
                <Card key={key} className={`relative ${plan.popular ? 'border-primary-500 shadow-lg' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-600">
                      Le plus populaire
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary-600">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-gray-600">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}>
                      Choisir ce plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

           {/* Packs Spécifiques */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.8 }}
             viewport={{ once: true }}
             className="bg-white rounded-xl p-8 shadow-soft"
           >
             <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 text-center">
               Packs Spécifiques
             </h3>
             <p className="text-gray-600 text-center mb-8">
               Des accompagnements ciblés pour des objectifs précis
             </p>
             
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(SPECIAL_PACKS).map(([key, pack]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-left">
                    <div className="flex justify-between items-center w-full mr-4">
                      <div>
                        <h4 className="font-semibold text-lg">{pack.name}</h4>
                        <p className="text-gray-600 text-sm">{pack.description}</p>
                      </div>
                      <span className="text-xl font-bold text-primary-600">
                        {formatPrice(pack.price)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {pack.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">
                        Réserver ce Pack
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           </motion.div>

          {/* Add-ons ARIA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-soft"
          >
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 text-center">
              Add-ons ARIA
            </h3>
            <p className="text-gray-600 text-center mb-8">
              Complétez votre accompagnement avec nos services additionnels
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(ARIA_ADDONS).map(([key, addon]) => (
                <Card key={key} className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{addon.name}</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{addon.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(addon.price)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full">
                      Ajouter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}