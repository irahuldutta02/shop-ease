import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${PRODUCTS_URL}/create`,
        method: "POST",
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
    editProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/update/${data.id}`,
        method: "PUT",
        body: data.newProduct,
      }),
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/reviews/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/reviews/create/${data.id}`,
        method: "PATCH",
        body: {
          rating: data.rating,
          comment: data.comment,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetReviewsQuery,
  useCreateReviewMutation,
} = productApiSlice;
