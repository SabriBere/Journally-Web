import { createSlice } from "@reduxjs/toolkit";

interface EditState {
    editText: boolean;
    newText: string;
    savePost: boolean;
    deletePost: boolean;
}

const initialState: EditState = {
    editText: false,
    newText: "",
    savePost: false,
    deletePost: false,
};

const editSlice = createSlice({
    name: "tabsSlice",
    initialState,
    reducers: {
        setEditText: (state, actions) => {
            state.editText = actions.payload;
        },
        setNewText: (state, actions) => {
            state.newText = actions.payload;
        },
        setSavePost: (state, actions) => {
            state.savePost = actions.payload;
        },
        setDeletePost: (state, actions) => {
            state.deletePost = actions.payload;
        },
    },
});

export const { setEditText, setNewText, setSavePost, setDeletePost } =
    editSlice.actions;
export default editSlice.reducer;
