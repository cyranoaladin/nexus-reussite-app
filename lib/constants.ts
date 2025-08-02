// Couleurs de la marque Nexus
export const COLORS = {
  primary: '#4F46E5', // Violet Nexus
  secondary: '#F97316', // Orange Nexus
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
} as const

// Formules d'abonnement
export const SUBSCRIPTION_PLANS = {
  ACCES_PLATEFORME: {
    name: "ACCÈS PLATEFORME",
    price: 150,
    credits: 0,
    features: [
      "Accès 24/7 à la plateforme",
      "Suivi personnalisé",
      "ARIA (1 matière)",
      "Support par email"
    ]
  },
  HYBRIDE: {
    name: "HYBRIDE",
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
    price: 750,
    credits: 8,
    features: [
      "Tout de l'Hybride",
      "8 crédits/mois",
      "Support prioritaire",
      "Bilan trimestriel"
    ]
  }
} as const

// Packs spécifiques
export const SPECIAL_PACKS = {
  GRAND_ORAL: {
    name: "Pack Grand Oral",
    price: 750,
    description: "Préparation complète au Grand Oral"
  },
  BAC_FRANCAIS: {
    name: "Pack Bac de Français",
    price: 1200,
    description: "Accompagnement intensif pour le Bac de Français"
  },
  ORIENTATION: {
    name: "Pack Orientation & Parcoursup",
    price: 900,
    description: "Stratégie complète pour Parcoursup"
  }
} as const

// Coûts des prestations en crédits
export const CREDIT_COSTS = {
  COURS_ONLINE: 1,
  COURS_PRESENTIEL: 1.25,
  ATELIER_GROUPE: 1.5
} as const