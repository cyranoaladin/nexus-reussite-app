"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatPrice } from "@/lib/utils"
import { Check, Star, CreditCard, Calendar, Zap, Brain, Clock, Users } from "lucide-react"
import Link from "next/link"

// Formules d'abonnement selon les spécifications exactes
const SUBSCRIPTION_PLANS = {
  ACCES_PLATEFORME: {
    name: "ACCÈS PLATEFORME",
    description: "L'essentiel pour commencer votre parcours d'excellence",
    price: 150,
    credits: 0,
    features: [
      "Accès 24/7 à la plateforme",
      "Suivi personnalisé",
      "0 crédits/mois",
      "ARIA (1 matière)"
    ]
  },
  HYBRIDE: {
    name: "HYBRIDE",
    description: "L'équilibre parfait entre autonomie et suivi humain personnalisé",
    price: 450,
    credits: 4,
    popular: true,
    features: [
      "Tout de la Plateforme",
      "4 crédits/mois",
      "Coach référent",
      "Support prioritaire"
    ]
  },
  IMMERSION: {
    name: "IMMERSION",
    description: "L'accompagnement premium pour une réussite exceptionnelle",
    price: 750,
    credits: 8,
    features: [
      "Tout de l'Hybride",
      "8 crédits/mois",
      "Support prioritaire",
      "Bilan trimestriel"
    ]
  }
}

// Add-ons ARIA selon les spécifications
const ARIA_ADDONS = {
  MATIERE_SUPPLEMENTAIRE: {
    name: "+1 matière supplémentaire",
    price: 50,
    description: "Ajoutez une matière à votre suivi ARIA"
  },
  PACK_TOUTES_MATIERES: {
    name: "Pack Toutes Matières",
    price: 120,
    description: "ARIA disponible sur toutes les matières"
  }
}

// Packs spécifiques selon les spécifications
const SPECIAL_PACKS = {
  GRAND_ORAL: {
    name: "Pack Grand Oral",
    price: 750,
    description: "Préparation complète au Grand Oral",
    features: [
      "4 séances de coaching individuel",
      "Préparation des supports visuels",
      "Entraînement à l'oral avec feedback vidéo",
      "Simulation d'épreuve en conditions réelles"
    ]
  },
  BAC_FRANCAIS: {
    name: "Pack Bac de Français",
    price: 1200,
    description: "Accompagnement intensif pour le Bac de Français",
    features: [
      "6 séances de méthodologie",
      "Révision complète des œuvres",
      "Entraînement à l'oral avec textes",
      "Correction de 3 devoirs blancs"
    ]
  },
  ORIENTATION: {
    name: "Pack Orientation & Parcoursup",
    price: 900,
    description: "Stratégie complète pour Parcoursup",
    features: [
      "Bilan d'orientation personnalisé",
      "Stratégie de vœux optimisée",
      "Rédaction des projets motivés",
      "Préparation aux entretiens"
    ]
  }
}

export function BusinessModelSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête explicative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="default" className="mb-4">
            <CreditCard className="w-4 h-4 mr-2" />
            Modèle Transparent & Flexible
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Notre Modèle Unique : Abonnement + Crédits
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-900 mb-8">
              Nous avons conçu un modèle révolutionnaire qui allie la transparence d'un abonnement 
              à la flexibilité totale d'un système de crédits pour vos prestations humaines.
            </p>
            
            {/* Infographie explicative */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="font-heading font-semibold text-lg">L'Abonnement (Le Socle)</h3>
                </div>
                <p className="text-slate-900">
                  Accès complet à la plateforme, ARIA, suivi personnalisé + 
                  un budget mensuel de crédits inclus selon votre formule.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="font-heading font-semibold text-lg">Les Crédits (La Flexibilité)</h3>
                </div>
                <p className="text-slate-900">
                  1 crédit = 1h de cours particulier en ligne. Utilisez vos crédits 
                  quand vous en avez besoin, pour les prestations humaines.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Règles du Système de Crédits - Remontée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-xl p-6 text-center mb-16"
        >
          <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
            💡 Règles du Système de Crédits
          </h3>
          <div className="text-slate-900 text-sm space-y-2">
            <p>
              <strong>Coûts des Prestations :</strong> Cours en ligne (1 crédit) • 
              Cours en présentiel (1,25 crédit) • Atelier de groupe (1,5 crédit)
            </p>
            <p>
              <strong>Report :</strong> Les crédits non utilisés sont reportés 1 mois. 
              Notification 7 jours avant expiration.
            </p>
            <p>
              <strong>Packs supplémentaires :</strong> Validité 12 mois. 
              Annulation gratuite > 24h (cours) ou 48h (ateliers).
            </p>
          </div>
        </motion.div>
        {/* Grille des formules d'abonnement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-8 text-center">
            Nos Formules d'Abonnement Mensuel
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Nouveau Pack Candidat Libre */}
            <AccordionItem value="candidat-libre">
              <AccordionTrigger className="text-left">
                <div className="flex justify-between items-center w-full mr-4">
                  <div>
                    <h4 className="font-semibold text-lg">Pack Spécial Candidat Libre</h4>
                    <p className="text-slate-900 text-sm">Accompagnement sur-mesure pour les candidats libres</p>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    Devis personnalisé
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-slate-900 text-sm leading-relaxed">
                    Un accompagnement sur-mesure pour les élèves en Terminale ou Première passant le <span className="text-blue-600 font-semibold">Bac</span> en candidat libre.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900 text-sm">Plan de travail personnalisé adapté à votre situation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900 text-sm">Sessions de suivi hebdomadaires avec un coach référent</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900 text-sm">Accès complet à la plateforme et à ARIA</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900 text-sm">Préparation spécifique aux épreuves du <span className="text-blue-600">Baccalauréat</span></span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/contact">
                      Demander un Bilan et Devis Personnalisé
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
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
                    <Badge variant="popular" className="px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full transition-all duration-300 ${
                  plan.popular 
                    ? 'border-t-4 border-t-red-500 border-slate-200' 
                    : 'border-slate-200'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="font-heading text-xl font-bold text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <p className="text-sm text-slate-900 mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">
                        {formatPrice(plan.price, "TND")}
                      </span>
                      <span className="text-slate-900">/mois</span>
                    </div>
                    {plan.credits > 0 && (
                      <div className="mt-2">
                        <Badge variant="default" className="text-xs">
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
                          <span className="text-slate-900 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild 
                      className="w-full" 
                      variant={plan.popular ? "accent" : "default"}
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
        </motion.div>


        {/* Add-ons ARIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-blue-50 rounded-xl p-8 shadow-md border border-slate-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-red-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                L'Offre IA "ARIA"
              </h3>
              <p className="text-slate-900">
                ARIA Standard inclus dans tous les abonnements (1 matière). 
                Ajoutez des matières selon vos besoins.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(ARIA_ADDONS).map(([key, addon]) => (
                <Card key={key} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg text-slate-900">{addon.name}</h4>
                        <p className="text-slate-900 text-sm">{addon.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">
                          +{formatPrice(addon.price, "TND")}
                        </span>
                        <span className="text-slate-900 text-sm block">/mois</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="secondary" asChild>
                      <Link href="/bilan-gratuit">
                        Ajouter à mon Abonnement
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Packs Spécifiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 text-center">
              Les Packs Spécifiques (Paiement Unique)
            </h3>
            <p className="text-slate-900 text-center mb-8">
              Des accompagnements ciblés pour des objectifs précis
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(SPECIAL_PACKS).map(([key, pack]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-left">
                    <div className="flex justify-between items-center w-full mr-4">
                      <div>
                        <h4 className="font-semibold text-lg">{pack.name}</h4>
                        <p className="text-slate-900 text-sm">{pack.description}</p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(pack.price, "TND")}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {pack.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-900 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" asChild>
                        <Link href="/bilan-gratuit">
                          Réserver ce Pack
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  )
}