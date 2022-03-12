import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Plan from './components/plan/Plan';
import Layout from './components/layout/Layout';
import Hospital from './components/hospital/Hospital';
import Analyst from './components/analyst/Analysts';
import AnalystCreate from './components/analyst/analystCreate/AnalystCreate';
import AnalystUpdate from './components/analyst/analystUpdateContainer/AnalystUpdateContainer';
import Doctor from './components/doctor/Doctor';
import DoctorCreate from './components/doctor/doctorCreate/DoctorCreate';
import DoctorUpdate from './components/doctor/doctorUpdateContainer/DoctorUpdateContainer';
import NewCase from './components/newCase/NewCase';
import Order from './components/order/Order';
import NewModals from './components/dischargeApproved/newModals';
import Drafts from './components/drafts/Drafts';
import EmpanelledCompanies from './components/empanelled/EmpanelledCompanies';
import CreateCompany from './components/empanelled/createCompany/CreateCompany';
import UpdateCompanies from './components/empanelled/updateCompanies/UpdateCompanies';
import Mail from './components/mail/Mail';
import LoginPage from './components/auth/login.page';
import { useAppSelector } from './redux/hooks';
import PreauthForm from './components/preauthForm/PreauthForm';
import DepHome from './components/dep/depHome';
import DepLayout from './components/layout/DepLayout';
import DepDrafts from './components/drafts/DepDrafts';
import DepNewCase from './components/newCase/DepNewCase';
import EarlySettlement from './components/earlySettlement/EarlySettlement';
import EarlySettlementDash from './components/earlySettlement/EarlySettlementDash';
import UploadDocument from './components/earlySettlement/uploadDocument/UploadDocument';
import InsurerData from './components/earlySettlement/insurerData/InsurerData';
import AccountDetails from './components/earlySettlement/AccountDetails/AccountDetails';
import IntimationPanel from './components/earlySettlement/IntimationPanel/IntimationPanel';
import UndLayout from './components/UnderWriter/UndLayout';
import Discharge from './components/UnderWriter/discharge home';
import UndDrafts from './components/UnderWriter/UndDrafts';
import CaseSummary from './components/UnderWriter/CaseSummary';
import DischargeApproved from './components/dischargeApproved/dischargeApproved';
import TrackYourOrder from './components/order/trackOrders/TrackYourOrder';
import ReimbursementNewCase from './components/reimbursement/ReimbursementNewCase';
import ReimbursementHome from './components/reimbursement/ReimbursementHome';
import ReimbursementTableData from './components/reimbursement/ReimbursementTableData';
import BnplHome from './components/buyNowPayLater/bnplHome';
import BnplTable from './components/buyNowPayLater/bnplTable';
import BnplForm from './components/buyNowPayLater/bnplForm';
import newModalsSlice from './redux/slices/newModalsSlice';
import Wallet from './components/Wallet/Wallet';

// Non Cashless
import NonCashlessAddCase from './components/nonCashless/newCase/NonCashlessAddCase';
import NonCashlessDrafts from './components/nonCashless/Drafts/NonCashlessDrafts';
import NonCashlessEarlySettlementDash from './components/nonCashless/earlySettlementDash/NonCashlessEarlySettlementDash';
import NonCashlessEarlySettlement from './components/nonCashless/EarlySettlement/NonCashlessEarlySettlement';
import NonCashlessLayout from './components/nonCashless/Layout/NonCashlessLayout';
import NonCashlessHome from './components/nonCashless/NonCashlessHome';
function App() {
  const { user, role } = useAppSelector((state) => state?.user);

  const Wrapper = (element: any) => <Layout>{element}</Layout>;

  const DepWrapper = (element: any) => <DepLayout>{element}</DepLayout>;
  const UndWrapper = (element: any) => <UndLayout>{element}</UndLayout>;
  const NonCashlessWrapper = (element: any) => (
    <NonCashlessLayout>{element}</NonCashlessLayout>
  );
  function DisplayUser(role: string) {
    switch (role) {
      case 'admin':
        return (
          <>
            <Route path='/preauthform' element={<PreauthForm />} />
            <Route path='/' element={Wrapper(<Home />)} />
            <Route path='/plan' element={Wrapper(<Plan />)} />
            <Route path='/hospital' element={Wrapper(<Hospital />)} />
            <Route path='/analyst' element={Wrapper(<Analyst />)} />
            <Route path='/analyst/:key' element={Wrapper(<AnalystUpdate />)} />
            <Route
              path='/analyst/create'
              element={Wrapper(<AnalystCreate />)}
            />
            <Route path='/doctor' element={Wrapper(<Doctor />)} />
            <Route path='/doctor/create' element={Wrapper(<DoctorCreate />)} />
            <Route path='/doctor/:key' element={Wrapper(<DoctorUpdate />)} />
            <Route path='/newCase' element={Wrapper(<NewCase />)} />
            <Route path='/newCase/:case' element={Wrapper(<NewCase />)} />
            <Route path='/order' element={Wrapper(<Order />)} />
            <Route path='/caseData/:case' element={Wrapper(<Drafts />)} />
            <Route path='/mail' element={Wrapper(<Mail />)} />
            <Route
              path='/empanelledCompanies'
              element={Wrapper(<EmpanelledCompanies />)}
            />

            <Route
              path='/empanelledCompanies/create'
              element={Wrapper(<CreateCompany />)}
            />
            <Route
              path='/empanelledCompanies/:key'
              element={Wrapper(<UpdateCompanies />)}
            />

            <Route
              path='/discharge_approved'
              element={Wrapper(<DischargeApproved />)}
            />

            <Route
              path='/earlySettlement'
              element={Wrapper(<EarlySettlement />)}
            />
            <Route
              path='/earlySettlementDash'
              element={Wrapper(<EarlySettlementDash />)}
            />
            <Route
              path='/UploadDocument'
              element={Wrapper(<UploadDocument />)}
            />
            <Route path='/InsurerData' element={Wrapper(<InsurerData />)} />
            <Route
              path='/AccountDetails'
              element={Wrapper(<AccountDetails />)}
            />
            <Route
              path='/IntimationPanel'
              element={Wrapper(<IntimationPanel />)}
            />

            <Route
              path='/new_modal/:company/:weight'
              element={Wrapper(<NewModals />)}
            />

            <Route
              path='/trackYourOrder/:key/:orderId'
              element={Wrapper(<TrackYourOrder />)}
            />
            <Route
              path='/reimbursementNewCase'
              element={Wrapper(<ReimbursementNewCase />)}
            />

            <Route
              path='/reimbursementNewCase/:case'
              element={Wrapper(<ReimbursementNewCase />)}
            />

            <Route
              path='/reimbursementHome'
              element={Wrapper(<ReimbursementHome />)}
            />
            <Route
              path='/ReimbursementTableData/:case'
              element={Wrapper(<ReimbursementTableData />)}
            />

            <Route path='/wallet' element={Wrapper(<Wallet />)} />

            {/* BNPL Routes Start Here Need to be seprate out to roles*/}
            <Route path='/bnplHome' element={Wrapper(<BnplHome />)} />
            <Route path='/bnplTable/:case' element={Wrapper(<BnplTable />)} />
            <Route path='/bnplForm' element={Wrapper(<BnplForm />)} />
            {/* BNPL Routes End Here */}
          </>
        );
        break;

      case 'dataentry':
        return (
          <>
            {/* <Route path='/' element={<PreauthForm />} /> */}
            <Route path='/preauthform' element={<PreauthForm />} />
            <Route path='/' element={DepWrapper(<DepHome />)} />
            <Route path='/dephome' element={DepWrapper(<DepHome />)} />
            <Route path='/:case' element={DepWrapper(<DepDrafts />)} />
            <Route path='/newCase' element={DepWrapper(<NewCase />)} />
            <Route
              path='/depnewCase/:case'
              element={DepWrapper(<DepNewCase />)}
            />
          </>
        );
        break;

      case 'underwriter':
        return (
          <>
            <Route path='/' element={UndWrapper(<Discharge />)} />
            <Route path='/dis' element={UndWrapper(<Discharge />)} />
            <Route path='/dis/:case' element={UndWrapper(<UndDrafts />)} />
            <Route path='/:case/:id' element={UndWrapper(<UndDrafts />)} />
            <Route
              path='/patientApprovedDetailsCaseSummary/:key'
              element={UndWrapper(<CaseSummary />)}
            />
            <Route
              path='/patientAvailedCase/:case/:id'
              element={UndWrapper(<CaseSummary />)}
            />
          </>
        );
        break;

      case 'noncashless':
        return (
          <>
            <Route path='/' element={NonCashlessWrapper(<NonCashlessHome />)} />
            <Route
              path='/nonCashlessHome'
              element={NonCashlessWrapper(<NonCashlessHome />)}
            />
            <Route
              path='/nonCashlessnewCase'
              element={NonCashlessWrapper(<NonCashlessAddCase />)}
            />
            <Route
              path='/nonCashlessnewCase/:case'
              element={NonCashlessWrapper(<NonCashlessAddCase />)}
            />
            <Route
              path='/nonCashlesscaseData/:case'
              element={NonCashlessWrapper(<NonCashlessDrafts />)}
            />
            <Route
              path='/nonCashlessEarlySettlement'
              element={NonCashlessWrapper(<NonCashlessEarlySettlement />)}
            />
            <Route
              path='/nonCashlessearlySettlementDash'
              element={NonCashlessWrapper(<NonCashlessEarlySettlementDash />)}
            />
          </>
        );
        break;
    }
  }
  return (
    <Router>
      <Routes>
        {user ? (
          DisplayUser(role)
        ) : (
          <>
            <Route path='/preauthform/:user/:case' element={<PreauthForm />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
