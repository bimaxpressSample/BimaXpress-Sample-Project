import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type doctorSliceState = {
  analystList: {};
};

const initialState: doctorSliceState = {
  analystList: {},
};

export const analystSlice = createSlice({
  name: "analyst",
  initialState,
  reducers: {
    setAnalystList: (state, action: PayloadAction<{}>) => {
      state.analystList = action?.payload;
    },
  },
});

export const { setAnalystList } = analystSlice?.actions;

export default analystSlice?.reducer;
