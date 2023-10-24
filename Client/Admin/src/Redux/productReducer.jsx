import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Product",
  initialState: {
    Products: null,
  },
  reducers: {
    setProductss:(state,action)=>
    {
        state.Products=action.payload
    }
  },
});

export const { setProductss } = productSlice.actions;

export default productSlice.reducer;