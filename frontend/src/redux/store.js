import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./slices/listSlice";

export const store = configureStore({
    reducer: {
        list: listReducer,
    },
});

export default store;