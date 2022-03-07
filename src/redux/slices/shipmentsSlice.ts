import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type newShipmentSlice = {
  newShipmentData: any;
};

const initialState: newShipmentSlice = {
  newShipmentData: [],
};

export const newshipmentdata = createSlice({
  name: "newshipmentdata",
  initialState,
  reducers: {
    setShipmentData: (state, action: PayloadAction<any>) => {
      state.newShipmentData = action?.payload;
    },
  },
});

export const { setShipmentData } = newshipmentdata?.actions;
export default newshipmentdata?.reducer;
