import React from "react";
import Home1About from "@/src/components/about/Home1About";
import Home1Team from "@/src/components/team/Home1Team";
import ChooseUs from "@/src/components/chooseUs/ChooseUs";


function AboutPage() {
    return (
        <>

            {/* <Breadcrumb pageName="About Me" pageTitle="About Me" /> */}
            <Home1About />
            {/* <AboutService /> */}
            {/* <Home1Testimonial /> */}
            <ChooseUs />
            <Home1Team />

        </>
    );
}

export default AboutPage;
