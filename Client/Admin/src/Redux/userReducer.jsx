import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    Users: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.Users = action.payload;
    },
    
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
