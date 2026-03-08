import { Prisma } from '@prisma/client'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { createUser, findUserByEmail } from '@/repositories/user.repository'

export type RegisterUserInput = {
  name: string
  email: string
  password: string
}

export async function registerUser(input: RegisterUserInput) {
  const user = await createUser({
    name: input.name,
    email: input.email,
    hashedPassword: hashPassword(input.password),
  })

  return user
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email)

  if (!user?.hashedPassword) {
    return null
  }

  const isValid = verifyPassword(password, user.hashedPassword)

  if (!isValid) {
    return null
  }

  return user
}

export function isUniqueEmailError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}
