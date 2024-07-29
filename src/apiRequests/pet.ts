import http from '@/src/lib/httpAxios'
import {
    PetListPageResType,
    PetListPageBodyType
} from '@/src/schemaValidations/pet.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const PetApiRequest = {
    getListPetForUser: ({ body, sessionToken }: { body: PetListPageBodyType; sessionToken?: string }) =>
        http.post<PetListPageResType>("/api/Pet/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            })
}
export default PetApiRequest