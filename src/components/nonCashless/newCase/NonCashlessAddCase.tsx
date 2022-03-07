import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ProgessBar from './progessBar/ProgessBar';
// import StepFour from './stepFour/StepFour';
import StepOne from './stepOne/StepOne';
// import StepThree from './stepThree/StepThree';
import StepTwo from './stepTwo/StepTwo';
import axiosConfig from '../../../config/axiosConfig';
import { setNewCaseNum } from '../../../redux/slices/caseSlice';
import { useParams } from 'react-router-dom';
import SentMail from './sentMail/SentMail';
import ViewDocumentsModal from './viewDocuments/ViewDocumentsModal';
import { handleBreakpoints } from '@mui/system';
import Modal from "react-modal";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import paperclip from '../../../assets/icon/paperclip.svg';
import { setLoading } from '../../../redux/slices/utilitySlice';
import notification from "../../theme/utility/notification";
Modal.setAppElement("#root");

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

const NonCashlessAddCase = () => {
  const [steps, setSteps] = useState(1);
  const [yearList, setYearList] = useState<{ label: string; value: string }[]>(
    []
  );
  const [day, setDay] = useState<{ label: string; value: string }[]>([]);
  const [newCaseData, setNewCaseData] = useState({
    detailsOfTPA: {},
    patientDetails: {},
   /*  diagnosisDetails: {},
    admissionDetails: {}, */
  });

  // const [attachDocument, setattachDocument] = useState<any>({ file: []});


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


  const toggleModal = () => {
    setOpenModal((pre) => !pre);
  };
  const [openDocumentsModal, setopenDocumentsModal] = useState(false);

  const toggleDocumentsModal = () => {
    setShowRateList(true);
    setopenDocumentsModal((pre) => !pre);
  };
  const toggleViewDocumentsModal = () => {
    setShowRateList(false);
    setopenDocumentsModal((pre) => !pre);
  };

  const getNewCaseNumber = async () => {
    const URL = `/newcaseNCP?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);

      dispatch(setNewCaseNum(data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!param?.case) {
      getNewCaseNumber();
      setNewCaseData({
        detailsOfTPA: {},
        patientDetails: {},
        /* diagnosisDetails: {},
        admissionDetails: {}, */
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
        Approveddate,
        Discharge_Approvedamount,
        Discharge_Approveddate,
    
        patient_details: {
          
          Attending_Relative_Number,
          DOB,
         
          EmployeeId,
          FIR_Number,
          G,
          Gender,
          // Give_Company_details,
          // HealthInsuranceYesCompanyName,
          Health_Id,
          Insurance_Company,
          L,
          // MandatoryPastHistoryMonth,
          // MandatoryPastHistoryYear,
          Name,
          Occupation,
          Phone,
          Physician,
          PhysicianYesPhysicianContactNum,
          PhysicianYesPhysicianName,
          Policy_Id,
       
          Tpa_Company,
          city,
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
          DOB: DOB,
          city: city,
          contactNumber: Phone,
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
          relativeContractNumber: Attending_Relative_Number,
          // state: ,
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
    if (steps >= 2) {
      return;
    } else {
      setSteps((pre) => pre + 1);
    }
  };
  const setStep = (val: number) => {
    if (val > 2) {
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
          <StepOne
            newCaseData={newCaseData}
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
          <StepTwo
            newCaseData={newCaseData}
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
      default:
        return (
          <StepOne
            newCaseData={newCaseData}
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

  const[isCheckedSingle , setisCheckedSingle] = useState(false);
  const[isCheckedMultiple , setisCheckedMultiple] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  const[bulkUploadFile , setbulkUploadFile] = useState({
    CsvFile: [],
  })

  const handleSingleCheck = () =>{
    setisCheckedSingle(!isCheckedSingle);
    if(isCheckedMultiple === true){
      setisCheckedMultiple(!isCheckedMultiple);
    }
  }
  
  const handleMultipleCheck = () =>{
    setisCheckedMultiple(!isCheckedMultiple);
    if(isCheckedSingle === true){
      setisCheckedSingle(!isCheckedSingle);
    }
  }

  const toggleUploadModal = () => {
      setOpenUploadModal((pre) => !pre);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
) => {
    const { name, value } = e?.target;
    // if (name === "AadharCard") {
    //     setData((pre: any) => ({
    //         ...pre,
    //         //@ts-ignore
    //         [name]: [...pre[name], ...e?.target?.files],
    //     }));
    // } else {
    //     setData((pre: any) => ({ ...pre, [name]: value }));
    // }
    setbulkUploadFile((pre: any) => ({
        ...pre,
        //@ts-ignore
        [name]: [...pre[name], ...e?.target?.files],
    }));
};

const removeImage = (name: string, Document: string) => {
  setbulkUploadFile((pre: any) => ({
      ...pre,
      //@ts-ignore
      [Document]: [...pre?.[Document]]?.filter((files) => files?.name !== name),
  }));
};


const downloadCSV = async() =>{

    const URL = `/WholePatientData?email=${user}`;

    dispatch(setLoading(true));
    try{
        await axiosConfig.get(URL).then((response) => {
            // console.log("respone -- " ,response.data.data[0][0]);
            // console.log(response);
            // debugger;
            const url = window.URL.createObjectURL(new Blob([response.data.data.files[0]]));
            // console.log("url --",url);
            const link = document.createElement('a');
            // console.log(response.data[0]);
            // console.log("link",link);                     
            link.href = response.data.data.files[0];
            // link.href = url ;
            link.setAttribute('target', '_blank'); 
            link.setAttribute('download',""); 
            document.body.appendChild(link);
            link.click();
        });
        dispatch(setLoading(false));
        
        // notification("info", `Document Uploaded successfully`);
        
    }catch (error) {
      console.log(error);
        dispatch(setLoading(false));
        //@ts-ignore
        notification("error", error?.message);
    }
}


const uploadCSV =  async() =>{
  const CSVUPLOAD = `/WholePatientData?email=${user}`;
  const csvFormData = new FormData();
  let name: string | Blob | any[] = [];
  const files = bulkUploadFile.CsvFile;
  files.forEach((doc) => {
    //@ts-ignore
    // name.push(img?.name);
    csvFormData.append("document", doc);
  });
  //@ts-ignore
  try{
    const { data } = await axiosConfig.post(CSVUPLOAD, csvFormData);
    
    dispatch(setLoading(false));
    notification("info", `Document Uploaded successfully`);
    // closeModal();
  }
  catch(error){
    dispatch(setLoading(false));
    //@ts-ignore
    notification('error', error?.message);
  }
}

  return (
    <div>
      <div>
        <div className="flex flex-row mt-8 ml-6 mb-6">
            <div className="flex items-center h-5">
                <input name="singleCheck" onChange={handleSingleCheck} checked={isCheckedSingle} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="agree" className="font-medium text-white">Single Patient Details</label>
            </div>
        </div>
        { isCheckedSingle && 

            <div>
              <div className='p-6'>
                <ProgessBar steps={steps} prevStep={setStep} />
              </div>
              <div className='flex flex-col border-t border-fontColor-darkGray'>
                {renderUI()}
              </div>
            </div>
        }
      </div>
      <div>
        <div className="flex flex-row mt-8 ml-6 mb-6">
            <div className="flex items-center h-5">
                <input name="bulkCheck" onChange={handleMultipleCheck} checked={isCheckedMultiple} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="agree" className="font-medium text-white">Bulk upload the details of the Patients</label>
            </div>
        </div>
        { isCheckedMultiple && 

            <div>
               <div className="flex flex-row justify-start mt-5 p-10">
                <div className='grid-col-1 mx-5'>
                    <button onClick={downloadCSV}  type="submit" className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Download Sample CSV File
                    </button>
                </div>
                <div className='grid-col-1 mx-5'>
                    <button onClick={toggleUploadModal} type="submit" className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Upload Sample CSV File
                    </button>
                </div>
                <Modal
                  isOpen={openUploadModal}
                  className={styles.approveModalContainer}
                  overlayClassName={styles.overlayContainer}
                  onRequestClose={toggleUploadModal}
                  shouldCloseOnOverlayClick={true}
                >
                  <div className="px-10 py-8 relative">
                    <IoClose
                      className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
                      onClick={toggleUploadModal}
                    />

                    <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                      <p className="text-sm text-fontColor-gray pt-4">
                        Upload your documents here
                      </p>
                      <div className="flex items-center justify-center mt-4">
                        {bulkUploadFile?.CsvFile?.length
                          ? bulkUploadFile?.CsvFile?.map(
                              (
                                file: { name: {} | null | undefined },
                                index: React.Key | null | undefined
                              ) => {
                                return (
                                  <div
                                    className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                                    style={{ width: "100%", maxWidth: "145px" }}
                                    key={index}
                                  >
                                    <p
                                      style={{
                                        width: "100%",
                                        maxWidth: "125px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {/* @ts-ignore */}
                                      {file?.name}
                                    </p>
                                    {/* @ts-ignore */}
                                    <IoClose onClick={() => removeImage(file?.name,'CsvFile')} />
                                  </div>
                                );
                              }
                            )
                          : null}
                      </div>
                      <div className="flex justify-center mt-8 mb-4 ">
                        <div className="relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10">
                          <img src={paperclip} alt="icon" className="mr-2" />
                          <p className="text-fontColor-gray font-normal ">Attach file</p>
                          <input
                            type="file"
                            className="absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10"
                            name="CsvFile"
                            onChange={handleChange}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <PlanSelectButton
                        text="Submit"
                        style={{ maxWidth: "180px" }}
                        handleClick={uploadCSV}
                      />
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
        }
      </div>
      
      <SentMail
        closeModal={toggleModal}
        isOpen={openModal}
        newCaseData={newCaseData}
        total={totalCost}
      />
     
      <ViewDocumentsModal
        closeModal={toggleDocumentsModal}
        isOpen={openDocumentsModal}
        documents={showRateList ? reteList : documentsList}
      />
    </div>
  );
};

export default NonCashlessAddCase;
