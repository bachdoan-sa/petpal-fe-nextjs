import React from "react";
import BillingDetails from "./billing-details";
import OrderSummary from "./order-summary";
import Payment from "@/src/components/shop/Payment";
import { cookies } from "next/headers";


function checOutPage({ params }: { params: { packageId: string } }) {

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

export default checOutPage;
