import http from '@/src/lib/httpAxios'
import {
  PackageListPageBodyType,
  PackageListPageResType
} from '@/src/schemaValidations/package/package.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const packageApiRequest = {
    getListPackageByKCenterWithPage: (body: PackageListPageBodyType) => http.post<PackageListPageResType>('/api/Package/get-list-by-carecenter-id', body)
  }
  export default packageApiRequest;