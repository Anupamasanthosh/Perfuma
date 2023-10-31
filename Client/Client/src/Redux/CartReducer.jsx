import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    Cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.Cart=action.payload
    },
    removeFromCart: (state, action) => {

    },
    deleteCart: (state) => {
      console.log('hello')
      state.Cart = [];
    },
  },
});

export const { setCart, removeFromCart, deleteCart } = CartSlice.actions;

export default CartSlice.reducer;
