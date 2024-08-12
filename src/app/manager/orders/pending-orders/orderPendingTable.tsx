'use client'
import Image from "next/image";
import { getDataTestPages, getDataTestTable } from "@/src/data/apiService";
import { DeleteButton, UpdateButton } from "@/src/components/admin/table/button";
import { Suspense, useEffect, useState } from "react";
import Pagination from "@/src/components/admin/table/pagination";
import orderApiRequest from "@/src/apiRequests/order";
import { formatDateToLocal } from "@/src/lib/utils";
import { OrderListPageBodyType, OrderListType, OrderResType, OrderType } from "@/src/schemaValidations/order.schema";
import { toast } from "sonner";
import PackageDropdown from "../packageDropdown"
import PetDropdown from "../petDropdown"

export default function PendingOrderTable({ query, currentPage, sessionToken }) {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const body: OrderListPageBodyType = {
        page: currentPage,
        size: 6
    }
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await orderApiRequest.getListOrderForManager({ body, sessionToken });
                const data = response.payload?.data;
                if (data == null) {
                    return (<>
                        <h1>
                            Không có order nào cả.
                        </h1>
                    </>);
                }
                setTotalPages(response.payload?.data?.paging?.maxPage)
                setOrders(response.payload?.data?.orders)
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchAPI();
    }, [currentPage,query])

    return (
        <>
            <div className="mt-6 d-flex flex-wrap">
                <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                    <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}

                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Customer</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tên dịch vụ</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>currentPrice</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200 text-end" style={{ border: "none" }}>Từ ngày</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Đến ngày</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Trạng thái</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {orders?.map((order) => (
                                    <tr key={order.id} className="text-sm">
                                        <td className="p-2 text-left">
                                            <div className="d-flex items-center be-box">
                                                <PetDropdown value={order.pet} />
                                            </div>
                                        </td>
                                        <td className="p-2 be-box"> <PackageDropdown value={order.package} /></td>
                                        <td className="p-2 text-left">{order.currentPrice}</td>
                                        <td className="p-2 text-end">{formatDateToLocal(order.fromDate)}</td>
                                        <td className="p-2 text-left">{formatDateToLocal(order.toDate)}</td>
                                        <td className="p-2 text-left">{order.status}</td>
                                        <td className="p-2 d-flex justify-content-end">

                                            <UpdateButton link={"/admin/tables/orders"} id={order.id} />
                                            <DeleteButton link={"/admin/tables/orders"} id={order.id} />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Suspense>
                    <Pagination totalPages={totalPages} />
                </Suspense>
            </div>
        </>
    );

}