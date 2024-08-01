import http from "@/src/lib/httpAxios";
import {
  CreatePackageBodyType,
  CreatePackageResType,
  PackageBykCenterListPageBodyType,
  PackageListPageBodyType,
  PackageListPageResType,
  PackageResType,
  UpdatePackageBodyType,
  UpdatePackageResType,
} from "@/src/schemaValidations/package/package.schema";
import { MessageResType } from "@/src/schemaValidations/common.schema";

const packageApiRequest = {
  getListPackageByKCenterWithPage: (body: PackageBykCenterListPageBodyType) =>
    http.post<PackageListPageResType>(
      "/api/Package/get-list-by-carecenter-id",
      body
    ),
  getPackageById: (body: { id: string }) =>
    http.post<PackageResType>('/api/Package/get-by-id', body),
  getListPagePackage: (body: PackageListPageBodyType) =>
    http.post<PackageListPageResType>(
      "/api/Package/get-list",
      body
    ),
  createPackage: ({ body, sessionToken }: { body: CreatePackageBodyType; sessionToken?: string }) =>
    http.post<CreatePackageResType>('/api/Package/create-package', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
    updatePackage: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
      http.post<UpdatePackageResType>('/api/Package/update-package', body,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      ),
};
export default packageApiRequest;
