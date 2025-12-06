import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import wishlistReducer from "./Wishlist";
export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    product: productReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
