import { z } from "zod";
import { IsSucceedRes } from "./common.schema";
import { PagingRes, PagingBody } from "./paging/paging.schema";
import { formatStringToTimestamp } from "../lib/utils";
import { PetSchema } from "./pet.schema";
import { PackageSchema } from "./package/package.schema";
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
    pet: PetSchema.optional(),
    packageId: z.string(),
    package: PackageSchema.optional(),
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


export const CreateOrderForm = z.object({
    petId: z.string({ required_error: "Hãy chọn một thú cưng!" }),
    packageId: z.string(),
    detail: z.coerce.string()
        .max(200, "Nội dung chỉ được tối đa 200 kí tự."),
    fromDate: z.coerce.date({ required_error: "Hãy chọn ngày bắt đầu!" })
        .refine((data) => data > new Date(), { message: "Ngày bắt đầu không thể trong quá khứ!" }),
    weeks: z.coerce.number({ required_error: "Thời lượng chăm sóc không được bỏ trống!" })
        .int("Số tuần phải là số nguyên!")
        .positive("Số tuần không được bé hơn 0!")
        .min(1, "Thời gian chăm sóc ít nhất là 1 tuần.")
        .max(12, "Thời gian chăm sóc nhiều nhất là 12 tuần."),
    receiveTime: z.coerce.string().time("Không bỏ trống thời gian."),
    returnTime: z.coerce.string().time("Không bỏ trống thời gian."),
}).refine((data) => {
    const receiveTime = formatStringToTimestamp(data.receiveTime);
    const returnTime = formatStringToTimestamp(data.returnTime);
    console.log(receiveTime, " < ", returnTime)
    return returnTime >= (receiveTime + (6 * 60 * 60));
}, {
    message: "Thời gian đón phải hơn ít nhất 6 giờ kể từ thời gian gửi",
    path: ["returnTime"],
});;
export type CreateOrderFormType = z.TypeOf<typeof CreateOrderForm>;

export const CreateOrderBody = z.object({
    petId: z.string(),
    packageId: z.string(),
    detail: z.coerce.string(),
    fromDate: z.coerce.date(),
    toDate: z.coerce.date(),
    receiveTime: z.coerce.string().time(),
    returnTime: z.coerce.string().time(),
});
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>;

export const CreateOrderRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateOrderResType = z.TypeOf<typeof CreateOrderRes>;

export const UpdateOrderFrom = z.object({
    id: z.string(),
})