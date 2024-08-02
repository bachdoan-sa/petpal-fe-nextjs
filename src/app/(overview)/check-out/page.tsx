import React from "react";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import BillingDetails from "@/src/app/(overview)/check-out/billing-details";
import OrderSummary from "./order-summary";
import Payment from "@/src/components/shop/Payment";
import ShipingAddress from "@/src/components/shop/ShipingAddress";
import { cookies } from "next/headers";
import { useAppContext } from "../../app-provider";


function checOutPage({packageId}:{packageId:string}) {

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  return (
    <>
      {/* <Breadcrumb pageName="Check Out" pageTitle="Check Out" /> */}
      <div className="checkout-section pt-10 pb-10">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <BillingDetails sessionToken={sessionToken}/>
              {/* <ShipingAddress /> */}
            </div>
            <aside className="col-lg-5">
              <OrderSummary packageId={packageId} />
              <Payment />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default checOutPage;
