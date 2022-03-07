import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type doctorSliceState = {
  doctorList: {};
};

const initialState: doctorSliceState = {
  doctorList: {},
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorList: (state, action: PayloadAction<{}>) => {
      state.doctorList = action?.payload;
    },
  },
});

export const { setDoctorList } = doctorSlice?.actions;

export default doctorSlice?.reducer;
