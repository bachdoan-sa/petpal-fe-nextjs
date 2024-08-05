import http from '@/src/lib/httpAxios'
import {
    PetListPageResType,
    PetListPageBodyType,
    CreatePetBodyType,
    CreatePetResType,
    UpdatePetResType
} from '@/src/schemaValidations/pet.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const PetApiRequest = {
    getListPetForUser: ({ body, sessionToken }: { body: PetListPageBodyType; sessionToken?: string }) =>
        http.post<PetListPageResType>("/api/Pet/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getPetById: ({ petId, sessionToken }: { petId: string; sessionToken?: string }) =>
        http.get<PetListPageResType>(`/api/Pet/get-pet/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createPet: ({ body, sessionToken }: { body: FormData; sessionToken?: string }) =>
        http.post<CreatePetResType>('/api/Pet/create-pet', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updatePet: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
        http.post<UpdatePetResType>('/api/Pet/update-pet', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default PetApiRequest