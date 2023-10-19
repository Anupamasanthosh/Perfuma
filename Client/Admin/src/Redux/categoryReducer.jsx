import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "Category",
  initialState: {
    Category: null,
  },
  reducers: {
    setCategorys: (state, action) => {
      state.Category = action.payload;
    },
    addCategorys: (state, action) => {
      if (!state.Category) {
        state.Category = [action.payload];
      }
      state.Category.push = action.payload;
    },
    editCategorys: (state, action) => {
      state.Category = state.Category.map((cat) => {
        if (cat._id === action.payload._id) {
          const updatedCat = action.payload;
          return { ...cat, updatedCat };
        }
        return cat;
      });
    },
  },
});

export const { setCategorys, addCategorys, editCategorys } =
  categorySlice.actions;

export default categorySlice.reducer;
