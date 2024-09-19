import orderApiRequest from "@/src/apiRequests/order";
import packageApiRequest from "@/src/apiRequests/package";
import OrderSummary from "@/src/app/(overview)/check-out/[packageId]/order-summary";
import OrderDetail from "@/src/components/user/OrderDetail";
import { formatDateToLocal } from "@/src/lib/utils";
import { OrderType } from "@/src/schemaValidations/order.schema";
import { useOrderStore } from "@/src/store/order-store";
import { useUserStore } from "@/src/store/user-store";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id; // cai nay lay id tu url truyen tu trang order-history
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  // const {sessionToken} = useUserStore();
  // const { orders } = useOrderStore(); // cai nay lay order tu store ra

  // const order = orders.find((order) => order.id === id);
  // if (!order) {
  //   return <h3>Order not found</h3>;
  // }

  
  return (
    <OrderDetail id={id} sessionToken={sessionToken}/>
  );
};

export default OrderDetailPage;
