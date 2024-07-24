import React from "react";
import Layout from "@/src/components/admin/Layout.jsx";
import { lusitana } from "@/src/fonts/fonts";
import { CreateButton } from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search.jsx";
import Pagination from "@/src/components/admin/table/pagination.jsx";
import { getDataTestPages } from "@/src/data/apiService.js";
import UserTable from "@/src/components/admin/table/userTable.jsx";

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
        <Layout>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <h2 className={`${lusitana.className}`}>Users</h2>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <SearchBar placeholder="Search invoices..." />
                <CreateButton link={""}/>
            </div>
            <div className="mt-6 d-flex flex-wrap">
                <UserTable query={query} currentPage={currentPage} />
            </div>
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Pagination totalPages={totalPages} />
            </div>
        </Layout>
    );
}