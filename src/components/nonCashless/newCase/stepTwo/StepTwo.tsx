import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Input from "../../../theme/input/Input";
// import InputContained from "../../theme/inputContained/InputContained";
import InputRadio from "../../../theme/inputRadio/InputRadio";
import NextButton from "../../../theme/nextButton/NextButton";
// import NewCaseSelect from "../../theme/select/newCaseSelect/NewCaseSelect";
import axiosConfig from "../../../../config/axiosConfig";
import notification from "../../../theme/utility/notification";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import InputDate from "../../../theme/inputDate/InputDate";
import { useNavigate } from "react-router-dom";
import paperclip from "../../../../assets/icon/paperclip.svg";
import ViewDocumentsModal from './../viewDocuments/ViewDocumentsModal';
import AttachDocumentModal from './../AttachDocumentModal';
import { maxHeight } from "@mui/system";


type StepTwoProps = {
  newCaseData: any;
  setNewCaseData: any;
  updateNewCaseData: (name: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  yearList: { label: string; value: string }[];
  months: { label: string; value: string }[];
  days: { label: string; value: string }[];
  param: string | undefined;
  toggleModal?: () => void;
  reteList?: string;
  toggleDocumentsModal?: () => void;
  toggleViewDocumentsModal?: () => void;
};

const StepTwo = ({
  newCaseData,
  setNewCaseData,
  nextStep,
  prevStep,
  updateNewCaseData,
  days,
  months,
  yearList,
  param,
  toggleModal,
  reteList,
  toggleDocumentsModal,
  toggleViewDocumentsModal,
}: StepTwoProps) => {
  const { detailsOfTPA , patientDetails } = newCaseData;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const navigate = useNavigate();

  const [openAttachDocumentModal, setOpenAttachDocumentModal] = useState<boolean>(false);
  const toggleAttachDocumentModal = () => {
    setOpenAttachDocumentModal((pre) => !pre);
  };
  

  const saveDataToDb = async () => {
    
    const POST_URL = `/Patient_details_NCP?email=${user}&casenumber=${newCaseNum}`;
 
    const formData = new FormData();
 
    detailsOfTPA?.TPACompany && formData?.append("tpa_insured_company", detailsOfTPA?.TPACompany);
    
    detailsOfTPA?.insuranceCompany && formData?.append("insurance_Company", detailsOfTPA?.insuranceCompany);
    
    patientDetails?.DateOfAdmission && formData?.append("Date_of_Admission", patientDetails?.DateOfAdmission);
    
    patientDetails?.DateOfDischargeApproved && formData?.append("date_of_discharge_approval", patientDetails?.DateOfDischargeApproved);

    patientDetails?.patientName && formData?.append("patient_name", patientDetails?.patientName);

    patientDetails?.contactNumber && formData?.append("patient_details_contact_number",patientDetails?.contactNumber);
  
    patientDetails?.insuredCardNumber && formData?.append( "health_Id", patientDetails?.insuredCardNumber );
    
    patientDetails?.policyNumber && formData?.append( "policy_number", patientDetails?.policyNumber );
    
    patientDetails?.ClaimNumber && formData?.append("claimno", patientDetails?.ClaimNumber);
    
    patientDetails?.DischargeApprovedAmount && formData?.append("discharge_approved_amount", patientDetails?.DischargeApprovedAmount);
 
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);

      dispatch(setLoading(false));
      notification("info", "Submited successfully");
      
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value } = e.target;

    setNewCaseData((pre: any) => ({
      ...pre,
      patientDetails: { ...pre?.patientDetails, [name]: value },
    }));
  };

  useEffect(() => {
    console.log(newCaseData);
  }, [newCaseData]);

  return (
    <div className="h-full relative">
      <div className="flex justify-between border-b border-fontColor-darkGray flex-col sm:flex-row">
        <div className="sm:w-1/2 p-6 pb-12">
          <div>
            <Input
              handleChange={handleChange}
              name="patientName"
              value={patientDetails?.patientName || ""}
              label="Patient name"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6 flex flex-row justify-between">
            <div>
            <InputDate
              handleChange={handleChange}
              name="DateOfAdmission"
              value={patientDetails?.DateOfAdmission || ""}
              label="Date of Admission"
              style={{ minWidth: "220px"  }}
            />
            </div>

            <div>
            <InputDate
              handleChange={handleChange}
              name="DateOfDischargeApproved"
              value={patientDetails?.DateOfDischargeApproved || ""}
              label="Date of Discharge Approved"
              style={{ minWidth: "220px"  }}
            />
            </div>
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="contactNumber"
              value={patientDetails?.contactNumber || ""}
              label="Contact number"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="insuredCardNumber"
              value={patientDetails?.insuredCardNumber || ""}
              label="Insured Member ID Card No(Health Id)"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>
        </div>

        <div className="border-r border-fontColor-darkGray"></div>

        <div className=" sm:w-1/2 p-6 pb-0">
          <div>
            <Input
              handleChange={handleChange}
              name="policyNumber"
              value={patientDetails?.policyNumber || ""}
              label="Policy Number / Corporate Name"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>
          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="ClaimNumber"
              value={patientDetails?.ClaimNumber || ""}
              label="Claim Number"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="DischargeApprovedAmount"
              value={patientDetails?.DischargeApprovedAmount || ""}
              label="Discharge Approved Amount"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <AttachDocumentModal
        closeModal={toggleAttachDocumentModal}
        isOpen={openAttachDocumentModal}
        // newCaseData={summeryData}
        // action={options?.action}
      />
      <div className="flex justify-center mt-6">
        <button onClick={toggleAttachDocumentModal}  className='flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Attach Documents</button>
      </div>
          
        </div>
      </div>

      <div className="mt-18 flex items-center justify-between p-6">
        <NextButton iconLeft={true} text="Back" handleClick={prevStep} />
        <NextButton
          handleClick={saveDataToDb} 
          text="Submit"  
        />
      </div>
      
    </div>
  );
};

export default StepTwo;
