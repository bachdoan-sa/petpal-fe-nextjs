import { cookies } from "next/headers";
import OrderDetail from "../components/DetailOrder";

export default function ManagerViewOrder({ params }: { params: { id: string } }) {
    const id = params.id; // cai nay lay id tu url truyen tu trang order-history
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    if (sessionToken === undefined){
        return;
    }
        return (
            <>
                <OrderDetail id={id} sessionToken={sessionToken} />
            </>
        );
}