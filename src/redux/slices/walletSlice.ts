import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type walletSliceState = {
  walletBalance: "" ;
  walletStatement: {};
  customerWalletDetails :{};
};

const initialState: walletSliceState = {
  walletBalance: "",
  walletStatement: {},
  customerWalletDetails :{},
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
    setcustomerWalletDetails: (state, action: PayloadAction<any>) => {
      state.customerWalletDetails = action?.payload;
    },
  },
});

export const { setwalletBalance , setwalletStatement , setcustomerWalletDetails } = walletSlice?.actions;

export default walletSlice?.reducer;