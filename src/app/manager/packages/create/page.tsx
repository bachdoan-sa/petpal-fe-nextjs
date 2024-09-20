import { useEffect } from "react";
import FormPackage from "../ui/FormPackage";
import { cookies } from "next/headers";

//code create here
export default function CreatePackage({ searchParams }: { searchParams?: { service?: string; page?: string; }; }) {

    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    if (sessionToken === undefined) {
        return (<>Quen token roi ban oi</>);
      }
    return (
        <>
            <FormPackage token={sessionToken}searchParams={searchParams} />
        </>
    );
}