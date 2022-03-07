import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type chargesSliceState = {
  chargesListData: [];
};

const initialState: chargesSliceState = {
  chargesListData: [],
};


export const chargesListSlice = createSlice({
  name: "chargesListData",
  initialState,
  reducers: {
    setChargesListData: (state, action: PayloadAction<any>) => {
      state.chargesListData = action?.payload;
    },
  },
});

export const { setChargesListData } = chargesListSlice?.actions;

export default chargesListSlice?.reducer;
