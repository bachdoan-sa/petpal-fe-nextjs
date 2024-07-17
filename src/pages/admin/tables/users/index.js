'use client'
import React from "react";
import Layout from "../../../../admin-components/Layout.jsx";
import Link from 'next/link';
import { lusitana } from "../../../../fonts/fonts.ts";
import Image from 'next/image';
import data from '../../../../data/tabledatatest.json';
import { CreateButton, UpdateButton, DeleteButton } from "../../../../admin-components/table/button.jsx";
import SearchBar from "../../../../admin-components/search.jsx";
import Pagination from "../../../../admin-components/table/pagination.tsx";

export default function Page() {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    const totalPages = 1;// await fetchInvoicesPages(query);
    const users = data;
    return (
        <Layout>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <h2 className={`${lusitana.className}`}>Users</h2>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <SearchBar placeholder="Search invoices..." />
                <CreateButton />
            </div>
            <div className="mt-6 d-flex flex-wrap">
                <div className="inline-block container container-fuid align-items-center d-flex justify-content-center p-0">
                    <div className="p-2 md:pt-0 w-100 bg-gray-200" style={{ borderRadius: "10px" }}> {/* cái này để đồng bộ với cái border table cho đẹp*/}
                        <div className="d-none md:block">
                            {data?.map((invoice) => (
                                <div key={invoice.id} className="mb-2 w-100 rounded-md bg-white p-4">
                                    <div className="d-flex justify-content-between pb-4">
                                        <div className="d-flex items-center">
                                            <div className="mr-2 rounded-full overflow-hidden">
                                                <Image
                                                    width={28}
                                                    height={28}
                                                    src={invoice.image_url}

                                                    alt={`${invoice.name}'s profile picture`}
                                                />
                                            </div>
                                            <p>{invoice.name}</p>
                                            <p className="text-sm text-gray-500">{invoice.email}</p>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <div>
                                                <p className="h5 font-weight-medium mb-0">
                                                    {invoice.amount}
                                                </p>
                                                <p className="text-sm text-muted">{invoice.date}</p>
                                            </div>
                                            <div className="ml-2 d-flex justify-content-end">
                                                {/* Update and Delete invoice buttons can go here */}
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
                                {data?.map((invoice) => (
                                    <tr key={invoice.id} className="text-sm">
                                        <td className="p-2 text-left">
                                            <div className="d-flex items-center">
                                                <Image
                                                    width={28}
                                                    height={28}
                                                    src={invoice.image_url}
                                                    className="rounded-full me-2"
                                                    alt={`${invoice.name}'s profile picture`}
                                                />
                                                <p className="table-first-td">{invoice.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-2 text-left">{invoice.email}</td>
                                        <td className="p-2 text-left">{invoice.amount}</td>
                                        <td className="p-2 text-left">{invoice.date}</td>
                                        <td className="p-2 text-left">{/* Invoice Status */}</td>
                                        <td className="p-2 d-flex justify-content-end">

                                            <UpdateButton link={"/admin/tables/users"} id={invoice.id} />
                                            <DeleteButton link={"/admin/tables/users"} />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Pagination totalPages={totalPages} />
            </div>
        </Layout>
    );
}