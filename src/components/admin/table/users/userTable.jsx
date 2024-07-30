import Image from "next/image";
import { getDataTestTable } from "@/src/data/apiService";
import { DeleteButton, UpdateButton } from "../button";

export default function UserTable({ query , currentPage }) {
    const users = getDataTestTable(query , currentPage);
    return (<>
        <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
            <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}
                <div className="d-none md:block">
                    {users.map((user) => (
                        <div key={user.id} className="mb-2 w-100 rounded-md bg-white p-4">
                            <div className="d-flex justify-content-between pb-4">
                                <div className="d-flex items-center">
                                    <div className="mr-2 rounded-full overflow-hidden">
                                        <Image
                                            width={28}
                                            height={28}
                                            src={user.image_url}

                                            alt={`${user.name}'s profile picture`}
                                        />
                                    </div>
                                    <p>{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div>
                                        <p className="h5 font-weight-medium mb-0">
                                            {user.amount}
                                        </p>
                                        <p className="text-sm text-muted">{user.date}</p>
                                    </div>
                                    <div className="ml-2 d-flex justify-content-end">
                                        {/* Update and Delete user buttons can go here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <table className="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" className="px-3 py-4 text-left bg-gray-200" style={{ border: "none" }}>Customer</th>
                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Email</th>
                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Amount</th>
                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Date</th>
                            <th scope="col" className="px-2 py-4 text-left bg-gray-200" style={{ border: "none" }}>Status</th>
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
                                            src={user.image_url}
                                            className="rounded-full me-2"
                                            alt={`${user.name}'s profile picture`}
                                        />
                                        <p className="table-first-td">{user.name}</p>
                                    </div>
                                </td>
                                <td className="p-2 text-left">{user.email}</td>
                                <td className="p-2 text-left">{user.amount}</td>
                                <td className="p-2 text-left">{user.date}</td>
                                <td className="p-2 text-left">{/* user Status */}</td>
                                <td className="p-2 d-flex justify-content-end">

                                    <UpdateButton link={"/admin/tables/users"} id={user.id} />
                                    <DeleteButton link={"/admin/tables/users"} />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}