
import { lusitana } from '@/src/fonts/fonts';
import { Suspense } from 'react';
import SearchBar from '@/src/components/admin/search';
import { CreateButton } from '@/src/components/admin/table/button';
import KCenterTable from '@/src/components/admin/table/kcenters/kcenterTable';
export default function AdminManageKCenter({
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
                <h2 className={`${lusitana.className}`}>Care Center</h2>
            </div>
            <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                <Suspense>
                    <SearchBar placeholder="Search Pet Care center..." />
                </Suspense>
                <CreateButton link={"care-centers/create"} title="Create Center" />
            </div>
            <KCenterTable query={query} currentPage={currentPage} />
        </>
    );
}