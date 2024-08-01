import http from '@/src/lib/httpAxios'
import {
    CreatePackageItemBodyType,
    CreatePackageItemResType,
    PackageItemListPageBodyType,
    PackageItemListPageResType,
    PackageItemResType,
    UpdatePackageItemResType
} from '@/src/schemaValidations/package/package-item/package-item.schema'
import { CommonResType, MessageResType } from '@/src/schemaValidations/common.schema'
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const packageItemApiRequest = {

    getListPackageItem: ({ body, sessionToken }: { body: PackageItemListPageBodyType; sessionToken?: string }) =>
        http.post<PackageItemListPageResType>("/api/PackageItem/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getPackageItemById: ({ packageItemId , sessionToken }: { packageItemId : string; sessionToken?: string }) =>
        http.get<PackageItemListPageResType>(`/api/PackageItem/get-package-item/${packageItemId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createPackageItem: ({ body, sessionToken }: { body: CreatePackageItemBodyType; sessionToken?: string }) =>
        http.post<CreatePackageItemResType>('/api/PackageItem/create-package-item', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updatePackageItem: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
        http.post<UpdatePackageItemResType>('/api/PackageItem/update-package-item', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default packageItemApiRequest;