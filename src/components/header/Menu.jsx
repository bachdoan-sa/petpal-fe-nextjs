// components/BootstrapMenu.js
"use client";
import Link from "next/link";

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
            <Link href={`/user/profile`}>
              <div className="nav-link align-middle px-0">
                <i className="fs-4 bi-person"></i>
                <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                  Thông tin tài khoản{" "}
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/user/pets`}>
              <div className="nav-link px-0 align-middle">
                <i className="fs-4 bi-suit-heart"></i>
                <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                  Thú Cưng Của Tôi
                </span>
              </div>
            </Link>
          </li>

          {/* <li>
            <a className="nav-link px-0 align-middle" href="pet-package">
              <i className="fs-4 bi-card-list"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">Gói Dịch Vụ</span>
            </a>
          </li> */}
          <li>
            <Link href={`/user/order-history`}>
              <div className="nav-link px-0 align-middle">
                <i className="fs-4 bi bi-box"></i>
                <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                  Gió Chăm sóc
                </span>
              </div>
            </Link>
          </li>
          <li>
            <a className="nav-link px-0 align-middle" href="#">
              <i className="fs-4 bi bi-bell"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                Thông báo
              </span>
            </a>
          </li>
          <li>
            <a className="nav-link px-0 align-middle" href="#">
              <i className="fs-4 bi bi-gear"></i>
              <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                Cài Đặt
              </span>
            </a>
          </li>

          <li>
            <a href="/  ">
              <div className="nav-link px-0 align-middle" >
                <i className="fs-4 bi-box-arrow-right"></i>
                <span className="mx-2 d-none d-sm-inline text-uppercase fw-bold">
                  Đăng Xuất
                </span>
              </div>
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default BootstrapMenu;
