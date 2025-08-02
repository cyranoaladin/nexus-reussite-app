import { ServiceType } from '@prisma/client'
import { CREDIT_COSTS } from './constants'

// Calcul du coût en crédits selon le type de prestation
export function calculateCreditCost(serviceType: ServiceType): number {
  switch (serviceType) {
    case 'COURS_ONLINE':
      return CREDIT_COSTS.COURS_ONLINE
    case 'COURS_PRESENTIEL':
      return CREDIT_COSTS.COURS_PRESENTIEL
    case 'ATELIER_GROUPE':
      return CREDIT_COSTS.ATELIER_GROUPE
    default:
      return 1
  }
}

// Vérification du solde de crédits
export async function checkCreditBalance(studentId: string, requiredCredits: number): Promise<boolean> {
  const { prisma } = await import('./prisma')
  
  const transactions = await prisma.creditTransaction.findMany({
    where: {
      studentId,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    }
  })
  
  const totalCredits = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  
  return totalCredits >= requiredCredits
}

// Débit des crédits pour une session
export async function debitCredits(studentId: string, amount: number, sessionId: string, description: string) {
  const { prisma } = await import('./prisma')
  
  return await prisma.creditTransaction.create({
    data: {
      studentId,
      type: 'USAGE',
      amount: -amount,
      description,
      sessionId
    }
  })
}

// Remboursement de crédits (annulation)
export async function refundCredits(studentId: string, amount: number, sessionId: string, description: string) {
  const { prisma } = await import('./prisma')
  
  return await prisma.creditTransaction.create({
    data: {
      studentId,
      type: 'REFUND',
      amount,
      description,
      sessionId
    }
  })
}

// Attribution des crédits mensuels
export async function allocateMonthlyCredits(studentId: string, credits: number) {
  const { prisma } = await import('./prisma')
  
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 2) // Expire dans 2 mois (report 1 mois)
  
  return await prisma.creditTransaction.create({
    data: {
      studentId,
      type: 'MONTHLY_ALLOCATION',
      amount: credits,
      description: `Allocation mensuelle de ${credits} crédits`,
      expiresAt: nextMonth
    }
  })
}

// Expiration des crédits reportés
export async function expireOldCredits() {
  const { prisma } = await import('./prisma')
  
  const expiredTransactions = await prisma.creditTransaction.findMany({
    where: {
      expiresAt: { lt: new Date() },
      type: 'MONTHLY_ALLOCATION'
    }
  })
  
  for (const transaction of expiredTransactions) {
    await prisma.creditTransaction.create({
      data: {
        studentId: transaction.studentId,
        type: 'EXPIRATION',
        amount: -transaction.amount,
        description: `Expiration de ${transaction.amount} crédits reportés`
      }
    })
  }
}