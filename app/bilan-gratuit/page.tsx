"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { bilanGratuitSchema, type BilanGratuitData } from "@/lib/validations"
import { Subject } from "@/types/enums"
import { CheckCircle, User, GraduationCap, Target, Settings, Loader2 } from "lucide-react"

const SUBJECTS_OPTIONS = [
  { value: Subject.MATHEMATIQUES, label: "Mathématiques" },
  { value: Subject.NSI, label: "NSI (Numérique et Sciences Informatiques)" },
  { value: Subject.FRANCAIS, label: "Français" },
  { value: Subject.PHILOSOPHIE, label: "Philosophie" },
  { value: Subject.HISTOIRE_GEO, label: "Histoire-Géographie" },
  { value: Subject.ANGLAIS, label: "Anglais" },
  { value: Subject.ESPAGNOL, label: "Espagnol" },
  { value: Subject.PHYSIQUE_CHIMIE, label: "Physique-Chimie" },
  { value: Subject.SVT, label: "SVT" },
  { value: Subject.SES, label: "SES" }
]

const GRADES_OPTIONS = [
  { value: "seconde", label: "Seconde" },
  { value: "premiere", label: "Première" },
  { value: "terminale", label: "Terminale" }
]

const LEVELS_OPTIONS = [
  { value: "difficultes", label: "En difficulté" },
  { value: "moyen", label: "Niveau moyen" },
  { value: "bon", label: "Bon niveau" },
  { value: "excellent", label: "Excellent niveau" }
]

export default function BilanGratuitPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([])
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BilanGratuitData>({
    resolver: zodResolver(bilanGratuitSchema)
  })

  const totalSteps = 4

  const onSubmit = async (data: BilanGratuitData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/bilan-gratuit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          subjects: selectedSubjects
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Redirection vers page de confirmation
        router.push('/bilan-gratuit/confirmation')
      } else {
        alert(result.error || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de l\'inscription')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleSubject = (subject: Subject) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(s => s !== subject)
      : [...selectedSubjects, subject]
    
    setSelectedSubjects(newSubjects)
    setValue('subjects', newSubjects)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              Bilan Stratégique Gratuit
            </Badge>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commencez Votre Parcours d'Excellence
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quelques minutes suffisent pour créer un plan personnalisé 
              qui transformera la réussite de votre enfant.
            </p>
          </motion.div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% complété
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Étape 1: Informations Parent */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary-500" />
                      Vos Informations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="parentFirstName">Prénom *</Label>
                        <Input
                          id="parentFirstName"
                          {...register('parentFirstName')}
                          placeholder="Votre prénom"
                        />
                        {errors.parentFirstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parentFirstName.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="parentLastName">Nom *</Label>
                        <Input
                          id="parentLastName"
                          {...register('parentLastName')}
                          placeholder="Votre nom"
                        />
                        {errors.parentLastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parentLastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="parentEmail">Email *</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        {...register('parentEmail')}
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.parentEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.parentEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="parentPhone">Téléphone *</Label>
                      <Input
                        id="parentPhone"
                        {...register('parentPhone')}
                        placeholder="+216 XX XXX XXX"
                      />
                      {errors.parentPhone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.parentPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="parentPassword">Mot de passe *</Label>
                      <Input
                        id="parentPassword"
                        type="password"
                        {...register('parentPassword')}
                        placeholder="Minimum 8 caractères"
                      />
                      {errors.parentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.parentPassword.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Étape 2: Informations Élève */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-primary-500" />
                      Informations de l'Élève
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="studentFirstName">Prénom de l'élève *</Label>
                        <Input
                          id="studentFirstName"
                          {...register('studentFirstName')}
                          placeholder="Prénom de l'élève"
                        />
                        {errors.studentFirstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.studentFirstName.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="studentLastName">Nom de l'élève *</Label>
                        <Input
                          id="studentLastName"
                          {...register('studentLastName')}
                          placeholder="Nom de l'élève"
                        />
                        {errors.studentLastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.studentLastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="studentGrade">Classe actuelle *</Label>
                        <Select onValueChange={(value) => setValue('studentGrade', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la classe" />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADES_OPTIONS.map((grade) => (
                              <SelectItem key={grade.value} value={grade.value}>
                                {grade.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.studentGrade && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.studentGrade.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="studentSchool">Établissement</Label>
                        <Input
                          id="studentSchool"
                          {...register('studentSchool')}
                          placeholder="Nom de l'établissement"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="studentBirthDate">Date de naissance</Label>
                      <Input
                        id="studentBirthDate"
                        type="date"
                        {...register('studentBirthDate')}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Étape 3: Besoins et Objectifs */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary-500" />
                      Besoins et Objectifs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Matières d'intérêt *</Label>
                      <p className="text-sm text-gray-600 mb-3">
                        Sélectionnez les matières pour lesquelles vous souhaitez un accompagnement
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {SUBJECTS_OPTIONS.map((subject) => (
                          <div
                            key={subject.value}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedSubjects.includes(subject.value)
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => toggleSubject(subject.value)}
                          >
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedSubjects.includes(subject.value)}
                                readOnly
                              />
                              <span className="text-sm font-medium">
                                {subject.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.subjects && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subjects.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="currentLevel">Niveau actuel *</Label>
                      <Select onValueChange={(value) => setValue('currentLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Évaluez le niveau actuel" />
                        </SelectTrigger>
                        <SelectContent>
                          {LEVELS_OPTIONS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.currentLevel && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.currentLevel.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="objectives">Objectifs *</Label>
                      <Textarea
                        id="objectives"
                        {...register('objectives')}
                        placeholder="Décrivez vos objectifs : améliorer les notes, préparer le bac, intégrer une école spécifique..."
                        rows={4}
                      />
                      {errors.objectives && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.objectives.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="difficulties">Difficultés rencontrées</Label>
                      <Textarea
                        id="difficulties"
                        {...register('difficulties')}
                        placeholder="Décrivez les principales difficultés ou blocages..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Étape 4: Préférences et Validation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-primary-500" />
                      Préférences et Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="preferredModality">Modalité préférée *</Label>
                      <Select onValueChange={(value) => setValue('preferredModality', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Comment préférez-vous les cours ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">En ligne uniquement</SelectItem>
                          <SelectItem value="presentiel">En présentiel uniquement</SelectItem>
                          <SelectItem value="hybride">Hybride (en ligne + présentiel)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.preferredModality && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.preferredModality.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="availability">Disponibilités</Label>
                      <Textarea
                        id="availability"
                        {...register('availability')}
                        placeholder="Indiquez vos créneaux de disponibilité préférés..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="acceptTerms"
                          onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                          J'accepte les{' '}
                          <a href="/conditions" className="text-primary-500 hover:underline">
                            conditions générales d'utilisation
                          </a>{' '}
                          et la{' '}
                          <a href="/confidentialite" className="text-primary-500 hover:underline">
                            politique de confidentialité
                          </a>
                          *
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-red-500 text-sm">
                          {errors.acceptTerms.message}
                        </p>
                      )}

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="acceptNewsletter"
                          onCheckedChange={(checked) => setValue('acceptNewsletter', checked as boolean)}
                        />
                        <Label htmlFor="acceptNewsletter" className="text-sm leading-relaxed">
                          Je souhaite recevoir les actualités et conseils de Nexus Réussite
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Suivant
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    'Créer mon Compte'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}