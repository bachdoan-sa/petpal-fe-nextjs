import { z } from 'zod';
import { PagingBody, PagingRes } from './paging/paging.schema';
import { IsSucceedRes } from './common.schema';

export const ServiceSchema = z.object({
    id: z.string().optional(),
    
    name: z.string(),
    description: z.string(),
    basePrice: z.number().optional(),
    isRequired: z.boolean(),

    status: z.string().optional(),

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
});

export const ServiceRes = z.object({
    data: ServiceSchema,
    message: z.string()
});
export type ServiceResType = z.TypeOf<typeof ServiceRes>;

export type ServiceType = z.TypeOf<typeof ServiceSchema>;



export const ServiceList = z.object({
    list: z.array(ServiceSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const ServiceListRes = z.object({
    data: ServiceList,
    message: z.string()
})
export type ServiceListType = z.TypeOf<typeof ServiceList>
export type ServiceListResType = z.TypeOf<typeof ServiceListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const ServiceListPage = z.object({
    list: z.array(ServiceSchema),
    paging: PagingRes
});
export const ServiceListPageRes = z.object({
    data: ServiceListPage,
    message: z.string()
});
// 4.1
export type ServiceListPageResType = z.TypeOf<typeof ServiceListPageRes>;

export const ServiceListPageBody = PagingBody;
export type ServiceListPageBodyType = z.TypeOf<typeof ServiceListPageBody>;




//Create Model
export const CreateServiceBody = ServiceSchema;
export type CreateServiceBodyType = z.TypeOf<typeof CreateServiceBody>;
export const CreateServiceRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateServiceResType = z.TypeOf<typeof CreateServiceRes>;


//Update Model
export const UpdateServiceBody = ServiceSchema;
export type UpdateServiceBodyType = z.TypeOf<typeof UpdateServiceBody>;
export const UpdateServiceRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdateServiceResType = z.TypeOf<typeof UpdateServiceRes>;