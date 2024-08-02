import { z } from "zod";
import { PagingRes, PageBodyType, PagingBody } from "./paging/paging.schema";
import { IsSucceedRes } from "./common.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PetCenterSchema = z.object({
    id: z.string(),
    careCenterName: z.string(),
    listImages: z.string(),
    address: z.string(),
    description: z.string(),
    averageRating: z.number().optional(),
    Hotline: z.string().optional(),
    status: z.string().optional().default(()=>"")
});
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const PetCenterRes = z.object({
    data: PetCenterSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type PetCenterResType = z.TypeOf<typeof PetCenterRes>;
export type PetCenterType = z.TypeOf<typeof PetCenterSchema>;


// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const PetCenterList = z.object({
    list: z.array(PetCenterSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const PetCenterListRes = z.object({
    data: PetCenterList,
    message: z.string()
})
// 3.2
export type PetCenterListType = z.TypeOf<typeof PetCenterList>;
export type PetCenterListResType = z.TypeOf<typeof PetCenterListRes>



// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const PetCenterListPage = z.object({
    list: z.array(PetCenterSchema),
    paging: PagingRes
});
export const PetCenterListPageRes = z.object({
    data: PetCenterListPage,
    message: z.string()
});
// 4.1
export type PetCenterListPageResType = z.TypeOf<typeof PetCenterListPageRes>;

export const PetCenterListPageBody = PagingBody;
export type PetCenterListPageBodyType = z.TypeOf<typeof PetCenterListPageBody>;

//Create Model
export const CreatePetCenterBody = PetCenterSchema;
export type CreatePetCenterBodyType = z.TypeOf<typeof CreatePetCenterBody>;
export const CreatePetCenterRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreatePetCenterResType = z.TypeOf<typeof CreatePetCenterRes>;


//Update Model
export const UpdatePetCenterBody = PetCenterSchema;
export type UpdatePetCenterBodyType = z.TypeOf<typeof UpdatePetCenterBody>;
export const UpdatePetCenterRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdatePetCenterResType = z.TypeOf<typeof UpdatePetCenterRes>;