import http from "@/src/lib/httpAxios";

import {
    CommonResType,
    MessageResType,
    AdminDashboardCardResType
} from "@/src/schemaValidations/common.schema";

const adminDashboardApiRequest = {
    countOrder: (sessionToken?: string) =>
        http.get<CommonResType>("/api/Order/count-order", {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        }),
    countMoney: (sessionToken?: string) =>
        http.get<CommonResType>("/api/Order/count-money", {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        }),
    getAdminCardData: (sessionToken?: string) =>
        http.get<AdminDashboardCardResType>("/api/Dashboard/get-dashboard-admin", {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        }),

};
export default adminDashboardApiRequest;
