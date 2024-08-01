import z from 'zod'
import { IsSucceedRes } from './common.schema'
export const UserSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  fullName: z.string(),
  address: z.string().optional(),
  roomId: z.string().optional(),
  phoneNumber: z.string(),
  email: z.string(),
  
  profileImage: z.string().optional(),
  
  role: z.string().optional()
})
export const UserRes = z
  .object({
    data: UserSchema,
    message: z.string()
  })
  .strict()
export type UserType = z.TypeOf<typeof UserSchema>
export type UserResType = z.TypeOf<typeof UserRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>

//Create Model
export const CreateUserBody = UserSchema;
export type CreateUserBodyType = z.TypeOf<typeof CreateUserBody>;
export const CreateUserRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateUserResType = z.TypeOf<typeof CreateUserRes>;


//Update Model
export const UpdateUserBody = UserSchema;
export type UpdateUserBodyType = z.TypeOf<typeof UpdateUserBody>;
export const UpdateUserRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdateUserResType = z.TypeOf<typeof UpdateUserRes>;