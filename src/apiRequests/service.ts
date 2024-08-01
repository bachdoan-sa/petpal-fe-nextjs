import http from '@/src/lib/httpAxios'
import {
    ServiceListPageResType,
    ServiceListPageBodyType,
    CreateServiceBodyType,
    CreateServiceResType,
    UpdateServiceResType
} from '@/src/schemaValidations/service.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const ServiceApiRequest = {
    getListServiceForUser: ({ body, sessionToken }: { body: ServiceListPageBodyType; sessionToken?: string }) =>
        http.post<ServiceListPageResType>("/api/Service/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getServiceById: ({ serivceId, sessionToken }: { serivceId: string; sessionToken?: string }) =>
        http.get<ServiceListPageResType>(`/api/Service/get-service/${serivceId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createService: ({ body, sessionToken }: { body: CreateServiceBodyType; sessionToken?: string }) =>
        http.post<CreateServiceResType>('/api/Service/create-service', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updateService: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
        http.post<UpdateServiceResType>('/api/Service/update-service', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default ServiceApiRequest