import { z } from "zod";
import { PagingRes, PagingBody } from "../paging/paging.schema";
import { IsSucceedRes } from "../common.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PackageSchema = z.object({
    id: z.string().optional(),
    image: z.string().optional(),
    description: z.string(),
    title: z.string().optional(),
    duration: z.string(),
    type: z.string(),
    totalPrice: z.number().optional(),
    
    status: z.string().optional(),
    items: z.string().array().optional(), //Đây là array Package Item nhưng chưa dùng nên chưa import

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
});
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const PackageRes = z.object({
    data: PackageSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type PackageResType = z.TypeOf<typeof PackageRes>;

export type PackageType = z.TypeOf<typeof PackageSchema>



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

// 5. Định nghĩa cấu trúc request để lấy 1 package theo id
export const GetPackageByIdSchema = z.object({
    id: z.string()
  });
  export type GetPackageByIdType = z.TypeOf<typeof GetPackageByIdSchema>;
  

//Create Model
export const CreatePackageBody = PackageSchema;
export type CreatePackageBodyType = z.TypeOf<typeof CreatePackageBody>;
export const CreatePackageRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreatePackageResType = z.TypeOf<typeof CreatePackageRes>;


//Update Model
export const UpdatePackageBody = PackageSchema;
export type UpdatePackageBodyType = z.TypeOf<typeof UpdatePackageBody>;
export const UpdatePackageRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdatePackageResType = z.TypeOf<typeof UpdatePackageRes>;