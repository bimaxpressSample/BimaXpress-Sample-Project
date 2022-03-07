import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type planSliceState = {
  currentPlan: {};
  allAddonPlans: {};
  allPlans: {};
};

const initialState: planSliceState = {
  currentPlan: {},
  allAddonPlans: {},
  allPlans: {},
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<{}>) => {
      state.currentPlan = action?.payload;
    },
    setAllPlans: (state, action: PayloadAction<{}>) => {
      state.allPlans = action?.payload;
    },
    setAllAddonPlans: (state, action: PayloadAction<{}>) => {
      state.allAddonPlans = action?.payload;
    },
  },
});

export const { setCurrentPlan, setAllPlans, setAllAddonPlans } = planSlice?.actions;

export default planSlice?.reducer;
