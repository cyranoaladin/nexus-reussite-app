import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bilanGratuitSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation des données
    const validatedData = bilanGratuitSchema.parse(body)
    
    // Vérifier si l'email parent existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.parentEmail }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email' },
        { status: 400 }
      )
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(validatedData.parentPassword, 12)
    
    // Transaction pour créer parent et élève
    const result = await prisma.$transaction(async (tx) => {
      // Créer le compte parent
      const parentUser = await tx.user.create({
        data: {
          email: validatedData.parentEmail,
          password: hashedPassword,
          role: UserRole.PARENT,
          firstName: validatedData.parentFirstName,
          lastName: validatedData.parentLastName,
          phone: validatedData.parentPhone
        }
      })
      
      // Créer le profil parent
      const parentProfile = await tx.parentProfile.create({
        data: {
          userId: parentUser.id
        }
      })
      
      // Créer le compte élève
      const studentUser = await tx.user.create({
        data: {
          email: `${validatedData.studentFirstName.toLowerCase()}.${validatedData.studentLastName.toLowerCase()}@nexus-student.local`,
          role: UserRole.ELEVE,
          firstName: validatedData.studentFirstName,
          lastName: validatedData.studentLastName
        }
      })
      
      // Créer le profil élève
      const studentProfile = await tx.studentProfile.create({
        data: {
          userId: studentUser.id,
          grade: validatedData.studentGrade,
          school: validatedData.studentSchool,
          birthDate: validatedData.studentBirthDate ? new Date(validatedData.studentBirthDate) : null
        }
      })
      
      // Créer l'entité Student liée au parent
      const student = await tx.student.create({
        data: {
          parentId: parentProfile.id,
          userId: studentUser.id,
          grade: validatedData.studentGrade,
          school: validatedData.studentSchool,
          birthDate: validatedData.studentBirthDate ? new Date(validatedData.studentBirthDate) : null
        }
      })
      
      return { parentUser, studentUser, student }
    })
    
    // TODO: Envoyer email de bienvenue
    // TODO: Créer une tâche pour l'assistante (nouveau bilan à traiter)
    
    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Vous recevrez un email de confirmation sous 24h.',
      parentId: result.parentUser.id,
      studentId: result.student.id
    })
    
  } catch (error) {
    console.error('Erreur inscription bilan gratuit:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}