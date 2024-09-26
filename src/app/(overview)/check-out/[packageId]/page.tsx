import React from "react";
import BillingDetails from "./billing-details";
import { cookies } from "next/headers";
import Page401 from "@/src/components/error/Page401";


function checkOutPage({ params }: { params: { packageId: string } }) {

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  return (
    <>
      {/* <Breadcrumb pageName="Check Out" pageTitle="Check Out" /> */}
      <div className="checkout-section pt-10 pb-10">
        <div className="container">

          <BillingDetails packageId={params.packageId} sessionToken={sessionToken} />
          {/* <ShipingAddress /> */}

        </div>
      </div>
    </>
  );
}

export default checkOutPage;
