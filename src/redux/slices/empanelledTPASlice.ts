import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type empanelledTPAState = {
  empanelledTPAList: {};
};

const initialState: empanelledTPAState = {
  empanelledTPAList: {},
};

export const empanelledTPASlice = createSlice({
  name: "empanelledTPA",
  initialState,
  reducers: {
    setEmpanelledTPAList: (state, action: PayloadAction<{}>) => {
      state.empanelledTPAList = action?.payload;
    },
  },
});

export const { setEmpanelledTPAList} =
  empanelledTPASlice?.actions;

export default empanelledTPASlice?.reducer;
