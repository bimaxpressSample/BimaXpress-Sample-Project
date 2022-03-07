import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type caseSliceState = {
  preAuthData: object;
  newCaseNum: string;
};

const initialState: caseSliceState = {
  preAuthData: { patient_details: {} },
  newCaseNum: '',
};

export const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    setNewCaseNum: (state, action: PayloadAction<string>) => {
      state.newCaseNum = action?.payload;
    },
    setpreAuthData: (state, action: PayloadAction<object>) => {
      state.preAuthData = action?.payload;
    },
  },
});

export const { setNewCaseNum, setpreAuthData } = caseSlice?.actions;

export default caseSlice?.reducer;
