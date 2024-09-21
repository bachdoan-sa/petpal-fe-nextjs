import Image from "next/image";
import { DeleteButton, DetailButton, UpdateButton } from "@/src/components/admin/table/button";
import { Suspense } from "react";
import Pagination from "../pagination";
import userApiRequest from "@/src/apiRequests/user";
import { UserListPageBodyType, UserType } from "@/src/schemaValidations/user.schema";
import { cookies } from "next/headers";
import Status from "./status";

export default async function PendingPartnerTable({ query, currentPage }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    const body: UserListPageBodyType = {
        page: currentPage,
        size: 6,
        search: query
    }
    let users: UserType[] = [];
    let totalPages: number = 1;
    try {
        const response = await userApiRequest.getListPagePendingPartner({ body, sessionToken });
        totalPages = response.payload?.data?.paging?.maxPage;
        users = response.payload?.data?.list;
    } catch (error: any) {
        console.log(error);
    }
    return (
        <>
            {(users?.length > 0) ? (
                <>
                    <div className="mt-6 d-flex flex-wrap">
                        <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                            <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái buser table cho đẹp*/}

                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tên</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Email</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>address</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Số điện thoại</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th>
                                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {users.map((user) => (
                                            <tr key={user.id} className="text-sm">
                                                <td className="p-2 text-left">
                                                    <div className="d-flex items-center">
                                                        <p className="table-first-td">{user.fullName}</p>
                                                    </div>
                                                </td>
                                                <td className="p-2 text-left">{user.email}</td>
                                                <td className="p-2 text-left">{user.address}</td>
                                                <td className="p-2 text-left">{user.phoneNumber}</td>
                                                <td className="py-2 ps-0 text-left">{<Status status={user.status ?? ''} />}</td>
                                                <td className="p-2 d-flex justify-content-end">

                                                    <DetailButton link={"/admin/partners/"} id={user.id} />
                                                    <DeleteButton link={"/admin/partners"} id={user.id} />

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
            ) : (
                <>
                    <div className="mt-6 d-flex flex-wrap">
                        <div className="d-inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                            <div className="p-2 md:pt-0 w-100 bg-gray-200 d-flex justify-content-center" style={{ borderRadius: "10px" }}>
                                <h3>Hiện không có đối tác nào đang chờ duyệt!</h3>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );

}