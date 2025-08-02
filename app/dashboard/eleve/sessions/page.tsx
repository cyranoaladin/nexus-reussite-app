"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowLeft, Clock, CreditCard, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { sessionBookingSchema } from "@/lib/validations"
import { Subject, ServiceType } from "@/types/enums"

const SUBJECTS_OPTIONS = [
  { value: Subject.MATHEMATIQUES, label: "Mathématiques" },
  { value: Subject.NSI, label: "NSI" },
  { value: Subject.FRANCAIS, label: "Français" },
  { value: Subject.PHILOSOPHIE, label: "Philosophie" },
  { value: Subject.HISTOIRE_GEO, label: "Histoire-Géographie" },
  { value: Subject.ANGLAIS, label: "Anglais" },
  { value: Subject.ESPAGNOL, label: "Espagnol" },
  { value: Subject.PHYSIQUE_CHIMIE, label: "Physique-Chimie" },
  { value: Subject.SVT, label: "SVT" },
  { value: Subject.SES, label: "SES" }
]

const SERVICE_TYPES = [
  { value: ServiceType.COURS_ONLINE, label: "Cours en ligne", cost: 1, description: "1 crédit" },
  { value: ServiceType.COURS_PRESENTIEL, label: "Cours en présentiel", cost: 1.25, description: "1,25 crédit" },
  { value: ServiceType.ATELIER_GROUPE, label: "Atelier de groupe", cost: 1.5, description: "1,5 crédit" }
]

export default function SessionsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableCredits, setAvailableCredits] = useState(4.5)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(sessionBookingSchema)
  })

  const selectedType = watch('type')
  const selectedCost = SERVICE_TYPES.find(t => t.value === selectedType)?.cost || 1

  useEffect(() => {
    if (status === "loading") return

    if (!session || session.user.role !== 'ELEVE') {
      router.push("/auth/signin")
      return
    }
  }, [session, status, router])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/sessions/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert('Session réservée avec succès !')
        router.push('/dashboard/eleve')
      } else {
        alert(result.error || 'Erreur lors de la réservation')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/dashboard/eleve">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Réserver une Session</h1>
              <p className="text-sm text-gray-500">Choisissez votre cours ou atelier</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Nouvelle Réservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Matière */}
                  <div>
                    <Label htmlFor="subject">Matière *</Label>
                    <Select onValueChange={(value) => setValue('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS_OPTIONS.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message as string}
                      </p>
                    )}
                  </div>

                  {/* Type de session */}
                  <div>
                    <Label htmlFor="type">Type de session *</Label>
                    <Select onValueChange={(value) => setValue('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir le type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{type.label}</span>
                              <Badge variant="outline" className="ml-2">
                                {type.description}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.type.message as string}
                      </p>
                    )}
                  </div>

                  {/* Date et heure */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduledAt">Date et heure *</Label>
                      <Input
                        id="scheduledAt"
                        type="datetime-local"
                        {...register('scheduledAt')}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                      {errors.scheduledAt && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.scheduledAt.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="duration">Durée (minutes) *</Label>
                      <Select onValueChange={(value) => setValue('duration', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Durée" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.duration && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.duration.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Titre */}
                  <div>
                    <Label htmlFor="title">Titre de la session *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Ex: Révision chapitre dérivées"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message as string}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description (optionnel)</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Précisez vos besoins, difficultés ou objectifs..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || selectedCost > availableCredits}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Réservation en cours...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Réserver cette Session
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Informations */}
          <div className="space-y-6">
            {/* Solde de crédits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Mon Solde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {availableCredits} crédits
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Disponibles pour vos sessions
                  </p>
                  {selectedCost && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Coût de cette session :</strong><br />
                        {selectedCost} crédit{selectedCost > 1 ? 's' : ''}
                      </p>
                      {selectedCost > availableCredits && (
                        <p className="text-red-600 text-xs mt-2 font-medium">
                          ⚠️ Solde insuffisant
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Coachs disponibles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Coachs Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">H</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Hélios</p>
                      <p className="text-xs text-gray-600">Mathématiques</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">T</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Turing</p>
                      <p className="text-xs text-gray-600">NSI</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Athéna</p>
                      <p className="text-xs text-gray-600">Français</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Politique d'annulation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Politique d'Annulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Cours : annulation gratuite > 24h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>Ateliers : annulation gratuite > 48h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}