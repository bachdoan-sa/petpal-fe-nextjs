import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import DetailForm from "./pending-detail-form";
import { cookies } from "next/headers";

export default function AdminViewDetailPartner({ params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
    return (
        <main className='container container-fuid'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Danh sách chờ duyệt', href: '/admin/partners/pending-partners' },
                    {
                        label: 'Xét duyệt đối tác',
                        href: `/admin/partners/${params.id}`,
                        active: true,
                    },
                ]}
            />
            <DetailForm partnerId={params.id} sessionToken={sessionToken} />
        </main>
    );
}