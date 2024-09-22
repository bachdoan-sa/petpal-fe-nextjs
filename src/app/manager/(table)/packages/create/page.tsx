import { useEffect } from "react";
import FormPackage from "../ui/FormPackage";
import { cookies } from "next/headers";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";

//code create here
export default function CreatePackage({ searchParams }: { searchParams?: { service?: string; page?: string; }; }) {

    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    if (sessionToken === undefined) {
        return (<>Quen token roi ban oi</>);
    }
    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Gói dịch vụ', href: '/manager/packages' },
                    {
                        label: 'Tạo gói',
                        href: '/manager/packages/create',
                        active: true,
                    },
                ]}
            />
            <FormPackage token={sessionToken} searchParams={searchParams} />
        </>
    );
}