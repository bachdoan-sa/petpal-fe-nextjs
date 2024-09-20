import http from "@/src/lib/httpAxios";
import {
  CreatePackageBodyType,
  CreatePackageResType,
  CreatePackageWithItemsBodyType,
  CreatePackageWithItemsResType,
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

  getListPagePackage: ({ body, sessionToken }: { body: PackageListPageBodyType; sessionToken?: string }) =>
    http.post<PackageListPageResType>("/api/Package/get-list", body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  createPackage: ({ body, sessionToken }: { body: CreatePackageWithItemsBodyType; sessionToken?: string }) =>
    http.post<CreatePackageWithItemsResType>('/api/Package/create', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  updatePackage: ({ body, sessionToken }: { body: UpdatePackageBodyType; sessionToken?: string }) =>
    http.post<UpdatePackageResType>('/api/Package/update', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  uploadPackageImage: ({ body, sessionToken }: { body: FormData; sessionToken?: string }) =>
    http.post<CreatePackageResType>('/api/Package/upload-package-image', body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),

};
export default packageApiRequest;
