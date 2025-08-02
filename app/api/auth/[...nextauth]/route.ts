import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export const GET = (req: Request, context: any) => NextAuth(authOptions)(req, context)
export const POST = (req: Request, context: any) => NextAuth(authOptions)(req, context)