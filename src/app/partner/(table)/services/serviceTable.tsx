'use client'
import Image from "next/image";

import { DeleteButton, UpdateButton } from '@/src/components/admin/table/button';
import ServiceApiRequest from "@/src/apiRequests/service";
import { ServiceListPageBodyType, ServiceType } from "@/src/schemaValidations/service.schema";
import { Suspense, useEffect, useState } from "react";
import Pagination from "@/src/components/admin/table/pagination";

export default function ServiceTable({ query, currentPage, sessionToken }) {

    const [list, setList] = useState<ServiceType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const body: ServiceListPageBodyType = {

            page: currentPage,
            size: 6,
            search: query ?? "",
        }
        async function getList() {
            try {
                setLoading(true);
                console.log(loading);
                console.log("lấy danh sách");
                const response = await ServiceApiRequest.getListService({ body, sessionToken });
                setList(response.payload?.data?.list);
                setTotalPages(response.payload?.data?.paging?.maxPage);
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getList();
    }, [query, currentPage]);

    return (
        <>

            {
                (!loading ?
                    ((list?.length > 0) ? (
                        <>
                            <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                                <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}
                                    <table className="table table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tên</th>
                                                <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Mô tả</th>
                                                <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Mức độ rằng buộc</th>
                                                <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Trạng thái</th>
                                                {/* <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th> */}
                                                <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {list.map((service) => (
                                                <tr key={service.id} className="text-sm">
                                                    <td className="p-2 text-left">
                                                        {service.name}
                                                    </td>
                                                    <td className="p-2 text-left">{service.description}</td>
                                                    <td className="p-2 text-left">{service.isRequired}</td>
                                                    <td className="p-2 text-left">{service.status}</td>
                                                    {/* <td className="py-2 ps-0 text-left">{<Status status={service.status ?? ''} />}</td> */}
                                                    <td className="p-2 d-flex justify-content-end">

                                                        <UpdateButton link={"/partner/services/" + service.id + "/edit"} />
                                                        <DeleteButton link={"/partner/services"} id={service.id} />

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mt-6 d-flex flex-wrap">
                                <div className="d-inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                                    <div className="p-2 md:pt-0 w-100 bg-gray-200 d-flex justify-content-center" style={{ borderRadius: "10px" }}>
                                        <h3>Không tìm thấy dịch vụ nào.</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )) : (
                        <>
                            <div className="mt-6 d-flex flex-wrap">
                                <div className="d-inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                                    <div className="p-2 md:pt-0 w-100 bg-gray-200 d-flex justify-content-center" style={{ borderRadius: "10px" }}>
                                        <h3>Đang truy vấn dữ liệu! {loading}</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )
            }
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Suspense>
                    <Pagination totalPages={totalPages} />
                </Suspense>
            </div>
        </>
    );
}