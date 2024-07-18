import React from "react";
import Layout from "../../../../admin-components/Layout.jsx";
import { lusitana } from "../../../../fonts/fonts.ts";
import { CreateButton } from "../../../../admin-components/table/button.jsx";
import SearchBar from "../../../../admin-components/search.jsx";
import Pagination from "../../../../admin-components/table/pagination.jsx";
import { getDataTestPages } from "../../../../data/apiService.js";
import { useSearchParams } from 'next/navigation'
import UserTable from "../../../../admin-components/table/userTable.jsx";

export default function Page() 
{
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = getDataTestPages();
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
               <UserTable query={query} currentPage={currentPage}/>
            </div>
            <div className="mt-5 d-flex w-100 justify-content-center">
                <Pagination totalPages={totalPages} />
            </div>
        </Layout>
    );
}