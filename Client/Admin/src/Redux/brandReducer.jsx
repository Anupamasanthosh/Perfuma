import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "Brand",
  initialState: {
    Brand: null,
  },
  reducers: {
    setBrands:(state,action)=>
    {
        state.Brand=action.payload
    }
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;
