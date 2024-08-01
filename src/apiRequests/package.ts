import http from "@/src/lib/httpAxios";
import {
  PackageListPageBodyType,
  PackageListPageResType,
  PackageResType,
} from "@/src/schemaValidations/package/package.schema";
import { MessageResType } from "@/src/schemaValidations/common.schema";

const packageApiRequest = {
  getListPackageByKCenterWithPage: (body: PackageListPageBodyType) =>
    http.post<PackageListPageResType>(
      "/api/Package/get-list-by-carecenter-id",
      body
    ),
    getPackageById: (body: { id: string }) => 
      http.post<PackageResType>('/api/Package/get-by-id', body)
};
export default packageApiRequest;
