import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    roomListData: { roomlist:[],roomtype:[]},
};

export const roomListSlice = createSlice({
  name: "roomListData",
  initialState,
  reducers: {
    setRoomListData: (state, action: PayloadAction<any>) => {
      state.roomListData = action?.payload;
    },
  },
});

export const { setRoomListData } = roomListSlice?.actions;

export default roomListSlice?.reducer;
