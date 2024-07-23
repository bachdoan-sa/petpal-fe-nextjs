import React from "react";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import OthersProduct from "@/src/components/shop/OthersProduct";
import ProductDetails from "@/src/components/shop/ProductDetails";
import SingleProductDescription from "@/src/components/shop/SingleProductDescription";

function ShopDetails() {
  return (
    <>
      {/* <Breadcrumb pageName="Shop Details" pageTitle="Shop Details" /> */}
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <ProductDetails />
          <SingleProductDescription />
          <OthersProduct />
        </div>
      </div>
    </>
  );
}

export default ShopDetails;
