import http from "@/src/lib/httpAxios";
import {
  CreateOrderBodyType,
  CreateOrderResType,
  OrderListPageBodyType,
  OrderListPageResType,
  OrderResType,
} from "@/src/schemaValidations/order.schema";
import {
  CommonResType,
  MessageResType,
} from "@/src/schemaValidations/common.schema";

const orderApiRequest = {
  approveRequest: ({
    orderId,
    sessionToken,
  }: {
    orderId: string;
    sessionToken?: string;
  }) =>
    http.post<OrderResType>(`/api/Order/approve-request?orderId=${orderId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  rejectRequest: ({
    orderId,
    sessionToken,
  }: {
    orderId: string;
    sessionToken?: string;
  }) =>
    http.post<OrderResType>(`/api/Order/reject-request?orderId=${orderId}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  performTransaction: ({
    orderId,
    sessionToken,
  }: {
    orderId: string;
    sessionToken?: string;
  }) =>
    http.post<OrderResType>("/api/Order/perform-transaction", orderId, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  countOrder: (sessionToken?: string) =>
    http.get<CommonResType>("/api/Order/count-order", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  countMoney: (sessionToken?: string) =>
    http.get<CommonResType>("/api/Order/count-money", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  userCreateOrder: ({
    body,
    sessionToken,
  }: {
    body: CreateOrderBodyType;
    sessionToken: string;
  }) =>
    http.post<CreateOrderResType>("/api/Order/create-order-request", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getListOrderForManager: ({
    body,
    sessionToken,
  }: {
    body: OrderListPageBodyType;
    sessionToken?: string;
  }) =>
    http.post<OrderListPageResType>("/api/Order/get-order-request", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getListOrderForUser: ({ body, sessionToken }: { body: OrderListPageBodyType; sessionToken?: string; }) =>
    http.post<OrderListPageResType>("/api/Order/get-order-request", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getListPendingOrder: ({ body, sessionToken }: { body: OrderListPageBodyType; sessionToken?: string; }) =>
    http.post<OrderListPageResType>("/api/Order/get-pending-request", body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getOrderById: (id: string, sessionToken: string | undefined) =>
    http.get<OrderResType>(`/api/Order/get-order/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      }
    }),
  getTransactionStatusVnpay: (id: string, sessionToken: string | undefined) => 
    http.get<CommonResType>(`/api/Order/get-transaction-status-vnpay?orderId=${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      }
    }),
};
export default orderApiRequest;
