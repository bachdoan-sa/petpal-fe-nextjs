import http from "@/src/lib/httpAxios";
import {
  PetListPageResType,
  PetListPageBodyType,
  CreatePetBodyType,
  CreatePetResType,
  UpdatePetResType,
  PetResType,
} from "@/src/schemaValidations/pet.schema";
import { CommonResType, MessageResType } from "@/src/schemaValidations/common.schema";
import { PetListKcenterPageResType, UpdatePackageBodyType } from "../schemaValidations/package/package.schema";

const PetApiRequest = {
  getListPetForUser: ({
    body,
    sessionToken,
  }: {
    body: PetListPageBodyType;
    sessionToken?: string;
  }) =>
    http.post<PetListPageResType>("/api/Pet/get-list", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getActiveListPetForUser: ({
    body,
    packageId,
    sessionToken,
  }: {
    body: PetListPageBodyType;
    packageId: string;
    sessionToken?: string;
  }) =>
    http.post<PetListPageResType>(
      `/api/Pet/get-active-list?packageId=${packageId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  getPetById: ({
    petId,
    sessionToken,
  }: {
    petId: string;
    sessionToken?: string;
  }) =>
    http.get<PetResType>(`/api/Pet/get-pet/${petId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  createPet: ({
    body,
    sessionToken,
  }: {
    body: FormData;
    sessionToken?: string;
  }) =>
    http.post<CreatePetResType>("/api/Pet/create-pet", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  updatePet: ({
    body,
    sessionToken,
  }: {
    body: FormData;
    sessionToken?: string;
  }) =>
    http.post<UpdatePetResType>("/api/Pet/update-pet", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getCareCenterPetList: ({
    body,
    sessionToken,
  }: {
    body: PetListPageBodyType;
    sessionToken?: string;
  }) =>
    http.post<PetListKcenterPageResType>("/api/Pet/get-care-center-pet-list", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
    checkIn: ({ params, body, sessionToken }: { params: { petId: string; isCheckIn: boolean }; body: FormData; sessionToken?: string }) =>
      http.post<CommonResType>(`/api/Pet/check-in?petId=${params.petId}&isCheckIn=${params.isCheckIn}`, body,
          {
              headers: {
                  Authorization: `Bearer ${sessionToken}`
              }
          }),
  checkOut: ({params, body, sessionToken }: { params: { petId: string; isCheckOut: boolean }; body: FormData; sessionToken?: string }) =>
      http.post<CommonResType>(`/api/Pet/check-out?petId=${params.petId}&isCheckOut=${params.isCheckOut}`, body,
          {
              headers: {
                  Authorization: `Bearer ${sessionToken}`
              }
          }),
};
export default PetApiRequest;
