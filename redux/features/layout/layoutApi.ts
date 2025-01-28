import { apiSlice } from "../api/apiSlice";

const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCategories: builder.mutation({
            query: (categories: any) => ({
                url: 'add-categories',
                method: 'POST',
                body: categories,
                credentials: 'include' as const,
            })
        }),
        addFaq: builder.mutation({
            query: (faqs: any) => ({
                url: 'add-faq',
                method: 'POST',
                body: faqs,
                credentials: 'include' as const,
            })
        }),
        getLayout: builder.query({
            query: () => ({
                url: 'get-layout',
                method: 'GET',
                credentials: 'include' as const
            })
        })
    })
});

export const { useAddCategoriesMutation, useGetLayoutQuery, useAddFaqMutation } = layoutApi;