import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mailSliceState = {
  composeMailStatus: string;
  inboxMailList: {}[];
  sentMailList: {}[];
  currentMailList: string;
};

const initialState: mailSliceState = {
  composeMailStatus: "new",
  inboxMailList: [],
  sentMailList: [],
  currentMailList: "inbox",
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setComposeMailStatus: (state, action: PayloadAction<string>) => {
      state.composeMailStatus = action?.payload;
    },
    setInboxMailList: (state, action: PayloadAction<{}[]>) => {
      state.inboxMailList = action?.payload;
    },
    setSentMailList: (state, action: PayloadAction<{}[]>) => {
      state.sentMailList = action?.payload;
    },
    setCurrentMailList: (state, action: PayloadAction<string>) => {
      state.currentMailList = action?.payload;
    },
  },
});

export const {
  setComposeMailStatus,
  setInboxMailList,
  setSentMailList,
  setCurrentMailList,
} = mailSlice?.actions;

export default mailSlice?.reducer;
