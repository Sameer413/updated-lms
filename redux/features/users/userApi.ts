import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: 'users-all',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ password, newPassword, confirmPassword }) => ({
                url: 'update-password',
                method: 'PUT',
                body: {
                    password,
                    newPassword,
                    confirmPassword,
                },
                credentials: 'include' as const,
            }),
        })
    }),
});

export const { useGetAllUsersQuery, useUpdatePasswordMutation } = userApi;