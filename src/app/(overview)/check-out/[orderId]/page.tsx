import React from "react";
import BillingDetails from "./billing-details";
import OrderSummary from "./order-summary";
import Payment from "@/src/components/shop/Payment";
import { cookies } from "next/headers";


function checOutPage({ params }: { params: { orderId: string } }) {

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  return (
    <>
      {/* <Breadcrumb pageName="Check Out" pageTitle="Check Out" /> */}
      <div className="checkout-section pt-10 pb-10">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <BillingDetails sessionToken={sessionToken} />
              {/* <ShipingAddress /> */}
            </div>
            <aside className="col-lg-5">
              <OrderSummary packageId={params.orderId} />
              <Payment />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default checOutPage;
