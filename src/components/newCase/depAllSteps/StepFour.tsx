import React, { useEffect, useState } from 'react';
import InputContained from '../../theme/inputContained/InputContained';
import InputDate from '../../theme/inputDate/InputDate';
import InputRadio from '../../theme/inputRadio/InputRadio';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import Input from '../../theme/input/Input';
import NextButton from '../../theme/nextButton/NextButton';
import { setLoading } from '../../../redux/slices/utilitySlice';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

import { setRoomListData } from '../../../redux/slices/roomListSlice';
import { setChargesListData } from '../../../redux/slices/chargesListSlice';

// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const roomType = [
  {
    label: 'sharing / semi-private room non ac',
    value: 'sharing/semi_private_room_non_ac',
  },
  { label: 'Aemi-private room ac', value: 'semi_private_room_ac' },
  { label: 'Single_room_non_ac', value: 'single_room_non_ac' },
  { label: 'Super deluxe', value: 'super_deluxe' },
  { label: 'Executive room', value: 'executive_room' },
  { label: 'Twin_sharing_non_ac', value: 'Twin_sharing_non-ac' },
  { label: 'Deluxe non ac', value: 'deluxe_non_ac' },
];

const inputStyle = {
  height: '40px',
  // border: "none !important",
  // borderBottom: "2px solid #707070",
  // borderRadius: 0,
};

type StepFourProps = {
  hospitalmail: string;
  newCaseData: any;
  setNewCaseData: any;
  nextStep: () => void;
  yearList: { label: string; value: string }[];
  months: { label: string; value: string }[];
  param: string | undefined;
  toggleModal?: () => void;
  totalCost?: number;
  setTotalCost?: any;
  reteList?: string;
  toggleDocumentsModal?: () => void;
  toggleViewDocumentsModal?: () => void;
};

const DepStepFour = ({
  newCaseData,
  hospitalmail,
  nextStep,
  setNewCaseData,
  months,
  yearList,
  param,
  toggleModal,
  reteList,
  toggleDocumentsModal,
  toggleViewDocumentsModal,
}: StepFourProps) => {
  const { admissionDetails, detailsOfTPA } = newCaseData;
  const [totalCost, setTotalCost] = useState(0);
  const hospitalEmail = hospitalmail;
  // const [totalCost, setTotalCost] = useState(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const { roomListData } = useAppSelector((state) => state?.roomListData);
  const { chargesListData } = useAppSelector((state) => state?.chargesListData);

  const navigate = useNavigate();

  console.log('Company', detailsOfTPA);

  // if (detailsOfTPA.TPA) {
  // 	console.log("TPA", detailsOfTPA.TPA);
  // } else {
  // 	console.log("Insurance", detailsOfTPA.insuranceCompany);
  // }

  detailsOfTPA.TPA
    ? console.log('TPA', detailsOfTPA.TPA)
    : console.log('Insurance', detailsOfTPA.insuranceCompany);

  //	console.log("Company", insuranceCompany);

  const saveDataToDb = async () => {
    const POST_URL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;
    // const array = [

    // "others",

    // "timeOfAdmission",

    // ]

    const formData = new FormData();
    admissionDetails?.Per_Day_Room_Rent &&
      formData?.append(
        'per_day_room_rent_nursing_charges',
        admissionDetails?.Per_Day_Room_Rent
      );
    admissionDetails?.others &&
      formData?.append(
        'admission_madicineConsumablesCostOfImplats_admission_Consumables',
        admissionDetails?.others
      );
    admissionDetails?.daysInHospital &&
      formData?.append(
        'admission_expectedNoOfDays',
        admissionDetails?.daysInHospital
      );
    admissionDetails?.daysInICU &&
      formData?.append('admission_daysInICU', admissionDetails?.daysInICU);
    admissionDetails?.Nursing &&
      formData?.append('admission_nursingCharges', admissionDetails?.Nursing);
    admissionDetails?.Cost_Of_Investigation &&
      formData?.append(
        'admission_expectedCostForInvestigation',
        admissionDetails?.Cost_Of_Investigation
      );
    admissionDetails?.ProfessionalFeesSurgeon &&
      formData?.append(
        'ProfessionalFeesSurgeon_PhysicianCharge_admission_Anesthetist',
        admissionDetails?.ProfessionalFeesSurgeon
      );
    admissionDetails?.Anesthetist &&
      formData?.append('admission_Anesthetist', admissionDetails?.Anesthetist);
    admissionDetails?.Consumables &&
      formData?.append('admission_Consumables', admissionDetails?.Consumables);
    admissionDetails?.ICU_Charges &&
      formData?.append('admission_icuCharge', admissionDetails?.ICU_Charges);
    admissionDetails?.OT_Charges &&
      formData?.append('admission_otCharge', admissionDetails?.OT_Charges);
    admissionDetails?.PhysicianCharge &&
      formData?.append(
        'admission_PhysicianCharge',
        admissionDetails?.PhysicianCharge
      );

    admissionDetails?.cost_Of_Implant &&
      formData?.append(
        'admission_madicineConsumablesCostOfImplats_admission_Consumables',
        admissionDetails?.cost_Of_Implant
      );

    admissionDetails?.All_Including_Package &&
      formData?.append(
        'admission_allIncludePackageCharge',
        admissionDetails?.All_Including_Package
      );

    admissionDetails?.OtherHospitalIfAny &&
      formData?.append(
        'admission_otherHospitalIfAny',
        admissionDetails?.OtherHospitalIfAny
      );

    admissionDetails?.Date_of_Admission &&
      formData?.append('admission_date', admissionDetails?.Date_of_Admission);
    admissionDetails?.admission_time &&
      formData?.append('admission_time', admissionDetails?.admission_time);
    //@ts-ignore
    totalCost && formData?.append('admission_sumTotalExpected', totalCost);
    admissionDetails?.emergencyOrPlanedHospitalizedEvent &&
      formData?.append(
        'admission_isThisAEmergencyPlannedHospitalization',
        admissionDetails?.emergencyOrPlanedHospitalizedEvent
      );
    admissionDetails?.roomType &&
      formData?.append('admission_roomType', admissionDetails?.roomType);
    admissionDetails?.Room_Category &&
      formData?.append(
        'admission_roomCategory',
        admissionDetails?.Room_Category
      );
    admissionDetails?.MandatoryPastHistoryMonth &&
      formData?.append(
        'admission_mandatoryPastHistoryMonth',
        admissionDetails?.MandatoryPastHistoryMonth
      );
    admissionDetails?.MandatoryPastHistoryYear &&
      formData?.append(
        'admission_mandatoryPastHistoryYear',
        admissionDetails?.MandatoryPastHistoryYear
      );
    admissionDetails?.heart_disease_month &&
      formData?.append(
        'admission_heartDiseaseMonth',
        admissionDetails?.heart_disease_month
      );
    admissionDetails?.heart_disease_year &&
      formData?.append(
        'admission_heartDiseaseYear',
        admissionDetails?.heart_disease_year
      );
    admissionDetails?.hypertension_month &&
      formData?.append(
        'admission_hypertensionMonth',
        admissionDetails?.hypertension_month
      );
    admissionDetails?.hypertension_year &&
      formData?.append(
        'admission_hypertensionYear',
        admissionDetails?.hypertension_year
      );
    admissionDetails?.hyperlipidemias_month &&
      formData?.append(
        'admission_HyperlipidemiasMonth',
        admissionDetails?.hyperlipidemias_month
      );
    admissionDetails?.hyperlipidemias_year &&
      formData?.append(
        'admission_HyperlipidemiasYear',
        admissionDetails?.hyperlipidemias_year
      );
    admissionDetails?.osteoarthritis_month &&
      formData?.append(
        'admission_osteoarthritisMonth',
        admissionDetails?.osteoarthritis_month
      );
    admissionDetails?.osteoarthritis_year &&
      formData?.append(
        'admission_osteoarthritisYear',
        admissionDetails?.osteoarthritis_year
      );
    admissionDetails?.asthma_COPD_bronchitis_month &&
      formData?.append(
        'admission_asthmaOrCOPDOrBronchitisMonth',
        admissionDetails?.asthma_COPD_bronchitis_month
      );
    admissionDetails?.asthma_COPD_bronchitis_year &&
      formData?.append(
        'admission_asthmaOrCOPDOrBronchitisYear',
        admissionDetails?.asthma_COPD_bronchitis_year
      );
    admissionDetails?.cancer_month &&
      formData?.append('admission_cancerMonth', admissionDetails?.cancer_month);
    admissionDetails?.cancer_year &&
      formData?.append('admission_cancerYear', admissionDetails?.cancer_year);
    admissionDetails?.alcohol_drag_abuse_month &&
      formData?.append(
        'admission_alcoholOrDrugAbuseMonth',
        admissionDetails?.alcohol_drag_abuse_month
      );
    admissionDetails?.alcohol_drag_abuse_year &&
      formData?.append(
        'admission_alcoholOrDrugAbuseYear',
        admissionDetails?.alcohol_drag_abuse_year
      );
    admissionDetails?.anyHIVOrSTDOrRelatedAlimentsMonth &&
      formData?.append(
        'admission_anyHIVOrSTDOrRelatedAlimentsMonth',
        admissionDetails?.anyHIVOrSTDOrRelatedAlimentsMonth
      );
    admissionDetails?.anyHIVOrSTDOrRelatedAlimentsYear &&
      formData?.append(
        'admission_anyHIVOrSTDOrRelatedAlimentsYear',
        admissionDetails?.anyHIVOrSTDOrRelatedAlimentsYear
      );
    // admissionDetails?.roomType && formData?.append(
    //   "admission_anyOtherAliments",
    //   admissionDetails?.natureOfIllness
    // );

    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);

      dispatch(setLoading(false));
      notification('info', 'Save successfully');

      // nextStep();
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  // const handleDate = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any,
  //   key: string
  // ) => {
  //   const { name, value } = e.target;
  //   let month = admissionDetails?.[name]?.slice(0, 2);
  //   let year = admissionDetails?.[name]?.slice(3);
  //   if (key === "month") {
  //     month = value;
  //   } else {
  //     year = value;
  //   }

  //   setNewCaseData((pre: any) => ({
  //     ...pre,
  //     admissionDetails: {
  //       ...pre?.admissionDetails,
  //       [name]: `${month || "00"}/${year}`,
  //     },
  //   }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ) => {
    const { name, value } = e.target;

    setNewCaseData((pre: any) => ({
      ...pre,
      admissionDetails: { ...pre?.admissionDetails, [name]: value },
    }));
  };

  const fetchRoomList = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosConfig.get(
        `/roomlist?insurancecompany=${
          detailsOfTPA.TPA ? detailsOfTPA.TPA : detailsOfTPA.insuranceCompany
        }`
      );

      const expensesData = await axiosConfig.get(
        `/charges?insurancecompany=${
          detailsOfTPA.TPA ? detailsOfTPA.TPA : detailsOfTPA.insuranceCompany
        }`
      );
      dispatch(setRoomListData(data.data));

      dispatch(setLoading(false));
      dispatch(setChargesListData(expensesData.data.data.chargelist));

      console.log('Room data', data.data);
      console.log('Room list Redux data ', roomListData);
      console.log('Charges list Redux data ', chargesListData);
      console.log('admissionDetails :- ', admissionDetails);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    if (
      admissionDetails?.Per_Day_Room_Rent ||
      admissionDetails?.ICU_Charges ||
      admissionDetails?.OT_Charges ||
      admissionDetails?.Cost_Of_Investigation ||
      admissionDetails?.ProfessionalFeesSurgeon ||
      admissionDetails?.PhysicianCharge ||
      admissionDetails?.cost_Of_Implant ||
      admissionDetails?.OtherHospitalIfAny ||
      admissionDetails?.All_Including_Package ||
      admissionDetails?.Nursing ||
      admissionDetails?.Anesthetist ||
      admissionDetails?.Consumables
    ) {
      const totalSum =
        Number(admissionDetails?.Per_Day_Room_Rent || 0) +
        Number(admissionDetails?.ICU_Charges || 0) +
        Number(admissionDetails?.OT_Charges || 0) +
        Number(admissionDetails?.Cost_Of_Investigation || 0) +
        Number(admissionDetails?.ProfessionalFeesSurgeon || 0) +
        Number(admissionDetails?.PhysicianCharge || 0) +
        Number(admissionDetails?.cost_Of_Implant || 0) +
        Number(admissionDetails?.OtherHospitalIfAny || 0) +
        Number(admissionDetails?.All_Including_Package || 0) +
        Number(admissionDetails?.Nursing || 0) +
        Number(admissionDetails?.Anesthetist || 0) +
        Number(admissionDetails?.Consumables || 0);

      setTotalCost(totalSum);

      console.log('Total sum ', totalSum);
      // setNewCaseData((pre: any) => ({
      //   ...pre,
      //   admissionDetails: { ...pre?.admissionDetails, totalCost: totalSum },
      // }));
    }

    if (!roomListData.roomlist?.length) {
      fetchRoomList();
    }

    console.log(newCaseData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCaseData]);

  return (
    <div className='pb-8'>
      <div className='border-b border-fontColor-darkGray w-full relative'>
        <div className='flex justify-between flex-col lg:flex-row '>
          <div className=' lg:w-1/2 p-6 pb-12'>
            <div>
              <p className='pb-4 text-sm text-fontColor-light'>
                Date & Time of admission
              </p>
              <div className='flex items-center'>
                <div className='mr-4'>
                  <InputDate
                    handleChange={handleChange}
                    name='Date_of_Admission'
                    value={
                      admissionDetails?.Date_of_Admission ||
                      new Date().toISOString().slice(0, 10)
                    }
                  />
                </div>
                <div className='mr-4'>
                  <InputDate
                    handleChange={handleChange}
                    name='admission_time'
                    value={admissionDetails?.admission_time || ''}
                    type='time'
                    style={{ width: '180px' }}
                  />
                </div>
                {/* <div className="mr-2">
                  <InputRadio
                    handleChange={handleChange}
                    name="timeOfAdmissionAMOrPM"
                    value="am"
                    radioLabel="am"
                    fieldName={admissionDetails?.timeOfAdmissionAMOrPM || ""}
                  />
                </div>

                <InputRadio
                  handleChange={handleChange}
                  name="timeOfAdmissionAMOrPM"
                  value="pm"
                  radioLabel="pm"
                  fieldName={admissionDetails?.timeOfAdmissionAMOrPM || ""}
                /> */}
              </div>
            </div>

            <div className='mt-6'>
              <p className='pb-4 text-sm text-fontColor-light'>
                In this emergency or planned hospitalized event ?
              </p>
              <div className='flex items-center'>
                <div className='mr-8'>
                  <InputRadio
                    handleChange={handleChange}
                    name='emergencyOrPlanedHospitalizedEvent'
                    value='emergency'
                    radioLabel='Emergency'
                    fieldName={
                      admissionDetails?.emergencyOrPlanedHospitalizedEvent || ''
                    }
                  />
                </div>
                <div className='mr-8'>
                  <InputRadio
                    handleChange={handleChange}
                    name='emergencyOrPlanedHospitalizedEvent'
                    value='planned'
                    radioLabel='Planned'
                    fieldName={
                      admissionDetails?.emergencyOrPlanedHospitalizedEvent || ''
                    }
                  />
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <InputContained
                handleChange={handleChange}
                name='daysInHospital'
                value={admissionDetails?.daysInHospital || ''}
                label='No of days in hospital'
                style={{ maxWidth: '100px' }}
              />
            </div>
            <div className='mt-6'>
              <InputContained
                handleChange={handleChange}
                name='daysInICU'
                value={admissionDetails?.daysInICU || ''}
                label='Days in ICU'
                style={{ maxWidth: '100px' }}
              />
            </div>

            <div className='mt-6'>
              <NewCaseSelect
                options={
                  roomListData.roomlist &&
                  roomListData.roomlist.map((name: string) => ({
                    value: name,
                    label: name,
                  }))
                }
                name='roomType'
                handleChange={handleChange}
                defaultOption='Select room type'
                label='Room type'
                value={admissionDetails?.roomType || ''}
              />
            </div>

            {detailsOfTPA.TPA ? (
              console.log('TPA', detailsOfTPA.TPA)
            ) : detailsOfTPA.insuranceCompany ===
              'HDFC_ERGO_General_Insurance' ? (
              <>
                <div className='mt-6'>
                  <NewCaseSelect
                    options={
                      roomListData.roomtype &&
                      roomListData.roomtype.map((name: string) => ({
                        value: name,
                        label: name,
                      }))
                    }
                    name='Room_Category'
                    handleChange={handleChange}
                    defaultOption='Select room category'
                    label='Room Categories'
                    value={admissionDetails?.Room_Category || ''}
                  />
                </div>
              </>
            ) : null}

            {chargesListData &&
              chargesListData.map((object: any) => (
                <>
                  {/* {console.log(
										"compare",
										object.Key,
										admissionDetails && admissionDetails[object.Key],
										object
									)} */}
                  <div className='mt-6'>
                    <Input
                      label={object.label}
                      handleChange={handleChange}
                      name={object.Key}
                      value={
                        (admissionDetails && admissionDetails[object.Key]) || ''
                      }
                      type='number'
                      style={inputStyle}
                      placeHolder='Please specify the amount'
                    />
                  </div>
                </>
              ))}
          </div>
          <div className='border-r border-fontColor-darkGray'></div>

          <div className='lg:w-1/2 p-6 pb-12'>
            <p className=' text-base text-fontColor-light opacity-50'>
              Mandatory past history of any chronic illness
            </p>

            <div className='block sm:grid grid-cols-12 gap-8 mt-4 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Diabetes</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='MandatoryPastHistoryMonth'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.MandatoryPastHistoryMonth || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='MandatoryPastHistoryYear'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.MandatoryPastHistoryYear || ''}
                />
              </div>
            </div>
            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Heart Disease</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='heart_disease_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.heart_disease_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='heart_disease_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.heart_disease_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Hypertension</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='hypertension_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.hypertension_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='hypertension_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.hypertension_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Hyperlipidemias</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='hyperlipidemias_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.hyperlipidemias_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='hyperlipidemias_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.hyperlipidemias_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Osteoarthritis</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='osteoarthritis_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.osteoarthritis_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='osteoarthritis_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.osteoarthritis_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>
                  Asthma/ COPD/ Bronchitis
                </p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='asthma_COPD_bronchitis_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.asthma_COPD_bronchitis_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='asthma_COPD_bronchitis_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.asthma_COPD_bronchitis_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>Cancer</p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='cancer_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.cancer_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='cancer_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.cancer_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>
                  Alcohol/Drag Abuse
                </p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='alcohol_drag_abuse_month'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={admissionDetails?.alcohol_drag_abuse_month || ''}
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='alcohol_drag_abuse_year'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={admissionDetails?.alcohol_drag_abuse_year || ''}
                />
              </div>
            </div>

            <div className='block sm:grid grid-cols-12 gap-8 mt-8 items-center'>
              <div className='col-span-3'>
                <p className='text-sm text-fontColor-light'>
                  Any HIV Or STD/Related Ailments
                </p>
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={months}
                  name='anyHIVOrSTDOrRelatedAlimentsMonth'
                  handleChange={handleChange}
                  defaultOption='Select month'
                  value={
                    admissionDetails?.anyHIVOrSTDOrRelatedAlimentsMonth || ''
                  }
                />
              </div>
              <div className='col-span-4 mt-3 sm:mt-0'>
                <NewCaseSelect
                  options={yearList}
                  name='anyHIVOrSTDOrRelatedAlimentsYear'
                  handleChange={handleChange}
                  defaultOption='Select year'
                  value={
                    admissionDetails?.anyHIVOrSTDOrRelatedAlimentsYear || ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-12 gap-y-6 p-8 '>
        <div className='col-span-1'>
          <p className='pb-6 text-lg font-semibold text-fontColor-light'>
            Total Cost
          </p>
          <p className=' border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
            {totalCost}
          </p>
        </div>
      </div>
      <div className='flex justify-between flex-col flex-wrap items-start sm:flex-row  sm:items-center px-8  pb-4'>
        <NextButton
          text='Save'
          handleClick={saveDataToDb}
          style={{ marginBottom: '16px' }}
        />
        <div className='flex items-start sm:flex-row flex-col'>
          
          <NextButton
            text='View Documents'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={toggleViewDocumentsModal}
          />
          
          
        </div>
      </div>
    </div>
  );
};

export default DepStepFour;
