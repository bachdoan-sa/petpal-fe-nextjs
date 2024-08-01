'use client'
import packageApiRequest from "@/src/apiRequests/package";
import OthersProduct from "@/src/components/shop/OthersProduct";
import ProductDetails from "@/src/components/shop/ProductDetails";
import SingleProductDescription from "@/src/components/shop/SingleProductDescription";
import React, { useEffect, useState } from "react";
import Package from "@/src/components/manager/test/Package";
import PackageDetailComponent from"@/src/components/center/PackageDetail";
import { PackageType } from "@/src/schemaValidations/package/package.schema";

export default function PackageDetail({
  params,
}: {
  params: { centerId: String; packageId: string };
}) {
  const packageId = params.packageId;
  const [packageDetail, setPackageDetail] = useState<PackageType>();
  useEffect(() => {
    if (packageId) {
      const fetchPackageById = async () => {
        try {
          const response = await packageApiRequest.getPackageById({id: packageId});
          setPackageDetail(response.payload.data)
          // console.log("Package data: hahaha", packageDetail);
        } catch (error) {
          console.error("Error fetching package:", error);
        } finally {

        }
      };
      fetchPackageById();
      
    }
    
  }, [packageId]);
  console.log("Package data: hihi", packageDetail);
  return (
    <>
      {/* <Breadcrumb pageName="Shop Details" pageTitle="Shop Details" /> */}
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <h1>
            Review {params.packageId} - {params.centerId}
          </h1>
          <PackageDetailComponent packageDetail={packageDetail} />
          <SingleProductDescription />
          <OthersProduct />
        </div>
      </div>
    </>
  );
}
