import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: `categories`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        addCategories: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `category/${id}`,
                method: 'POST',
                credentials: 'include' as const
            })
        }),
        deleteCategories: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `category/${id}`,
                method: 'DELETE',
                credentials: 'include' as const
            })
        }),

    })
});


export const { useGetAllCategoriesQuery, useAddCategoriesMutation, useDeleteCategoriesMutation } = categoryApi;