import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './bnplForm.css';
import BnplProgessBar from './bnplFormSteps/progessBar/bnplProgessBar';
import BnplFormStep1 from './bnplFormSteps/bnplFormStep1';
import BnplFormStep2 from './bnplFormSteps/bnplFormStep2';
import BnplFormStep3 from './bnplFormSteps/bnplFormStep3';
import { useAppSelector } from '../../redux/hooks';
import BnplViewDocumentModel from './bnplFormSteps/bnplModels/bnplViewDocumentsModel';
import BnplApplicationModel from './bnplFormSteps/bnplModels/bnplApplicationNumberModel';
const BnplForm = () => {
  const params = useParams();

  const [newbnplCaseData, setBnplNewCaseData] = useState({});
  const [openBnplViewDocumentModel, setopenBnplViewDocumentModel] =
    useState(false);

  function toggleBnplViewDocumentModel() {
    setopenBnplViewDocumentModel((pre) => !pre);
  }

  const [openApplicationNumberModal, setApplicationNumberModal] =
    useState(false);

  function toggleApplicationModel() {
    setApplicationNumberModal((pre) => !pre);
  }

  const [steps, setSteps] = useState(1);
  const { bnplCaseData, bnplCurrentBucket } = useAppSelector(
    (state) => state.bnpl
  );

  useEffect(() => {
    //@ts-ignore
    const obj = bnplCaseData[params?.case] || {};

    const {
      //HospitalDetails
      selectHospital,

      //GeneralDetails
      name_of_the_Applicant,
      mobile_Number,
      gender,
      loan_Type,
      personal_email,
      general_job_Type,
      date_of_birth,
      aadhar_Card_number,
      pan_Number,

      // Detailed Address
      type_of_residence,
      sum_of_monthly_rent_you_pay,
      building_locality_street,
      landmark,
      current_city,
      pincode,

      //Occupation Details
      occupation_job_Type,
      salary_as_per_bank_statment,
      any_ongoing_loan,
      sum_of_monthly_EMI,
      last_3_months_bank_statement,
      last_3_months_salary_slip,

      //Employer Details
      official_email_address,
      employer_name,
      number_of_year_in_current_employment,
      registerd_office_address,
      employer_building_locality_street,
      employer_landmark,
      employer_pincode,

      application_id,
    } = obj;

    setBnplNewCaseData((pre: any) => ({
      ...pre,
      //HospitalDetails
      selectHospital: selectHospital,

      //GeneralDetails

      name_of_the_Applicant: name_of_the_Applicant,
      mobile_Number: mobile_Number,
      gender: gender,
      loan_Type: loan_Type,
      personal_email: personal_email,
      general_job_Type: general_job_Type,
      date_of_birth: date_of_birth,
      aadhar_Card_number: aadhar_Card_number,
      pan_Number: pan_Number,

      // Detailed Address
      type_of_residence: type_of_residence,
      sum_of_monthly_rent_you_pay: sum_of_monthly_rent_you_pay,
      building_locality_street: building_locality_street,
      landmark: landmark,
      current_city: current_city,
      pincode: pincode,

      //Occupation Details
      occupation_job_Type: occupation_job_Type,
      salary_as_per_bank_statment: salary_as_per_bank_statment,
      any_ongoing_loan: any_ongoing_loan,
      sum_of_monthly_EMI: sum_of_monthly_EMI,
      last_3_months_bank_statement: last_3_months_bank_statement,
      last_3_months_salary_slip: last_3_months_salary_slip,

      //Employer Details
      official_email_address: official_email_address,
      employer_name: employer_name,
      number_of_year_in_current_employment:
        number_of_year_in_current_employment,
      registerd_office_address: registerd_office_address,
      employer_building_locality_street: employer_building_locality_street,
      employer_landmark: employer_landmark,
      employer_pincode: employer_pincode,

      application_id: application_id,
    }));
  }, []);

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

  const bnplFormDataHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ) => {
    const { name, value } = e.target;

    setBnplNewCaseData((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };

  const renderUI = () => {
    switch (steps) {
      case 1:
        return (
          <BnplFormStep1
            nextStep={nextStep}
            CaseData={newbnplCaseData}
            handleChange={bnplFormDataHandleChange}
            viewDocuments={toggleBnplViewDocumentModel}
          />
        );
      case 2:
        return (
          <BnplFormStep2
            nextStep={nextStep}
            prevStep={prevStep}
            CaseData={newbnplCaseData}
            handleChange={bnplFormDataHandleChange}
            viewDocuments={toggleBnplViewDocumentModel}
          />
        );
      case 3:
        return (
          <BnplFormStep3
            nextStep={nextStep}
            prevStep={prevStep}
            CaseData={newbnplCaseData}
            handleChange={bnplFormDataHandleChange}
            viewDocuments={toggleBnplViewDocumentModel}
            markComplete={toggleApplicationModel}
          />
        );
    }
  };

  return (
    <>
      <div className='p-6 pt-3 pb-3 progessbarDiv'>
        <BnplProgessBar steps={steps} prevStep={setStep} />
      </div>
      {renderUI()}

      <BnplViewDocumentModel
        closeModal={toggleBnplViewDocumentModel}
        isOpen={openBnplViewDocumentModel}
      />
      <BnplApplicationModel
        closeModal={toggleApplicationModel}
        isOpen={openApplicationNumberModal}
        CaseData={newbnplCaseData}
        handleChange={bnplFormDataHandleChange}
      />
    </>
  );
};

export default BnplForm;
