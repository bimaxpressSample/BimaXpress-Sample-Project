import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type earlySettlementSliceState = {
  esData: object;
};

const initialState: earlySettlementSliceState = {
  esData: {},
};

export const earlySettlementSlice = createSlice({
  name: 'esData',
  initialState,
  reducers: {
    setesData: (state, action: PayloadAction<{}>) => {
      state.esData = action?.payload;
    },
  },
});

export const { setesData } = earlySettlementSlice?.actions;

export default earlySettlementSlice?.reducer;
