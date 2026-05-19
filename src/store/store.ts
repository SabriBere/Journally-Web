import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabsReducer from "./tabsSlice";
import editReducer from "./editSlice";
import homeReducer from "./homeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tabs: tabsReducer,
        edit: editReducer,
        home: homeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
