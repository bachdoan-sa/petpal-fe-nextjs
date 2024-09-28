import Image from "next/image";
import { DeleteButton, UpdateButton } from "@/src/components/admin/table/button";
import { Suspense } from "react";
import Pagination from "@/src/components/admin/table/pagination";
import kcenterApiRequest from "@/src/apiRequests/pet-center";
import { PetCenterListPageBodyType, PetCenterType } from "@/src/schemaValidations/petcenter.schema";
import { cookies } from "next/headers";

export default async function KCenterTable({ query, currentPage }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    const body: PetCenterListPageBodyType = {
        page: currentPage,
        size: 6,
        search: query
    }
    let kcenters: PetCenterType[] = [];
    let totalPages: number = 1;
    try {
        const response = await kcenterApiRequest.getListPageCareCenterWithToken({ body, sessionToken });
        totalPages = response.payload?.data?.paging?.maxPage;
        kcenters = response.payload?.data?.list;
    } catch (error: any) {
        console.log(error);
    }
    return (
        <>
            <div className="mt-6 d-flex flex-wrap">
                <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                    <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái bkcenter table cho đẹp*/}

                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Center Name</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Address</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Rating</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Description</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th>
                                    <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {kcenters?.map((kcenter) => (
                                    <tr key={kcenter.id} className="text-sm">
                                        <td className="p-2 text-left">
                                            <div className="d-flex items-center">
                                                <p className="table-first-td">{kcenter.careCenterName}</p>
                                            </div>
                                        </td>
                                        <td className="p-2 text-left">{kcenter.address}</td>
                                        <td className="p-2 text-left">{kcenter.averageRating}</td>
                                        <td className="p-2 text-left">{kcenter.description}</td>
                                        <td className="p-2 text-left">{kcenter.status}</td>
                                        {/* <td className="py-2 ps-0 text-left">{<Status status={kcenter.status ? '' : 'paid'} />}</td> */}
                                        <td className="p-2 d-flex justify-content-end">

                                            <UpdateButton link={"/admin/tables/kcenters"} id={kcenter.id} />
                                            <DeleteButton link={"/admin/tables/kcenters"} id={kcenter.id} />

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