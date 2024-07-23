import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Footer1 from "../components/footer/Footer1";
import Header1 from "../components/header/Header1";
import Layout from "../layout/Layout";


function errorPage() {
  return (
    <Layout>
      {/* <Breadcrumb pageName="Error" pageTitle="Error" /> */}
      <div className="error-page mt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="error-wrapper">
                <div className="error-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/error-img.png"
                    alt=""
                  />
                </div>
              </div> */}
              <div className="error-content-area">
                <h2>Something Went Wrong</h2>
                <p>
                  Donec bibendum enim ut elit porta ullamcorper. Vestibulum Nai
                  quam nulla, venenatis eget dapibus ac, catali topuny wekemdini
                  iaculis vitae nulla. Morbi mattis nec mi ac mollis.{" "}
                </p>
                <div className="error-btn">
                  <Link legacyBehavior href="/">
                    <a className="primary-btn1">
                      <img src="assets/images/icon/home-icon.svg" alt="" /> Back
                      to home
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default errorPage;
