import z from 'zod'
import { IsSucceedRes } from './common.schema'
import { PagingBody, PagingRes } from './paging/paging.schema'
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

export const UserList = z.object({
  list: z.array(UserSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const UserListRes = z.object({
  data: UserList,
  message: z.string()
})
export type UserListType = z.TypeOf<typeof UserList>
export type UserListResType = z.TypeOf<typeof UserListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const UserListPage = z.object({
  list: z.array(UserSchema),
  paging: PagingRes
});
export const UserListPageRes = z.object({
  data: UserListPage,
  message: z.string()
});
// 4.1
export type UserListPageResType = z.TypeOf<typeof UserListPageRes>;

export const UserListPageBody = PagingBody;
export type UserListPageBodyType = z.TypeOf<typeof UserListPageBody>;



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