import { z } from 'zod'

const metadataValueSchema = z.union([
  z.string().max(300),
  z.number().finite(),
  z.boolean(),
  z.null(),
])

export const metadataSchema = z
  .record(metadataValueSchema)
  .superRefine((value, ctx) => {
    const keys = Object.keys(value)
    if (keys.length > 25) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Metadata has too many keys',
      })
    }
  })
