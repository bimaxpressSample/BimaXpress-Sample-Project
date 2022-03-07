import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type empanelledCompaniesState = {
  empanelledCompaniesList: {};
  allCompaniesList: {};
  retelist: {};
  EmpanelledCompaniesMain: {};
};

const initialState: empanelledCompaniesState = {
  empanelledCompaniesList: {},
  allCompaniesList: {},
  retelist: {},
  EmpanelledCompaniesMain: {},
};

export const empanelledCompaniesSlice = createSlice({
  name: 'empanelledCompanies',
  initialState,
  reducers: {
    setEmpanelledCompaniesList: (state, action: PayloadAction<{}>) => {
      state.empanelledCompaniesList = action?.payload;
    },
    setAllCompaniesList: (state, action: PayloadAction<{}>) => {
      state.allCompaniesList = action?.payload;
    },
    setReteList: (state, action: PayloadAction<{}>) => {
      state.retelist = action?.payload;
    },
    setEmpanelledCompaniesMain: (state, action: PayloadAction<{}>) => {
      state.EmpanelledCompaniesMain = action?.payload;
    },
  },
});

export const {
  setEmpanelledCompaniesList,
  setAllCompaniesList,
  setReteList,
  setEmpanelledCompaniesMain,
} = empanelledCompaniesSlice?.actions;

export default empanelledCompaniesSlice?.reducer;
