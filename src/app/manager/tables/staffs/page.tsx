"use client";
import SearchBar from "@/src/components/admin/search.jsx";
import { CreateButton } from "@/src/components/admin/table/button.jsx";
import Pagination from "@/src/components/admin/table/pagination.jsx";
import UserTable from "@/src/components/admin/table/users/userTable";
import StaffTable from "@/src/components/manager/table/StaffTable";
import { getDataTestPages } from "@/src/data/apiService.js";
import { lusitana } from "@/src/fonts/fonts";

export default function ManagerManageStaffs({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  //   const columns = [
  //     { header: "First", accessor: "first" },
  //     { header: "Last", accessor: "last" },
  //     { header: "Handle", accessor: "handle" },
  //   ];
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = getDataTestPages();
  return (
    <>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h2 className={`${lusitana.className}`}>Staffs</h2>
      </div>
      <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
        <SearchBar placeholder="Search staff's name" />
        <CreateButton link={""} title={"Add a staff"}/>
      </div>
      <div className="mt-6 d-flex flex-wrap">
        <StaffTable query={query} currentPage={currentPage} />
      </div>
      <div className="mt-5 d-flex w-100 justify-content-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

