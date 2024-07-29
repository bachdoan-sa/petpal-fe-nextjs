import http from '@/src/lib/httpAxios'
import {
  CreateOrderBodyType,
  CreateOrderResType
} from '@/src/schemaValidations/order.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const orderApiRequest = {
    userCreateOrder: (body: CreateOrderBodyType) => http.post<CreateOrderResType>('/api/Order/create-order-request', body)
  }
  export default orderApiRequest;