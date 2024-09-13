import React, { Suspense } from "react";
import { lusitana } from "@/src/fonts/fonts";
import { CreateButton } from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search.jsx";
import Pagination from "@/src/components/admin/table/pagination.jsx";
import { getDataTestPages } from "@/src/data/apiService.js";
import ServiceTable from "./serviceTable";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import { cookies } from "next/headers";

export default function PartnerManageService({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
   
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Danh sách dịch vụ', href: '/partner/services', active: true },
                    ]}
                />
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <Suspense>
                    <SearchBar placeholder="Search invoices..." />
                </Suspense>
                <CreateButton link={"services/create"} title="Create services" />
            </div>
            <ServiceTable query={query} currentPage={currentPage} sessionToken={sessionToken} />

        </>
    );
}