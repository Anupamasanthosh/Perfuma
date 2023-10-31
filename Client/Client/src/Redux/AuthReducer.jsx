import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    User: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
    clearUser: (state) => {
      state.User = null;
    },
  },
});

export const { setUser, clearUser } = AuthSlice.actions;

export default AuthSlice.reducer;
