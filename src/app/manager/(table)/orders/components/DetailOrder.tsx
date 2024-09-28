"use client";

import orderApiRequest from "@/src/apiRequests/order";
import { formatDateToLocal } from "@/src/lib/utils";
import { OrderType } from "@/src/schemaValidations/order.schema";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/src/components/admin/button";
import Image from "next/image";
import { inter } from "@/src/fonts/fonts";
import { toast } from "sonner";

export default function OrderDetail({ sessionToken, id }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [orderDetail, setOrderDetail] = useState<OrderType>();
    useEffect(() => {
        if (id) {
            const fetchPackageById = async () => {
                try {
                    const response = await orderApiRequest.getOrderById(id, sessionToken);
                    setOrderDetail(response.payload.data);
                } catch (error) {
                    console.error("Error fetching package:", error);
                } finally {
                }
            };
            fetchPackageById();
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
    const approveRequest = async () => {
        try {
            const response = await orderApiRequest.approveRequest({ orderId: id, sessionToken });
            toast.success("Chấp thuận yêu cầu thành công.");
        } catch (error) {
            toast.error("Chấp thuận yêu cầu thất bại.");
        }
    }
    const rejectRequest = async () => {
        try {
            const response = await orderApiRequest.rejectRequest({ orderId: id, sessionToken });
            toast.warning("Từ chối yêu cầu thành công.");
        } catch (error) {
            toast.error("Từ chối yêu cầu thất bại.");
        }
    }
    return (

        <div className="checkout-section">
            <div className="container ">
                <div className="row ">
                    <div className="col-6">
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
                                            <h4 className="card-title m-0 fw-bold">{orderDetail?.pet?.fullName}</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                Tuổi: <br />
                                                {(petBirthday === null) ? (calculateAge(petBirthday)) : "Chưa cập nhật"}
                                            </div>
                                            <div className="col-4">
                                                Cân nặng: <br />
                                                {orderDetail?.pet?.weight ?? "Chưa cập nhật"}
                                            </div>
                                            <div className="col-4">
                                                Giới tính: <br />
                                                {orderDetail?.pet?.gender ?? "Chưa cập nhật"}
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-4">
                                                Giống Loài: <br />
                                                {orderDetail?.pet?.breed ?? "Chưa cập nhật"}
                                            </div>
                                            <div className="col-4">
                                                Triệt Sản: <br />
                                                {orderDetail?.pet?.sterilise ?? "Chưa cập nhật"}
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="card-text">
                                            <small className="text-muted">{orderDetail?.pet?.description}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="added-product-summary mb-30 bg-white shadow-sm">
                            <h5 className="title-25 checkout-title">
                                Gói dịch vụ: {" "}
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

                                <li className="d-flex justify-content-start">
                                    <h5 className="text-2line-overflow">
                                        {(orderDetail?.package?.description || orderDetail?.package?.description !== "") || "_Không có mô tả_"}
                                    </h5>
                                </li>

                                <li className="d-flex justify-content-start">
                                    <h5>Số lượng dịch vụ kèm theo:  {orderDetail?.package?.items?.length ?? 0}</h5>
                                    {orderDetail?.package?.items?.map((item, index) => {
                                        if (index <= 3)
                                            return <h5>{item.serviceName}</h5>;
                                        else {
                                            return <Link href={"#"}>{"xem thêm..."}</Link>;
                                        }
                                    })}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 d-flex flex-column">

                        <div className="added-product-summary mb-30 bg-white shadow-sm" >
                            <h4 className="mb-3">Thông tin dịch vụ đã đặt:</h4>
                            <ul className="added-products">

                                <li className="d-flex justify-content-start  mb-2">
                                    <h5>Ngày bắt đầu: <strong>{formatFromData}</strong></h5>
                                </li>
                                <li className="d-flex justify-content-start  mb-2">
                                    <h5>Ngày kết thúc: <strong>{formatToDate}</strong></h5>
                                </li>
                                <li className="d-flex justify-content-start  mb-2">
                                    <h5>Giá: {orderDetail?.currentPrice || "Đang tải giá"} vnđ</h5>
                                </li>
                                <li className="d-flex justify-content-start  mb-2">
                                    <h5>Trạng thái: {orderDetail?.status || "Đang tải trạng thái!"}</h5>
                                </li>
                                <li className="d-flex justify-content-start mb-2">
                                    <h5>Ghi Chú: {orderDetail?.detail || "Không có gi chú nào."}</h5>
                                </li>
                                <li className="d-flex justify-content-start mb-2">
                                    <h5>Ngày tạo đơn: {formatDateToLocal(orderDetail?.createdAt) || "NaN"}</h5>
                                </li>
                            </ul>
                        </div>

                        <div className="added-product-summary mb-30 bg-white shadow-sm">
                            <div className="d-flex justify-content-end gap-4">
                                <Link
                                    href="/manager/orders"
                                    className={"d-flex align-items-center rounded-pill hover-for-bg-gray px-4 btn btn-sm btn-secondary " + inter.className}
                                >
                                    Trở về
                                </Link>
                                {orderDetail?.status !== "CREATED" ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            disabled={loading}
                                            className={(loading) ? "btn-dark" : "btn-danger"}
                                            onClick={() => rejectRequest()}
                                            type="button">

                                            {(loading) ? (
                                                <span className="">
                                                    Đang gửi yêu cầu
                                                    <Image width={20} height={20} alt="" src='\assets\spinner.svg' />
                                                </span>

                                            ) : "Từ chối yêu cầu"}

                                        </Button>
                                        <Button
                                            disabled={loading}
                                            className={(loading) ? "btn-dark" : "btn-primary"}
                                            onClick={() => approveRequest()}
                                            type="button">

                                            {(loading) ? (
                                                <span className="">
                                                    Đang gửi yêu cầu
                                                    <Image width={20} height={20} alt="" src='\assets\spinner.svg' />
                                                </span>

                                            ) : "Chấp nhận yêu cầu"}

                                        </Button>
                                    </>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
