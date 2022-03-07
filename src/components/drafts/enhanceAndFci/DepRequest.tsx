import React, { useState, useRef, useEffect } from 'react';
import styles from './Request.module.css';
import { IoClose } from 'react-icons/io5';
import paperclip_black from '../../../../assets/icon/paperclip_black.svg';
import bold from '../../../../assets/icon/bold.svg';
import italic from '../../../../assets/icon/italic.svg';
import underline from '../../../../assets/icon/underline.svg';
import align_center_alt from '../../../../assets/icon/align-center-alt.svg';
import align_left from '../../../../assets/icon/align_left.svg';
import align_right from '../../../../assets/icon/align_right.svg';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { setLoading } from '../../../redux/slices/utilitySlice';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import { setChargesListData } from '../../../redux/slices/chargesListSlice';
// import { setpreAuthData } from '../../../../redux/slices/caseSlice';
import InputDate from '../../theme/inputDate/InputDate';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import NextButton from '../../theme/nextButton/NextButton';
import Input from './Input';
import InputContained from './InputContained';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
  newCaseData?: any;
  action?: string;
};

const SentMail = ({ newCaseData = {}, action = '' }: ComposeModalProps) => {
  const { currentBucket } = useAppSelector((state) => state?.home);
  //   const { preAuthData } = useAppSelector((state) => state.case);
  const { chargesListData } = useAppSelector((state) => state?.chargesListData);
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

  const [additionalDetailsRender, setAdditionDetailsRender] = useState(false);
  const [totalCost, setTotal] = useState(0);
  const [reciverEmail, setReciverEmail] = useState('');

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);
  const { allCompaniesList } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const [yearList, setYearList] = useState<{ label: string; value: string }[]>(
    []
  );
  const dispatch = useAppDispatch();
  const bodyRef = useRef(null);

  const {
    //@ts-ignore
    patient_details: {
      numberOfVisit,
      ipd_patient_number,
      Nature_Of_Illness,
      Provision_Diagnosis,
      diabetes_year,
      diabetes_month,
      HeartDiseaseMonth,
      HeartDiseaseYear,
      HypertensionMonth,
      HypertensionYear,
      HyperlipidemiasMonth,
      HyperlipidemiasYear,
      OsteoarthritisMonth,
      OsteoarthritisYear,
      AsthmaOrCOPDOrBronchitisMonth,
      AsthmaOrCOPDOrBronchitisYear,
      CancerMonth,
      CancerYear,
      AlcoholOrDrugAbuseMonth,
      AlcoholOrDrugAbuseYear,
      anyHIVOrSTDOrRelatedAlimentsMonth,
      anyHIVOrSTDOrRelatedAlimentsYear,
      OtherAliments,
      CauseofAilment,
      ConsultationAndPhysicianCharges,
      professional_fees,
      AnaethetistCharges,
      MedicinesAndCostOfImplant,
    },

    //@ts-ignore
    hospital_details: {
      Room_No,
      Bed_No,
      Per_Day_Room_Rent,
      Nursing,
      Cost_Of_Investigation,
      ICU_Charges,
      OT_Charges,

      Consumables,
      OtherHospitalIfAny,
      All_Including_Package,
      total,
    },
  } = newCaseData;

  console.log('NewCaseData', newCaseData);
  const [additionalCharges, setadditionalCharges] = useState<any>({
    numberOfVisit: '',
    ipd_patient_number: '',
    Nature_Of_Illness: '',
    Provision_Diagnosis: '',
    diabetes_month: '',
    diabetes_year: '',
    HeartDiseaseMonth: '',
    HeartDiseaseYear: '',
    HypertensionMonth: '',
    HypertensionYear: '',
    HyperlipidemiasMonth: '',
    HyperlipidemiasYear: '',
    OsteoarthritisMonth: '',
    OsteoarthritisYear: '',
    AsthmaOrCOPDOrBronchitisMonth: '',
    AsthmaOrCOPDOrBronchitisYear: '',
    CancerMonth: '',
    CancerYear: '',
    AlcoholOrDrugAbuseMonth: '',
    AlcoholOrDrugAbuseYear: '',
    anyHIVOrSTDOrRelatedAlimentsMonth: '',
    anyHIVOrSTDOrRelatedAlimentsYear: '',
    OtherAliments: '',
    CauseofAilment: '',
    Room_No: '',
    Bed_No: '',
    Per_Day_Room_Rent: '',
    Nursing: '',
    Cost_Of_Investigation: '',
    ICU_Charges: '',
    OT_Charges: '',
    PhysicianCharge: '',
    professional_fees: '',
    AnaethetistCharges: '',
    cost_Of_Implant: '',
    Consumables: '',
    OtherHospitalIfAny: '',
    All_Including_Package: '',
  });

  const additionalNewFormData = new FormData();
  useEffect(() => {
    const totalSum =
      Number(additionalCharges.Per_Day_Room_Rent) +
      Number(additionalCharges.Nursing) +
      Number(additionalCharges.Cost_Of_Investigation) +
      Number(additionalCharges.ICU_Charges) +
      Number(additionalCharges.OT_Charges) +
      Number(additionalCharges.PhysicianCharge) +
      Number(additionalCharges.professional_fees) +
      Number(additionalCharges.AnaethetistCharges) +
      Number(additionalCharges.cost_Of_Implant) +
      Number(additionalCharges.Consumables) +
      Number(additionalCharges.OtherHospitalIfAny) +
      Number(additionalCharges.All_Including_Package);
    setTotal(totalSum);

    additionalCharges.numberOfVisit &&
      additionalNewFormData.append(
        'numberOfVisit',
        additionalCharges.numberOfVisit
      );
    additionalCharges.Room_No &&
      additionalNewFormData.append('room_no', additionalCharges.Room_No);
    additionalCharges.Bed_No &&
      additionalNewFormData.append('bedno', additionalCharges.Bed_No);
    additionalCharges?.ipd_patient_number &&
      additionalNewFormData.append(
        'ipd_patient_number',
        additionalCharges?.ipd_patient_number
      );
    additionalCharges?.Per_Day_Room_Rent &&
      additionalNewFormData.append(
        'per_day_room_rent_nursing_charges',
        additionalCharges?.Per_Day_Room_Rent
      );
    additionalCharges?.Nursing &&
      additionalNewFormData.append(
        'admission_nursingCharges',
        additionalCharges?.Nursing
      );

    additionalCharges?.Cost_Of_Investigation &&
      additionalNewFormData.append(
        'admission_expectedCostForInvestigation',
        additionalCharges?.Cost_Of_Investigation
      );
    additionalCharges?.ICU_Charges &&
      additionalNewFormData.append(
        'admission_icuCharge',
        additionalCharges?.ICU_Charges
      );
    additionalCharges?.OT_Charges &&
      additionalNewFormData.append(
        'admission_otCharge',
        additionalCharges?.OT_Charges
      );
    additionalCharges?.PhysicianCharge &&
      additionalNewFormData.append(
        'ConsultationAndPhysicianCharges',
        additionalCharges?.PhysicianCharge
      );
    additionalCharges?.professional_fees &&
      additionalNewFormData.append(
        'professional_fees',
        additionalCharges?.professional_fees
      );
    additionalCharges?.AnaethetistCharges &&
      additionalNewFormData.append(
        'AnaethetistCharges',
        additionalCharges?.AnaethetistCharges
      );
    additionalCharges?.cost_Of_Implant &&
      additionalNewFormData.append(
        'MedicinesAndCostOfImplant',
        additionalCharges?.cost_Of_Implant
      );
    additionalCharges?.Consumables &&
      additionalNewFormData.append(
        'admission_Consumables',
        additionalCharges?.Consumables
      );
    additionalCharges?.OtherHospitalIfAny &&
      additionalNewFormData.append(
        'admission_otherHospitalIfAny',
        additionalCharges?.OtherHospitalIfAny
      );

    additionalCharges?.All_Including_Package &&
      additionalNewFormData.append(
        'admission_allIncludePackageCharge',
        additionalCharges?.All_Including_Package
      );
    additionalCharges?.Nature_Of_Illness &&
      additionalNewFormData.append(
        'doctor_natureOfLiness',
        additionalCharges?.Nature_Of_Illness
      );
    additionalCharges?.Provision_Diagnosis &&
      additionalNewFormData.append(
        'doctor_provisionalDiagnosis',
        additionalCharges?.Provision_Diagnosis
      );
    additionalCharges?.diabetes_month &&
      additionalNewFormData.append(
        'diabetes_month',
        additionalCharges?.diabetes_month
      );
    additionalCharges?.diabetes_year &&
      additionalNewFormData.append(
        'diabetes_year',
        additionalCharges?.diabetes_year
      );
    additionalCharges?.HeartDiseaseMonth &&
      additionalNewFormData.append(
        'admission_heartDiseaseMonth',
        additionalCharges?.HeartDiseaseMonth
      );
    additionalCharges?.HeartDiseaseYear &&
      additionalNewFormData.append(
        'admission_heartDiseaseYear',
        additionalCharges?.HeartDiseaseYear
      );
    additionalCharges?.HypertensionMonth &&
      additionalNewFormData.append(
        'admission_hypertensionMonth',
        additionalCharges?.HypertensionMonth
      );

    additionalCharges?.HypertensionYear &&
      additionalNewFormData.append(
        'admission_hypertensionYear',
        additionalCharges?.HypertensionYear
      );
    additionalCharges?.HyperlipidemiasMonth &&
      additionalNewFormData.append(
        'admission_HyperlipidemiasMonth',
        additionalCharges?.HyperlipidemiasMonth
      );
    additionalCharges?.HyperlipidemiasYear &&
      additionalNewFormData.append(
        'admission_HyperlipidemiasYear',
        additionalCharges?.HyperlipidemiasYear
      );
    additionalCharges?.OsteoarthritisMonth &&
      additionalNewFormData.append(
        'admission_osteoarthritisMonth',
        additionalCharges?.OsteoarthritisMonth
      );
    additionalCharges?.OsteoarthritisYear &&
      additionalNewFormData.append(
        'admission_osteoarthritisYear',
        additionalCharges?.OsteoarthritisYear
      );

    additionalCharges?.AsthmaOrCOPDOrBronchitisMonth &&
      additionalNewFormData.append(
        'admission_asthmaOrCOPDOrBronchitisMonth',
        additionalCharges?.AsthmaOrCOPDOrBronchitisMonth
      );

    additionalCharges?.AsthmaOrCOPDOrBronchitisYear &&
      additionalNewFormData.append(
        'admission_asthmaOrCOPDOrBronchitisYear',
        additionalCharges?.AsthmaOrCOPDOrBronchitisYear
      );

    additionalCharges?.CancerMonth &&
      additionalNewFormData.append(
        'admission_cancerMonth',
        additionalCharges?.CancerMonth
      );
    additionalCharges?.CancerYear &&
      additionalNewFormData.append(
        'admission_cancerYear',
        additionalCharges?.CancerYear
      );
    additionalCharges?.AlcoholOrDrugAbuseMonth &&
      additionalNewFormData.append(
        'admission_alcoholOrDrugAbuseMonth',
        additionalCharges?.AlcoholOrDrugAbuseMonth
      );
    additionalCharges?.AlcoholOrDrugAbuseYear &&
      additionalNewFormData.append(
        'admission_alcoholOrDrugAbuseYear',
        additionalCharges?.AlcoholOrDrugAbuseYear
      );
    additionalCharges?.anyHIVOrSTDOrRelatedAlimentsMonth &&
      additionalNewFormData.append(
        'admission_anyHIVOrSTDOrRelatedAlimentsMonth',
        additionalCharges?.anyHIVOrSTDOrRelatedAlimentsMonth
      );
    additionalCharges?.anyHIVOrSTDOrRelatedAlimentsYear &&
      additionalNewFormData.append(
        'admission_anyHIVOrSTDOrRelatedAlimentsYear',
        additionalCharges?.anyHIVOrSTDOrRelatedAlimentsYear
      );
    additionalCharges?.OtherAliments &&
      additionalNewFormData.append(
        'admission_anyOtherAliments',
        additionalCharges?.OtherAliments
      );
    additionalCharges?.CauseofAilment &&
      additionalNewFormData.append(
        'doctor_CauseofAilment',
        additionalCharges?.CauseofAilment
      );
  }, [additionalCharges]);

  useEffect(() => {
    let arr = [];
    for (let i = 1900; i <= 2500; i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);
  }, []);

  const additionalHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;
    setadditionalCharges((pre: any) => ({ ...pre, [name]: value }));
  };

  const additionalDetailsAPI = async () => {
    if (additionalDetailsRender) {
      await axiosConfig.post(
        `/enhancedata?email=${user}&casenumber=${newCaseData?.caseNumber}`,
        additionalNewFormData
      );
    }
  };

  // const uploadFile = async () => {
  //   dispatch(setLoading(true));

  //   const URL = `/sendEmail?email=${user}`;
  //   const URLINCEMENT = `/incrementcounter?email=${user}`;
  //   const URLCHANGESTATUS = `/changeformstatus?email=${user}&casenumber=${newCaseData?.caseNumber}`;
  //   const URLFORMCREATIONAUDITTRIAL = `/${
  //     action === 'Enhance' ? 'enhancerequestaudittrail' : 'fcirequestaudittrail'
  //   }?email=${user}&casenumber=${newCaseData?.caseNumber}`;

  //   const formCreationAuditForm = new FormData();
  //   formCreationAuditForm?.append(
  //     'amount',
  //     //@ts-ignore
  //     mail?.amount || 0
  //   );
  //   formCreationAuditForm?.append(
  //     'date',
  //     mail?.date || new Date()?.toISOString()
  //   );

  //   const formStatus = new FormData();
  //   formStatus?.append(
  //     'companyname',
  //     newCaseData?.patient_details?.Insurance_Company
  //   );
  //   formStatus?.append('lastformstatus', currentBucket);
  //   formStatus?.append('newformstatus', action);
  //   const formNewStatus = new FormData();
  //   formNewStatus?.append('newformstatus', action);

  //   const formData = new FormData();
  //   formData?.append('reciever', reciverEmail ? reciverEmail : '');
  //   mail?.ccList?.length
  //     ? mail?.ccList?.forEach((mail) => {
  //         formData.append('Cc', mail);
  //       })
  //     : formData.append('Cc', '');

  //   mail?.bccList.length
  //     ? mail?.bccList?.forEach((mail) => {
  //         formData.append('Bcc', mail);
  //       })
  //     : formData.append('Bcc', '');
  //   formData?.append('sub', mail?.sub);
  //   //@ts-ignore
  //   formData?.append('sender_msg', bodyRef?.current?.innerText);
  //   try {
  //     if (mail?.file?.length) {
  //       additionalDetailsAPI();
  //       const image = await imageUpload();
  //       mail?.file.forEach((img) => {
  //         formData.append('files', img);
  //       });
  //       formCreationAuditForm?.append('imgurl', image || 'N/A');
  //       await axiosConfig.post(URL, formData);
  //       await axiosConfig.post(URLINCEMENT, formStatus);
  //       await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
  //       await axiosConfig.post(
  //         URLFORMCREATIONAUDITTRIAL,
  //         formCreationAuditForm
  //       );
  //     } else {
  //       additionalDetailsAPI();
  //       formData.append('files', '');
  //       formCreationAuditForm?.append('imgurl', 'N/A');
  //       await axiosConfig.post(URL, formData);
  //       await axiosConfig.post(URLINCEMENT, formStatus);
  //       await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
  //       await axiosConfig.post(
  //         URLFORMCREATIONAUDITTRIAL,
  //         formCreationAuditForm
  //       );
  //     }

  //     dispatch(setLoading(false));
  //     notification('info', `Case moved ${action} successfully`);

  //     navigate('/');
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //     //@ts-ignore
  //     notification('error', error?.message);
  //   }
  // };

  const fetchchargeList = async () => {
    dispatch(setLoading(true));
    try {
      const expensesData = await axiosConfig.get(
        // `/charges?insurancecompany=${newCaseData?.patient_details?.Tpa_Company}`
        `/charges?insurancecompany=${'ICICI_Lombard_General_Insurance'}`
      );
      dispatch(setChargesListData(expensesData.data.data.chargelist));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const inputStyle = {
    height: '40px',
    color: 'black !important',
  };

  const selectStyle = {
    width: '110%',
    height: '40px',
    marginLeft: '30px',
    background: 'lightgrey',
    border: 'none',
    outline: 'none',
    color: '#919191',
    borderRadius: '5px',
    padding: '8px',

    webkitAppearance: 'none',
    appearance: 'none',
    backgroundImage: "url('../../../../assets/images/downArrow.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '96%',
    backgroundSize: '10px',
    boxShadow: 'none',
    textIndent: '1px',
    textOverflow: '',
  };

  return (
    <div className={styles.requetModalContainer}>
      <>
        <div className='pl-8 pr-8'>
          <div className='flex justify-around'>
            <div className='mt-6'>
              <InputContained
                handleChange={additionalHandleChange}
                name='numberOfVisit'
                value={numberOfVisit || ''}
                label='No of Visit'
                style={{ maxWidth: '100px' }}
              />
            </div>
            <div className='mt-6'>
              <InputContained
                handleChange={additionalHandleChange}
                name='Room_No'
                value={Room_No || ''}
                label='Room Number'
                style={{ maxWidth: '100px' }}
              />
            </div>
            <div className='mt-6'>
              <InputContained
                handleChange={additionalHandleChange}
                name='Bed_No'
                value={Bed_No || ''}
                label='Bed Number'
                style={{ maxWidth: '100px' }}
              />
            </div>
          </div>
          <div className='mt-6'>
            <Input
              label='IPD patient Number'
              handleChange={additionalHandleChange}
              name='ipd_patient_number'
              value={ipd_patient_number || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Per Day Room Rent'
              handleChange={additionalHandleChange}
              name='per_day_room_rent'
              value={Per_Day_Room_Rent || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Nursing & Service Charge'
              handleChange={additionalHandleChange}
              name='nursing_and_service_charge'
              value={Nursing || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Expected Cost For Investigation + Diagnostics'
              handleChange={additionalHandleChange}
              name='expected_cost_for_investigation_diagnostics'
              value={Cost_Of_Investigation || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='ICU Charge'
              handleChange={additionalHandleChange}
              name='icu_charge'
              value={ICU_Charges || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='OT Charge'
              handleChange={additionalHandleChange}
              name='ot_charge'
              value={OT_Charges || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Consultation Charge / Physician Charge'
              handleChange={additionalHandleChange}
              name='consultation_charge_physician_charge'
              value={ConsultationAndPhysicianCharges || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Professional Fees Surgeon'
              handleChange={additionalHandleChange}
              name='professional_fees_surgeon'
              value={professional_fees || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Anesthetist Fees Charge'
              handleChange={additionalHandleChange}
              name='anesthetist_fees_charge'
              value={AnaethetistCharges || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Medicine + Cost Of Implants (If Applicable Please Specify)'
              handleChange={additionalHandleChange}
              name='medicine_cost_of_implants'
              value={MedicinesAndCostOfImplant || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Consumables'
              handleChange={additionalHandleChange}
              name='consumables'
              value={Consumables || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Other Hospital If Any'
              handleChange={additionalHandleChange}
              name='other_hospital_if_any'
              value={OtherHospitalIfAny || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='All Include Package Charges If Any Applicable'
              handleChange={additionalHandleChange}
              name='all_include_package_charges'
              value={All_Including_Package || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Sum Total Expected Cost Of Hospitalization'
              handleChange={additionalHandleChange}
              name='sum_total_expected_cost_of_hospitalization'
              value={total || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          <div className='mt-6'>
            <Input
              label='Nature Of Illness / Disease with Presenting Complaints'
              handleChange={additionalHandleChange}
              name='nature_of_illness_disease_with_presenting_complaints'
              value={Nature_Of_Illness || ''}
              type='number'
              placeHolder='Please specify'
              style={inputStyle}
              isEdit={false}
            />
          </div>
          {/* <div>
              <p className='mt-6'>Total Cost: {totalCost}</p>
            </div> */}
          <div className='mt-6'>
            <Input
              label='Provisional Diagnosis'
              name='Provision_Diagnosis'
              handleChange={additionalHandleChange}
              value={Provision_Diagnosis || ''}
              type='any'
              style={inputStyle}
              placeHolder='Please specify the amount'
              isEdit={false}
            />
          </div>
        </div>

        <div className='lg:w-full p-6 pb-12'>
          <p className=' text-base text-fontColor-dark opacity-50'>
            Mandatory past history of any chronic illness
          </p>

          <div className='block sm:grid grid-cols-12 gap-8 mt-4 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Diabetes</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='diabetes_month'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={diabetes_month || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='diabetes_year'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={diabetes_year || ''}
                style={selectStyle}
              />
            </div>
          </div>
          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Heart Disease</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='HeartDiseaseMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={HeartDiseaseMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='HeartDiseaseYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={HeartDiseaseYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Hypertension</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='HypertensionMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={HypertensionMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='HypertensionYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={HypertensionYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Hyperlipidemias</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='HyperlipidemiasMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={HyperlipidemiasMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='HyperlipidemiasYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={HyperlipidemiasYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Osteoarthritis</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='OsteoarthritisMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={OsteoarthritisMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='OsteoarthritisYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={OsteoarthritisYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>
                Asthma/ COPD/ Bronchitis
              </p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='AsthmaOrCOPDOrBronchitisMonth'
                handleChange={additionalHandleChange}
                value={AsthmaOrCOPDOrBronchitisMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='AsthmaOrCOPDOrBronchitisYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={AsthmaOrCOPDOrBronchitisYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Cancer</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='CancerMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={CancerMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='CancerYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={CancerYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>Alcohol/Drag Abuse</p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='AlcoholOrDrugAbuseMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={AlcoholOrDrugAbuseMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='AlcoholOrDrugAbuseYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={AlcoholOrDrugAbuseYear || ''}
                style={selectStyle}
              />
            </div>
          </div>

          <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
            <div className='col-span-3'>
              <p className='text-sm text-fontColor-dark'>
                Any HIV Or STD/Related Ailments
              </p>
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={months}
                name='anyHIVOrSTDOrRelatedAlimentsMonth'
                handleChange={additionalHandleChange}
                defaultOption='Select month'
                value={anyHIVOrSTDOrRelatedAlimentsMonth || ''}
                style={selectStyle}
              />
            </div>
            <div className='col-span-4 mt-3 sm:mt-0'>
              <NewCaseSelect
                options={yearList}
                name='anyHIVOrSTDOrRelatedAlimentsYear'
                handleChange={additionalHandleChange}
                defaultOption='Select year'
                value={anyHIVOrSTDOrRelatedAlimentsYear || ''}
                style={selectStyle}
              />
            </div>
          </div>
          <div className='mt-6'>
            <Input
              label='Any Other Ailments. Give Details'
              handleChange={additionalHandleChange}
              name='OtherAliments'
              value={OtherAliments || ''}
              type='any'
              style={inputStyle}
            />
          </div>

          <div className='mt-6'>
            <Input
              label='Cause Of Ailment'
              handleChange={additionalHandleChange}
              name='CauseofAilment'
              value={CauseofAilment || ''}
              type='any'
              style={inputStyle}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default SentMail;
