'use client'
import Image from "next/image";
import { DeleteButton, UpdateButton } from "@/src/components/admin/table/button";
import { Suspense, useEffect, useState } from "react";
import Pagination from "@/src/components/admin/table/pagination";
import { formatDateToLocal } from "@/src/lib/utils";
import packageApiRequest from "@/src/apiRequests/package";
import { PackageListPageBodyType, PackageType } from "@/src/schemaValidations/package/package.schema";
import { toast } from "sonner";

export default function TablePackage({ query, currentPage, sessionToken }) {
    const [pageList, setPageList] = useState<PackageType[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const body: PackageListPageBodyType = {
            page: currentPage,
            size: 6,
            search: query
        }
        console.log(body);
        const fetchAPI = async () => {
            try {
                const response = await packageApiRequest.getListPagePackage({ body, sessionToken });
                const data = response.payload?.data;
                if (data == null) {
                    return (<>
                        <h1>
                            Không có package nào cả.
                        </h1>
                    </>);
                }
                setTotalPages(data?.paging?.maxPage)
                setPageList(data.list)
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchAPI();
    }, [currentPage, query])

    return (
        <>
            {(pageList?.length === 0 || pageList === undefined) ? (
                <p>
                    có gì đó sai sai? không data!?
                    thatja ra api chua fix response model 17/09
                </p>
            ) : (
                <>
                    <div className="mt-6 d-flex flex-wrap">

                        <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                            <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái bpackage table cho đẹp*/}

                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tên gói dịch vụ</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Mô tả gói</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Loại gói dịch vụ</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tổng giá</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Số thành phần</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Trạng thái</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                        {pageList.map((item) => (
                                            <tr key={item.id} className="text-sm">
                                                <td className="p-2 text-left">
                                                    <Image
                                                        width={28}
                                                        height={28}
                                                        src={item?.image ?? '/assets/images/blog/blog-author.png'}
                                                        className="rounded-full me-2"
                                                        alt={`${item.title}'s profile picture`}
                                                    />
                                                    <span className="table-first-td">{item.title ?? "Chưa đặt tên"}</span>
                                                </td>

                                                <td className="p-2 text-left">{item.description}</td>
                                                <td className="p-2 text-end">{item.type}</td>
                                                <td className="p-2 text-left">{item.totalPrice}</td>
                                                <td className="p-2 text-left">{item.items?.length}</td>
                                                <td className="p-2 text-left">{item.status}</td>

                                                <td className="p-2 d-flex justify-content-end">

                                                    <UpdateButton link={"/manager/packages/"} id={item.id} />
                                                    <DeleteButton link={"/manager/packages/"} id={item.id} />

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
            )}
        </>
    );

}