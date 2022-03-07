import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type dischargeSlice = {
  discharge: {};
};

const initialState: dischargeSlice = {
  discharge: {},
};

export const discharge = createSlice({
  name: "discharge",
  initialState,
  reducers: {
    setAnalystList: (state, action: PayloadAction<{}>) => {
      state.discharge = action?.payload;
    },
  },
});

export const { setAnalystList } = discharge?.actions;
export default discharge?.reducer;
