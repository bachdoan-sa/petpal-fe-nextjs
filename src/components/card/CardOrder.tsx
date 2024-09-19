"use client";
import orderApiRequest from "@/src/apiRequests/order";
import { formatDateToLocal } from "@/src/lib/utils";
import {
  OrderListPageBodyType,
  OrderType,
} from "@/src/schemaValidations/order.schema";
import { useOrderStore } from "@/src/store/order-store";
import { useUserStore } from "@/src/store/user-store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardOrder({ query, currentPage, sessionToken }) {
  // const [orders, setOrders] = useState<OrderType[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  // const { setSessionToken } = useUserStore();
  // setSessionToken(sessionToken);
  const { setOrders, setTotalPages } = useOrderStore();
  const { orders } = useOrderStore();
  const body: OrderListPageBodyType = {
    page: currentPage,
    size: 20,
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await orderApiRequest.getListOrderForUser({
          body,
          sessionToken,
        });
        const data = response.payload?.data;
        console.log("data ne: ", data);
        if (data == null) {
          return (
            <>
              <h1>Không có order nào cả.</h1>
            </>
          );
        }
        setTotalPages(data.paging?.maxPage);
        setOrders(data.list);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchAPI();
  }, [currentPage, query]);
  return (
    <div>
      {orders?.map((order) => (
        <Link href={`/order-history/${order.id}`}>
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <strong>Package: {order.package?.title || "No Title"}</strong>
                </div>
                <div>
                  <div className="text-muted">
                    <strong>Thú cưng |</strong>{" "}
                    <strong className="text-success">
                      {order.pet?.fullName}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src={
                    order.package?.image ?? "/assets/images/bg/check-out-01.png"
                  }
                  alt="Product Image"
                  className="img-thumbnail me-3"
                  style={{ width: 80 }}
                />
                <div>
                  <p className="mb-1">
                    {order.detail || "No details available"}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Trạng thái |{" "}
                  <strong className="text-danger">{order.status}</strong>
                </div>
                <div className="text-end">
                  <div className="fw-bold">
                    Thành tiền:{" "}
                    <span className="text-danger">{order.currentPrice}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="mt-3 text-muted">
                  Ngày đăng ký gói:{" "}
                  <strong>{formatDateToLocal(order.fromDate)}</strong>
                  <br />
                  Gói sẽ có hiệu lực đến:{"   "}
                  <strong>{formatDateToLocal(order.toDate)}</strong>
                </div>
                <div className="mt-3">
                  <button className="btn btn-outline-primary me-2">
                    Đánh Giá
                  </button>
                  <button className="btn btn-outline-danger me-2">
                    Hủy gói
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
