import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (type) => ({
                url: `get-orders`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getStripePublishablekey: builder.query({
            query: () => ({
                url: `payment/stripepublishablekey`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        createPaymentIntent: builder.mutation({
            query: ({ amount, courseId }: { amount: number, courseId: string }) => ({
                url: "create-payment",
                method: "POST",
                body: {
                    amount: amount,
                    courseId,
                },
                credentials: "include" as const,
            }),
        }),
        createOrder: builder.mutation({
            query: ({ orderId, status, paymentId }: { orderId: string, status: string, paymentId: string }) => ({
                url: "update-order",
                body: {
                    orderId,
                    paymentId,
                    status,
                },
                method: "POST",
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetStripePublishablekeyQuery, useCreatePaymentIntentMutation, useCreateOrderMutation } =
    ordersApi;