"use client"

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, ArrowLeft, Check, Globe, MapPin } from "lucide-react"
import Link from "next/link"
import { SUBSCRIPTION_PLANS, ARIA_ADDONS, SPECIAL_PACKS } from "@/lib/constants"

export default function PaiementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentMethod, setPaymentMethod] = useState("konnect")
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (status === "loading") return

    if (!session || session.user.role !== 'PARENT') {
      router.push("/auth/signin")
      return
    }

    // Récupérer les détails de la commande depuis les paramètres URL
    const plan = searchParams.get('plan')
    const addon = searchParams.get('addon')
    const pack = searchParams.get('pack')
    const student = searchParams.get('student')

    let details = null

    if (plan && SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS]) {
      const planData = SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS]
      details = {
        type: 'subscription',
        key: plan,
        name: planData.name,
        price: planData.price,
        description: `Abonnement mensuel ${planData.name}`,
        recurring: true
      }
    } else if (addon && ARIA_ADDONS[addon as keyof typeof ARIA_ADDONS]) {
      const addonData = ARIA_ADDONS[addon as keyof typeof ARIA_ADDONS]
      details = {
        type: 'addon',
        key: addon,
        name: addonData.name,
        price: addonData.price,
        description: addonData.description,
        recurring: true
      }
    } else if (pack && SPECIAL_PACKS[pack as keyof typeof SPECIAL_PACKS]) {
      const packData = SPECIAL_PACKS[pack as keyof typeof SPECIAL_PACKS]
      details = {
        type: 'pack',
        key: pack,
        name: packData.name,
        price: packData.price,
        description: packData.description,
        recurring: false
      }
    }

    if (details) {
      setOrderDetails({ ...details, studentId: student })
    } else {
      router.push('/dashboard/parent/abonnements')
    }
  }, [session, status, router, searchParams])

  const handlePayment = async () => {
    if (!orderDetails) return

    setLoading(true)

    try {
      if (paymentMethod === 'konnect') {
        // Paiement Konnect (Tunisie)
        const response = await fetch('/api/payments/konnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: orderDetails.type,
            key: orderDetails.key,
            studentId: orderDetails.studentId,
            amount: orderDetails.price,
            description: orderDetails.description
          })
        })

        const result = await response.json()

        if (response.ok && result.paymentUrl) {
          // Rediriger vers Konnect
          window.location.href = result.paymentUrl
        } else {
          alert('Erreur lors de la création du paiement Konnect')
        }
      } else {
        // Paiement Wise (International)
        const response = await fetch('/api/payments/wise', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: orderDetails.type,
            key: orderDetails.key,
            studentId: orderDetails.studentId,
            amount: orderDetails.price,
            description: orderDetails.description
          })
        })

        const result = await response.json()

        if (response.ok) {
          // Rediriger vers la page de virement Wise
          router.push(`/dashboard/parent/paiement/wise?orderId=${result.orderId}`)
        } else {
          alert('Erreur lors de la création de la commande')
        }
      }
    } catch (error) {
      console.error('Erreur paiement:', error)
      alert('Une erreur est survenue lors du paiement')
    } finally {
      setLoading(false)
    }
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/dashboard/parent/abonnements">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Finaliser le Paiement</h1>
              <p className="text-sm text-gray-500">Choisissez votre méthode de paiement</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Résumé de la commande */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la Commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{orderDetails.name}</h3>
                  <p className="text-gray-600 text-sm">{orderDetails.description}</p>
                  {orderDetails.recurring && (
                    <Badge variant="outline" className="mt-2">
                      Paiement récurrent
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {orderDetails.price} TND
                  </div>
                  {orderDetails.recurring && (
                    <div className="text-sm text-gray-600">/mois</div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total à payer</span>
                  <span className="text-xl font-bold">
                    {orderDetails.price} TND
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Méthodes de paiement */}
          <Card>
            <CardHeader>
              <CardTitle>Méthode de Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {/* Konnect (Tunisie) */}
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="konnect" id="konnect" className="mt-1" />
                  <Label htmlFor="konnect" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold">Konnect (Tunisie)</div>
                        <div className="text-sm text-gray-600">
                          Carte bancaire tunisienne, e-dinar, mobile money
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          ✓ Paiement instantané et sécurisé
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* Wise (International) */}
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="wise" id="wise" className="mt-1" />
                  <Label htmlFor="wise" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Virement International (Wise)</div>
                        <div className="text-sm text-gray-600">
                          Pour les clients hors Tunisie
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          ✓ Validation manuelle sous 24-48h
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Informations de sécurité */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <div className="font-semibold mb-1">Paiement 100% Sécurisé</div>
                    <div>
                      Vos données bancaires sont protégées par un chiffrement SSL 256-bit. 
                      Nous ne stockons aucune information de carte bancaire.
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton de paiement */}
              <Button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Procéder au Paiement
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                En cliquant sur "Procéder au Paiement", vous acceptez nos{' '}
                <Link href="/conditions" className="text-blue-600 hover:underline">
                  conditions générales de vente
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}