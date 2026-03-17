import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

const MAX_IMAGE_LENGTH = 900_000

const avatarSchema = z.object({
  image: z
    .string()
    .min(1)
    .refine(
      (value) => /^data:image\/(png|jpeg|jpg|webp);base64,/.test(value),
      { message: 'INVALID_IMAGE_FORMAT' }
    )
    .refine((value) => value.length <= MAX_IMAGE_LENGTH, {
      message: 'IMAGE_TOO_LARGE',
    }),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { image } = avatarSchema.parse(body)

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { image },
      select: {
        id: true,
        image: true,
      },
    })

    return NextResponse.json({ image: user.image }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]?.message ?? 'INVALID_IMAGE'
      return NextResponse.json({ error: firstIssue }, { status: 400 })
    }

    console.error('[api/profile/avatar] failed', error)
    return NextResponse.json({ error: 'FAILED_TO_SAVE_AVATAR' }, { status: 500 })
  }
}
