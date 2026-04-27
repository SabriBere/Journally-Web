import { createSlice } from "@reduxjs/toolkit";
import type { PostDescription } from "@/types/editor";

interface EditState {
    editText: boolean;
    newTitle: string;
    newText: PostDescription | null;
    currentTitle: string;
    currentDescription: PostDescription | null;
    savePost: boolean;
    deletePost: boolean;
}

const initialState: EditState = {
    editText: false,
    newTitle: "",
    newText: null,
    currentTitle: "",
    currentDescription: null,
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
        setNewTitle: (state, actions) => {
            state.newTitle = actions.payload;
        },
        setCurrentTtitle: (state, actions) => {
            state.currentTitle = actions.payload;
        },
        setCuerrentDescription: (state, actions) => {
            state.currentDescription = actions.payload;
        },
        setCleanText: (state) => {
            state.newText = null;
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
    setNewTitle,
    setNewText,
    setCurrentTtitle,
    setCuerrentDescription,
    setCleanText,
    setSavePost,
    setDeletePost,
} = editSlice.actions;
export default editSlice.reducer;
