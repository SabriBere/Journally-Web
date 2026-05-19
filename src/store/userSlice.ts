import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        setInputEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setInputPass: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        cleanAuthInputs: (state) => {
            state.email = "";
            state.password = "";
        },
    },
});

export const {
    setInputEmail,
    setInputPass,
    cleanAuthInputs,
} = userSlice.actions;
export default userSlice.reducer;
