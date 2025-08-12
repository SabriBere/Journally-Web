import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabsState {
    tabs: "post" | "collections"; // <- type definition here
}

const initialState: TabsState = {
    tabs: "post",
};

const tabsSlice = createSlice({
    name: "tabsSlice",
    initialState,
    reducers: {
        setTabs: (state, actions: PayloadAction<"post" | "collections">) => {
            state.tabs = actions.payload;
        },
    },
});

export const { setTabs } = tabsSlice.actions;
export default tabsSlice.reducer;
