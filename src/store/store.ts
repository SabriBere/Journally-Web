import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabsReducer from "./tabsSlice";
import editReducer from './editSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        tabs: tabsReducer,
        edit: editReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
