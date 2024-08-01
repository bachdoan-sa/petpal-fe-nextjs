import { z } from "zod";
import { IsSucceedRes } from "./common.schema";
import { PagingRes, PagingBody } from "./paging/paging.schema";

// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const CalendarSchema = z.object({
    id: z.string().optional(),
    careCenterId: z.string().optional(),
    petAmountList: z.string().optional(),
    year: z.string().optional(),

    status: z.string().optional(),

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
})
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const CalendarRes = z.object({
    data: CalendarSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type CalendarResType = z.TypeOf<typeof CalendarRes>;



// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const CalendarList = z.object({
    Calendars: z.array(CalendarSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const CalendarListRes = z.object({
    data: CalendarList,
    message: z.string()
})
// 3.2
export type CalendarType = z.TypeOf<typeof CalendarSchema>;
export type CalendarListType = z.TypeOf<typeof CalendarList>
export type CalendarListResType = z.TypeOf<typeof CalendarListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const CalendarListPage = z.object({
    Calendars: z.array(CalendarSchema),
    paging: PagingRes
});
export const CalendarListPageRes = z.object({
    data: CalendarListPage,
    message: z.string()
});
// 4.1
export type CalendarListPageResType = z.TypeOf<typeof CalendarListPageRes>;

export const CalendarListPageBody = PagingBody;
export type CalendarListPageBodyType = z.TypeOf<typeof CalendarListPageBody>;

//Create Model
export const CreateCalendarBody = CalendarSchema;
export type CreateCalendarBodyType = z.TypeOf<typeof CreateCalendarBody>;
export const CreateCalendarRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateCalendarResType = z.TypeOf<typeof CreateCalendarRes>;


//Update Model
export const UpdateCalendarBody = CalendarSchema;
export type UpdateCalendarBodyType = z.TypeOf<typeof UpdateCalendarBody>;
export const UpdateCalendarRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdateCalendarResType = z.TypeOf<typeof UpdateCalendarRes>;