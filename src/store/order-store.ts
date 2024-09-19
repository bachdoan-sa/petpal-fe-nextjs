import {create} from 'zustand';
import { OrderType } from '../schemaValidations/order.schema';

// Define the store
interface OrderStore {
  orders: OrderType[];
  totalPages: number;
  setOrders: (orders: OrderType[]) => void;
  setTotalPages: (totalPages: number) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  totalPages: 1,
  setOrders: (orders: OrderType[]) => set({ orders }),
  setTotalPages: (totalPages: number) => set({ totalPages }),
}));

// interface OrdersState {
//   orders: OrderType[];
//   setTotalPages: (totalPages: number) => void;
//   setOrders: (orders: OrderType[]) => void;
// }

// export const useOrdersStore = create<OrdersState>((set) => ({
//   orders: [],
//   setTotalPages: (totalPages: number) => set({ totalPages }),
//   setOrders: (orders: OrderType[]) => set({ orders }),
// }));


// import {create} from "zustand";

// interface Item { 
//     // id: string;
// }

// interface Package {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   duration: string;
//   type: string;
//   items: Item[]
// }

// interface Pet {
//     id: string;
//     fullName: string;
//     profileImage: string;
//     birthday: string;
//     weight: string;
//     gender: string;
//     bread: string;
//     sterilise: boolean;
//     description: string;
//     status: string;
// }

// interface Order {
//   id: string;
//   pet: Pet;
//   package: Package;
//   currentPrice: number;
//   detail: string;
//   fromDate: string;
//   toDate: string;
//   receiveTime: string;
//   returnTime: string;
//   status: string;
// }

// interface OrdersState {
//   orders: Order[];
//   setOrders: (orders: Order[]) => void;
// }

// export const useOrdersStore = create<OrdersState>((set) => ({
//   orders: [],
//   setOrders: (orders: Order[]) => set({ orders }),
// }));
