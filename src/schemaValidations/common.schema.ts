import z from 'zod'

export const MessageRes = z
  .object({
    message: z.string()
  })
  .strict()

export type MessageResType = z.TypeOf<typeof MessageRes>

export const IsSucceedRes = z.object({
  isSucceed: z.boolean()
}).strict()