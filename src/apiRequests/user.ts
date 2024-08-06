import http from '@/src/lib/httpAxios'
import {
    UserListPageResType,
    UserListPageBodyType,
    CreateUserBodyType,
    CreateUserResType,
    UpdateUserResType,
    UserResType,
    UserListPageFilterRSBodyType
} from '@/src/schemaValidations/user.schema'
import { CommonResType, MessageResType } from '@/src/schemaValidations/common.schema'
import { UpdatePackageBodyType } from '../schemaValidations/package/package.schema';

const UserApiRequest = {
    getListPageUserDetail: ({ body, sessionToken }: { body: UserListPageBodyType; sessionToken?: string }) =>
        http.post<UserListPageResType>("/api/User/get-list", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getListPageUser: ({ body, sessionToken }: { body: UserListPageFilterRSBodyType; sessionToken?: string }) =>
        http.post<UserListPageResType>("/api/User/get-user", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getListPagePendingPartner: ({ body, sessionToken }: { body: UserListPageBodyType; sessionToken?: string }) =>
        http.post<UserListPageResType>("/api/User/get-pending-partner", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getPendingPartnerById: ({ userId, sessionToken }: { userId: string; sessionToken?: string }) =>
        http.get<UserResType>(`/api/User/get-pending-partner/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getUserById: ({ userId, sessionToken }: { userId: string; sessionToken?: string }) =>
        http.get<UserResType>(`/api/User/get-user-by-id?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    getUserInfoByToken: (sessionToken) =>
        http.get<UserResType>('/api/User/get-info',
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    createUser: ({ body, sessionToken }: { body: CreateUserBodyType; sessionToken?: string }) =>
        http.post<CreateUserResType>('/api/User/create-user', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updateUser: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
        http.post<UpdateUserResType>('/api/User/update-user', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    countUser: (sessionToken?: string) =>
        http.get<CommonResType>("/api/User/count-user",
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    approvePartnerRegistration: ({ body, sessionToken }: { body: { partnerId: string }; sessionToken?: string }) =>
        http.post<CommonResType>('/api/User/approve-partner-registration', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    rejectPartnerRegistration: ({ body, sessionToken }: { body: { partnerId: string }; sessionToken?: string }) =>
        http.post<CommonResType>('/api/User/reject-partner-registration', body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
}
export default UserApiRequest