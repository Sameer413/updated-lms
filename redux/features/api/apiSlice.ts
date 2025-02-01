import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUser } from "../auth/authSlice";

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
        loadUser: builder.query<void, void>({
            query: () => ({
                url: 'me',
                method: 'GET',
                credentials: "include" as const
            }),
            async onQueryStarted(queryArgument, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled;
                dispatch(
                    loadUser({
                        user: data.user
                    })
                )
            },
        })
    })
});


export const { useLoadUserQuery } = apiSlice;