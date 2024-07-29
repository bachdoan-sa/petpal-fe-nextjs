import { z } from "zod";
import { PagingRes, PagingBody } from "../paging/paging.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PackageSchema = z.object({
    id: z.string(),
    description: z.string(),
    duration: z.string(),
    type: z.string(),
    totalPrice: z.number(),
    items: z.string().array()
});
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const PackageRes = z.object({
    data: PackageSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type PackageResType = z.TypeOf<typeof PackageRes>;



// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const PackageList = z.object({
    list: z.array(PackageSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const PackageListRes = z.object({
    data: PackageList,
    message: z.string()
})
// 3.2
export type PackageListResType = z.TypeOf<typeof PackageListRes>

export type PackageListType = z.TypeOf<typeof PackageSchema>


// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const PackageListPage = z.object({
    list: z.array(PackageSchema),
    paging: PagingRes
});
export const PackageListPageRes = z.object({
    data: PackageListPage,
    message: z.string()
});
// 4.1
export type PackageListPageResType = z.TypeOf<typeof PackageListPageRes>;

export const PackageListPageBody = PagingBody;
export type PackageListPageBodyType = z.TypeOf<typeof PackageListPageBody>;

export const PackageBykCenterListPageBody = z.object({
    page: z.number(),
    size: z.number(),
    careCenterId: z.string().optional()
});
export type PackageBykCenterListPageBodyType = z.TypeOf<typeof PackageBykCenterListPageBody>;