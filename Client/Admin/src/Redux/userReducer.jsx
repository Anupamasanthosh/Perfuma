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
    editUsers: (state, action) => {
      console.log(action.payload);
      const updatedUser = action.payload;
      state.Users = state.Users.map((user) => {
        if (user._id === updatedUser._id) {
          return { ...user, ...updatedUser };
        }
        return user;
      });
    },
  },
});

export const { setUsers, editUsers } = userSlice.actions;

export default userSlice.reducer;
