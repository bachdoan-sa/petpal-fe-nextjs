// components/BootstrapMenu.js
"use client";
import React, { useState } from "react";
import UserInfo from "../user/UserInfo";
import PetInfo from "../user/PetInfo";

const BootstrapMenu = () => {

  return (
    <div
      className="col-auto col-md-3 col-xl-2 px-0 menu-profile"
      style={{ overflowY: "auto" }}
    >
      <div className="d-flex justify-content-center align-items-center align-items-sm-center px-3 pt-2 text-white ml-4">
       
        <ul
          className="nav nav-pills flex-column mb-sm-auto ms-3 align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <a href="/profile" className="nav-link align-middle px-0">
              <i className="fs-4 bi-person"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Thông tin tài khoản </span>
            </a>
          </li>
          <li>
            <a className="nav-link px-0 align-middle" href="/pets">
              <i className="fs-4 bi-suit-heart"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Thú Cưng Của Tôi</span>
            </a>
          </li>

          <li>
            <a className="nav-link px-0 align-middle" href="pet-package">
              <i className="fs-4 bi-card-list"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Gói Dịch Vụ</span>
            </a>
          </li>
          <li>
            <a className="nav-link px-0 align-middle" href="#">
              <i className="fs-4 bi bi-gear"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Cài Đặt</span>
            </a>
          </li>

          <li>
            <a className="nav-link px-0 align-middle" href="/logout">
              <i className="fs-4 bi-box-arrow-right"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Đăng Xuất</span>
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default BootstrapMenu;
