import React, { useEffect, useState } from 'react';
import HomeCard from '../theme/card/HomeCard';
import approved from '../../assets/icon/approved.svg';
import dischargedApproved from '../../assets/icon/dischargedApproved.svg';
// import document from "../../assets/icon/document-info.svg";
import draft from '../../assets/icon/draft.svg';
import enhance from '../../assets/icon/enhance.svg';
import fci from '../../assets/icon/fci.svg';
import query from '../../assets/icon/noun_query_3407971.svg';
import process from '../../assets/icon/process.svg';
import reject from '../../assets/icon/reject.svg';
// import { To, useNavigate } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import { setCounter, setCurrentBucket } from '../../redux/slices/homeSlice';
import { To, useNavigate, useParams } from 'react-router-dom';
// import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setCaseData } from '../../redux/slices/homeSlice';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setUndSelectedHospital } from '../../redux/slices/userSlice';
import ConfirmModal from './ConfirmModal';

const Discharge = () => {

  const param = useParams();
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const { UndSelectedHospital } = useAppSelector((state) => state?.user);

  const [hospitalList, sethospitalList] = useState<any>([true]);


  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    // console.log(param?.case);                        // -------------------------------
    try {
      const listOfHospital = await axiosConfig.get(`/listofhospitals?email=${user}`);
      let tempList:any = []
      Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
        tempList.push({ label: value, value: key });
      });
      sethospitalList(tempList);
      dispatch(setLoading(false));
      // alert("got"+hospitalList)
      console.log(hospitalList);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };




  // useEffect(() => {
    
  // }, [hospitalList]);


//  const [options, setOptions] = useState({
//     hospitalList: '',
//     insuranceTPA: '',
//     dateRange: '',
//   });

const [selectedOptions, setselectedOptions] = useState({
  hospitalList: 'abc',
});



  const handleHospitalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    dispatch(setUndSelectedHospital({name:value}));
    setselectedOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // debugger;
    console.log("under select",UndSelectedHospital);
    // fetchSelectedHospital(value);
  };




// const fetchSelectedHospital = async (selectedHospital: any) => {
//     dispatch(setLoading(true));
//     // const URL = `/${param?.case}`;
//     let URL = `/${param?.case}?email=${selectedHospital}`;
//     try {
//       if (selectedHospital === '') {
//         URL = `/all${param?.case}`;
//       }
//       const { data } = await axiosConfig.get(URL);
//       console.log('After select URL - ', URL);
//       console.log(data); // -------------------------------
//       dispatch(setLoading(false));
//       dispatch(setCaseData(data?.data));
//     } catch (error) {
//       dispatch(setLoading(false));
//       //@ts-ignore
//       notification('error', error?.message);
//     }
//   };

//   const handleHospitalChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
//     >
//   ) => {
//     const { name, value } = e.target;
//     setOptions((pre: any) => ({
//       ...pre,
//       [name]: value,
//     }));
//     fetchSelectedHospital(value);
//   };

  const fetchCounter = async () => {
    dispatch(setLoading(true));
    const URL = `/counter?email=abnew@gmail.com`;
    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCounter(data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };



  useEffect(() => {
    fetchAnalyst();
    if (!user) {
      navigate('/login');
    } else {
      if (!Object.entries(counter).length) {
         fetchCounter();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log('selected',selectedOptions)

const [TPAList, setTPAList] = useState<any>([]);
const Fetchdetails = async () => {
    dispatch(setLoading(true));
  
    try {
      const listOfTPA = await axiosConfig.get(
        `/empanelcompany?email=tcs@gmail.com`
      );

      Object.entries(listOfTPA.data.data).map(([key, value]) => {
        TPAList.push({
          label: key,
          value: key,
        });
      });
      setTPAList(TPAList);
      
      
      dispatch(setLoading(false));
   
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };
  useEffect(() => {
    Fetchdetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [options, setOptions] = useState({
    insuranceTPA: '',
  });

  

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    setOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // fetchSelectedTPA();
  };
 

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toggleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    
    <>
    
        <div className='flex items-center justify-between mt-6 p-6'>
            
          <div className='flex items-center'>
          <NewCaseSelect
                options={TPAList}
                name='insuranceTPA'
                handleChange={handleChange}
                defaultOption='Insurance TPA'
                value={options?.insuranceTPA || ''}
                style={{
                  minWidth: '170px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }}
              />
            <div className='mr-2'>
              <NewCaseSelect
                options={hospitalList}
                // options={listOfHospitals}
                name='hospitalList'
                handleChange={handleHospitalChange}
                // defaultOption='CHL Appolo'
                value={selectedOptions?.hospitalList || ''}
                style={{
                  minWidth: '125px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }} />
               
    
               
            </div>
            
          </div>

    </div>
    <div className="grid grid-cols-6 gap-4">
    <div className="col-start-1 col-end-3 ..."></div>
  <div className="col-end-7 col-span-2 ..."></div>
  <br></br>
  <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            HOSPITAL NAME
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            OD LIMIT
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            INTEREST RATE
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            CONVENIENCE CHARGES
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            MIN TAT
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            MAX TAT
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            AVERAGE SETTLEMENT TAT
            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
            <br></br>
            
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            AVERAGE DISCOUNTING PERCENTAGE

            </p>
            <span contentEditable className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
              {/* @ts-ignore */}
              {/* {fetchedData && fetchedData.data
                ? fetchedData.data.Bank_percent
                : ''} */}
                harsh
            </span>
          </div>
          </div>
          <br></br>
          <br></br>
<hr></hr>
<br></br>
<br></br>
<div className='flex items-center justify-center'>
          <button
                    
                    className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-6'
                    style={{ color: 'white' }}
                    onClick={toggleConfirmModal}
                  >
                    Submit
                  </button>
                  </div>
                  <ConfirmModal
        closeModal={toggleConfirmModal}
        isOpen={openConfirmModal}
        // fetchData={fetchedData.data}
        // inputOfferAmount={inputOfferAmount}
      />
                  
      </>
  );
};

export default Discharge;