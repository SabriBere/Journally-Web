import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    password: string;
}

const initialState: UserState = {
    email: "",
    password: "",
};

const userSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
        setInputEmail: (state, action) => {
            state.email = action.payload;
        },
        setInputPass: (state, action) => {
            state.password = action.payload;
        },
    },
});

export const { setInputEmail, setInputPass } = userSlice.actions;
export default userSlice.reducer;
