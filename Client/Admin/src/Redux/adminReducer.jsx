import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "Auth",
  initialState: {
    Admin: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.Admin = action.payload;
    },
    clearAdmin: (state) => {
      state.Admin = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
