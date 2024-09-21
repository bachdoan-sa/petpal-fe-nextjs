
import React, { Suspense } from "react";
import { lusitana } from "@/src/fonts/fonts";
import data from "@/src/data/tabledatatest.json";
import {
  CreateButton,
  UpdateButton,
  DeleteButton,
} from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search";
import Pagination from "@/src/components/admin/table/pagination";
import Package from '@/src/components/manager/test/Package';
import TablePackage from "./ui/TablePackage";
import { cookies } from "next/headers";

export default function ManagerManagePackages({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) {

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  if (sessionToken === undefined) {
    return (<>Quen token roi ban oi</>);
  }
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page ?? 1);
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = 1; // await fetchInvoicesPages(query);
  // const users = data;
  return (
    <>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h2 className={`${lusitana.className}`}>Packages</h2>
      </div>
      <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
        <Suspense>
          <SearchBar placeholder="Tìm kiếm ..." />
        </Suspense>

        <CreateButton link={"/manager/packages/create"} title={"Tạo gói dịch vụ"} />
      </div>
      <TablePackage query={query} currentPage={currentPage} sessionToken={sessionToken} />
    </>
  );
}

