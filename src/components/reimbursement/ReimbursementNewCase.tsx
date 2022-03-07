import { useEffect, useState } from 'react';
import ReimbProgressBar from './ReimbProgessBar/ReimbProgessBar';
import PartAReimbursement from './PartAReimbursement';
import PartBReimbursement from './PartBReimbursement';
import RemhospitalSelect from './RemhospitalSelect';
import notification from '../theme/utility/notification';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/slices/utilitySlice';
import axiosConfig from '../../config/axiosConfig';
import {
  setRemCurrentCaseNumber,
  setRemCurrentBucket,
} from '../../redux/slices/reimbursementSlice';
import ReimbEmailModal from './ReimbEmailModal/ReimbEmailModal';
import { setCurrentBucket } from '../../redux/slices/homeSlice';
const ReimbursementNewCase = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);
  const { remCaseData, remCurrentCaseNumber } = useAppSelector(
    (state) => state?.reimbursement
  );
  const dispatch = useAppDispatch();

  const [steps, setSteps] = useState(1);
  const [yearList, setYearList] = useState<{ label: string; value: string }[]>(
    []
  );
  const [emailModalOpen, setEmailModal] = useState(false);
  function toggleEmailModal() {
    setEmailModal((pre) => !pre);
  }

  const [currentSectionOpen, SetcurrentSectionOpen] =
    useState('detailsOfPrimary');

  const [lastSectionClosed, setlastSectionClosed] = useState('');
  const [preferTPA_Company, setPreferTPA_Company] = useState('both');
  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const [formData, setFormData] = useState({
    Tpa_CompanySelect:
      //@ts-ignore
      'Tpa_Company' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Tpa_Company
        : '',

    InsurancecompanySelect:
      //@ts-ignore
      'Insurance_Company' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Insurance_Company
        : '',

    IPDpatientNumber:
      //@ts-ignore
      'ipd_patient_number' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.ipd_patient_number
        : '',

    // Primary Insured
    DPIpolicyNumber:
      //@ts-ignore
      'DPIpolicyNumber' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPIpolicyNumber
        : '',

    DPIsiCerticate:
      //@ts-ignore
      'DPIsiCerticate' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPIsiCerticate
        : '',

    DPIcompanyTPANO:
      //@ts-ignore
      'DPIcompanyTPANO' in remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPIcompanyTPANO
        : '',

    DPIcompanyName:
      //@ts-ignore
      'Company_Name' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Company_Name
        : '',
    DPIemployeeNo:
      //@ts-ignore
      'EmployeeId' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.EmployeeId
        : '',
    DPIname:
      //@ts-ignore
      'Name_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Name_PI
        : '',

    DPIaddress:
      //@ts-ignore
      'Address_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Address_PI
        : '',
    DPIcity:
      //@ts-ignore
      'DPIcity' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPIcity
        : '',
    DPIstate:
      //@ts-ignore
      'state_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.state_PI
        : '',
    DPIphoneNo:
      //@ts-ignore
      'Phone_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.Phone_PI
        : '',

    DPIemailID:
      //@ts-ignore
      'emailid_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.emailid_PI
        : '',

    DPIpincode:
      //@ts-ignore
      'pinCode_PI' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.pinCode_PI
        : 0,

    //Details of Insruance history

    DIHCurrentlycoveredCheck:
      //@ts-ignore
      'DIHCurrentlycoveredCheck' in remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DIHCurrentlycoveredCheck
        : '',
    DIHDateofcommencement:
      'date_of_commencement_of_first_Insurance_without_break' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details
            .date_of_commencement_of_first_Insurance_without_break
        : '',
    DIHcompanyName:
      'other_insurance_company_name' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.other_insurance_company_name
        : '',
    DIHPolicyNo:
      'other_insurance_policy_no' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.other_insurance_policy_no
        : '',
    DIHSumInsured:
      'sum_insured' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.sum_insured
        : 0,
    DIHHaveyoubeenhospitalized:
      'hospitalized_in_last_four_years_date' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.hospitalized_in_last_four_years_date
        : '',

    DIHIfYesdate:
      'DIHIfYesdate' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DIHIfYesdate
        : '',
    DIHDiagnosis:
      'diagnosis' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.diagnosis
        : '',
    DIHPreviouslycoveredby:
      'prevoius_other_insurance' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.prevoius_other_insurance
        : '',
    DIHPreviouslyCoveredCompanyName:
      'prevoius_other_insurance_company_name' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.prevoius_other_insurance_company_name
        : '',

    // Details of insured person hospitalized
    DPHNameofpatient:
      'Name' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.Name
        : '',
    DPHGender:
      'gender_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.gender_patient
        : '',
    DPHAgeYears:
      'DPHAgeYears' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHAgeYears
        : '',
    DPHAgeMonths:
      'AgeMonth_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.AgeMonth_patient
        : '',
    DPHDateofBirth:
      'DOB_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DOB_patient
        : '',
    DPHHealthID:
      'DPHHealthID' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHHealthID
        : '',
    DPHRelpPriInsured:
      'relation_with_insured' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.relation_with_insured
        : '',
    DPHRelpOther:
      'DPHRelpOther' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHRelpOther
        : '',
    DPHOccupation:
      'occupation_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.occupation_patient
        : '',
    DPHOccupationOther:
      'DPHOccupationOther' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHOccupationOther
        : '',
    DPHAddressCheck:
      'DPHAddressCheck' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHAddressCheck
        : '',
    DPHAddress:
      'address_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.address_patient
        : '',
    DPHCity:
      'city_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.city_patient
        : '',
    DPHState:
      'state_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.state_patient
        : '',
    DPHPinCode:
      'pinCode_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.pinCode_patient
        : '',
    DPHPhoneNo:
      'DPHPhoneNo' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.DPHPhoneNo
        : '',
    DPHEmailID:
      'email_patient' in
      //@ts-ignore
      remCaseData.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details.email_patient
        : '',

    // Details of Hospitalization
    DHNameofhospital:
      'nameofhospital' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details.nameofhospital
        : '',
    DHRoomCategory:
      'Room_Category' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.Room_Category
        : '',
    DHHospitalizationDueTo:
      'hospitalized_due_to' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.hospitalized_due_to
        : '',
    DHTreatingDoctor:
      'Treating_Doctor_Name' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.Treating_Doctor_Name
        : '',
    DHDiagnosis:
      'DHDiagnosis' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DHDiagnosis
        : '',
    DHDateInjrury:
      'DateofInjury' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DateofInjury
        : '',
    DHDateAdmission:
      'Date_of_Admission' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.Date_of_Admission
        : '',
    DHTimeAdmission:
      'admission_time' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.admission_time
        : '',
    DHDateDischarge:
      'DHDateDischarge' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DHDateDischarge
        : '',
    DHTimeDischarge:
      'timeofdischarge' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.timeofdischarge
        : '',
    DHIfInjuryCause:
      'ifinjurygivecause' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.ifinjurygivecause
        : '',
    DHIAlcoholConsumptionTest:
      'DHIAlcoholConsumptionTest' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DHIAlcoholConsumptionTest
        : '',
    DHMedicoLegal:
      'if_medico_legal' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.if_medico_legal
        : '',
    DHReportedToPolice:
      'Reported_To_Police' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.Reported_To_Police
        : '',
    DHMlcReport:
      'DHMlcReport' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DHMlcReport
        : '',
    DHMSystemofmedicine:
      'systemofmedicine' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.systemofmedicine
        : '',

    // Details of Claim
    DCPrehospitalizationExpen:
      'pre_hospitalization_expenses' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.pre_hospitalization_expenses
        : 0,
    DCHospitalizationExpenses:
      'hospitalization_expenses' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.hospitalization_expenses
        : 0,
    DCPostHospitalizationExpenses:
      'post_hospitalization_expenses' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.post_hospitalization_expenses
        : 0,
    DCHealthCheckUpCost:
      'Health_checkupcost' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.Health_checkupcost
        : 0,
    DCAmbulanceCharges:
      'ambulance_charge' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.ambulance_charge
        : 0,
    DCOthersCode1:
      'others_code' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.others_code
        : 0,
    DCOtherAmount1:
      'DCOtherAmount1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DCOtherAmount1
        : 0,
    DCTotal1:
      'DCTotal11' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DCTotal1
        : '',
    DCPreHospitalizationPeriod:
      'pre_hospitalization_period' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.pre_hospitalization_period
        : 0,
    DCPostHospitalizationPeriod:
      'post_hospitalization_period' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.post_hospitalization_period
        : 0,
    DCClaimDomiciliary:
      'claim_for_domiciliary_hospitalization' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.claim_for_domiciliary_hospitalization
        : '',
    DCHospitalDailyCash:
      'hospital_daily_cash' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.hospital_daily_cash
        : '',
    DCSurgicalCash:
      'surgical_cash' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.surgical_cash
        : '',
    DCCriticalIllnessBenefit:
      'critical_illness_benefit' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.critical_illness_benefit
        : '',
    DCConvalescence:
      'convalescence' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.convalescence
        : '',
    DCPostLumpSumBenefit:
      'pre_post_hospitalization_lumpsum' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.pre_post_hospitalization_lumpsum
        : '',
    DCOthersCode2:
      'others' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.others
        : '',
    DCOtherAmount2:
      'DCOtherAmount2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DCOtherAmount2
        : '',
    DCTotal2:
      'DCTotal2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DCTotal2
        : '',

    CL1ClaimFormDulySigned:
      'CL1ClaimFormDulySigned' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1ClaimFormDulySigned
        : '',
    CL1CopyIntimation:
      'CL1CopyIntimation' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1CopyIntimation
        : '',
    CL1HospitalMainBill:
      'CL1HospitalMainBill' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1HospitalMainBill
        : '',
    CL1HospitalBreak:
      'CL1HospitalBreak' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1HospitalBreak
        : '',
    CL1HospitalBillPaymentReceipt:
      'CL1HospitalBillPaymentReceipt' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1HospitalBillPaymentReceipt
        : '',
    CL1HospitalDischargeSummary:
      'CL1HospitalDischargeSummary' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1HospitalDischargeSummary
        : '',
    CL1PharmacyBill:
      'CL1PharmacyBill' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1PharmacyBill
        : '',
    CL1OperationTheatreNotes:
      'CL1OperationTheatreNotes' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1OperationTheatreNotes
        : '',
    CL1ECG:
      'CL1ECG' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1ECG
        : '',
    CL1DoctorRequestinves:
      'CL1DoctorRequestinves' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1DoctorRequestinves
        : '',
    CL1InvestigationReports:
      'CL1InvestigationReports' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1InvestigationReports
        : '',
    CL1DoctorPrescriptions:
      'CL1DoctorPrescriptions' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1DoctorPrescriptions
        : '',
    CL1Others:
      'CL1Others' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1Others
        : '',
    CL1OtherText:
      'CL1OtherText' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL1OtherText
        : '',

    DBEBillNo1:
      'DBEBillNo1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo1
        : '',
    DBEDate1:
      'DBEDate1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate1
        : '',
    DBEIssued1:
      'DBEIssued1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued1
        : '',
    DBETowards1: 'Hospital main Bill',
    DBEAmount1:
      'DBEAmount1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount1
        : '',
    DBEBillNo2:
      'DBEBillNo2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo2
        : '',
    DBEDate2:
      'DBEDate2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate2
        : '',
    DBEIssued2:
      'DBEIssued2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued2
        : '',
    DBETowards2: 'Pre-hospitalization Bills',
    DBEAmount2:
      'DBEAmount2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount2
        : '',
    DBEBillNo3:
      'DBEBillNo3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo3
        : '',
    DBEDate3:
      'DBEDate3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate3
        : '',
    DBEIssued3:
      'DBEIssued3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued3
        : '',
    DBETowards3: 'Post-hospitalization Bills',
    DBEAmount3:
      'DBEAmount3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount3
        : '',
    DBEBillNo4:
      'DBEBillNo4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo4
        : '',
    DBEDate4:
      'DBEDate4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate4
        : '',
    DBEIssued4:
      'DBEIssued4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued4
        : '',
    DBETowards4: 'Pharmacy Bills',
    DBEAmount4:
      'DBEAmount4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount4
        : '',
    DBEBillNo5:
      'DBEBillNo5' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo5
        : '',
    DBEDate5:
      'DBEDate5' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate5
        : '',
    DBEIssued5:
      'DBEIssued5' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued5
        : '',
    DBETowards5:
      'DBETowards5' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards5
        : '',
    DBEAmount5:
      'DBEAmount5' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount5
        : '',
    DBEBillNo6:
      'DBEBillNo6' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo6
        : '',
    DBEDate6:
      'DBEDate6' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate6
        : '',
    DBEIssued6:
      'DBEIssued6' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued6
        : '',
    DBETowards6:
      'DBETowards6' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards6
        : '',
    DBEAmount6:
      'DBEAmount6' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount6
        : '',
    DBEBillNo7:
      'DBEBillNo7' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo7
        : '',
    DBEDate7:
      'DBEDate7' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate7
        : '',
    DBEIssued7:
      'DBEIssued7' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued7
        : '',
    DBETowards7:
      'DBETowards7' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards7
        : '',
    DBEAmount7:
      'DBEAmount7' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount7
        : '',
    DBEBillNo8:
      'DBEBillNo8' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo8
        : '',
    DBEDate8:
      'DBEDate8' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate8
        : '',
    DBEIssued8:
      'DBEIssued8' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued8
        : '',
    DBETowards8:
      'DBETowards8' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards8
        : '',
    DBEAmount8:
      'DBEAmount8' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount8
        : '',
    DBEBillNo9:
      'DBEBillNo9' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo9
        : '',
    DBEDate9:
      'DBEDate9' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate9
        : '',
    DBEIssued9:
      'DBEIssued9' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued9
        : '',
    DBETowards9:
      'DBETowards9' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards9
        : '',
    DBEAmount9:
      'DBEAmount9' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount9
        : '',
    DBEBillNo10:
      'DBEBillNo10' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEBillNo10
        : '',
    DBEDate10:
      'DBEDate10' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEDate10
        : '',
    DBEIssued10:
      'DBEIssued10' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEIssued10
        : '',
    DBETowards10:
      'DBETowards10' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBETowards10
        : '',
    DBEAmount10:
      'DBEAmount10' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DBEAmount10
        : '',

    DIBAnameAccountHolder:
      'DIBAnameAccountHolder' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DIBAnameAccountHolder
        : '',
    DIBAccountNumber:
      'account_no_primary_insured' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.account_no_primary_insured
        : '',
    DIBAbankName:
      'bank_name' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.bank_name
        : '',
    DIBAbranchName:
      'bank_branch_name' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.bank_branch_name
        : '',
    DIBAaccountType:
      'DIBAaccountType' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DIBAaccountType
        : '',
    DIBAmicrNo:
      'DIBAmicrNo' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DIBAmicrNo
        : '',
    DIBAifscCODE:
      'ifsc_code' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.ifsc_code
        : '',
    DIBApan:
      'pan_primary_insured' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.pan_primary_insured
        : '',
    DIBAchequeDD:
      'cheque_details' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.cheque_details
        : '',

    // Hospital Details
    // HDnameHospital: '',
    HDhospitalID:
      'hospital_id' in
      //@ts-ignore
      remCaseData?.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.hospital_id
        : '',
    HDtypeofHospital:
      'typeofhospital' in
      //@ts-ignore
      remCaseData?.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.typeofhospital
        : '',
    // HDnameTreatingDoctor: '',
    HDqualification:
      'HDqualification' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDqualification
        : '',
    HDregistrationNo:
      'HDregistrationNo' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDregistrationNo
        : '',

    HDphoneNo:
      'HDphoneNo' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDphoneNo
        : '',
    HDrohiniCode:
      'HDrohiniCode' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDrohiniCode
        : '',
    HDnABHCode:
      'HDnABHCode' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDnABHCode
        : '',
    HDstateLevelCertificate:
      'HDstateLevelCertificate' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.HDstateLevelCertificate
        : '',

    // Details of Patient Admitted
    // DPAnameOfPatient: '',
    // DPAipRegistrationNo:
    //   'DPAipRegistrationNo' in
    //   //@ts-ignore
    //   remCaseData?.patient_details
    //     ? //@ts-ignore
    //       remCaseData?.patient_details?.DPAipRegistrationNo
    //     : '',
    // DPAgender: '',
    // DPAdob: '',
    // DPAageYears: '',
    // DPAageMonths: '',
    // DPAdateAdmission: '',
    // DPAtimeAdmission: '',
    // DPAdateDischarge: '',
    // DPAtimeDischarge: '',
    DPAtypeAdmission:
      'DPAtypeAdmission' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPAtypeAdmission
        : '',
    DPAifMaternityDateDelivery:
      'DPAifMaternityDateDelivery' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPAifMaternityDateDelivery
        : '',
    DPAgravidaStatus:
      'DPAgravidaStatus' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPAgravidaStatus
        : '',
    DPAstatusDischarge:
      'status_at_time_of_discharge' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.status_at_time_of_discharge
        : '',
    DPAtotalAmount:
      'DPAtotalAmount' in
      //@ts-ignore
      remCaseData?.patient_details
        ? //@ts-ignore
          remCaseData?.patient_details?.DPAtotalAmount
        : '',

    DADICD10Codes1:
      'DADICD10Codes1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10Codes1
        : '',
    DADDescriptionC1:
      'DADDescriptionC1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescriptionC1
        : '',
    DADICD10Codes2:
      'DADICD10Codes2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10Codes2
        : '',
    DADDescriptionC2:
      'DADDescriptionC2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescriptionC2
        : '',
    DADICD10Codes3:
      'DADICD10Codes3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10Codes3
        : '',
    DADDescriptionC3:
      'DADDescriptionC3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescriptionC3
        : '',
    DADICD10Codes4:
      'DADICD10Codes4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10Codes4
        : '',
    DADDescriptionC4:
      'DADDescriptionC4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescriptionC4
        : '',

    DADICD10PCS1:
      'DADICD10PCS1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10PCS1
        : '',
    DADDescription1:
      'DADDescription1' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescription1
        : '',
    DADICD10PCS2:
      'DADICD10PCS2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10PCS2
        : '',
    DADDescription2:
      'DADDescription2' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescription2
        : '',
    DADICD10PCS3:
      'DADICD10PCS3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADICD10PCS3
        : '',
    DADDescription3:
      'DADDescription3' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescription3
        : '',
    DADDescription4:
      'DADDescription4' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADDescription4
        : '',

    DADpreAuthorizationRadio:
      'DADpreAuthorizationRadio' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADpreAuthorizationRadio
        : '',
    DADpreAuthorizationNum:
      'DADpreAuthorizationNum' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADpreAuthorizationNum
        : '',

    //Ask TO ADD IT
    DADauthorizationNotReason:
      'DADauthorizationNotReason' in
      //@ts-ignore
      remCaseData?.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.DADauthorizationNotReason
        : '',

    // DADhospitalizationInjury: '',
    // DADhospitalizationInjuryCause: '',
    // DADinjuryAlcoholConsumption: '',
    // DADmedicoLegal: '',
    // DADreportedPolice: '',

    DADfirNo:
      'FIR_Number' in
      //@ts-ignore
      remCaseData?.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.FIR_Number
        : '',
    DADifNotReportedReason:
      'not_reported_reason' in
      //@ts-ignore
      remCaseData?.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.not_reported_reason
        : '',

    // Claim Documents Submitted - Check List
    CL2claimFormDulySigned:
      'CL2claimFormDulySigned' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2claimFormDulySigned
        : '',
    CL2originalPreAuth:
      'CL2originalPreAuth' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2originalPreAuth
        : '',
    CL2copyofthePreAuth:
      'CL2copyofthePreAuth' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2copyofthePreAuth
        : '',
    CL2photoIDCardPatientVerified:
      'CL2photoIDCardPatientVerified' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2photoIDCardPatientVerified
        : '',
    CL2hospitalDischargeSummary:
      'CL2hospitalDischargeSummary' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2hospitalDischargeSummary
        : '',
    CL2operationTheatreNotes:
      'CL2operationTheatreNotes' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2operationTheatreNotes
        : '',
    CL2hospitalMainBill:
      'CL2hospitalMainBill' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2hospitalMainBill
        : '',
    CL2hospitalBreakBill:
      'CL2hospitalBreakBill' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2hospitalBreakBill
        : '',
    CL2investigationReports:
      'CL2investigationReports' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2investigationReports
        : '',
    CL2ctmrInvestigation:
      'CL2ctmrInvestigation' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2ctmrInvestigation
        : '',
    CL2doctorReferenceSlip:
      'CL2doctorReferenceSlip' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2doctorReferenceSlip
        : '',
    CL2ECG:
      'CL2ECG' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2ECG
        : '',
    CL2PharmacyBills:
      'CL2PharmacyBills' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2PharmacyBills
        : '',
    CL2mlcReport:
      'CL2mlcReport' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2mlcReport
        : '',
    CL2originalDeathSummary:
      'CL2originalDeathSummary' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2originalDeathSummary
        : '',
    CL2AnyOther:
      'CL2AnyOther' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2AnyOther
        : '',
    CL2OtherText:
      'CL2OtherText' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.CL2OtherText
        : '',

    //Additional Details in Case of Non Network Hospital
    NNHaddressOfHospital:
      'NNHaddressOfHospital' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.NNHaddressOfHospital
        : '',
    NNHcity:
      'NNHcity' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.NNHcity
        : '',
    NNHstate:
      'NNHstate' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.NNHstate
        : '',
    NNHpinCode:
      'NNHpinCode' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.NNHpinCode
        : '',
    // NNHphoneNo: '',
    // NNHregistrationNo: '',
    NNHhospitalPAN:
      'hospital_pan' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.hospital_pan
        : '',
    NNHimpatientBeds:
      'number_of_impatient_beds' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.number_of_impatient_beds
        : '',
    NNHot:
      'OT_available' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.OT_available
        : '',
    NNHicu:
      'ICU_available' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.ICU_available
        : '',
    NNHothers:
      'NNHothers' in
      //@ts-ignore
      remCaseData.hospital_details
        ? //@ts-ignore
          remCaseData?.hospital_details?.NNHothers
        : '',
  });
  const postDatatoAPI = async () => {
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(
        `/CRauthdata?email=${user}&casenumber=${remCurrentCaseNumber}`,
        {
          Tpa_Company: formData?.Tpa_CompanySelect,
          Insurance_Company: formData?.InsurancecompanySelect,
          ipd_patient_number: formData?.IPDpatientNumber,

          // Primary Insured
          DPIpolicyNumber: formData?.DPIpolicyNumber,
          DPIsiCerticate: formData?.DPIsiCerticate,
          DPIcompanyTPANO: formData?.DPIcompanyTPANO,
          Company_Name: formData?.DPIcompanyName,
          EmployeeId: formData?.DPIemployeeNo,
          Name: formData?.DPIname,
          Address: formData?.DPIaddress,
          DPIcity: formData?.DPIcity,
          state: formData?.DPIstate,
          Phone: formData?.DPIphoneNo,
          emailid: formData?.DPIemailID,
          pinCode: Number(formData?.DPIpincode),

          // Details of Insruance history
          DIHCurrentlycoveredCheck: formData?.DIHCurrentlycoveredCheck,
          date_of_commencement_of_first_Insurance_without_break:
            formData?.DIHDateofcommencement,
          other_insurance_company_name: formData?.DIHcompanyName,
          other_insurance_policy_no: formData?.DIHPolicyNo,
          sum_insured: Number(formData?.DIHSumInsured),
          hospitalized_in_last_four_years_date:
            formData?.DIHHaveyoubeenhospitalized,
          DIHIfYesdate: formData?.DIHIfYesdate,
          diagnosis: formData?.DIHDiagnosis,
          prevoius_other_insurance: formData?.DIHPreviouslycoveredby,
          prevoius_other_insurance_company_name:
            formData?.DIHPreviouslyCoveredCompanyName,

          // // Details of insured person hospitalized
          name_patient: formData.DPHNameofpatient,
          gender_patient: formData.DPHGender,
          DPHAgeYears: formData.DPHAgeYears,
          AgeMonth_patient: formData.DPHAgeMonths,
          DOB_patient: formData.DPHDateofBirth,
          DPHHealthID: formData.DPHHealthID,
          relation_with_insured: formData.DPHRelpPriInsured,
          DPHRelpOther: formData.DPHRelpOther,
          occupation_patient: formData.DPHOccupation,
          DPHOccupationOther: formData.DPHOccupationOther,
          DPHAddressCheck: formData.DPHAddressCheck,
          address_patient: formData.DPHAddress,
          city_patient: formData.DPHCity,
          state_patient: formData.DPHState,
          pinCode_patient: formData.DPHPinCode,
          DPHPhoneNo: formData.DPHPhoneNo,
          email_patient: formData.DPHEmailID,

          // Details of Hospitalization
          nameofhospital: formData?.DHNameofhospital,
          Room_Category: formData?.DHRoomCategory,
          hospitalized_due_to: formData?.DHHospitalizationDueTo,
          Treating_Doctor_Name: formData?.DHTreatingDoctor,
          DHDiagnosis: formData?.DHDiagnosis,
          DateofInjury: formData?.DHDateInjrury,
          Date_of_Admission: formData?.DHDateAdmission,
          admission_time: formData?.DHTimeAdmission,
          DHDateDischarge: formData?.DHDateDischarge,
          timeofdischarge: formData?.DHTimeDischarge,
          ifinjurygivecause: formData?.DHIfInjuryCause,
          DHIAlcoholConsumptionTest: formData?.DHIAlcoholConsumptionTest,
          if_medico_legal: formData?.DHMedicoLegal,
          Reported_To_Police: formData?.DHReportedToPolice,
          DHMlcReport: formData?.DHMlcReport,
          systemofmedicine: formData?.DHMSystemofmedicine,

          // Details of Claim
          pre_hospitalization_expenses: Number(
            formData?.DCPrehospitalizationExpen
          ),
          hospitalization_expenses: Number(formData?.DCHospitalizationExpenses),
          post_hospitalization_expenses: Number(
            formData?.DCPostHospitalizationExpenses
          ),
          Health_checkupcost: Number(formData?.DCHealthCheckUpCost),
          ambulance_charge: Number(formData?.DCAmbulanceCharges),
          others_code: Number(formData?.DCOthersCode1),
          DCOtherAmount1: Number(formData?.DCOtherAmount1),
          DCTotal1: formData?.DCTotal1,
          pre_hospitalization_period: Number(
            formData?.DCPreHospitalizationPeriod
          ),
          post_hospitalization_period: Number(
            formData?.DCPostHospitalizationPeriod
          ),
          claim_for_domiciliary_hospitalization: formData?.DCClaimDomiciliary,
          hospital_daily_cash: formData?.DCHospitalDailyCash,
          surgical_cash: formData?.DCSurgicalCash,
          critical_illness_benefit: formData?.DCCriticalIllnessBenefit,
          convalescence: formData?.DCConvalescence,
          pre_post_hospitalization_lumpsum: formData?.DCPostLumpSumBenefit,
          others: formData?.DCOthersCode2,
          DCOtherAmount2: formData?.DCOtherAmount2,
          DCTotal2: formData?.DCTotal2,

          // CL1
          CL1ClaimFormDulySigned: formData?.CL1ClaimFormDulySigned,
          CL1CopyIntimation: formData?.CL1CopyIntimation,
          CL1HospitalMainBill: formData?.CL1HospitalMainBill,
          CL1HospitalBreak: formData?.CL1HospitalBreak,
          CL1HospitalBillPaymentReceipt:
            formData?.CL1HospitalBillPaymentReceipt,
          CL1HospitalDischargeSummary: formData?.CL1HospitalDischargeSummary,
          CL1PharmacyBill: formData?.CL1PharmacyBill,
          CL1OperationTheatreNotes: formData?.CL1OperationTheatreNotes,
          CL1ECG: formData?.CL1ECG,
          CL1DoctorRequestinves: formData?.CL1DoctorRequestinves,
          CL1InvestigationReports: formData?.CL1InvestigationReports,
          CL1DoctorPrescriptions: formData?.CL1DoctorPrescriptions,
          CL1Others: formData?.CL1Others,
          CL1OtherText: formData?.CL1OtherText,

          // // Table 1
          DBEBillNo1: formData?.DBEBillNo1.toString(),
          DBEDate1: formData?.DBEDate1,
          DBEIssued1: formData?.DBEIssued1,
          DBETowards1: formData?.DBETowards1,
          DBEAmount1: formData?.DBEAmount1,
          DBEBillNo2: formData?.DBEBillNo2,
          DBEDate2: formData?.DBEDate2,
          DBEIssued2: formData?.DBEIssued2,
          DBETowards2: formData?.DBETowards2,
          DBEAmount2: formData?.DBEAmount2,
          DBEBillNo3: formData?.DBEBillNo3,
          DBEDate3: formData?.DBEDate3,
          DBEIssued3: formData?.DBEIssued3,
          DBETowards3: formData?.DBETowards3,
          DBEAmount3: formData?.DBEAmount3,
          DBEBillNo4: formData?.DBEBillNo4,
          DBEDate4: formData?.DBEDate4,
          DBEIssued4: formData?.DBEIssued4,
          DBETowards4: formData?.DBETowards4,
          DBEAmount4: formData?.DBEAmount4,
          DBEBillNo5: formData?.DBEBillNo5,
          DBEDate5: formData?.DBEDate5,
          DBEIssued5: formData?.DBEIssued5,
          DBETowards5: formData?.DBETowards5,
          DBEAmount5: formData?.DBEAmount5,
          DBEBillNo6: formData?.DBEBillNo6,
          DBEDate6: formData?.DBEDate6,
          DBEIssued6: formData?.DBEIssued6,
          DBETowards6: formData?.DBETowards6,
          DBEAmount6: formData?.DBEAmount6,
          DBEBillNo7: formData?.DBEBillNo7,
          DBEDate7: formData?.DBEDate7,
          DBEIssued7: formData?.DBEIssued7,
          DBETowards7: formData?.DBETowards7,
          DBEAmount7: formData?.DBEAmount7,
          DBEBillNo8: formData?.DBEBillNo8,
          DBEDate8: formData?.DBEDate8,
          DBEIssued8: formData?.DBEIssued8,
          DBETowards8: formData?.DBETowards8,
          DBEAmount8: formData?.DBEAmount8,
          DBEBillNo9: formData?.DBEBillNo9,
          DBEDate9: formData?.DBEDate9,
          DBEIssued9: formData?.DBEIssued9,
          DBETowards9: formData?.DBETowards9,
          DBEAmount9: formData?.DBEAmount9,
          DBEBillNo10: formData?.DBEBillNo10,
          DBEDate10: formData?.DBEDate10,
          DBEIssued10: formData?.DBEIssued10,
          DBETowards10: formData?.DBETowards10,
          DBEAmount10: formData?.DBEAmount10,

          //  DIBAnameAccountHolder
          DIBAnameAccountHolder: formData?.DIBAnameAccountHolder,
          account_no_primary_insured: formData?.DIBAccountNumber,
          bank_name: formData?.DIBAbankName,
          bank_branch_name: formData?.DIBAbranchName,
          DIBAaccountType: formData?.DIBAaccountType,
          DIBAmicrNo: formData?.DIBAmicrNo,
          ifsc_code: formData?.DIBAifscCODE,
          pan_primary_insured: formData?.DIBApan,
          cheque_details: formData?.DIBAchequeDD,

          // Hospital Details
          hospital_id: formData?.HDhospitalID,
          typeofhospital: formData?.HDtypeofHospital,
          HDqualification: formData?.HDqualification,
          HDregistrationNo: formData?.HDregistrationNo,
          HDphoneNo: formData?.HDphoneNo,
          HDrohiniCode: formData?.HDrohiniCode,
          HDnABHCode: formData?.HDnABHCode,
          HDstateLevelCertificate: formData?.HDstateLevelCertificate,

          //  Details of Patient Admitted
          // DPAipRegistrationNo: formData?.DPAipRegistrationNo,
          DPAtypeAdmission: formData?.DPAtypeAdmission,
          DPAifMaternityDateDelivery: formData?.DPAifMaternityDateDelivery,
          DPAgravidaStatus: formData?.DPAgravidaStatus,
          status_at_time_of_discharge: formData?.DPAstatusDischarge,
          DPAtotalAmount: formData?.DPAtotalAmount,

          DADICD10Codes1: formData?.DADICD10Codes1,
          DADDescriptionC1: formData?.DADDescriptionC1,
          DADICD10Codes2: formData?.DADICD10Codes2,
          DADDescriptionC2: formData?.DADDescriptionC2,
          DADICD10Codes3: formData?.DADICD10Codes3,
          DADDescriptionC3: formData?.DADDescriptionC3,
          DADICD10Codes4: formData?.DADICD10Codes4,
          DADDescriptionC4: formData?.DADDescriptionC4,
          DADICD10PCS1: formData?.DADICD10PCS1,
          DADDescription1: formData?.DADDescription1,
          DADICD10PCS2: formData?.DADICD10PCS2,
          DADDescription2: formData?.DADDescription2,
          DADICD10PCS3: formData?.DADICD10PCS3,
          DADDescription3: formData?.DADDescription3,
          DADDescription4: formData?.DADDescription4,
          DADpreAuthorizationRadio: formData?.DADpreAuthorizationRadio,
          DADpreAuthorizationNum: formData?.DADpreAuthorizationNum,
          //Ask TO ADD IT
          DADauthorizationNotReason: formData?.DADauthorizationNotReason,
          FIR_Number: formData?.DADfirNo,
          not_reported_reason: formData?.DADifNotReportedReason,

          // Claim Documents Submitted - Check List CL-2
          CL2claimFormDulySigned: formData?.CL2claimFormDulySigned,
          CL2originalPreAuth: formData?.CL2originalPreAuth,
          CL2copyofthePreAuth: formData?.CL2copyofthePreAuth,
          CL2photoIDCardPatientVerified:
            formData?.CL2photoIDCardPatientVerified,
          CL2hospitalDischargeSummary: formData?.CL2hospitalDischargeSummary,
          CL2operationTheatreNotes: formData?.CL2operationTheatreNotes,
          CL2hospitalMainBill: formData?.CL2hospitalMainBill,
          CL2hospitalBreakBill: formData?.CL2hospitalBreakBill,
          CL2investigationReports: formData?.CL2investigationReports,
          CL2ctmrInvestigation: formData?.CL2ctmrInvestigation,
          CL2doctorReferenceSlip: formData?.CL2doctorReferenceSlip,
          CL2ECG: formData?.CL2ECG,
          CL2PharmacyBills: formData?.CL2PharmacyBills,
          CL2mlcReport: formData?.CL2mlcReport,
          CL2originalDeathSummary: formData?.CL2originalDeathSummary,
          CL2AnyOther: formData?.CL2AnyOther,
          CL2OtherText: formData?.CL2OtherText,

          //Additional Details in Case of Non Network Hospital
          NNHaddressOfHospital: formData?.NNHaddressOfHospital,
          NNHcity: formData?.NNHcity,
          NNHstate: formData?.NNHstate,
          NNHpinCode: formData?.NNHpinCode,
          hospital_pan: formData?.NNHhospitalPAN,
          number_of_impatient_beds: Number(formData?.NNHimpatientBeds),
          OT_available: formData?.NNHot,
          ICU_available: formData?.NNHicu,
          NNHothers: formData?.NNHothers,
        }
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    return Promise.resolve('Success');
  };

  function handleChangeFormData(e: any) {
    setFormData({ ...formData, ...e });
  }

  formData.DCTotal1 = (
    (formData.DCPrehospitalizationExpen === ''
      ? 0
      : parseInt(formData.DCPrehospitalizationExpen)) +
    (formData.DCHospitalizationExpenses === ''
      ? 0
      : parseInt(formData.DCHospitalizationExpenses)) +
    (formData.DCPostHospitalizationExpenses === ''
      ? 0
      : parseInt(formData.DCPostHospitalizationExpenses)) +
    (formData.DCHealthCheckUpCost === ''
      ? 0
      : parseInt(formData.DCHealthCheckUpCost)) +
    (formData.DCAmbulanceCharges === ''
      ? 0
      : parseInt(formData.DCAmbulanceCharges)) +
    (formData.DCOtherAmount1 === '' ? 0 : parseInt(formData.DCOtherAmount1))
  ).toString();

  formData.DCTotal2 = (
    (formData.DCHospitalDailyCash === ''
      ? 0
      : parseInt(formData.DCHospitalDailyCash)) +
    (formData.DCSurgicalCash === '' ? 0 : parseInt(formData.DCSurgicalCash)) +
    (formData.DCCriticalIllnessBenefit === ''
      ? 0
      : parseInt(formData.DCCriticalIllnessBenefit)) +
    (formData.DCConvalescence === '' ? 0 : parseInt(formData.DCConvalescence)) +
    (formData.DCPostLumpSumBenefit === ''
      ? 0
      : parseInt(formData.DCPostLumpSumBenefit)) +
    (formData.DCOtherAmount2 === '' ? 0 : parseInt(formData.DCOtherAmount2))
  ).toString();

  useEffect(() => {
    if (param?.case === undefined) {
      (async function () {
        dispatch(setLoading(true));
        try {
          const { data } = await axiosConfig.get(`/crnewcase?email=${user}`);
          dispatch(setLoading(false));
          dispatch(setRemCurrentCaseNumber(data.casenumber));
          console.log(data.casenumber);
        } catch (error) {
          dispatch(setLoading(false));
          //@ts-ignore
          notification('error', error?.message);
        }
        setPreferTPA_Company('both');
      })();
    } else {
      dispatch(setRemCurrentCaseNumber(param?.case));

      //@ts-ignore
      if ('Tpa_Company' in remCaseData?.patient_details) {
        setPreferTPA_Company('TPA');
      } else {
        setPreferTPA_Company('Company');
      }
    }
    let arr = [];
    for (let i = 1900; i <= 2500; i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);
  }, []);

  console.log(formData);
  function handleSectionchange(e: any) {
    function ShowWarrning() {
      notification(
        'info',
        'Please fill all required details of current Section'
      );
    }

    switch (currentSectionOpen) {
      case 'detailsOfPrimary':
        if (
          formData.DPIpolicyNumber === '' ||
          formData.DPIcompanyName === '' ||
          formData.DPIname === '' ||
          formData.DPIaddress === '' ||
          formData.DPIcity === '' ||
          formData.DPIstate === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'insuredPersonHospitalized':
        if (
          formData.DPHNameofpatient === '' ||
          formData.DPHGender === '' ||
          formData.DPHAgeYears === '' ||
          formData.DPHAgeMonths === '' ||
          formData.DPHDateofBirth === '' ||
          formData.DPHRelpPriInsured === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'detailsOfHospitalization':
        if (
          formData.DHNameofhospital === '' ||
          formData.DHRoomCategory === '' ||
          formData.DHDateAdmission === '' ||
          formData.DHTimeAdmission === '' ||
          formData.DHDateDischarge === '' ||
          formData.DHTimeDischarge === '' ||
          formData.DHTreatingDoctor === '' ||
          formData.DHDiagnosis === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'detailsOfPrimaryInsrued':
        if (
          formData.DIBAnameAccountHolder === '' ||
          formData.DIBAccountNumber === '' ||
          formData.DIBAbankName === '' ||
          formData.DIBApan === '' ||
          formData.DIBAifscCODE === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'hospitalDetails':
        if (
          formData?.DHNameofhospital === '' ||
          formData?.DHTreatingDoctor === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'patientAdmitted':
        if (
          formData?.DPHNameofpatient === '' ||
          formData?.IPDpatientNumber === '' ||
          formData?.DPHGender === '' ||
          formData?.DPHDateofBirth === '' ||
          formData?.DPHAgeYears === '' ||
          formData?.DPHAgeMonths === '' ||
          formData?.DHDateAdmission === '' ||
          formData?.DHTimeAdmission === '' ||
          formData?.DHDateDischarge === '' ||
          formData?.DHTimeDischarge === '' ||
          formData?.DPAtypeAdmission === ''
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;

      case 'nonNetworkHospital':
        if (
          formData.HDtypeofHospital === 'Non Network' &&
          (formData?.NNHaddressOfHospital === '' ||
            formData?.NNHcity === '' ||
            formData?.NNHstate === '' ||
            formData?.NNHhospitalPAN === '')
        ) {
          ShowWarrning();
        } else {
          SetcurrentSectionOpen(e);
        }
        break;
      default:
        SetcurrentSectionOpen(e);
        break;
    }
  }

  useEffect(() => {
    setlastSectionClosed(currentSectionOpen);
    switch (lastSectionClosed) {
      case 'detailsOfPrimary':
        postDatatoAPI();
        return notification('info', 'Details of Primary Insured Saved');
      case 'detailsofInsruance':
        postDatatoAPI();
        return notification('info', 'Details of Insruance History Saved');
      case 'insuredPersonHospitalized':
        postDatatoAPI();
        return notification(
          'info',
          'Details of Insured person hospitalized Saved'
        );
      case 'detailsOfHospitalization':
        postDatatoAPI();
        return notification('info', 'Details of Hospitalization Saved');
      case 'detailsOfClaim':
        postDatatoAPI();
        return notification('info', 'Details of Claim Saved');
      case 'claimDocumentsSubmitted':
        postDatatoAPI();
        return notification(
          'info',
          'Claim Documents Submitted Check List Saved'
        );
      case 'detailsOfBills':
        postDatatoAPI();
        return notification('info', 'Details Of Bills Enclosed Saved');
      case 'detailsOfPrimaryInsrued':
        postDatatoAPI();
        return notification(
          'info',
          'Details of Primary Insrued Bank Account Saved'
        );
      case 'hospitalDetails':
        postDatatoAPI();
        return notification('info', 'Hospital Details Saved');

      case 'patientAdmitted':
        postDatatoAPI();
        return notification('info', 'Details of Patient Admitted Saved');
      case 'ailmentDiagnosed':
        postDatatoAPI();
        return notification(
          'info',
          'Details of Ailment Diagnosed (Primary) Saved'
        );
      case 'claimDocumentsSubmitted-1':
        postDatatoAPI();
        return notification(
          'info',
          'Claim Documents Submitted - Check List Saved'
        );
      case 'nonNetworkHospital':
        postDatatoAPI();
        notification(
          'info',
          'Additional Details in Case of Non Network Hospital Saved'
        );
    }
  }, [currentSectionOpen]);

  const setStep = (val: number) => {
    if (val > 3) {
      return;
    } else {
      setSteps(val);
    }
  };

  const nextStep = () => {
    switch (steps) {
      case 1:
        if (
          formData?.DPHNameofpatient === '' ||
          formData?.IPDpatientNumber === '' ||
          (formData?.InsurancecompanySelect === '' &&
            formData?.Tpa_CompanySelect === '')
        ) {
          notification('info', 'Need to fill all Details');
        } else {
          setSteps((pre) => pre + 1);
          postDatatoAPI();
        }
        break;
      case 2:
        if (
          formData.DPIpolicyNumber === '' ||
          formData.DPIcompanyName === '' ||
          formData.DPIname === '' ||
          formData.DPIaddress === '' ||
          formData.DPIcity === '' ||
          formData.DPIstate === '' ||
          formData.DPHNameofpatient === '' ||
          formData.DPHGender === '' ||
          formData.DPHAgeYears === '' ||
          formData.DPHAgeMonths === '' ||
          formData.DPHDateofBirth === '' ||
          formData.DPHRelpPriInsured === '' ||
          formData.DHNameofhospital === '' ||
          formData.DHRoomCategory === '' ||
          formData.DHDateAdmission === '' ||
          formData.DHTimeAdmission === '' ||
          formData.DHDateDischarge === '' ||
          formData.DHTimeDischarge === '' ||
          formData.DHTreatingDoctor === '' ||
          formData.DHDiagnosis === '' ||
          formData.DIBAnameAccountHolder === '' ||
          formData.DIBAccountNumber === '' ||
          formData.DIBAbankName === '' ||
          formData.DIBApan === '' ||
          formData.DIBAifscCODE === ''
        ) {
          notification('info', 'Need to fill all Details');
        } else {
          SetcurrentSectionOpen('hospitalDetails');
          setSteps((pre) => pre + 1);
          postDatatoAPI();
        }
        break;
    }
  };

  const prevStep = () => {
    if (steps <= 1) {
      return;
    } else {
      if (steps === 3) {
        SetcurrentSectionOpen('detailsOfPrimary');
      }
      setSteps((pre) => pre - 1);
    }
  };

  const completeFormAPI = async () => {
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(
        `/completesubmissioncase?email=${user}&casenumber=${remCurrentCaseNumber}`
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    return Promise.resolve('Success');
  };

  const finalSubmitAPI = async () => {
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(
        `/casedatafinalsubmit?email=${user}&casenumber=${remCurrentCaseNumber}`
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    return Promise.resolve('Success');
  };

  const printFormAPI = async () => {
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(
        `/caseprinted?email=${user}&casenumber=${remCurrentCaseNumber}`
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    return Promise.resolve('Success');
  };

  function partBButtonHandle(e: string) {
    if (
      formData?.DHNameofhospital === '' ||
      formData?.DHTreatingDoctor === '' ||
      formData?.DPHNameofpatient === '' ||
      formData?.IPDpatientNumber === '' ||
      formData?.DPHGender === '' ||
      formData?.DPHDateofBirth === '' ||
      formData?.DPHAgeYears === '' ||
      formData?.DPHAgeMonths === '' ||
      formData?.DHDateAdmission === '' ||
      formData?.DHTimeAdmission === '' ||
      formData?.DHDateDischarge === '' ||
      formData?.DHTimeDischarge === '' ||
      formData?.DPAtypeAdmission === '' ||
      (formData.HDtypeofHospital === 'Non Network' &&
        (formData?.NNHaddressOfHospital === '' ||
          formData?.NNHcity === '' ||
          formData?.NNHstate === '' ||
          formData?.NNHhospitalPAN === ''))
    ) {
      notification('info', 'Need to fill all Details');
    } else {
      if (e === 'printForm') {
        // Hardcode URL HERE --- Change with server name
        postDatatoAPI().then(() => {
          window.open(
            `http://localhost:3000/${
              formData.Tpa_CompanySelect
                ? formData.Tpa_CompanySelect
                : formData.InsurancecompanySelect
            }/${user}/${remCurrentCaseNumber}`,
            '_blank',
            'noopener,noreferrer'
          );
        });
        notification('info', 'Case Moved To Printed');
      }

      if (e === 'MarkComplete') {
        postDatatoAPI().then(() => {
          completeFormAPI().then(() => {
            navigate('/reimbursementHome');
          });
        });
        notification('info', 'Case Moved To Completed');
      }

      if (e === 'sendMail') {
        // Open Modal Window
        setEmailModal(true);
      }

      if (e === 'markPrint') {
        postDatatoAPI().then(() => {
          completeFormAPI().then(() => {
            finalSubmitAPI().then(() => {
              printFormAPI().then(() => {
                navigate('/reimbursementHome');
              });
            });
          });
        });
      }
    }
  }

  function mailSentHandle() {
    postDatatoAPI();
    // notification('info', 'Case Moved To Printed');
  }

  const renderUI = () => {
    switch (steps) {
      case 1:
        return (
          <RemhospitalSelect
            formData={formData}
            changeData={handleChangeFormData}
            nextStep={nextStep}
            preferTPA_Company={preferTPA_Company}
          />
        );
      case 2:
        return (
          <PartAReimbursement
            months={months}
            yearList={yearList}
            currentSectionOpen={currentSectionOpen}
            SetcurrentSectionOpen={handleSectionchange}
            formData={formData}
            changeData={handleChangeFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PartBReimbursement
            months={months}
            yearList={yearList}
            currentSectionOpen={currentSectionOpen}
            SetcurrentSectionOpen={handleSectionchange}
            formData={formData}
            changeData={handleChangeFormData}
            prevStep={prevStep}
            partBbutton={partBButtonHandle}
          />
        );

      default:
        return (
          <RemhospitalSelect
            formData={formData}
            changeData={handleChangeFormData}
            nextStep={nextStep}
            preferTPA_Company={preferTPA_Company}
          />
        );
    }
  };
  return (
    <>
      <div className='p-6'>
        <ReimbProgressBar steps={steps} prevStep={setStep} />
      </div>
      {renderUI()}
      <ReimbEmailModal
        closeModal={toggleEmailModal}
        isOpen={emailModalOpen}
        formDataNew={formData}
        changeData={handleChangeFormData}
        mailSent={mailSentHandle}
      />
    </>
  );
};

export default ReimbursementNewCase;
