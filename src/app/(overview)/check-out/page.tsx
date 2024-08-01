import React from "react";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import BillingDetails from "@/src/components/shop/BillingDetails";
import OrderSummary from "@/src/components/shop/OrderSummary";
import Payment from "@/src/components/shop/Payment";
import ShipingAddress from "@/src/components/shop/ShipingAddress";

function checOutPage() {
  return (
    <>
      {/* <Breadcrumb pageName="Check Out" pageTitle="Check Out" /> */}
      <div className="checkout-section pt-10 pb-10">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <BillingDetails />
              {/* <ShipingAddress /> */}
            </div>
            <aside className="col-lg-5">
              <OrderSummary />
              {/* <Payment /> */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default checOutPage;
