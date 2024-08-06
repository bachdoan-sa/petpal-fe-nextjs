import SearchBar from "@/src/components/admin/search";
import { CreateButton } from "@/src/components/admin/table/button";
import { lusitana } from "@/src/fonts/fonts";
import { Suspense } from "react";
import PartnerTable from "@/src/components/admin/table/partners/partnerTable";
export default function AdminManagePartner({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <h2 className={`${lusitana.className}`}>Danh sách đối tác</h2>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <Suspense>
                    <SearchBar placeholder="Search partner..." />
                </Suspense>
                {/* <CreateButton link={"care-centers/create"} title="Create Center" /> */}
            </div>
            <PartnerTable query={query} currentPage={currentPage} />
        </>
    );
}