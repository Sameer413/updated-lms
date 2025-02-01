// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//     user: any | null;
// }

// const initialState: AuthState = {
//     accessToken: null,
//     refreshToken: null,
//     user: null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         userRegistration: (state, action: PayloadAction<{ token: string }>) => {
//             state.accessToken = action.payload.token;
//         },
//         userLoggedIn: (state, action: PayloadAction<{ accessToken: string, refreshToken: string, user: any }>) => {
//             state.accessToken = action.payload.accessToken;
//             state.refreshToken = action.payload.refreshToken;
//             state.user = action.payload.user;
//         },
//         userLoggedOut: (state) => {
//             state.accessToken = null;
//             state.refreshToken = null;
//             state.user = null;
//         },
//         loadUser: (state, action: PayloadAction<{ user: any }>) => {
//             state.user = action.payload.user
//         }
//     },
// });

// export const { userRegistration, userLoggedIn, userLoggedOut, loadUser } =
//     authSlice.actions;

// export const authReducer = authSlice.reducer;