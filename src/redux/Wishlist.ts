import { createSlice } from "@reduxjs/toolkit";

interface WishlistState {
  count: number;
}

const initialState: WishlistState = {
  count: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    incrementWishlist: (state) => {
      state.count += 1;
    },
  },
});

export const { incrementWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
