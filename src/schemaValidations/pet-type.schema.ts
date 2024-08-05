import { z } from 'zod';
import { PagingBody, PagingRes } from './paging/paging.schema';
import { IsSucceedRes } from './common.schema';

export const PetTypeSchema = z.object({
    id: z.string().optional(),
    type: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
});

export const PetTypeRes = z.object({
    data: PetTypeSchema,
    message: z.string()
});
export type PetTypeResType = z.TypeOf<typeof PetTypeRes>;

export type PetTypeType = z.TypeOf<typeof PetTypeSchema>;



export const PetTypeArray = z.array(PetTypeSchema); 
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const PetTypeListRes = z.object({
    data: PetTypeArray,
    message: z.string()
})
export type PetTypeListType = z.TypeOf<typeof PetTypeArray>
export type PetTypeListResType = z.TypeOf<typeof PetTypeListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const PetTypeListPage = z.object({
    list: z.array(PetTypeSchema),
    paging: PagingRes
});
export const PetTypeListPageRes = z.object({
    data: PetTypeListPage,
    message: z.string()
});
// 4.1
export type PetTypeListPageResType = z.TypeOf<typeof PetTypeListPageRes>;

export const PetTypeListPageBody = PagingBody;
export type PetTypeListPageBodyType = z.TypeOf<typeof PetTypeListPageBody>;




//Create Model
export const CreatePetTypeBody = PetTypeSchema;
export type CreatePetTypeBodyType = z.TypeOf<typeof CreatePetTypeBody>;
export const CreatePetTypeRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreatePetTypeResType = z.TypeOf<typeof CreatePetTypeRes>;


//Update Model
export const UpdatePetTypeBody = PetTypeSchema;
export type UpdatePetTypeBodyType = z.TypeOf<typeof UpdatePetTypeBody>;
export const UpdatePetTypeRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdatePetTypeResType = z.TypeOf<typeof UpdatePetTypeRes>;