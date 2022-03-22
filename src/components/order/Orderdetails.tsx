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
import ConfirmModal from '../UnderWriter/ConfirmModal';
import { margin } from '@mui/system';
import DatePicker from 'react-date-picker';
import styles from './Order/Optionsdrop.module.css';
import InputDate from '../theme/inputDate/InputDate';
import Input from '../theme/input/Input';
import Select from '../theme/select/Select';



const ordertype = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  }
]

type OrderdetailsProps = {
  orderData: any;
  setorderData: any;
  nextStep: () => void;
};

const Orderdetails = ({
  orderData,
  setorderData,
  nextStep,
}: OrderdetailsProps) => {

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
      let tempList: any = []
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
    dispatch(setUndSelectedHospital({ name: value }));
    setselectedOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // debugger;
    console.log("under select", UndSelectedHospital);
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
  console.log('selected', selectedOptions)

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
    setorderData((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // fetchSelectedTPA();
  };


  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toggleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };

  let navigates = useNavigate();

  const routeChange = () => {
    let path = `newPath`;
    navigates('/Destination');
  }
  const handleDate = (e: any) => {
    const { name, value } = e.target;
    // setNewCaseData((pre: any) => ({
    // 	...pre,
    // 	patientDetails: { ...pre?.patientDetails, [name]: value },
    // }));

    //console.log(patientDetails?.DOB);

    var mdate = value; //patientDetails?.DOB;
    var yearThen = parseInt(mdate.substring(0, 4), 10);
    var monthThen = parseInt(mdate.substring(5, 7), 10);
    var dayThen = parseInt(mdate.substring(8, 10), 10);

    var today = new Date();
    var birthday = new Date(yearThen, monthThen - 1, dayThen);

    var differenceInMilisecond = today.valueOf() - birthday.valueOf();

    var year_age = Math.floor(differenceInMilisecond / 31536000000);
    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

    if (
      today.getMonth() == birthday.getMonth() &&
      today.getDate() == birthday.getDate()
    ) {
      alert("Happy B'day!!!");
    }

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    console.log('Year :- ' + year_age + ' Month:- ' + month_age);
    // setNewCaseData({
    //   ...newCaseData,
    //   patientDetails: {
    //     ...patientDetails,
    //     AgeYear: year_age,
    //     AgeMonth: month_age,
    //     DOB: value,
    //   },
    // });
  };


  const [value, onChange] = useState(new Date());
  return (

    <>

      <div className="grid grid-cols-6 gap-4 p-10">
        <div className="col-start-1 col-end-3 ..."></div>
        <div className="col-end-7 col-span-2 ..."></div>


        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Order ID
          </p>
          <span className='border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light '>
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
            Order Date
          </p>
          <InputDate
            handleChange={handleChange}
            name='dob'
            value={orderData?.dob || ''}
            // label='Date of birth *'
            style={{ maxWidth: '220px' }}
          />
        </div>

        <br></br>

        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Order Type
          </p>
          <NewCaseSelect
            options={ordertype}
            name='orderType'
            handleChange={handleChange}
            defaultOption='Select Order Type'
            value={orderData?.orderType || ''}
          />
        </div>

        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Product Details
          </p>
          <Input
            handleChange={handleChange}
            name='productDetails'
            value={orderData?.productDetails || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Product Name
          </p>
          <Input
            handleChange={handleChange}
            name='productName'
            value={orderData?.productName || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            SKU (Units)
          </p>
          <Input
            handleChange={handleChange}
            name='skuUnits'
            value={orderData?.skuUnits || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Quantity
          </p>
          <Input
            handleChange={handleChange}
            name='quantity'
            value={orderData?.quantity || ''}
            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>

        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            Unit Price

          </p>
          <Input
            handleChange={handleChange}
            name='unitPrice'
            value={orderData?.unitPrice || ''}
            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
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
          onClick={nextStep}
        >
          Next
        </button>
      </div>
      {/* <ConfirmModal
        closeModal={toggleConfirmModal}
        // isOpen={openConfirmModal}
        // fetchData={fetchedData.data}
        // inputOfferAmount={inputOfferAmount}
      /> */}

    </>
  );
};

export default Orderdetails;