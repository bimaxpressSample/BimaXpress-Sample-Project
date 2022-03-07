import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type bnplSliceState = {
  bnplHomeCounter: object;
  bnplCurrentBucket: string;
  bnplCaseData: object;
};

const initialState: bnplSliceState = {
  bnplHomeCounter: {},
  bnplCurrentBucket: '',
  bnplCaseData: {},
};

export const bnplSlice = createSlice({
  name: 'bnpl',
  initialState,
  reducers: {
    setBnplCounter: (state, action: PayloadAction<object>) => {
      state.bnplHomeCounter = action?.payload;
    },
    setBnplCurrentBucket: (state, action: PayloadAction<string>) => {
      state.bnplCurrentBucket = action?.payload;
    },
    setBnplCaseData: (state, action: PayloadAction<object>) => {
      state.bnplCaseData = action?.payload;
    },
  },
});

export const { setBnplCounter, setBnplCurrentBucket, setBnplCaseData } =
  bnplSlice?.actions;

export default bnplSlice?.reducer;
