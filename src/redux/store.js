import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/products";

export const store = configureStore({
  reducer: {
    cart: productSlice.reducer,
  },
});
