import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    password: string;
    searchTextPost: string;
    searchTextCollection: string;
}

const initialState: UserState = {
    email: "",
    password: "",
    searchTextPost: "",
    searchTextCollection: "",
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
        setSearchTextPost: (state, action) => {
            state.searchTextPost = action.payload;
        },
        setSearchTextCollection: (state, action) => {
            state.searchTextCollection = action.payload;
        },
    },
});

export const {
    setInputEmail,
    setInputPass,
    setSearchTextPost,
    setSearchTextCollection,
} = userSlice.actions;
export default userSlice.reducer;
