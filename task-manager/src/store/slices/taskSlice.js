import { createSlice } from "@reduxjs/toolkit";

//initial state for user
const initialState = {
  task: null,
};

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.task = payload;
    },
  },
});

export default taskSlice.reducer;
