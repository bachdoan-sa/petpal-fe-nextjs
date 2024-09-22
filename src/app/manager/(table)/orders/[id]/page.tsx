import { cookies } from "next/headers";
import OrderDetail from "../components/DetailOrder";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";

export default function ManagerViewOrder({ params }: { params: { id: string } }) {
    const id = params.id; // cai nay lay id tu url truyen tu trang order-history
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    if (sessionToken === undefined) {
        return;
    }
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Danh sách', href: '/manager/orders' },
                        { label: 'Chi tiết', href: `/manager/orders/${params.id}`, active: true },
                    ]}
                />
            </div>
            <div className="mt-4 ">
                <OrderDetail id={id} sessionToken={sessionToken} />
            </div>
        </>
    );
}