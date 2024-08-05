import { z } from "zod";
import { IsSucceedRes } from "./common.schema";
import { PagingRes, PagingBody } from "./paging/paging.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const OrderSchema = z.object({
    id: z.string().optional(),
    currentPrice: z.number(),
    fromDate: z.string(),
    toDate: z.string(),
    receiveTime: z.number(),
    returnTime: z.string(),
    status: z.string().optional(),
    userId: z.string().optional(),
    petId: z.string(),
    packageId: z.string()
});
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const OrderRes = z.object({
    data: OrderSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type OrderResType = z.TypeOf<typeof OrderRes>;



// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const OrderList = z.object({
    orders: z.array(OrderSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const OrderListRes = z.object({
    data: OrderList,
    message: z.string()
})
// 3.2
export type OrderType = z.TypeOf<typeof OrderSchema>;
export type OrderListType = z.TypeOf<typeof OrderList>
export type OrderListResType = z.TypeOf<typeof OrderListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const OrderListPage = z.object({
    orders: z.array(OrderSchema),
    paging: PagingRes
});
export const OrderListPageRes = z.object({
    data: OrderListPage,
    message: z.string()
});
// 4.1
export type OrderListPageResType = z.TypeOf<typeof OrderListPageRes>;

export const OrderListPageBody = PagingBody;
export type OrderListPageBodyType = z.TypeOf<typeof OrderListPageBody>;


export const CreateOrderBody = z.object({
    id: z.string().optional(),
    petId: z.string(),
    packageId: z.string(),
    detail: z.string(),
    fromDate: z.date(),
    toDate: z.date(),
    receiveTime: z.string(),
    returnTime: z.string(),
});
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>;

export const CreateOrderRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateOrderResType = z.TypeOf<typeof CreateOrderRes>;