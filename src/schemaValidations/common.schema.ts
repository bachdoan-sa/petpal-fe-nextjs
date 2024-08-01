import z, { any, date } from 'zod'

export const MessageRes = z
  .object({
    message: z.string()
  })
  .strict()

export type MessageResType = z.TypeOf<typeof MessageRes>

export const IsSucceedRes = z.object({
  isSucceed: z.boolean()
}).strict()

export const CommonRes = z
  .object({
    message: z.string(),
    data: z.any()
  })
  .strict()
export type CommonResType = z.TypeOf<typeof CommonRes>