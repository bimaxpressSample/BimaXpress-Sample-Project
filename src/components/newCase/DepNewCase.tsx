import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ProgessBar from './progessBar/ProgessBar';
import DepStepOne from './depAllSteps/StepOne';
import DepStepTwo from './depAllSteps/StepTwo';
import DepStepThree from './depAllSteps/StepThree';
import DepStepFour from './depAllSteps/StepFour';
import axiosConfig from '../../config/axiosConfig';
import { setNewCaseNum } from '../../redux/slices/caseSlice';
import { useParams } from 'react-router-dom';
import DepViewDocumentsModal from './viewDocuments/DepViewDocumentsModal';
import { useLocation } from 'react-router-dom';
import { setLoading } from '../../redux/slices/utilitySlice';
import notification from '../theme/utility/notification';
import { useNavigate } from 'react-router-dom';

import Input from '../theme/input/Input';
import NextButton from '../theme/nextButton/NextButton';

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

const DepNewCase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps, setSteps] = useState(1);
  const [yearList, setYearList] = useState<{ label: string; value: string }[]>(
    []
  );
  const [day, setDay] = useState<{ label: string; value: string }[]>([]);
  const [newCaseData, setNewCaseData] = useState({
    detailsOfTPA: {},
    patientDetails: {},
    diagnosisDetails: {},
    admissionDetails: {},
  });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  // const { newCaseNum } = useAppSelector((state) => state?.case);
  const { caseData } = useAppSelector((state) => state?.home);
  const param = useParams();
  console.log(param);

  const { allCompaniesList } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const [reteList, setRateList] = useState<string[]>([]);
  const [documentsList, setDocumentsList] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [showRateList, setShowRateList] = useState(true);
  const [openReteList, setReteList] = useState(false);

  const toggleModal = () => {
    setOpenModal((pre) => !pre);
  };
  const [openDocumentsModal, setopenDocumentsModal] = useState(false);

  const toggleDocumentsModal = () => {
    setReteList((pre) => !pre);
  };
  const toggleViewDocumentsModal = () => {
    setopenDocumentsModal((pre) => !pre);
  };

  const getNewCaseNumber = async () => {
    const URL = `/newcase?email=${location.state.hospital_email}`;
    try {
      const { data } = await axiosConfig.get(URL);
      console.log('data', data);
      dispatch(setNewCaseNum(data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const [claimNumber, setClaimNumber] = useState<any>('');

  async function submitClaimNumber() {
    dispatch(setLoading(true));
    const URL = `/claimno?email=${location.state.hospital_email}&casenumber=${param?.case}`;
    const changeStatusURL = `/changedataentryformstatus?email=${location.state.hospital_email}&casenumber=${param?.case}`;
    try {
      console.log(claimNumber);

      const formNewStatus = new FormData();
      formNewStatus?.append('newformstatus', 'Unprocessed');

      const claimno = new FormData();
      claimno?.append('claimno', claimNumber);

      const { data } = await axiosConfig.post(URL, claimno);
      await axiosConfig.post(changeStatusURL, formNewStatus);

      console.log('Dep New case Calim number', data);
      dispatch(setLoading(false));

      notification(
        'info',
        `Claim Number Saved and Case Moved To Unprocessed Successfully`
      );
      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  }

  useEffect(() => {
    if (!param?.case) {
      getNewCaseNumber();
      setNewCaseData({
        detailsOfTPA: {},
        patientDetails: {},
        diagnosisDetails: {},
        admissionDetails: {},
      });
      const companyInfo =
        //@ts-ignore
        allCompaniesList[newCaseData?.detailsOfTPA?.insuranceCompany];
      if (companyInfo) {
        const data = JSON.parse(companyInfo?.replace(/'/g, '"'));
        setRateList([data?.image]);
      }
      //@ts-ignore
      if (newCaseData?.Aadhar_card_Front) {
        //@ts-ignore
        setDocumentsList((pre) => [...pre, newCaseData?.Aadhar_card_Front]);
      }
      //@ts-ignore
      if (newCaseData?.Aadhar_Card_Back) {
        //@ts-ignore
        setDocumentsList((pre) => [...pre, newCaseData?.Aadhar_Card_Back]);
      }
      //@ts-ignore
      if (newCaseData?.Health_card) {
        //@ts-ignore
        setDocumentsList((pre) => [...pre, newCaseData?.Health_card]);
      }
    } else {
      dispatch(setNewCaseNum(param?.case));
      //@ts-ignore
      const obj = caseData[param?.case] || {};

      const {
        Aadhar_card_Front,
        Aadhar_Card_Back,
        Health_card,
        // Approvedamount,
        // Approveddate,
        // Discharge_Approvedamount,
        // Discharge_Approveddate,
        // Enhanceamount,
        // Enhancedate,
        // RPA,
        // Rejectamount,
        // Rejectdate,
        // Settledamount,
        // Settleddate
        // caseNumber,
        // date,
        // fciamount,
        // fcidate,
        // formstatus,
        hospital_details: {
          All_Including_Package,
          Anesthetist,
          // Bed_No,
          Consumables,
          // Contact_number,
          Cost_Of_Investigation,
          Date_of_Admission,
          // DateofInjury,
          Days_In_Hospital,
          Days_In_ICU,
          ExpectedDateOfDelivery,
          ICU_Charges,
          Nursing,
          OT_Charges,
          OtherHospitalIfAny,
          Per_Day_Room_Rent,
          PhysicianCharge,
          ProfessionalFeesSurgeon,
          Room_Category,
          // Room_No,
          Room_Type,
          Treating_Doctor,
          Treating_Doctor_Name,
          admission_time,
          cost_Of_Implant,
          // datasaved,
          // nov,
          total,
        },
        // queryamount,
        // querydate,
        // rpastatus,
        // status,
        patient_details: {
          A,
          Address,
          AgeMonth,
          AgeYear,
          Ailment,
          MandatoryPastHistoryMonth,
          MandatoryPastHistoryYear,
          AlcoholOrDrugAbuseMonth,
          AlcoholOrDrugAbuseYear,
          AsthmaOrCOPDOrBronchitisMonth,
          AsthmaOrCOPDOrBronchitisYear,
          Attending_Relative_Number,
          CancerMonth,
          CancerYear,
          anyHIVOrSTDOrRelatedAlimentsMonth,
          anyHIVOrSTDOrRelatedAlimentsYear,

          CauseofAilment,
          DOB,
          Date_Of_First_Consultation,
          Date_Of_Injury,
          Duration_Of_Present_Ailments,
          EmployeeId,
          FIR_Number,
          G,
          Gender,
          Give_Company_details,
          HealthInsuranceYesCompanyName,
          Health_Id,
          HeartDiseaseMonth,
          HeartDiseaseYear,
          How_Did_Injury_Occur,
          HyperlipidemiasMonth,
          HyperlipidemiasYear,
          HypertensionMonth,
          HypertensionYear,
          ICD_Code,
          ICD_Code_10_PCS,
          If_Investigation_Or_Medical_Management_Provide_Details,
          If_Other_Treatment_Provide_Details,
          If_Surgical_Name_of_Surgery,
          In_Case_Of_Accident,
          Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_,
          Insurance_Company,
          L,
          // MandatoryPastHistoryMonth,
          // MandatoryPastHistoryYear,
          Name,
          Nature_Of_Illness,
          Occupation,
          OsteoarthritisMonth,
          OsteoarthritisYear,
          // OtherAliments,
          // Other_Insurance_Details,
          P,
          Past_History_Of_Present_Ailments,
          Phone,
          Physician,
          PhysicianYesPhysicianContactNum,
          PhysicianYesPhysicianName,
          Policy_Id,
          // Proposed_Line_Of_Treat,
          Provision_Diagnosis,
          // RelatedAlimentsMonth,
          // RelatedAlimentsYear,
          Relevant_Critical_Findings,
          Reported_To_Police,
          Route_Of_Drug_Administration,
          Tpa_Company,
          city,
          doctor_proposedLineOfTreatment_Allopathic_Treatment,
          doctor_proposedLineOfTreatment_Intensive_Care,
          doctor_proposedLineOfTreatment_Investigation,
          doctor_proposedLineOfTreatment_Medical_Managment,
          doctor_proposedLineOfTreatment_Surgical_Managment,
          doctor_testAlcohol,
          ipd_patient_number,
          Type,
          patient_details_HealthInsurance,
        },
      } = obj;

      //@ts-ignore
      const companyInfo = allCompaniesList[Insurance_Company];
      if (companyInfo) {
        const data = JSON.parse(companyInfo?.replace(/'/g, '"'));
        setRateList([data?.image]);
      }

      if (Aadhar_card_Front) {
        setDocumentsList((pre) => [...pre, Aadhar_card_Front]);
      }
      if (Aadhar_Card_Back) {
        setDocumentsList((pre) => [...pre, Aadhar_Card_Back]);
      }
      if (Health_card) {
        setDocumentsList((pre) => [...pre, Health_card]);
      }

      setNewCaseData((pre: any) => ({
        ...pre,
        detailsOfTPA: {
          insuranceCompany: Insurance_Company,
          TPA: Tpa_Company,
        },
        patientDetails: {
          AgeYear: AgeYear,
          AgeMonth: AgeMonth,
          ipd_patient_number: ipd_patient_number,
          DOB: DOB,
          city: city,
          patient_details_currentAddress: Address,
          contractNumber: Phone,
          employeeId: EmployeeId,
          familyPhysician: Physician,
          PhysicianYesPhysicianName,
          PhysicianYesPhysicianContactNum,
          gender: Gender,
          insuredCardNumber: Health_Id,
          occupation: Occupation,
          patientName: Name,
          policyNumber: Policy_Id,
          // postalCode: "sdf",

          previousHealthInsurance: patient_details_HealthInsurance,
          HealthInsuranceYesCompanyName: HealthInsuranceYesCompanyName,
          Give_Company_details: Give_Company_details,
          relativeContractNumber: Attending_Relative_Number,
          // state: ,
        },
        diagnosisDetails: {
          ICD: ICD_Code_10_PCS,
          ICDCode: ICD_Code,
          accident: In_Case_Of_Accident,
          Ailment: Ailment,
          CauseofAilment: CauseofAilment,
          Provision_Diagnosis: Provision_Diagnosis,
          // alcoholConsumer: ,
          contractNumber: Treating_Doctor,
          dateOfInjury: Date_Of_Injury,
          doctorsName: Treating_Doctor_Name,

          durationOfPresentAilment: Duration_Of_Present_Ailments,
          expectedDeliveryDate: ExpectedDateOfDelivery,
          firstConsultation: Date_Of_First_Consultation,
          // historyOfPresentAilment: Past_History_Of_Present_Ailments
          //   ? "Yes"
          //   : "No",
          Past_History_Of_Present_Ailments: Past_History_Of_Present_Ailments,
          injuryCause: How_Did_Injury_Occur,
          maternityA: A,
          maternityL: L,
          maternityG: G,
          maternityP: P,

          // maternity: ['g', 'p', 'l', 'a'],
          natureOfIllness: Nature_Of_Illness,
          otherTreatments: If_Other_Treatment_Provide_Details,
          doctor_proposedLineOfTreatment_Allopathic_Treatment,
          doctor_proposedLineOfTreatment_Intensive_Care,
          doctor_proposedLineOfTreatment_Investigation,
          doctor_proposedLineOfTreatment_Medical_Managment,
          doctor_proposedLineOfTreatment_Surgical_Managment,
          // proposedLineOfTreatment: ['medicalManageemnt', 'intensiveCare', 'nonAllopaticTreatment', 'investigation', 'surgicalManagement'],
          proposedLineOfTreatmentInvestigationDetails:
            If_Investigation_Or_Medical_Management_Provide_Details,
          relevantClinicFindings: Relevant_Critical_Findings,
          repotedToPolice: Reported_To_Police,
          routeOfDrag: Route_Of_Drug_Administration,
          surgeryName: If_Surgical_Name_of_Surgery,
          testConductedOrNot: doctor_testAlcohol,
          FIR_Number: FIR_Number,
          Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_:
            Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_,
        },
        admissionDetails: {
          //       HIV_STD_related_ailments_months:,
          // HIV_STD_related_ailments_year: "1903",
          Per_Day_Room_Rent: Per_Day_Room_Rent,
          ICU_Charges: ICU_Charges,
          OT_Charges: OT_Charges,
          All_Including_Package: All_Including_Package,
          PhysicianCharge: PhysicianCharge,
          Consumables: Consumables,
          OtherHospitalIfAny: OtherHospitalIfAny,
          MandatoryPastHistoryMonth: MandatoryPastHistoryMonth,
          MandatoryPastHistoryYear: MandatoryPastHistoryYear,
          alcohol_drag_abuse_month: AlcoholOrDrugAbuseMonth,
          alcohol_drag_abuse_year: AlcoholOrDrugAbuseYear,
          asthma_COPD_bronchitis_month: AsthmaOrCOPDOrBronchitisMonth,
          asthma_COPD_bronchitis_year: AsthmaOrCOPDOrBronchitisYear,
          cancer_month: CancerMonth,
          cancer_year: CancerYear,
          anyHIVOrSTDOrRelatedAlimentsMonth: anyHIVOrSTDOrRelatedAlimentsMonth,
          anyHIVOrSTDOrRelatedAlimentsYear: anyHIVOrSTDOrRelatedAlimentsYear,
          Cost_Of_Investigation: Cost_Of_Investigation,
          Date_of_Admission: Date_of_Admission,
          daysInHospital: Days_In_Hospital,
          daysInICU: Days_In_ICU,
          // diabetes_month: "",
          // diabetes_year: ,
          emergencyOrPlanedHospitalizedEvent: Type,
          Nursing: Nursing,
          Anesthetist: Anesthetist,
          heart_disease_month: HeartDiseaseMonth,
          heart_disease_year: HeartDiseaseYear,
          hyperlipidemias_month: HyperlipidemiasMonth,
          hyperlipidemias_year: HyperlipidemiasYear,
          hypertension_month: HypertensionMonth,
          hypertension_year: HypertensionYear,
          osteoarthritis_month: OsteoarthritisMonth,
          osteoarthritis_year: OsteoarthritisYear,
          cost_Of_Implant: cost_Of_Implant,
          ProfessionalFeesSurgeon: ProfessionalFeesSurgeon,
          roomType: Room_Type,
          Room_Category: Room_Category,
          admission_time: admission_time,
          total,

          // timeOfAdmissionAMOrPM: "am",
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let arr = [];
    let days = [];
    for (let i = 1900; i <= 2500; i++) {
      arr.push({ label: `${i}`, value: `${i}` });
    }
    setYearList(arr);

    for (let i = 1; i <= 31; i++) {
      if (i >= 1 && i <= 9) {
        days.push({ label: `0${i}`, value: `0${i}` });
      } else {
        days.push({ label: `${i}`, value: `${i}` });
      }
    }
    setDay(days);
  }, []);

  const updateNewCaseData = (name: string, value: string) => {
    setNewCaseData((pre) => ({ ...pre, [name]: value }));
  };

  const nextStep = () => {
    if (steps >= 4) {
      return;
    } else {
      setSteps((pre) => pre + 1);
    }
  };
  const setStep = (val: number) => {
    if (val > 4) {
      return;
    } else {
      setSteps(val);
    }
  };

  const prevStep = () => {
    if (steps <= 1) {
      return;
    } else {
      setSteps((pre) => pre - 1);
    }
  };

  const renderUI = () => {
    switch (steps) {
      case 0:
        return (
          <DepStepOne
            newCaseData={newCaseData}
            hospitalmail={location.state.hospital_email}
            setNewCaseData={setNewCaseData}
            nextStep={nextStep}
            param={param?.case}
            toggleModal={toggleModal}
            toggleDocumentsModal={toggleDocumentsModal}
            toggleViewDocumentsModal={toggleViewDocumentsModal}
          />
        );
      case 2:
        return (
          <DepStepTwo
            newCaseData={newCaseData}
            hospitalmail={location.state.hospital_email}
            setNewCaseData={setNewCaseData}
            updateNewCaseData={updateNewCaseData}
            nextStep={nextStep}
            prevStep={prevStep}
            months={months}
            yearList={yearList}
            days={day}
            param={param?.case}
            toggleModal={toggleModal}
            toggleDocumentsModal={toggleDocumentsModal}
            toggleViewDocumentsModal={toggleViewDocumentsModal}
          />
        );
      case 3:
        return (
          <DepStepThree
            newCaseData={newCaseData}
            hospitalmail={location.state.hospital_email}
            setNewCaseData={setNewCaseData}
            nextStep={nextStep}
            prevStep={prevStep}
            param={param?.case}
            toggleModal={toggleModal}
            toggleDocumentsModal={toggleDocumentsModal}
            toggleViewDocumentsModal={toggleViewDocumentsModal}
          />
        );
      case 4:
        return (
          <DepStepFour
            newCaseData={newCaseData}
            hospitalmail={location.state.hospital_email}
            setNewCaseData={setNewCaseData}
            nextStep={nextStep}
            months={months}
            yearList={yearList}
            param={param?.case}
            toggleModal={toggleModal}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
            toggleDocumentsModal={toggleDocumentsModal}
            toggleViewDocumentsModal={toggleViewDocumentsModal}
          />
        );

      default:
        return (
          <DepStepOne
            newCaseData={newCaseData}
            hospitalmail={location.state.hospital_email}
            setNewCaseData={setNewCaseData}
            nextStep={nextStep}
            param={param?.case}
            toggleModal={toggleModal}
            toggleDocumentsModal={toggleDocumentsModal}
            toggleViewDocumentsModal={toggleViewDocumentsModal}
          />
        );
    }
  };

  return (
    <div>
      <div className='p-6'>
        <ProgessBar
          steps={steps}
          prevStep={setStep}
          newCaseData={newCaseData}
        />
      </div>
      <div className='flex flex-col border-t border-fontColor-darkGray'>
        {
          <>
            {renderUI()}

            <div
              className='grid grid-cols-6'
              style={{
                marginLeft: '25px',
                marginBottom: '15px',
                position: 'relative',
                top: '-20px',
              }}
            >
              <div className='col-span-1'>
                <Input
                  name='City'
                  value={claimNumber}
                  labelStyle={{ paddingBottom: '12px' }}
                  style={{ height: '28px', display: 'inline' }}
                  placeHolder='Enter Claim Number'
                  handleChange={(e) => {
                    setClaimNumber(e.target.value);
                  }}
                />
              </div>
              <div className='col-span-1'>
                <NextButton
                  text='Save'
                  style={{ height: '28px', width: '70px', marginLeft: '10px' }}
                  handleClick={submitClaimNumber}
                />
              </div>
            </div>
          </>
        }
      </div>
      {/* <SentMail
			closeModal={toggleModal}
			isOpen={openModal}
			newCaseData={newCaseData}
			total={totalCost}
		/> */}
      <DepViewDocumentsModal
        closeModal={toggleViewDocumentsModal}
        isOpen={openDocumentsModal}
        newCaseData={newCaseData}
        hospitalmail={location.state.hospital_email}
      />
    </div>
  );
};

export default DepNewCase;