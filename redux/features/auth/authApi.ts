import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";


export const authApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        loginRequest: builder.mutation({
            query: ({ email, password }: { email: string, password: string }) => ({
                url: 'sign-in',
                method: 'POST',
                body: {
                    email,
                    password
                },
                credentials: "include",
            }),
            async onQueryStarted(queryArgument, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled; // Await only once
                    dispatch(
                        userLoggedIn({
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                            user: data.user,
                        })
                    );

                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log(error.message);
                    } else {
                        console.log("An unknown error occurred");
                    }
                }
            },
        }),
        signOut: builder.query({
            query: () => ({
                url: 'sign-out',
                method: 'GET',
                credentials: "include",
            }),
            async onQueryStarted(queryArgument, { dispatch }) {
                try {
                    dispatch(
                        userLoggedOut()
                    );

                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log(error.message);
                    } else {
                        console.log("An unknown error occurred");
                    }
                }
            },
        }),
        getRefreshToken: builder.query<void, void>({
            query: () => ({
                url: 'refresh-token',
                method: 'GET',
                credentials: 'include'
            }),
            async onQueryStarted(queryArgument, { queryFulfilled, }) {

            },
        }),
    })
});

export const { useLoginRequestMutation, useSignOutQuery, useLazySignOutQuery, useLazyGetRefreshTokenQuery } = authApi;