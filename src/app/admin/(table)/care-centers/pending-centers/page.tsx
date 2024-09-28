
import { Suspense } from 'react';
import SearchBar from '@/src/components/admin/search';
import { CreateButton } from '@/src/components/admin/table/button';
import Breadcrumbs from '@/src/components/admin/breadcrumbs';
import PendingKCenterTable from '@/src/components/admin/table/kcenters/kcenterPendingTable';
export default function AdminManageKCenter({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page ?? 1);
    return (
        <>
            <div className="container-fluid px-6 py-4">


                <div className="d-flex w-100 align-items-center justify-content-between">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Danh sách', href: '/admin/care-centers', active: true }
                        ]}
                    />
                </div>
                <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
                    <Suspense>
                        <SearchBar placeholder="Search Pet Care center..." />
                    </Suspense>
                    <CreateButton link={"care-centers/create"} title="Tạo mới" />
                </div>
                <PendingKCenterTable query={query} currentPage={currentPage} />
            </div>
        </>
    );
}