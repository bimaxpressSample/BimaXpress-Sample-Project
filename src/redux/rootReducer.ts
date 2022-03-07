import { combineReducers } from 'redux';
import utilityReducer from './slices/utilitySlice';
import userReducer from './slices/userSlice';
import doctorReducer from './slices/doctorSlice';
import analystReducer from './slices/analystSlice';
import hospitalReducer from './slices/hospitalSlice';
import empanelledCompaniesReducer from './slices/empanelledCompaniesSlice';
import planReducer from './slices/planSlice';
import homeReducer from './slices/homeSlice';
import mailSliceReducer from './slices/mailSlice';
import caseReducer from './slices/caseSlice';
import leftBarSlice from './slices/leftBarSlice';
import dischargeApprovedSlice from './slices/dischargeApprovedSlice';
import earlySettlementSlice from './slices/earlySettlementSlice';
import roomListReducer from './slices/roomListSlice';
import chargesListReducer from './slices/chargesListSlice';
import tpaListReducer from './slices/tpaListSlice';
import reimbursementSlice from './slices/reimbursementSlice';
import shipmentSlice from './slices/shipmentSlice';
import newModalsSlice from './slices/newModalsSlice';
import bookneworderSlice from './slices/bookneworderSlice';
import newshipmentdata from './slices/shipmentsSlice';
import bnplSlice from './slices/bnplSlice';
import empanelledTPASlice from './slices/empanelledTPASlice';
const rootReducer = combineReducers({
  utility: utilityReducer,
  user: userReducer,
  // role: userReducer,
  // userData: userReducer,
  doctor: doctorReducer,
  analyst: analystReducer,
  hospital: hospitalReducer,
  empanelledCompanies: empanelledCompaniesReducer,
  plan: planReducer,
  home: homeReducer,
  mail: mailSliceReducer,
  case: caseReducer,
  leftBarSlice: leftBarSlice,
  dischargeApproved: dischargeApprovedSlice,
  esData: earlySettlementSlice,
  roomListData: roomListReducer,
  chargesListData: chargesListReducer,
  tpaListData: tpaListReducer,
  reimbursement: reimbursementSlice,
  shipmentData: shipmentSlice,
  newModals: newModalsSlice,
  bookOrderData: bookneworderSlice,
  shipmentsData: newshipmentdata,
  bnpl: bnplSlice,
  empanelledTPA: empanelledTPASlice,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
