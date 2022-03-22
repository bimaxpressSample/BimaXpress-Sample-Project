import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ProgessBar from './progessBar/ProgessBar';
import axiosConfig from '../../config/axiosConfig';
import { setNewCaseNum } from '../../redux/slices/caseSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import BuyerDetails from './Buyerdetails';
import Orderdetails from './Orderdetails';
import Destination from './Destination';
import PackageWeight from './Packageweight';

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

const AllDetails = () => {
  const [steps, setSteps] = useState(1);

  const [orderData, setorderData] = useState({
    packageWeight:'',
    email:'',
    buyerCity:'',
    aD2:'',
    aD1:'',
    buyerPincode:'',
    buyerState:'',
    buyerName:'',
    buyerAddress:'',
    buyerPhoneNo:'',
    unitPrice:'',
    quantity:'',
    skuUnits:'',
    productName:'',
    productDetails:'',
    orderType:'',
    dob:'',
    destinationPinCode:'',
    destinationState:'',
    destinationCity:'',
    destinationAddressLine:'',
  });

  const dispatch = useAppDispatch();
  const param = useParams();
  const navigate = useNavigate();
  console.log(param);

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
    switch (Number(steps)) {
      case 1:
        return (
          <BuyerDetails
            orderData={orderData}
            setorderData={setorderData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Orderdetails
            orderData={orderData}
            setorderData={setorderData}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
            <Destination
                orderData={orderData}
                setorderData={setorderData}
                nextStep={nextStep}
            />
        );
      case 4:
        return (
            <PackageWeight
            orderData={orderData}
            setorderData={setorderData}
            nextStep={nextStep}
        />
        );

      default:
        return (
          <BuyerDetails
            orderData={orderData}
            setorderData={setorderData}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <>
      <div>
        {/* <div className='p-6'>
          <ProgessBar
            steps={steps}
            prevStep={setStep}
            newCaseData={newCaseData}
          />
        </div> */}
        <div className='flex flex-col border-t border-fontColor-darkGray'>
          {renderUI()}
        </div>
    
      </div>
      
    </>
  );
};

export default AllDetails;
