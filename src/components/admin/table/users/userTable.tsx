import Image from "next/image";

import { DeleteButton, UpdateButton } from "../button";
import { cookies } from "next/headers";
import UserApiRequest from "@/src/apiRequests/user";
import Status from "./user-status";
import { UserListPageFilterRSBodyType, UserType } from "@/src/schemaValidations/user.schema";
export default async function UserTable({ query, currentPage }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    const body: UserListPageFilterRSBodyType = {
        listRequest: {
            page: currentPage,
            size: 6,
            search: query
        },
        role: "CUSTOMER",
        status: "ACTIVE"
    }
    let users: UserType[] = [];
    let totalPages: Number = 1;
    try {
        const response = await UserApiRequest.getListPageUser({ body, sessionToken });
        totalPages = response.payload?.data?.paging?.maxPage;
        users = response.payload?.data?.list;
    } catch (error: any) {
        console.log(error);
    }
    return (
        <>
            {(users?.length > 0) ? (
                <>
                    <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                        <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Tên</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Email</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>address</th>
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Số điện thoại</th>
                                        {/* <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th> */}
                                        <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users.map((user) => (
                                        <tr key={user.id} className="text-sm">
                                            <td className="p-2 text-left">
                                                <div className="d-flex items-center">
                                                    <Image
                                                        width={28}
                                                        height={28}
                                                        src={user.profileImage ?? '/assets/images/blog/blog-author.png'}
                                                        className="rounded-full me-2"
                                                        alt={`${user.fullName}'s profile picture`}
                                                    />
                                                    <p className="table-first-td">{user.fullName}</p>
                                                </div>
                                            </td>
                                            <td className="p-2 text-left">{user.email}</td>
                                            <td className="p-2 text-left">{user.address}</td>
                                            <td className="p-2 text-left">{user.phoneNumber}</td>
                                            {/* <td className="py-2 ps-0 text-left">{<Status status={user.status ?? ''} />}</td> */}
                                            <td className="p-2 d-flex justify-content-end">

                                                <UpdateButton link={"/admin/partners/"} id={user.id} />
                                                <DeleteButton link={"/admin/tables/users"} id={user.id} />

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
                                <h3>Không tìm thấy người dùng nào!</h3>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}