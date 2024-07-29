import http from '@/src/lib/httpAxios'
import {
  PetCenterListPageResType,
  PetCenterListPageBodyType
} from '@/src/schemaValidations/petcenter.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const petCenterApiRequest = {
    getListCareCenterWithPage: (body: PetCenterListPageBodyType) => http.post<PetCenterListPageResType>('/api/CareCenter/get-list', body)
  }
  export default petCenterApiRequest