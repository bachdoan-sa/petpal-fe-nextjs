import http from '@/src/lib/httpAxios'
import {
  PetCenterListPageResType,
  PetCenterListPageBodyType
} from '@/src/schemaValidations/petcenter.schema'
import { CommonResType, MessageResType } from '@/src/schemaValidations/common.schema'
import { CreateBlogResType } from '../schemaValidations/blog.schema';

const petCenterApiRequest = {
  getListCareCenterWithPage: (body: PetCenterListPageBodyType) => http.post<PetCenterListPageResType>('/api/CareCenter/get-list', body),
  getListPageCareCenterWithToken: ({ body, sessionToken }: { body: PetCenterListPageBodyType; sessionToken?: string }) =>
    http.post<PetCenterListPageResType>('/api/CareCenter/get-list', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  createPetCenterWithManager: ({ body, sessionToken }: { body: FormData; sessionToken?: string }) =>
    http.post<CreateBlogResType>('/api/CareCenter/create-carecenter-and-manager', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),

}
export default petCenterApiRequest