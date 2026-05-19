import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    password: string;
    searchTextPost: string;
    searchTextCollection: string;
    openModalPost: boolean;
    openModalCollection: boolean;
}

const initialState: UserState = {
    email: "",
    password: "",
    searchTextPost: "",
    searchTextCollection: "",
    openModalPost: false,
    openModalCollection: false,
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
        //move to other slice
        setSearchTextPost: (state, action) => {
            state.searchTextPost = action.payload;
        },
        setSearchTextCollection: (state, action) => {
            state.searchTextCollection = action.payload;
        },
        setOpenModalPost: (state, action) => {
            state.openModalPost = action.payload;
        },
        setOpenModalCollection: (state, action) => {
            state.openModalCollection = action.payload;
        },
    },
});

export const {
    setInputEmail,
    setInputPass,
    cleanAuthInputs,
    setSearchTextPost,
    setSearchTextCollection,
    setOpenModalPost,
    setOpenModalCollection,
} = userSlice.actions;
export default userSlice.reducer;
