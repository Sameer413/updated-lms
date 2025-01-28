import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//     credentials: "include", // Ensures cookies are included in requests
// });

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
        credentials: 'include' as const,
    }),
    endpoints: (builder) => ({
        loadUser: builder.query({
            query: () => ({
                url: 'user-me',
                method: 'GET',
                credentials: "include" as const
            })
        })
    })
});


export const { } = apiSlice;