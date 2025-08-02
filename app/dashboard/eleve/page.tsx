"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, MessageCircle, BookOpen, User, LogOut, Loader2 } from "lucide-react"
import { signOut } from "next-auth/react"

export default function DashboardEleve() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session || session.user.role !== 'ELEVE') {
      router.push("/auth/signin")
      return
    }

    // Simulation de chargement des données élève
    setTimeout(() => {
      setStudentData({
        credits: 4.5,
        nextSession: null,
        recentActivity: []
      })
      setLoading(false)
    }, 1000)
  }, [session, status, router])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Chargement de votre espace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="font-semibold text-gray-900">
                    {session?.user.firstName} {session?.user.lastName}
                  </h1>
                  <p className="text-sm text-gray-500">Espace Élève</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bonjour {session?.user.firstName} ! 👋
          </h2>
          <p className="text-gray-600">
            Bienvenue dans votre espace personnel Nexus Réussite.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Solde de Crédits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solde de Crédits</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {studentData?.credits || 0} crédits
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Disponibles pour vos sessions
              </p>
            </CardContent>
          </Card>

          {/* Prochaine Session */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prochaine Session</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {studentData?.nextSession ? "Aujourd'hui" : "Aucune"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {studentData?.nextSession ? "Mathématiques à 14h" : "Réservez votre première session"}
              </p>
            </CardContent>
          </Card>

          {/* Messages ARIA */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages ARIA</CardTitle>
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Conversations cette semaine
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agenda */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Mon Agenda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune session programmée
                </h3>
                <p className="text-gray-500 mb-4">
                  Réservez votre première session avec un de nos coachs experts.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Réserver une Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activité Récente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Commencez votre parcours
                </h3>
                <p className="text-gray-500 mb-4">
                  Votre activité et vos progrès apparaîtront ici.
                </p>
                <Badge variant="outline">
                  Nouveau sur Nexus Réussite
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Rapides */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <span>Réserver une Session</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <span>Parler à ARIA</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                <span>Mes Ressources</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}