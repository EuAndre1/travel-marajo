import { type Prisma, type User } from '@prisma/client'
import { db } from '@/database/client'

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return db.user.create({ data })
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email } })
}
