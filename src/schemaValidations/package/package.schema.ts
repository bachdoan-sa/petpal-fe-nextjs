import { z } from "zod";
import { PagingRes, PagingBody } from "../paging/paging.schema";
import { IsSucceedRes } from "../common.schema";
import { PetSchema } from "../pet.schema";
import { PackageItemSchema } from "./package-item/package-item.schema";
import exp from "node:constants";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const PackageSchema = z.object({
    id: z.string().optional(),
    image: z.string().optional().default(""),
    description: z.string(),
    title: z.string().nullable().optional(),
    duration: z.string(),
    type: z.string(),
    totalPrice: z.number().optional(),

    status: z.string().optional(),

    items: z.array(PackageItemSchema).default([]).optional(), //Đây là array Package Item nhưng chưa dùng nên chưa import

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
}).strict();

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

export const CreatePackageWithItemsBody = z.object(
    {
        ...PackageSchema.shape,
        packageItems: PackageSchema.shape.items
    });
export type CreatePackageWithItemsBodyType = z.TypeOf<typeof CreatePackageWithItemsBody>;

export const CreatePackageRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export const CreatePackageWithItemsRes = z.object({
    data: z.coerce.string(),
    message: z.string()
});
export type CreatePackageResType = z.TypeOf<typeof CreatePackageRes>;
export type CreatePackageWithItemsResType = z.TypeOf<typeof CreatePackageWithItemsRes>;



//Update Model
export const UpdatePackageBody = PackageSchema;
export type UpdatePackageBodyType = z.TypeOf<typeof UpdatePackageBody>;
export const UpdatePackageRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdatePackageResType = z.TypeOf<typeof UpdatePackageRes>;




export const PackageWithPetListPage = z.object({
    list: z.array(z.object({
        package: PackageSchema,
        pets: z.array(PetSchema)
    })),
    paging: PagingRes
})

export const PackageWithPetListPageRes = z.object({
    data: PackageWithPetListPage,
    message: z.string()
})
export type PackageWithPetListPageResType = z.TypeOf<typeof PackageWithPetListPageRes>;