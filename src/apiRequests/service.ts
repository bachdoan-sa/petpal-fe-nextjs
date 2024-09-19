import http from '@/src/lib/httpAxios'
import {
    ServiceListPageResType,
    ServiceListPageBodyType,
    CreateServiceBodyType,
    CreateServiceResType,
    UpdateServiceResType,
    UpdateServiceBodyType,
    ServiceType,
    ServiceResType
} from '@/src/schemaValidations/service.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const ServiceApiRequest = {
    getListService: ({ body, sessionToken }: { body: ServiceListPageBodyType; sessionToken?: string }) =>
        http.post<ServiceListPageResType>("/api/Service/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getServiceById: ({ serivceId, sessionToken }: { serivceId: string; sessionToken?: string }) =>
        http.get<ServiceResType>(`/api/Service/get-service/${serivceId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createService: ({ body, sessionToken: sessionToken  }: { body: CreateServiceBodyType; sessionToken?: string }) =>
        http.post<CreateServiceResType>('/api/Service/create', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updateService: ({ body, sessionToken }: { body: UpdateServiceBodyType; sessionToken?: string }) =>
        http.post<UpdateServiceResType>('/api/Service/update', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default ServiceApiRequest