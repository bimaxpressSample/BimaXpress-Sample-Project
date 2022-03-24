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
import Input from '../theme/input/Input';

type BuyerDetailsProps = {
  orderData: any;
  setorderData: any;
  nextStep: () => void;
};

const BuyerDetails = ({
  orderData,
  setorderData,
  nextStep,
}: BuyerDetailsProps) => {

  const param = useParams();
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const { UndSelectedHospital } = useAppSelector((state) => state?.user);
  const [hospitalList, sethospitalList] = useState<any>([]);


  const fetchAnalyst = async () => {
		dispatch(setLoading(true));
    try{
      const listOfHospital = await axiosConfig.get(
        `/empanelcompany?email=${user}`
      );
  
      Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
        hospitalList.push({ label: key.replaceAll("_", " "), value: key });
      });
  
      sethospitalList(hospitalList);
      dispatch(setLoading(false));
      
    }
    catch(error){
      notification("error","Something Went Wrong");
      dispatch(setLoading(false));
    }

	};

  useEffect(() => {
		fetchAnalyst();
	}, []);
  

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

  const routeChange = () =>{ 
    let path = `newPath`; 
    navigates('/Orderdetails');
  }

	const [options, setOptions] = useState({
		insuranceTPA: "",
	});


  const fetchSelectedHospital = async (selectedHospital: any) => {
		dispatch(setLoading(true));
		// const URL = `/${param?.case}`;
		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;
		let URL = `/insurancefilter?email=${user}&insurance_company=${selectedHospital}&token=${header}`;

		try {
			if (selectedHospital === "") {
				URL = `/allorders?email=${user}&token=${header}`;
			}
			const { data } = await axiosConfig.get(URL);
			console.log("After select URL - ", URL);
			console.log(data); // -------------------------------
			dispatch(setLoading(false));
			dispatch(setCaseData(data?.data));
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification("error", error?.message);
		}
	};
  

  const handleChanges = (
		e: React.ChangeEvent<
		HTMLSelectElement | HTMLDataElement | any
		>
	) => {
		const { name, value } = e.target;
		setOptions((pre: any) => ({
			...pre,
			[name]: value,
		}));
		fetchSelectedHospital(value);
		
	};
  

  return (
    
    <>
    <div className="grid grid-cols-6 gap-4 p-6">
    <div className="col-start-1 col-end-3 ..."></div>
  <div className="col-end-7 col-span-2 ..."></div>
  <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            Email
            </p>
            <Input
              handleChange={handleChange}
              name='email'
              value={orderData?.email || ''}
              // label='Email'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>

  
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            Company Name
            </p>
            <NewCaseSelect
							options={hospitalList}
							name="insuranceTPA"
							handleChange={handleChanges}
							defaultOption="Insurance TPA"
							value={options?.insuranceTPA || ""}
							style={{
								maxWidth: "170px",
								height: "30px",
								backgroundColor: "#FFFFFF17",
								padding: "0px",
								borderRadius: "3px",
								fontSize: "12px",
							}}
              />
            
          </div>
            
            <br></br>

            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            Phone No
            </p>
            <Input
              handleChange={handleChange}
              name='buyerPhoneNo'
              value={orderData?.buyerPhoneNo || ''}
              // label='Phone No'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
          
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            Buyer Address
            </p>
            <Input
              handleChange={handleChange}
              name='buyerAddress'
              value={orderData?.buyerAddress || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            Buyer Name
            </p>
            <Input
              handleChange={handleChange}
              name='buyerName'
              value={orderData?.buyerName || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            State
            </p>
            <Input
              handleChange={handleChange}
              name='buyerState'
              value={orderData?.buyerState || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
            <br></br>
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            PINCODE
            </p>
            <Input
              handleChange={handleChange}
              name='buyerPinCode'
              value={orderData?.buyerPinCode || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
            <br></br>
            
            <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            AD1

            </p>
            <Input
              handleChange={handleChange}
              name='aD1'
              value={orderData?.aD1 || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            AD2

            </p>
            <Input
              handleChange={handleChange}
              name='aD2'
              value={orderData?.aD2 || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
<br></br>

          <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
            <p className='pb-4 text-sm text-white font-semibold'>
            City

            </p>
            <Input
              handleChange={handleChange}
              name='buyerCity'
              value={orderData?.buyerCity || ''}
           
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

export default BuyerDetails;