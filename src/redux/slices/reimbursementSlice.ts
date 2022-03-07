import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type reimbursementSliceState = {
  remCounter: object;
  remCaseData: object;
  remCurrentBucket: string;
  remCurrentCaseNumber: string;
  remTableData: object;
  remInsuranceTPAList: object;
  insuranceCompanyList: object;
};

const initialState: reimbursementSliceState = {
  remCounter: {},
  remCaseData: {},
  remCurrentBucket: '',
  remCurrentCaseNumber: '',
  remTableData: {},
  remInsuranceTPAList: {},
  insuranceCompanyList: {},
};

export const reimbursementSlice = createSlice({
  name: 'reimbursement',
  initialState,
  reducers: {
    setRemCounter: (state, action: PayloadAction<object>) => {
      state.remCounter = action?.payload;
    },
    setRemCaseData: (state, action: PayloadAction<object>) => {
      state.remCaseData = action?.payload;
    },
    setRemCurrentBucket: (state, action: PayloadAction<string>) => {
      state.remCurrentBucket = action?.payload;
    },
    setRemCurrentCaseNumber: (state, action: PayloadAction<string>) => {
      state.remCurrentCaseNumber = action?.payload;
    },
    setRemremTableData: (state, action: PayloadAction<object>) => {
      state.remTableData = action?.payload;
    },
    setInsuranceTPAlist: (state, action: PayloadAction<object>) => {
      state.remInsuranceTPAList = action?.payload;
    },
    setInsuranceCompanyList: (state, action: PayloadAction<object>) => {
      state.insuranceCompanyList = action?.payload;
    },
  },
});

export const {
  setRemCounter,
  setRemCaseData,
  setRemCurrentBucket,
  setRemCurrentCaseNumber,
  setRemremTableData,
  setInsuranceTPAlist,
  setInsuranceCompanyList,
} = reimbursementSlice?.actions;

export default reimbursementSlice?.reducer;
