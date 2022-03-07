import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShipmentSliceState = {
  shipmentData: any;
};

const initialState: ShipmentSliceState = {
  shipmentData: {},
};

export const ShipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipmentData: (state, action: PayloadAction<{}>) => {
      state.shipmentData = action?.payload;
    },
  },
});

export const { setShipmentData } = ShipmentSlice?.actions;

export default ShipmentSlice?.reducer;
