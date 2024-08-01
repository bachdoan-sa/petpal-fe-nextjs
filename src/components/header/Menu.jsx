// components/BootstrapMenu.js
"use client";
import React, { useState } from "react";
import UserInfo from "../user/UserInfo";
import PetInfo from "../user/PetInfo";

const BootstrapMenu = () => {
  const [activeComponent, setActiveComponent] = useState("User");

  const renderComponent = () => {
    switch (activeComponent) {
      case "User":
        return <UserInfo />;
      case "Pet":
        return <PetInfo />;
      default:
        return <div>Content area...</div>;
    }
  };
  return (
    <div classNameName="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 menu-profile">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a> */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a
                  onClick={() => setActiveComponent("User")}
                  className="nav-link align-middle px-0"
                >
                  <i className="fs-4 bi-person"></i>
                  {"  "}
                  <span className="ms-1 d-none d-sm-inline">Account</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveComponent("Pet")}
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-suit-heart"></i>
                  {"  "}
                  <span className="ms-1 d-none d-sm-inline">My Pets</span>
                </a>
              </li>
              {/* <li>
                <hr className="" />
              </li> */}
              <li>
                <a className="nav-link px-0 align-middle" href="#">
                  <i className="fs-4 bi bi-gear"></i>
                  {"  "}
                  <span className="ms-1 d-none d-sm-inline">Setting</span>
                </a>
              </li>
              <li>
                <a className="nav-link px-0 align-middle" href="/logout">
                  <i className="fs-4 bi-box-arrow-right"></i>
                  {"  "}
                  <span className="ms-1 d-none d-sm-inline">Sign out</span>
                </a>
              </li>
            </ul>
            <hr />

          </div>
        </div>
        <div className="col py-3">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default BootstrapMenu;
