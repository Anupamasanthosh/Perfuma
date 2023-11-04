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
    updateUser:(state,action)=>
    {
      return {
        ...state,
        User: action.payload, 
      };
    }
  },
});

export const { setUser, clearUser,updateUser } = AuthSlice.actions;

export default AuthSlice.reducer;
