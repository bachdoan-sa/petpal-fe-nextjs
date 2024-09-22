import http from '@/src/lib/httpAxios';
import {
    CreatePetTypeBodyType,
    CreatePetTypeResType,
    PetTypeListPageBodyType,
    PetTypeListPageResType,
    PetTypeListResType,
    UpdatePetTypeResType
} from '@/src/schemaValidations/pet-type.schema';
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const PetTypeApiRequest = {
    getListPetTypeForUser: ({ body, sessionToken }: { body: PetTypeListPageBodyType; sessionToken?: string }) =>
        http.post<PetTypeListResType>("/api/PetType/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getPetTypeById: ({ petId, sessionToken }: { petId: string; sessionToken?: string }) =>
        http.get<PetTypeListPageResType>(`/api/PetType/get-pet-type/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createPetType: ({ body, sessionToken }: { body: CreatePetTypeBodyType; sessionToken?: string }) =>
        http.post<CreatePetTypeResType>('/api/PetType/create-pet-type', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updatePetType: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
        http.post<UpdatePetTypeResType>('/api/PetType/update-pet-type', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default PetTypeApiRequest