import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type bookneworderSliceState = {
  bookOrderData: object;
};

const initialState: bookneworderSliceState = {
  bookOrderData: {},
};

export const bookneworderSlice = createSlice({
  name: 'bookneworder',
  initialState,
  reducers: {
    setbookOrderData: (state, action: PayloadAction<object>) => {
      state.bookOrderData = action?.payload;
    },
  },
});

export const { setbookOrderData } = bookneworderSlice?.actions;

export default bookneworderSlice?.reducer;
