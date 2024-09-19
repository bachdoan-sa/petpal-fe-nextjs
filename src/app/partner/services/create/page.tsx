import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import FormServices from "../ui/formService";
import { cookies } from "next/headers";

export default function PartnerCreateService() {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Danh sách', href: '/partner/services' },
                        { label: 'Tạo mới', href: '/partner/services/create', active: true }
                    ]}
                />
            </div>
            <FormServices sessionToken={sessionToken} />
        </>
    )
}