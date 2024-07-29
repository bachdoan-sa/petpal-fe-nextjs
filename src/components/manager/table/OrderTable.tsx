import Image from "next/image";
import { getDataTestPages, getDataTestTable } from "@/src/data/apiService";
import { DeleteButton, UpdateButton } from "@/src/components/admin/table/button";
import { Suspense } from "react";
import Pagination from "../../admin/table/pagination";
import orderApiRequest from "@/src/apiRequests/order";
import { OrderListPageBodyType, OrderListType, OrderResType } from "@/src/schemaValidations/order.schema";
import { cookies } from "next/headers";
import { toast } from "sonner";

export default async function orderTable({ query, currentPage }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    const body: OrderListPageBodyType = {
        page: currentPage,
        size: 6
    }
    try {
        const response = await orderApiRequest.getListOrderForManager({ body, sessionToken });
        console.log(response);
        const totalPages = response.payload?.data?.paging?.maxPage;
        const orders = response.payload?.data?.orders;
        console.log(orders +"Tao khong on r");
        return (
            <>
                <div className="mt-6 d-flex flex-wrap">
                    <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                        <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}
            
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Customer</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>currentPrice</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>fromDate</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>toDate</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {orders?.map((order) => (
                                        <tr key={order.id} className="text-sm">
                                            <td className="p-2 text-left">
                                                <div className="d-flex items-center">                            
                                                    <p className="table-first-td">{order.userId}</p>
                                                </div>
                                            </td>
                                            <td className="p-2 text-left">{order.currentPrice}</td>
                                            <td className="p-2 text-left">{order.fromDate}</td>
                                            <td className="p-2 text-left">{order.toDate}</td>
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
    } catch (error: any) {
        console.log(error);
    }
}