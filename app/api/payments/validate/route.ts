import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Subject } from '@/types/enums'

const validatePaymentSchema = z.object({
  paymentId: z.string(),
  action: z.enum(['approve', 'reject']),
  note: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ASSISTANTE') {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { paymentId, action, note } = validatePaymentSchema.parse(body)
    
    // Récupérer le paiement
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          include: {
            parentProfile: {
              include: {
                children: true
              }
            }
          }
        }
      }
    })
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Paiement non trouvé' },
        { status: 404 }
      )
    }
    
    if (action === 'approve') {
      // Valider le paiement
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'COMPLETED',
          metadata: {
            ...payment.metadata,
            validatedBy: session.user.id,
            validatedAt: new Date().toISOString(),
            validationNote: note
          }
        }
      })
      
      // Activer le service selon le type
      const metadata = payment.metadata as any
      
      if (payment.type === 'SUBSCRIPTION') {
        // Activer l'abonnement
        const student = await prisma.student.findUnique({
          where: { id: metadata.studentId }
        })
        
        if (student) {
          // Désactiver l'ancien abonnement
          await prisma.subscription.updateMany({
            where: {
              studentId: metadata.studentId,
              status: 'ACTIVE'
            },
            data: { status: 'CANCELLED' }
          })
          
          // Activer le nouvel abonnement
          await prisma.subscription.updateMany({
            where: {
              studentId: metadata.studentId,
              planName: metadata.itemKey,
              status: 'INACTIVE'
            },
            data: { 
              status: 'ACTIVE',
              startDate: new Date()
            }
          })
          
          // Allouer les crédits mensuels
          const subscription = await prisma.subscription.findFirst({
            where: {
              studentId: metadata.studentId,
              status: 'ACTIVE'
            }
          })
          
          if (subscription && subscription.creditsPerMonth > 0) {
            const nextMonth = new Date()
            nextMonth.setMonth(nextMonth.getMonth() + 2)
            
            await prisma.creditTransaction.create({
              data: {
                studentId: metadata.studentId,
                type: 'MONTHLY_ALLOCATION',
                amount: subscription.creditsPerMonth,
                description: `Allocation mensuelle de ${subscription.creditsPerMonth} crédits`,
                expiresAt: nextMonth
              }
            })
          }
        }
      }
      
      // TODO: Envoyer email de confirmation au client
      
    } else {
      // Rejeter le paiement
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'FAILED',
          metadata: {
            ...payment.metadata,
            rejectedBy: session.user.id,
            rejectedAt: new Date().toISOString(),
            rejectionReason: note
          }
        }
      })
      
      // TODO: Envoyer email d'information au client
    }
    
    return NextResponse.json({
      success: true,
      message: `Paiement ${action === 'approve' ? 'validé' : 'rejeté'} avec succès`
    })
    
  } catch (error) {
    console.error('Erreur validation paiement:', error)
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}