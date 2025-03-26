import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email;
      state._id = action.payload._id;
    },

    removeUser: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
