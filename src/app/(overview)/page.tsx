import React from "react";
import Banner2 from "@/src/components/banner/Banner2";
import Home2ChooseUs from "@/src/components/chooseUs/Home2ChooseUs";
import Home2Contact from "@/src/components/contact/Home2Contact";
import Footer1 from "@/src/components/footer/Footer1";
import Header2 from "@/src/components/header/Header2";
import Home2Testimonial from "@/src/components/testimonial/Home2Testimonial";
import WorkProcess from "@/src/components/workProcess/WorkProcess";

function HomePage2() {
  return (
    <>
      <Banner2 />
      <Home2ChooseUs />
      <WorkProcess />
      <Home2Contact />
      <Home2Testimonial />
    </>
  );
}

export default HomePage2;
