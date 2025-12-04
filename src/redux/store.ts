import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import wishlistReducer from "./Wishlist";
import filterReducer from "./FilterSlice"

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    product: productReducer, 
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
