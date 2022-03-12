import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type walletSliceState = {
  walletBalance: "" ;
  walletStatement: {};
};

const initialState: walletSliceState = {
  walletBalance: "",
  walletStatement: {},
};


export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setwalletBalance: (state, action: PayloadAction<any>) => {
      state.walletBalance = action?.payload;
    },
    setwalletStatement: (state, action: PayloadAction<any>) => {
      state.walletStatement = action?.payload;
    },
  },
});

export const { setwalletBalance , setwalletStatement } = walletSlice?.actions;

export default walletSlice?.reducer;