import http from '@/src/lib/httpAxios'
import {
    CreateOrderBodyType,
    CreateOrderResType,
    OrderListPageBodyType,
    OrderListPageResType
} from '@/src/schemaValidations/order.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const orderApiRequest = {
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