import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HospitalSliceState = {
  hospitalData: {};
};

const initialState: HospitalSliceState = {
  hospitalData: {},
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setHospitalData: (state, action: PayloadAction<{}>) => {
      state.hospitalData = action?.payload;
    },
  },
});

export const { setHospitalData } = hospitalSlice?.actions;

export default hospitalSlice?.reducer;
