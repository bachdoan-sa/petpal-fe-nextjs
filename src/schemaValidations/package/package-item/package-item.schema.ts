import { z } from "zod";
import { PagingRes, PagingBody } from "../../paging/paging.schema";
import { IsSucceedRes } from "../../common.schema";
//HÀM NÀY CHƯA XONG CẦN ĐƯỢC SỬA
// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PackageItemSchema = z.object({
    id: z.string().optional(),
    currentPrice: z.string(),
    detail: z.string(),
    serviceName: z.string().optional(),
    
    packageId: z.string().optional(),
    serviceId: z.string().optional(),
    status: z.string().optional(),

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
});
export type PackageItemType = z.TypeOf<typeof PackageItemSchema>
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const PackageItemRes = z.object({
    data: PackageItemSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type PackageItemResType = z.TypeOf<typeof PackageItemRes>;



// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const PackageItemList = z.object({
    list: z.array(PackageItemSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const PackageItemListRes = z.object({
    data: PackageItemList,
    message: z.string()
})
// 3.2
export type PackageItemListResType = z.TypeOf<typeof PackageItemListRes>



// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const PackageItemListPage = z.object({
    list: z.array(PackageItemSchema),
    paging: PagingRes
});
export const PackageItemListPageRes = z.object({
    data: PackageItemListPage,
    message: z.string()
});
// 4.1
export type PackageItemListPageResType = z.TypeOf<typeof PackageItemListPageRes>;

export const PackageItemListPageBody = PagingBody;
export type PackageItemListPageBodyType = z.TypeOf<typeof PackageItemListPageBody>;

export const PackageItemListPageByPackageBody = z.object({
    packageItemId : z.string()
});
export type PackageItemBykCenterListPageBodyType = z.TypeOf<typeof PackageItemListPageByPackageBody>;


//Create Model
export const CreatePackageItemBody = PackageItemSchema;
export type CreatePackageItemBodyType = z.TypeOf<typeof CreatePackageItemBody>;
export const CreatePackageItemRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreatePackageItemResType = z.TypeOf<typeof CreatePackageItemRes>;


//Update Model
export const UpdatePackageItemBody = PackageItemSchema;
export type UpdatePackageItemBodyType = z.TypeOf<typeof UpdatePackageItemBody>;
export const UpdatePackageItemRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdatePackageItemResType = z.TypeOf<typeof UpdatePackageItemRes>;