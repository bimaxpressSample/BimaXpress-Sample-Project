import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type collapseState = {
  collapsed: boolean;
};

const initialState: collapseState = {
  collapsed: true,
};

export const leftBarSlice = createSlice({
  name: "leftBar",
  initialState,
  reducers: {
    setCollapseState: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action?.payload;
    },
  },
});

export const { setCollapseState } = leftBarSlice?.actions;
export default leftBarSlice?.reducer;
