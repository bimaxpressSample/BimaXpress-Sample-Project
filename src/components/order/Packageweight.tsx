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


type PackageWeightProps = {
  orderData: any;
  setorderData: any;
  nextStep: () => void;
};

const PackageWeight = ({
  orderData,
  setorderData,
  nextStep,
}: PackageWeightProps) => {

  const param = useParams();
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const { UndSelectedHospital } = useAppSelector((state) => state?.user);

  const [hospitalList, sethospitalList] = useState<any>([true]);
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

  const handleChange = (e :any) => {
    const { name , value } = e.target ;
    setorderData((pre: any)=>({
      ...pre,
      [name]:value,
    }));
  }

  let navigates = useNavigate(); 
  return (
    
    <>
    <div className="grid grid-cols-6 gap-4 p-8">
    <div className="col-start-1 col-end-3 ..."></div>
  <div className="col-end-7 col-span-2 ..."></div>


  <div className='col-span-1 lg:col-span-1 pb-6 mt-8'>
  <p className='pb-4 text-sm text-white font-semibold'>
  Package Weight
            </p>
            <Input
              handleChange={handleChange}
              name='packageWeight'
              value={orderData?.packageWeight || ''}
           
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
            
          </div>
           
           
       
            
        
            
            <br></br>
        




       
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
                    // onClick={routeChange}
                  >
                    Book Order
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

export default PackageWeight;