import { z } from "zod";
import { PagingRes, PageBodyType, PagingBody } from "./paging/paging.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PetCenterSchema = z.object({
    id: z.string(),
    careCenterName: z.string(),
    listImages: z.string(),
    address: z.string(),
    description: z.string(),
    averageRating: z.number()
});
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const PetCenterRes = z.object({
    data: PetCenterSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type PetCenterResType = z.TypeOf<typeof PetCenterRes>;



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