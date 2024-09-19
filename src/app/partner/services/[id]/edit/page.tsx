import { cookies } from "next/headers";
import FormServices from "../../ui/formService";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import ServiceApiRequest from "@/src/apiRequests/service";
import { ServiceType } from "@/src/schemaValidations/service.schema";

export default async function PartnerEditService({ params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value ?? "";

    let service: ServiceType | undefined;

    try {
        service = (await ServiceApiRequest.getServiceById({ serivceId: params.id, sessionToken })).payload.data;
    } catch (error: any) {
        console.log(error);
    } 

    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Danh sách', href: '/partner/services' },
                        { label: 'Chỉnh sửa', href: '/partner/services/create', active: true }
                    ]}
                />
            </div>
            <FormServices service={service} sessionToken={sessionToken} />
        </>
    )
}