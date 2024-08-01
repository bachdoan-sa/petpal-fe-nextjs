import http from '@/src/lib/httpAxios'
import {
    CreateOrderBodyType,
    CreateOrderResType,
    OrderListPageBodyType,
    OrderListPageResType,
    OrderResType
} from '@/src/schemaValidations/order.schema'
import { CommonResType, MessageResType } from '@/src/schemaValidations/common.schema'

const orderApiRequest = {
    approveRequest: ({ orderId, sessionToken }: { orderId: string; sessionToken?: string }) =>
        http.post<OrderResType>("/api/Order/approve-request", orderId,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    rejectRequest: ({ orderId, sessionToken }: { orderId: string; sessionToken?: string }) =>
        http.post<OrderResType>("/api/Order/reject-request", orderId,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    performTransaction: ({ orderId, sessionToken }: { orderId: string; sessionToken?: string }) =>
        http.post<OrderResType>("/api/Order/perform-transaction", orderId,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    countOrder: (sessionToken?: string) =>
        http.get<CommonResType>("/api/Order/count-order",
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    countMoney: (sessionToken?: string) =>
        http.get<CommonResType>("/api/Order/count-money",
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    userCreateOrder: (body: CreateOrderBodyType) => http.post<CreateOrderResType>('/api/Order/create-order-request', body),
    getListOrderForManager: ({ body, sessionToken }: { body: OrderListPageBodyType; sessionToken?: string }) =>
        http.post<OrderListPageResType>("/api/Order/get-order-request", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            })
}
export default orderApiRequest;