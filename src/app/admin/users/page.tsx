import React, { Suspense } from "react";
import { lusitana } from "@/src/fonts/fonts";
import { CreateButton } from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search.jsx";
import Pagination from "@/src/components/admin/table/pagination.jsx";
import { getDataTestPages } from "@/src/data/apiService.js";
import UserTable from "@/src/components/admin/table/users/userTable.jsx";

export default function AdminManageUsers({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = getDataTestPages();
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <h2 className={`${lusitana.className}`}>Users</h2>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <Suspense>
                    <SearchBar placeholder="Search invoices..." />
                </Suspense>
                <CreateButton link={"users/create"} title="Create User"/>
            </div>
            <div className="mt-6 d-flex flex-wrap">
                <UserTable query={query} currentPage={currentPage} />
            </div>
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Suspense>
                    <Pagination totalPages={totalPages} />
                </Suspense>
            </div>
        </>
    );
}