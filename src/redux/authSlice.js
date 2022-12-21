import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart : (state) => {
            state.login.isFetching =  true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state, setErrMessage) => {
            state.login.isFetching = false;
            state.login.error = true;
            setErrMessage("Thông tin tài khoản hoặc mật khẩu không chính xác!");
        }
    }
});
export const {
    loginStart, 
    loginSuccess,
    loginFailed
} = authSlice.actions

export default authSlice.reducer