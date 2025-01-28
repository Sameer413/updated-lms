import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRefreshToken: builder.query({
            query: () => ({
                url: "refresh-token",
                method: "GET",
                credentials: "include", // Automatically inferred by TypeScript
            }),
            // Add providesTags if cache handling is needed
            // providesTags: ["Auth"],
        }),
    })
});

export const { useGetRefreshTokenQuery } = authApi