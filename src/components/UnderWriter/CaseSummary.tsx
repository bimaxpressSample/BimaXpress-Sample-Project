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
  });

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

  return (
    <>
      {
        <div className='grid grid-cols-3 gap-x-8 m-10  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95'>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Claim No.
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData.data
                ? fetchedData.data.Claim_Number
                : ''}
              {/* {console.log(fetchedData.data.Claim_Number)} */}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Patient Name
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData.data
                ? fetchedData.data.Patient_name
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Insurance Company
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData.data
                ? fetchedData.data.Insurance_Company
                : ''}
            </p>
          </div>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Approved Amount
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {fetchedData && fetchedData.data
                ? fetchedData.data.discharge_approved_amount
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Health ID Card
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data ? fetchedData.data.HealthId : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Average Settlement TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data
                ? fetchedData.data.average_settlement_tat
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              MAX TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data ? fetchedData.data.maxtat : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              MIN TAT
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data ? fetchedData.data.mintat : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Average Discount Percentage
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data
                ? fetchedData.data.avg_discount_factor
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Current Intrest Rate
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Processing_fee
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data
                ? fetchedData.data.processing_fee
                : ''}
            </p>
          </div>
          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-fontColor-light font-thin'>
              Offer Amount
            </p>
            <p className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {fetchedData && fetchedData.data
                ? fetchedData.data.offer_Amount
                : ''}
            </p>
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

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <input
              name='Amount'
              onChange={handleChange}
              style={{ color: 'white' }}
              placeholder='Enter Offer Amount'
              className='outline-none rounded-md border-2 px-2 py-1 w-full text-base bg-transparent font-thin placeholder-primary-lightest Input_input__1flKu'
              type='text'
            />
          </div>

          {/* <div className="col-span-2 lg:col-span-1 pb-6 mt-8">
            </div> */}
          <div className='col-span-2 lg:col-span-2 pb-6 mt-8'>
            <div className='flex justify-end'>
              <button
                onClick={toggleConfirmModal}
                className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-6'
                style={{ color: 'white' }}
              >
                Submit
              </button>
              <button
                onClick={toggleConfirmModal1}
                className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-6'
                style={{ color: 'white' }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      }

      <ConfirmModal
        closeModal={toggleConfirmModal}
        isOpen={openConfirmModal}
        fetchData={fetchedData.data}
        inputOfferAmount={inputOfferAmount}
      />
      <ConfirmModal1
        closeModal={toggleConfirmModal1}
        isOpen={openConfirmModal1}
        fetchData={fetchedData.data}
        inputOfferAmount={inputOfferAmount}
      />
    </>
  );
};

export default CaseSummary;
