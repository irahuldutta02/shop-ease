import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    // fetchOrders: builder.query({
    //   query: () => ORDERS_URL,
    // }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
