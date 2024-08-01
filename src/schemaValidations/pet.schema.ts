import { z } from 'zod';
import { PagingBody, PagingRes } from './paging/paging.schema';

export const PetSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    petTypeId: z.string().optional(),
    fullname: z.string(),
    description: z.string(),
    status: z.string().optional(),
    updatedBy: z.string().optional()
});

export const PetRes = z.object({
    data: PetSchema,
    message: z.string()
});
export type PetResType = z.TypeOf<typeof PetRes>;

export type PetType = z.TypeOf<typeof PetSchema>;



export const PetList = z.object({
    list: z.array(PetSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const PetListRes = z.object({
    data: PetList,
    message: z.string()
})
export type  PetListType = z.TypeOf<typeof PetList>
export type PetListResType = z.TypeOf<typeof PetListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const PetListPage = z.object({
    list: z.array(PetSchema),
    paging: PagingRes
});
export const PetListPageRes = z.object({
    data: PetListPage,
    message: z.string()
});
// 4.1
export type PetListPageResType = z.TypeOf<typeof PetListPageRes>;

export const PetListPageBody = PagingBody;
export type PetListPageBodyType = z.TypeOf<typeof PetListPageBody>;


export const CreatePetBody = PetSchema;
export type CreatePetBodyType = z.TypeOf<typeof CreatePetBody>;