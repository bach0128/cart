import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.cart.push(action.payload);
    },
    increment: (state, action) => {
      state.cart[action.payload];
    },
    decrement: (state, action) => {
      state.cart[action.payload];
    },
    restart: (state) => {
      state.cart = initialState.cart;
    },
  },
});
