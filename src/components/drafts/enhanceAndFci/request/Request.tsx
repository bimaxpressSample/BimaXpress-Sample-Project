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
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../theme/utility/notification';
import { setLoading } from '../../../../redux/slices/utilitySlice';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { setChargesListData } from '../../../../redux/slices/chargesListSlice';
import { setpreAuthData } from '../../../../redux/slices/caseSlice';
import InputDate from '../../../theme/inputDate/InputDate';
import NewCaseSelect from '../../../theme/select/newCaseSelect/NewCaseSelect';
import InputContained from './InputContained';
import { Checkbox, FormControlLabel } from '@mui/material';
import NextButton from '../../../theme/nextButton/NextButton';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
  newCaseData?: any;
  action?: string;
};

const SentMail = ({ newCaseData = {}, action = '' }: ComposeModalProps) => {
  const { currentBucket } = useAppSelector((state) => state?.home);
  const { preAuthData } = useAppSelector((state) => state.case);
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
  const [mail, setMail] = useState<{
    to: string;
    cc: string;
    bcc: string;
    toList: string[];
    ccList: string[];
    bccList: string[];
    sub: string;
    body: any;
    amount: number | string;
    date: string;
    file: [];
  }>({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    file: [],
    amount: '',
    date: '',
  });
  const [additionalDetailsRender, setAdditionDetailsRender] = useState(false);
  const [additionDetailsChecked, setAdditionDetailsChecked] = useState(false);

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

  // const {
  //   //@ts-ignore
  //   patient_details: {
  //     numberOfVisit,
  //     ipd_patient_number,
  //     Nature_Of_Illness,
  //     Provision_Diagnosis,
  //     diabetes_month,
  //     diabetes_year,
  //     HeartDiseaseMonth,
  //     HeartDiseaseYear,
  //     HypertensionMonth,
  //     HypertensionYear,
  //     HyperlipidemiasMonth,
  //     HyperlipidemiasYear,
  //     OsteoarthritisMonth,
  //     OsteoarthritisYear,
  //     AsthmaOrCOPDOrBronchitisMonth,
  //     AsthmaOrCOPDOrBronchitisYear,
  //     CancerMonth,
  //     CancerYear,
  //     AlcoholOrDrugAbuseMonth,
  //     AlcoholOrDrugAbuseYear,
  //     anyHIVOrSTDOrRelatedAlimentsMonth,
  //     anyHIVOrSTDOrRelatedAlimentsYear,
  //     OtherAliments,
  //     CauseofAilment,
  //   },

  //   //@ts-ignore
  //   hospital_details: {
  //     Room_No,
  //     Bed_No,
  //     Per_Day_Room_Rent,
  //     Nursing,
  //     Cost_Of_Investigation,
  //     ICU_Charges,
  //     OT_Charges,
  //     ConsultationAndPhysicianCharges,
  //     ProfessionalFeesSurgeon,
  //     Anesthetist,
  //     MedicinesAndCostOfImplant,
  //     Consumables,
  //     OtherHospitalIfAny,
  //   },
  // } = newCaseData;

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
    ProfessionalFeesSurgeon: '',
    Anesthetist: '',
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
      Number(additionalCharges.ProfessionalFeesSurgeon) +
      Number(additionalCharges.Anesthetist) +
      Number(additionalCharges.cost_Of_Implant) +
      Number(additionalCharges.Consumables) +
      Number(additionalCharges.OtherHospitalIfAny) +
      Number(additionalCharges.All_Including_Package);
    setTotal(totalSum);
  }, [additionalCharges]);
  const additionalHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;
    setadditionalCharges((pre: any) => ({ ...pre, [name]: value }));
  };
  const imageUpload = async () => {
    const IMAGEUPLOAD = `/imageupload?email=${user}&casenumber=${newCaseData?.caseNumber}`;
    const imageFormData = new FormData();
    let name: string | Blob | any[] = [];

    mail?.file.forEach((img) => {
      //@ts-ignore
      name.push(img?.name);

      imageFormData.append('image', img);
    });
    //@ts-ignore
    imageFormData?.append('imagename', name);
    imageFormData?.append('arrayname', 'urlid');

    const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
    return data?.data;
  };

  const removeImage = (name: string) => {
    setMail((pre: any) => ({
      ...pre,
      //@ts-ignore
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const additionalDetailsAPI = async () => {
    if (additionalDetailsRender) {
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
      additionalCharges?.ProfessionalFeesSurgeon &&
        additionalNewFormData.append(
          'professional_fees',
          additionalCharges?.ProfessionalFeesSurgeon
        );
      additionalCharges?.Anesthetist &&
        additionalNewFormData.append(
          'AnaethetistCharges',
          additionalCharges?.Anesthetist
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

      totalCost &&
        additionalNewFormData.append(
          'admission_sumTotalExpected',
          String(totalCost)
        );
      console.log('------------IAM -----------------');
      await axiosConfig.post(
        `/enhancedata?email=${user}&casenumber=${newCaseData?.caseNumber}`,
        additionalNewFormData
      );
    }
  };

  const uploadFile = async () => {
    dispatch(setLoading(true));

    const URL = `/sendEmail?email=${user}`;
    const URLINCEMENT = `/incrementcounter?email=${user}`;
    const URLCHANGESTATUS = `/changeformstatus?email=${user}&casenumber=${newCaseData?.caseNumber}`;
    const URLFORMCREATIONAUDITTRIAL = `/${
      action === 'Enhance' ? 'enhancerequestaudittrail' : 'fcirequestaudittrail'
    }?email=${user}&casenumber=${newCaseData?.caseNumber}`;

    const formCreationAuditForm = new FormData();
    formCreationAuditForm?.append(
      'amount',
      //@ts-ignore
      mail?.amount || 0
    );
    formCreationAuditForm?.append(
      'date',
      mail?.date || new Date()?.toISOString()
    );

    const formStatus = new FormData();
    formStatus?.append(
      'companyname',
      newCaseData?.patient_details?.Insurance_Company
    );
    formStatus?.append('lastformstatus', currentBucket);
    formStatus?.append('newformstatus', action);
    const formNewStatus = new FormData();
    formNewStatus?.append('newformstatus', action);

    const formData = new FormData();
    formData?.append('reciever', reciverEmail ? reciverEmail : '');
    mail?.ccList?.length
      ? mail?.ccList?.forEach((mail) => {
          formData.append('Cc', mail);
        })
      : formData.append('Cc', '');

    mail?.bccList.length
      ? mail?.bccList?.forEach((mail) => {
          formData.append('Bcc', mail);
        })
      : formData.append('Bcc', '');
    formData?.append('sub', mail?.sub);
    //@ts-ignore
    formData?.append('sender_msg', bodyRef?.current?.innerText);
    try {
      if (mail?.file?.length) {
        additionalDetailsAPI();
        const image = await imageUpload();
        mail?.file.forEach((img) => {
          formData.append('files', img);
        });
        formCreationAuditForm?.append('imgurl', image || 'N/A');
        await axiosConfig.post(URL, formData);
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      } else {
        additionalDetailsAPI();
        formData.append('files', '');
        formCreationAuditForm?.append('imgurl', 'N/A');
        await axiosConfig.post(URL, formData);
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      }

      dispatch(setLoading(false));
      notification('info', `Case moved ${action} successfully`);

      setMail({
        to: '',
        cc: '',
        bcc: '',
        toList: [],
        ccList: [],
        bccList: [],
        sub: '',
        body: '',
        file: [],
        amount: '',
        date: '',
      });
      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const runCommand = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;

    if (value !== ',') {
      if (name === 'file') {
        //@ts-ignore
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [name]: [...pre[name], ...e?.target?.files],
        }));
      } else {
        setMail((pre) => ({ ...pre, [name]: value }));
      }
    }
  };

  const handleKeypress = (
    e: React.KeyboardEvent,
    name: string,
    listName: string
  ) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      //@ts-ignore
      if (mail[name]) {
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [listName]: [...pre[listName], pre[name]],
          [name]: '',
        }));
      }
    }
  };

  const removeEmail = (val: string, listName: string) => {
    setMail((pre) => ({
      ...pre,
      //@ts-ignore
      [listName]: [...pre[listName]]?.filter((mail) => mail !== val),
    }));
  };

  const checkValidEmail = (val: string) => {
    return emailRegex?.test(val);
  };

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

  useEffect(() => {
    setMail((pre) => ({
      ...pre,
      to: '',
      cc: '',
      bcc: '',
      ccList: [],
      bccList: [],
      sub: `${
        action === 'Enhance' ? 'Enhance' : 'Final discharge approval'
      } request for  ${newCaseData?.patient_details?.Name} claim no: ${
        newCaseData?.claimno
      }`,
      file: [],
      toList: [],
      body: ` <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dear Sir/Ma'am,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find details of patient below:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Patient name: ${
        newCaseData?.patient_details?.Name
      }</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; claim no: ${
        newCaseData?.patient_details?.claimno
      }</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date of admission : ${
        newCaseData?.hospital_details?.Date_of_Admission
      }</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Policy Number : ${
        newCaseData?.patient_details?.Policy_Id
      }</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find the attached documents below following to the ${
        action === 'Enhance'
          ? 'Enhancement'
          : 'Final discharge approval request'
      }</div>`,
    }));

    const companyInfo =
      //@ts-ignore
      allCompaniesList[newCaseData?.patient_details?.Insurance_Company];
    if (companyInfo) {
      const email = JSON.parse(companyInfo?.replace(/'/g, '"'))?.email;
      setReciverEmail(email);
    }

    let arr = [];
    for (let i = 1900; i <= 2500; i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);

    if (
      ((newCaseData.patient_details.Insurance_Company ===
        'ICICI_Lombard_General_Insurance' ||
        newCaseData.patient_details.Insurance_Company ===
          'HDFC_ERGO_General_Insurance' ||
        newCaseData.patient_details.Insurance_Company ===
          'Star_Health_Insurance') &&
        newCaseData.patient_details.Tpa_Company === 'NA') ||
      newCaseData.patient_details.Tpa_Company === null ||
      newCaseData.patient_details.Tpa_Company === undefined ||
      newCaseData.patient_details.Tpa_Company === ''
    ) {
      setAdditionDetailsRender(true);
    }

    if (Object.entries(chargesListData).length === 0) {
      fetchchargeList();
    }
  }, [newCaseData]);

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
    <div
      className={styles.requetModalContainer}
      style={{ height: '70vh', overflow: 'scroll' }}
    >
      <div
        className={`flex items-center justify-center h-10 w-full bg-primary px-4 border-none outline-none ${styles.composeModalHeader}`}
      >
        <p className='text-base text-fontColor tracking-wide capitalize'>
          Sent Mail
        </p>
      </div>

      <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap'>
        <p className='mr-2 mb-1'>Cc</p>
        {mail?.ccList?.map((item, index) => {
          return (
            <div
              className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                checkValidEmail(item)
                  ? 'font-medium text-primary'
                  : 'border-none bg-red-600 text-fontColor'
              }`}
              key={index}
            >
              <p>{item}</p>
              <MdOutlineClose
                className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                  checkValidEmail(item) ? '' : 'text-fontColor'
                }`}
                onClick={() => removeEmail(item, 'ccList')}
              />
            </div>
          );
        })}

        <input
          className='border-none outline-none flex-auto'
          value={mail?.cc}
          name='cc'
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeypress(e, 'cc', 'ccList')}
        />
      </div>
      <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex'>
        <input
          className='border-none outline-none text-primary font-medium flex-auto'
          value={mail?.sub}
          name='sub'
          onChange={(e) => handleChange(e)}
          placeholder='Subject'
        />
      </div>

      <div
        className='px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none'
        style={{ minHeight: '250px' }}
        contentEditable={true}
        ref={bodyRef}
        suppressContentEditableWarning={true}
      >
        {ReactHtmlParser(mail?.body)}
      </div>

      <div className='grid grid-cols-2 gap-4 mt-4 px-4'>
        <div className='col-span-1'>
          <Input
            value={mail?.amount}
            name='amount'
            handleChange={handleChange}
            label='Amount*'
            labelStyle={{ color: '#2B2B2B' }}
            type='number'
            style={{
              height: '40px',
              border: '1px solid #2B2B2B',
              outline: 'none',
              backgroundColor: '#FFFFFF17',
              borderRadius: '5px',
              color: '#2B2B2B',
            }}
          />
        </div>
        <div className='col-span-1'>
          <div>
            <p className='pb-4 text-sm text-primary'>Select date</p>

            <input
              type='date'
              name='date'
              placeholder='Select date'
              value={mail?.date}
              onChange={handleChange}
              className={styles.inputDate}
            />
          </div>
        </div>

        {/* Additional Details CheckBox */}
        {additionalDetailsRender ? (
          <FormControlLabel
            label='Fill additional details'
            control={
              <Checkbox
                checked={additionDetailsChecked}
                onChange={(e) => {
                  setAdditionDetailsChecked(e.target.checked);
                }}
              />
            }
          />
        ) : null}
      </div>

      {/* Additional DetailsStart */}
      {additionalDetailsRender && additionDetailsChecked ? (
        <>
          <div className='pl-8 pr-8'>
            <div className='flex justify-around'>
              <div className='mt-6'>
                <InputContained
                  handleChange={additionalHandleChange}
                  name='numberOfVisit'
                  value={additionalCharges?.numberOfVisit || ''}
                  label='No of Visit'
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <div className='mt-6'>
                <InputContained
                  handleChange={additionalHandleChange}
                  name='Room_No'
                  value={additionalCharges?.Room_No || ''}
                  label='Room Number'
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <div className='mt-6'>
                <InputContained
                  handleChange={additionalHandleChange}
                  name='Bed_No'
                  value={additionalCharges?.Bed_No || ''}
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
                value={additionalCharges?.ipd_patient_number || ''}
                type='number'
                placeHolder='Please specify'
                style={inputStyle}
              />
            </div>
            {chargesListData &&
              chargesListData.map((object: any) => (
                <>
                  {/* Charges */}
                  <div className='mt-6 '>
                    <Input
                      label={object.label}
                      handleChange={additionalHandleChange}
                      name={object.Key}
                      value={additionalCharges[object.Key]}
                      type='number'
                      style={inputStyle}
                      placeHolder='Please specify the amount'
                    />
                  </div>
                </>
              ))}

            <div>
              <p className='mt-6'>Total Cost: {totalCost}</p>
            </div>

            <div className='mt-6'>
              <Input
                label='Nature Of Illness/Disease with presenting Complaints'
                name='Nature_Of_Illness'
                handleChange={additionalHandleChange}
                value={additionalCharges?.Nature_Of_Illness || ''}
                type='any'
                style={inputStyle}
              />
            </div>
            <div className='mt-6'>
              <Input
                label='Provisional Diagnosis'
                name='Provision_Diagnosis'
                handleChange={additionalHandleChange}
                value={additionalCharges?.Provision_Diagnosis || ''}
                type='any'
                style={inputStyle}
                placeHolder='Please specify the amount'
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
                  value={additionalCharges?.diabetes_month || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='diabetes_year'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.diabetes_year || ''}
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
                  value={additionalCharges?.HeartDiseaseMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='HeartDiseaseYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.HeartDiseaseYear || ''}
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
                  value={additionalCharges?.HypertensionMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='HypertensionYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.HypertensionYear || ''}
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
                  value={additionalCharges?.HyperlipidemiasMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='HyperlipidemiasYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.HyperlipidemiasYear || ''}
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
                  value={additionalCharges?.OsteoarthritisMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='OsteoarthritisYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.OsteoarthritisYear || ''}
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
                  value={additionalCharges?.AsthmaOrCOPDOrBronchitisMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='AsthmaOrCOPDOrBronchitisYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.AsthmaOrCOPDOrBronchitisYear || ''}
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
                  value={additionalCharges?.CancerMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='CancerYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.CancerYear || ''}
                  style={selectStyle}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-dark'>
                  Alcohol/Drag Abuse
                </p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='AlcoholOrDrugAbuseMonth'
                  handleChange={additionalHandleChange}
                  defaultOption='Select month'
                  value={additionalCharges?.AlcoholOrDrugAbuseMonth || ''}
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='AlcoholOrDrugAbuseYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={additionalCharges?.AlcoholOrDrugAbuseYear || ''}
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
                  value={
                    additionalCharges?.anyHIVOrSTDOrRelatedAlimentsMonth || ''
                  }
                  style={selectStyle}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='anyHIVOrSTDOrRelatedAlimentsYear'
                  handleChange={additionalHandleChange}
                  defaultOption='Select year'
                  value={
                    additionalCharges?.anyHIVOrSTDOrRelatedAlimentsYear || ''
                  }
                  style={selectStyle}
                />
              </div>
            </div>
            <div className='mt-6'>
              <Input
                label='Any Other Ailments. Give Details'
                handleChange={additionalHandleChange}
                name='OtherAliments'
                value={additionalCharges?.OtherAliments || ''}
                type='any'
                style={inputStyle}
              />
            </div>

            <div className='mt-6'>
              <Input
                label='Cause Of Ailment'
                handleChange={additionalHandleChange}
                name='CauseofAilment'
                value={additionalCharges?.CauseofAilment || ''}
                type='any'
                style={inputStyle}
              />
            </div>
          </div>
        </>
      ) : null}

      {/* Additional Details Ends */}

      <div className='flex items-center flex-wrap'>
        {mail?.file?.length
          ? mail?.file?.map((file, index) => {
              return (
                <div
                  className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                  style={{ width: '100%', maxWidth: '145px' }}
                  key={index}
                >
                  <p
                    style={{
                      width: '100%',
                      maxWidth: '125px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {/* @ts-ignore */}
                    {file?.name}
                  </p>
                  {/* @ts-ignore */}
                  <IoClose onClick={() => removeImage(file?.name)} />
                </div>
              );
            })
          : null}
      </div>
      <div className=' flex items-center py-8 p px-4'>
        <button
          className='w-28 h-10 bg-primary-dark text-sm text-fontColor border-none outline-none rounded mr-3'
          onClick={uploadFile}
        >
          Send
        </button>
        <div className='relative w-8 h-8 cursor-pointer'>
          <img
            src={paperclip_black}
            alt='icon'
            className='absolute mr-3 top-2 cursor-pointer'
          />
          <input
            type='file'
            className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 '
            name='file'
            onChange={handleChange}
            multiple
          />
        </div>
        <div
          className='flex items-center p-3 rounded'
          style={{ backgroundColor: '#EEEEEE' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={bold}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('bold')}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={italic}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('italic')}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={underline}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('underline')}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={align_right}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('justifyLeft')}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_center_alt}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('justifyCenter')}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_left}
            alt='icon'
            className='mr-3 cursor-pointer'
            onClick={() => runCommand('justifyRight')}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};

export default SentMail;
