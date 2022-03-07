import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type tpaSliceState = {
  tpaListData: [];
};

const initialState: tpaSliceState = {
  tpaListData: [],
};


export const tpaListSlice = createSlice({
  name: "tpaListData",
  initialState,
  reducers: {
    setTpaListData: (state, action: PayloadAction<any>) => {
      state.tpaListData = action?.payload;
    },
  },
});

export const { setTpaListData } = tpaListSlice?.actions;

export default tpaListSlice?.reducer;
