import http from "@/src/lib/httpAxios";

import {
    CommonResType,
    MessageResType,
    PartnerDashboardCardResType
} from "@/src/schemaValidations/common.schema";

const partnerDashboardApiRequest = {
    getDashboardCardData: (sessionToken?: string) =>
        http.get<PartnerDashboardCardResType>("/api/Dashboard/get-dashboard-partner", {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        }),

};
export default partnerDashboardApiRequest;
