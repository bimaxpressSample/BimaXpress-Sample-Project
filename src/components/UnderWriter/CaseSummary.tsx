import React, { useState, useRef, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import ConfirmModal1 from './ConfirmModal1';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { color, fontSize } from '@mui/system';
import { red } from '@mui/material/colors';
import Modal from "react-modal";
import styles from './ConfirmModal.module.css';
import { IoClose } from "react-icons/io5";

const CaseSummary = () => {
  const [showModal, setShowModal] = useState(false);
  const param = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();

  const [fetchedData, setfetchedData] = useState<any>({});

  const [inputOfferAmount, setinputOfferAmount] = useState<any>({
    Amount: '',
    Amount1: '',
  });
console.log("fdgdfgfdgrtftr",inputOfferAmount);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toggleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  const [openConfirmModal1, setOpenConfirmModal1] = useState<boolean>(false);

  const toggleConfirmModal1 = () => {
    setOpenConfirmModal1(!openConfirmModal1);
  };

  useEffect(() => {
    if (!fetchedData?.length) {
      fetchDetails();
    }
  }, []);

  console.log('Fdsgd', caseData);
  const fetchDetails = async () => {
    dispatch(setLoading(true));
    console.log('Params case', param);
    const URL = `/patientApprovedDetailsCaseSummary/${param?.case}?email=${param.id}`;
    // console.log(user);
    try {
      const { data } = await axiosConfig.get(URL);
      console.log('case sum', data);
      //console.log("Claim number :- ", fetchedData.data.Claim_Number)

      setfetchedData(data);
      dispatch(setLoading(false));
      dispatch(setCaseData(data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  //   console.log("case   " ,caseData);

  function openWindow(e: string) {
    window.open(e);
  }

  const viewDocument = async () => {
    dispatch(setLoading(true));
    const viewURL = `/patientApprovedDetailsViewDocuments/${param.case}?email=${param.id}`;

    try {
      // const {data} = await axiosConfig.get(viewURL);
      // // console.log(data.data);
      await axiosConfig.get(viewURL).then((response) => {
        // console.log(response.data.data.UrluploadConsultation[0]);
        const a = response.data.data.UrlotherDocuments;
        const b = response.data.data.UrluploadConsultation;
        const c = response.data.data.UrluploadPatientsHealthIDCard;
        const d = response.data.data.id_proof;
        const e = response.data.data.UrlId;
        // console.log(d);
        //const allDocuments = [...response.data.data.UrlotherDocuments ,...response.data.data.UrluploadConsultation, ...response.data.data.UrluploadPatientsHealthIDCard, ...response.data.data.id_proof]
        let documentsData: any[] = [a, b, c, d, e];

        for (let i = 0; i < documentsData.length; i++) {
          window.open(documentsData[i]);
        }

        // openWindow(response.data.data.UrlotherDocuments[0]);
        // openWindow(response.data.data.UrlotherDocuments[0]);
        // window.open(response.data.data.UrlotherDocuments[0]);
        // window.open(response.data.data.UrluploadConsultation[0]);
        // console.log("respone -- " ,response.data.data[0][0]);
        // const url = window.URL.createObjectURL(new Blob([response.data.data[0][0]]));
        // // console.log("url --",url);
        // const link = document.createElement('a');
        // console.log(response.data[0]);
        // console.log("link",link);
        // link.href = response.data.data.UrlotherDocuments[0];
        // link.href = url ;
        // link.setAttribute('target', '_blank');
        // link.setAttribute('download',"");
        // document.body.appendChild(link);
        // link.click();
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;
    setinputOfferAmount((pre: any) => ({ ...pre, [name]: value }));
  };





  const apiund = async (status:any) => {
    const formDetails = new FormData();
    formDetails.append("offer_Amount_IG", inputOfferAmount?.Amount);
    formDetails.append("claimno", fetchedData?.data1?.Claim_Number);
    formDetails.append("patient_name", fetchedData?.data1?.Patient_name);
    formDetails.append("Insurance_Company", fetchedData?.data1?.Insurance_Company);
    formDetails.append("discharge_approved_amount", fetchedData?.data1?.discharge_approved_amount);
    formDetails.append("Health_Id", fetchedData?.data1?.HealthId);
    formDetails.append("average_settlement_tat", fetchedData?.data2?.average_settlement_tat);
    formDetails.append("maxtat", fetchedData?.data2?.maxtat);
    formDetails.append("mintat", fetchedData?.data2?.mintat);
    formDetails.append("avg_discount_percent", fetchedData?.data2?.avg_discount_percent);
    formDetails.append("Bank_percent", fetchedData?.data2?.Bank_percent);
    formDetails.append("processing_fees_IG", fetchedData?.data2?.processing_fees_IG);
    formDetails.append("processing_fees_ING", fetchedData?.data2?.processing_fees_ING);
    formDetails.append("offer_Amount_ING", inputOfferAmount?.Amount1);
    formDetails.append("status", status);

 
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(`https://www.api.bimaxpress.com/patientApprovedDetailsCaseSummary/case8?email=${param?.id}`,formDetails);
    
      dispatch(setLoading(false));
      notification("success", "Successfully Submited");
      navigate(`/patient${status === 'Rejected' ? 'Reject' : 'Enabled'}Case/${param?.id}`);

    } catch (error) {
      dispatch(setLoading(false));

      //@ts-ignore
      notification('error', error);
    }
  
  }
  const [openconfirm, setopenconfirm] = useState<boolean>(false);
  const [openconfirm1, setopenconfirm1] = useState<boolean>(false);
  const toggleModal = () => {
    setopenconfirm((pre) => !pre);
  };
  const toggleModal1 = () => {
    setopenconfirm1((pre) => !pre);
  };

  return (
    <>
      {
       
        <div className='grid grid-cols-3 gap-x-8 m-10  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95'>
          <h1 style={{color: 'orange', fontSize: '22px'}}>General Details</h1>
          <p></p>
          <p></p>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Claim No.
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData?.data1
                ? fetchedData?.data1?.Claim_Number
                : ''}
              {/* {console.log(fetchedData.data.Claim_Number)} */}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Patient Name
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData?.data1
                ? fetchedData?.data1?.Patient_name
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Insurance Company
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData?.data1
                ? fetchedData?.data1?.Insurance_Company
                : ''}
            </p>
          </div>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Discharge Approve Amount
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData?.data1
                ? fetchedData?.data1?.discharge_approved_amount
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Health ID Card
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data1 ? fetchedData?.data1?.HealthId : ''}
            </p>
          </div>
          <br></br>
<br></br>
          <h1 style={{color: 'orange', fontSize: '22px'}}>Interest Gurantee Offer </h1>
          <p></p>
          <p></p>
       

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Average Settlement TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.average_settlement_tat
                : ''}
            </p>
            
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              MAX TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2 ? fetchedData?.data2?.maxtat : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              MIN TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2 ? fetchedData?.data2?.mintat : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Average Discount Percentage
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.avg_discount_percent
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Intrest Rate
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.Bank_percent
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Processing_fee
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.processing_fees_IG
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Offer Amount
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data2
                ? fetchedData?.data2?.offer_Amount
                : ''}
            </p>
          </div>
        
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <input
              name='Amount'
              value= {inputOfferAmount?.Amount || ''}
              onChange={handleChange}
              style={{ color: 'white' }}
              placeholder='Enter Offer Amount'
              className='outline-none rounded-md border-2 px-2 py-1 w-full text-base bg-transparent font-thin placeholder-primary-lightest Input_input__1flKu'
              type='text'
            />
          </div>

          <br></br>
          <h1 style={{color: 'orange', fontSize: '22px'}}>Interest Not Gurantee</h1>
          <p></p>
          <p></p>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Processing_fee
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.processing_fees_ING
                : ''}
            </p>
          </div>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Offer Amount
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData?.data2
                ? fetchedData?.data2?.offer_Amount
                : ''}
            </p>
          </div>

          
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <input
              name='Amount1'
              onChange={handleChange}
              value= {inputOfferAmount?.Amount1 || ''}
              style={{ color: 'white' }}
              placeholder='Enter Offer Amount'
              className='outline-none rounded-md border-2 px-2 py-1 w-full text-base bg-transparent font-thin placeholder-primary-lightest Input_input__1flKu'
              type='text'
            />
          </div>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <button
              onClick={viewDocument}
              style={{ color: 'white' }}
              className='h-8 w-auto border rounded outline-none text-sm flex items-center px-6'
            >
              View Document
            </button>
          </div>

          {/* <div className="col-span-2 lg:col-span-1 pb-6 mt-8">
            </div> */}
        <div className='flex items-center justify-center'>
        <button

          className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-4'
          style={{ color: 'white' }}
          onClick={toggleModal}
        >
          Submit
        </button>
        <button
                onClick={toggleModal1}
                className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-6'
                style={{ color: 'white' }}
              >
                Reject
              </button>
      </div>
      <div>
        <Modal
          isOpen={openconfirm}
          className={styles.approveModalContainer}
          overlayClassName={styles.overlayContainer}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <div className="px-10 py-8 relative">
            <IoClose
              className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
              onClick={toggleModal}
            />

            <div className="w-full h-auto border-fontColor rounded-lg text-center">
              <p className="text-sm text-fontColor-gray pt-4">
                Are You Sure You Want To Submit The Case
              </p>
              <div className="flex items-center justify-center mt-4">

              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">

            </div>
            <div className="flex justify-center mt-8">
              {/* <PlanSelectButton
            text="Submit"
            style={{ maxWidth: "180px" }}
          /> */}
              <button onClick={()=> apiund(`Enabled`)} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">Yes</button>
              <button onClick={toggleModal} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">No</button>
            
            </div>

          </div>
        </Modal>

      </div>








      <div>
        <Modal
          isOpen={openconfirm1}
          className={styles.approveModalContainer}
          overlayClassName={styles.overlayContainer}
          onRequestClose={toggleModal1}
          shouldCloseOnOverlayClick={true}
        >
          <div className="px-10 py-8 relative">
            <IoClose
              className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
              onClick={toggleModal1}
            />

            <div className="w-full h-auto border-fontColor rounded-lg text-center">
              <p className="text-sm text-fontColor-gray pt-4">
                Are You Sure You Want To Reject The Case
              </p>
              <div className="flex items-center justify-center mt-4">

              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">

            </div>
            <div className="flex justify-center mt-8">
              {/* <PlanSelectButton
            text="Submit"
            style={{ maxWidth: "180px" }}
          /> */}
              <button onClick={()=> apiund(`Rejected`)} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">Yes</button>
              <button onClick={toggleModal1} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">No</button>
            
            </div>

          </div>
        </Modal>
        
      </div>



              
              
            </div>
       
      }

      
    </>
  );
};

export default CaseSummary;
