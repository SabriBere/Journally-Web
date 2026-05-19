import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
    searchTextPost: string;
    searchTextCollection: string;
    openModalPost: boolean;
    openModalCollection: boolean;
}

const initialState: HomeState = {
    searchTextPost: "",
    searchTextCollection: "",
    openModalPost: false,
    openModalCollection: false,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setSearchTextPost: (state, action: PayloadAction<string>) => {
            state.searchTextPost = action.payload;
        },
        setSearchTextCollection: (state, action: PayloadAction<string>) => {
            state.searchTextCollection = action.payload;
        },
        setOpenModalPost: (state, action: PayloadAction<boolean>) => {
            state.openModalPost = action.payload;
        },
        setOpenModalCollection: (state, action: PayloadAction<boolean>) => {
            state.openModalCollection = action.payload;
        },
    },
});

export const {
    setSearchTextPost,
    setSearchTextCollection,
    setOpenModalPost,
    setOpenModalCollection,
} = homeSlice.actions;
export default homeSlice.reducer;
