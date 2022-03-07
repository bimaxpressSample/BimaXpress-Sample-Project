import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SideTrayState = {
  user: string;
  role: string;
  userData: object;
  userPlanData: object;
  undSelectedHospital: object;
  showWarning: boolean;
  UndSelectedHospital: object;
  userName: string;
  depUserCredential: object;
};

const initialState: SideTrayState = {
  user: '',
  role: '',
  userData: {},
  userPlanData: {},
  undSelectedHospital: {},
  showWarning: true,
  UndSelectedHospital: {},
  userName: '',
  depUserCredential: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action?.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action?.payload;
    },
    setUserData: (state, action: PayloadAction<object>) => {
      state.userData = action?.payload;
    },
    setUserPlanData: (state, action: PayloadAction<object>) => {
      state.userPlanData = action?.payload;
    },
    setundSelectedHospital: (state, action: PayloadAction<object>) => {
      state.undSelectedHospital = action?.payload;
    },
    setshowWarning: (state, action: PayloadAction<boolean>) => {
      state.showWarning = action?.payload;
    },
    setUndSelectedHospital: (state, action: PayloadAction<object>) => {
      state.UndSelectedHospital = action?.payload;
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action?.payload;
    },

    setDepUserCredential: (state, action: PayloadAction<object>) => {
      state.depUserCredential = action?.payload;
    },
  },
});

export const {
  setUser,
  setRole,
  setUserData,
  setUserPlanData,
  setundSelectedHospital,
  setshowWarning,
  setUndSelectedHospital,
  setUserName,
  setDepUserCredential,
} = userSlice?.actions;

export default userSlice?.reducer;
