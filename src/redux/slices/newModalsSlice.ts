import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type newModalsSliceState = {
  DACaseData: object;
  orderDetails:object ;
};

const initialState: newModalsSliceState = {
  DACaseData: {},
  orderDetails: {},
};

export const newModalsSlice = createSlice({
  name: 'newModals',
  initialState,
  reducers: {
    setDACaseData: (state, action: PayloadAction<object>) => {
      state.DACaseData = action?.payload;
    },
    setorderDetails: (state, action: PayloadAction<object>) => {
      state.orderDetails = action?.payload;
    },
  },
});

export const { setDACaseData , setorderDetails } = newModalsSlice?.actions;

export default newModalsSlice?.reducer;
