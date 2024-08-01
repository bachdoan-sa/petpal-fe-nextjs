import http from '@/src/lib/httpAxios'
import {
    CalendarListPageBodyType,
    CalendarListPageResType,
    CalendarResType,
    CreateCalendarBodyType,
    CreateCalendarResType,
    UpdateCalendarBodyType,
    UpdateCalendarResType
} from '@/src/schemaValidations/calendar.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

//API Controller này bên BackEnd đang lỗi

const calendarApiRequest = {
    getListPageCalendar: (body: CalendarListPageBodyType) => http.post<CalendarListPageResType>('/api/Calendar/get-list', body),
    getCalendarById: (id: string) => http.get<CalendarResType>('/api/Calendar/get-calendar/' + id),
    createCalendar: ({ body, sessionToken }: { body: CreateCalendarBodyType; sessionToken?: string }) =>
        http.post<CreateCalendarResType>("/api/Calendar/create-calendar", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updateCalendar: ({ body, sessionToken }: { body: UpdateCalendarBodyType; sessionToken?: string }) =>
        http.post<UpdateCalendarResType>("/api/Calendar/create-calendar", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            })
}
export default calendarApiRequest;