import React, { Suspense } from "react";
import { lusitana } from "@/src/fonts/fonts";
import { CreateButton } from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search.jsx"; 1
import PendingOrderTable from './orderPendingTable';
import { cookies } from "next/headers";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";

export default function ManagerManageOrders({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    if (sessionToken === undefined) {
        return;
    }
    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page ?? 1);
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
            <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Danh sách yêu cầu', href: '/manager/orders'},
                        { label: 'Danh sách chờ', href: '/manager/orders/pending-orders',active: true },
                    ]}
                />
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                {/* <Suspense>
                    <SearchBar placeholder="Search orders..." />
                </Suspense> */}
                {/* <CreateButton link={"orders/create"} title="Create User" /> */}
            </div>
            <PendingOrderTable query={query} currentPage={currentPage} sessionToken={sessionToken} />
        </>
    );
}