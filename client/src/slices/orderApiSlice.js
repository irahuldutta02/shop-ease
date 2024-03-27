import { BACKEND_URL, ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5, // cache for 5 seconds
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user-orders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // cache for 5 seconds
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // cache for 5 seconds
    }),
    payWithStripe: builder.mutation({
      query: (data) => ({
        url: `${BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: data,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/deliver/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  usePayWithStripeMutation,
  useDeliverOrderMutation,
} = orderApiSlice;
