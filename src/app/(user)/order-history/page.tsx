import orderApiRequest from "@/src/apiRequests/order";
import CardOrder from "@/src/components/card/CardOrder";
import { OrderListPageBodyType } from "@/src/schemaValidations/order.schema";
import { cookies } from "next/headers";
import React from "react";
import page_404 from "@/src/components/error/page_404";
import { useUserStore } from "@/src/store/user-store";

export default function OrderHistory({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (sessionToken == undefined) {
    return (
      //khi het token se hien ra thong bao yeu cau dang nhap lai
      <div className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="404_bg">
                  <h1 className="text-center">401</h1>
                </div>
                <div className="content_box_404">
                  <h3 className="h2">Hình như đã hết thời hạn đăng nhập</h3>
                  <p></p>
                  <a href="login">Đăng nhập lại</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // <page_404 />;
  }

  const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page ?? 1);
  return (
    <div>
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Tất cả
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Đang hoạt động
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              Hoàn thành
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Đã hủy
            </a>
          </li>
        </ul>

        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
          />
        </div>
        <CardOrder
          query={query}
          currentPage={currentPage}
          sessionToken={sessionToken}
        />
      </div>
    </div>
  );
}
