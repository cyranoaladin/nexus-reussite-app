import { z } from 'zod'
import { Subject } from '@/types/enums'

// Validation pour l'inscription (Bilan Gratuit)
export const bilanGratuitSchema = z.object({
  // Informations Parent
  parentFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  parentLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  parentEmail: z.string().email('Email invalide'),
  parentPhone: z.string().min(8, 'Numéro de téléphone invalide'),
  parentPassword: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  
  // Informations Élève
  studentFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  studentLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  studentGrade: z.string().min(1, 'Veuillez sélectionner une classe'),
  studentSchool: z.string().optional(),
  studentBirthDate: z.string().optional(),
  
  // Besoins et objectifs
  subjects: z.array(z.nativeEnum(Subject)).min(1, 'Sélectionnez au moins une matière'),
  currentLevel: z.string().min(1, 'Veuillez indiquer le niveau actuel'),
  objectives: z.string().min(10, 'Décrivez vos objectifs (minimum 10 caractères)'),
  difficulties: z.string().optional(),
  
  // Préférences
  preferredModality: z.enum(['online', 'presentiel', 'hybride']),
  availability: z.string().optional(),
  
  // Consentements
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
  acceptNewsletter: z.boolean().optional()
})

export type BilanGratuitData = z.infer<typeof bilanGratuitSchema>

// Validation pour la connexion
export const signinSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

// Validation pour la réservation de session
export const sessionBookingSchema = z.object({
  coachId: z.string().optional(),
  subject: z.nativeEnum(Subject),
  type: z.enum(['COURS_ONLINE', 'COURS_PRESENTIEL', 'ATELIER_GROUPE']),
  scheduledAt: z.string().datetime(),
  duration: z.number().min(30).max(180),
  title: z.string().min(1, 'Titre requis'),
  description: z.string().optional()
})

// Validation pour les messages ARIA
export const ariaMessageSchema = z.object({
  conversationId: z.string().optional(),
  subject: z.nativeEnum(Subject),
  content: z.string().min(1, 'Message requis').max(1000, 'Message trop long')
})

// Validation pour le feedback ARIA
export const ariaFeedbackSchema = z.object({
  messageId: z.string(),
  feedback: z.boolean()
})