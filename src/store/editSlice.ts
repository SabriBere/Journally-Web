import { createSlice } from "@reduxjs/toolkit";

interface EditState {
    editText: boolean;
    newText: string;
    currentTitle: string;
    currentDescription: string;
    savePost: boolean;
    deletePost: boolean;
}

const initialState: EditState = {
    editText: false,
    newText: "",
    currentTitle: "",
    currentDescription: "",
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
        setCurrentTtitle: (state, actions) => {
            state.currentTitle = actions.payload;
        },
        setCuerrentDescription: (state, actions) => {
            state.currentDescription = actions.payload;
        },
        setCleanText: (state) => {
            state.newText = "";
        },
        setSavePost: (state, actions) => {
            state.savePost = actions.payload;
        },
        setDeletePost: (state, actions) => {
            state.deletePost = actions.payload;
        },
    },
});

export const {
    setEditText,
    setNewText,
    setCuerrentDescription,
    setCleanText,
    setSavePost,
    setDeletePost,
} = editSlice.actions;
export default editSlice.reducer;
