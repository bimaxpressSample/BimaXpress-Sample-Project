import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type dischargeApprovedSliceState = {
  DACaseData: object;
};

const initialState: dischargeApprovedSliceState = {
  DACaseData: {},
};

export const dischargeApprovedSlice = createSlice({
  name: 'dischargeApprove',
  initialState,
  reducers: {
    setDACaseData: (state, action: PayloadAction<object>) => {
      state.DACaseData = action?.payload;
    },
  },
});

export const { setDACaseData } = dischargeApprovedSlice?.actions;

export default dischargeApprovedSlice?.reducer;
