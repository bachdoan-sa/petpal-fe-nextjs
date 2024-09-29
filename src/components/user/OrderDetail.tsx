"use client";
import orderApiRequest from "@/src/apiRequests/order";
import { formatDateToLocal } from "@/src/lib/utils";
import { OrderType } from "@/src/schemaValidations/order.schema";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Link from "next/link";

export default function OrderDetail({ sessionToken, id }) {
  const [orderDetail, setOrderDetail] = useState<OrderType>();
  const [payURL, setpayURL] = useState<string>("");
  useEffect(() => {
    if (id) {
      const fetchPackageById = async () => {
        try {
          const response = await orderApiRequest.getOrderById(id, sessionToken);
          setOrderDetail(response.payload.data);
          console.log(`order nay`, orderDetail);
          // console.log("Package data: hahaha", packageDetail);
        } catch (error) {
          console.error("Error fetching package:", error);
        } finally {
        }
      };
      fetchPackageById();
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      const fetchPackageById = async () => {
        try {
          const response = await orderApiRequest.getOrderById(id, sessionToken);
          setOrderDetail(response.payload.data);
          console.log(`order nay`, orderDetail);
          // console.log("Package data: hahaha", packageDetail);
        } catch (error) {
          console.error("Error fetching package:", error);
        } finally {
        }
      };
      const getPayURL = async () => {
        try {
          const response = await orderApiRequest.getTransactionStatusVnpay(id, sessionToken);
          setpayURL(response.payload.data);
        } catch (error) {
          console.error("Error fetching package:", error);
        } finally {
        }
      }
      fetchPackageById();
      getPayURL();
    }
  }, [id]);
  const formatFromData = moment(orderDetail?.fromDate).format('DD/MM/YYYY');
  const formatToDate = moment(orderDetail?.toDate).format('DD/MM/YYYY');
  const petBirthday = moment(orderDetail?.pet?.birthday).format('DD/MM/YYYY');
  const calculateAge = (birthday) => {
    const today = moment();
    const birthDate = moment(birthday);
    return today.diff(birthDate, 'years');
  };
  return (

    <div className="checkout-section pt-10 pb-10">
      <Breadcrumb pageTitle="order Details" />
      <div className="container ">

        <div className="row pt-10">
          <div className="col-lg-6">
            {/* <OrderSummary packageId={orderDetail?.package?.id} /> */}
            <div className="added-product-summary mb-30">
              <h5 className="title-25 checkout-title">
                Package: {" "}
                {orderDetail?.package?.title || "No title"}
              </h5>
              <ul className="added-products">
                <li className="single-product d-flex justify-content-start">
                  <div className="product-img">
                    <img
                      src={
                        orderDetail?.package?.image ??
                        "/assets/images/bg/check-out-01.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="product-info">
                    <h5 className="product-title">
                      <a href="#">
                        {orderDetail?.package?.type || "No Type"}
                      </a>
                    </h5>
                    {/* <ProductPriceCount price={22} /> */}
                    <h4>
                      {orderDetail?.package?.totalPrice?.toLocaleString(
                        "vi-VN"
                      )}{" "}
                      <span>VNĐ</span>{" "}
                    </h4>
                  </div>
                </li>

                <li className="single-product d-flex justify-content-start">
                  <h5>
                    {orderDetail?.package?.description || "No Description"}
                  </h5>
                </li>

                <li className="single-product d-flex justify-content-start">
                  {orderDetail?.package?.items?.map((item) => {
                    return <h5>{item.serviceName}</h5>;
                  })}
                </li>
              </ul>
            </div>
          </div>

          <aside className="col-lg-6 ">
            {/* <div className=""> */}
            <div className="card card-optional mb-3 btn">
              <div className="row g-0">
                <div className="col-md-4 position-relative ">
                  <img
                    style={{ height: "100%", objectFit: "cover", width: "100%" }}
                    src={orderDetail?.pet?.profileImage}
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="card-title fw-bold">{orderDetail?.pet?.fullName}</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <h4>Pet type</h4>
                      </div>
                      <div className="col-4">Tuổi: {calculateAge(petBirthday)}</div>
                      <div className="col-4">Weight: {orderDetail?.pet?.weight}</div>
                    </div>
                    <div className="row">
                      <div className="col-4">Gender: {orderDetail?.pet?.gender}</div>
                      <div className="col-4">Breed :{orderDetail?.pet?.breed}</div>
                      <div className="col-4">Desexed : {orderDetail?.pet?.sterilise}</div>
                    </div>
                    <hr />
                    <p className="card-text">
                      <small className="text-muted">{orderDetail?.pet?.description}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card summary order */}
            <div className="added-product-summary mb-30">
              {/* <h5 className="title-25 checkout-title">
                {" "}
                {orderDetail?.package?.title || "No title"}
              </h5> */}
              <ul className="added-products">
                <li className="single-product d-flex justify-content-start">
                  <h5>Detail: {orderDetail?.detail || "No Detail"}</h5>
                </li>
                <li className="single-product d-flex justify-content-start">
                  <h5>Price: {orderDetail?.currentPrice || "No Price"} vnđ</h5>
                </li>
                <li className="single-product d-flex justify-content-start">
                  <h5>Ngày bắt đầu: <strong>{formatFromData}</strong></h5>
                </li>
                <li className="single-product d-flex justify-content-start">
                  <h5>Ngày kết thúc: <strong>{formatToDate}</strong></h5>
                </li>
                <li className="single-product d-flex justify-content-start">
                  <h5>Trạng thái: {orderDetail?.status || "No Price"}</h5>
                </li>
              </ul>
            </div>

            {/* </div> */}
            {/* {sessionToken ? null : (<p className="text-danger font-medium text-center">Bạn cần đăng nhập để sử dụng chức năng này!</p>)} */}
            {/* <div className="place-order-btn d-flex justify-content-center">

            <button disabled={isSubmitting || (sessionToken === undefined)} type="submit" className="primary-btn1 lg-btn">
              {isSubmitting ? "loading" : "Đăng kí dịch vụ"}
            </button>

          </div> */}
          </aside>
        </div>
        {(orderDetail?.status === "APPROVED") ?  (<Link className="btn btn-primary" href={payURL}> Thanh toán </Link>):(<></>) }

      </div>
    </div>

  );
}
