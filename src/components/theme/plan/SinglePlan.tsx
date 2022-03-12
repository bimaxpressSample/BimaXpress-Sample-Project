import React, { useEffect } from "react";
import planSmall from "../../../assets/icon/planSmall.svg";
import PlanSelectButton from "../button/PlanSelectButton";
import rupi from "../../../assets/icon/rupi.svg";
import Modal from "react-modal";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./Modal.module.css" ;
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setCurrentPlan } from "../../../redux/slices/planSlice";

const SinglePlan = ({Claims , price, name , discount }: any) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user , userPlanData } = useAppSelector((state) => state?.user);

  // const planDetails = userPlanData ;
  // const [planDetails , setplanDetails ] = useState({});
  
  // useEffect(() => {
  //   setplanDetails(userPlanData);
  // },[]);
  
  const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);
  const toggleBuyModal = () => {
      setOpenBuyModal((pre) => !pre);
  };

  const buyAddOn = async(name:any , price : any , claims : any) =>{
    const AmtURL = `/amounttracker?email=${user}`;
    const UpdateTodbURL = `/updateaddontodb?email=${user}`;

    const PlanDetailURL = `/plandetails?email=${user}`;

    const MAILURL = `/sendmail`;
    const mailForm = new FormData();
    mailForm.append("receiver_email",user);
    // @ts-ignore
    mailForm.append("gotmessage", `Dear ${user},\n
            As per your request, We have activated the ${name} plan to your current pack. You will be charged as per the plan rate.\n
            Regards,
            Team Bimaxpress`);

    const amtFormData = new FormData() ;
    const updateTodbFormData = new FormData() ;

    amtFormData?.append("amount", price);
    updateTodbFormData?.append("addonn", name);

    const orderformData = new FormData();
    orderformData?.append("amount",`${Number(price) * 100}`);
    orderformData?.append("currency","INR");

    const transferData = new FormData();
    transferData.append("method",'wallet');
    transferData.append("wallet",'openwallet');
    transferData.append("customer_id",'cust_J5HP8WMDYXO6D9');
    // transferData.append("order_id",'');
    transferData.append("amount",`${Number(price) * 100}`);
    transferData.append("currency",'INR');
    transferData.append("contact",'9198765432');
    transferData.append("email",user);
    transferData.append("description",`Add On(${name})`);

    dispatch(setLoading(true));
    try{

        const wallet_balance = await axiosConfig.get(`/walletBalance?customerId=cust_J5HP8WMDYXO6D9`);
        let currentBalance = wallet_balance.data.data.balance / 100 ;
        console.log(currentBalance);
        if(currentBalance < price){
          notification('error',"Insufficient Wallet Balance");
          dispatch(setLoading(false));
          return ;
        }

        await axiosConfig.post(AmtURL,amtFormData);
        const { data } = await axiosConfig.get(PlanDetailURL);
        dispatch(setCurrentPlan(data?.data));
        
        // console.log(" post Amount tracker ",Amtdata);                                   //---------------------------------------------------
        
        // console.log(" post Amount tracker ",data);                                   //---------------------------------------------------
        

        const createOrder = await axiosConfig.post('/createOrder',orderformData);
        const orderId = createOrder.data.data.id ;

        transferData.append("order_id",orderId);
        
        const response = await axiosConfig.post('/createPaymentCapture',transferData);
        
        await axiosConfig.post(UpdateTodbURL,updateTodbFormData);

        const planDetails = await axiosConfig.get(`/plandetails?email=${user}`);
      
        dispatch(setCurrentPlan(planDetails?.data.data));

        dispatch(setLoading(false));
        notification("info", `${claims} Claims Has Been Added To Your Plan`);
        toggleBuyModal();
        navigate("/plan");
        await axiosConfig.post(MAILURL, mailForm);
    }catch (error) {
        dispatch(setLoading(false));
        //@ts-ignore
        notification("error", error?.message);
    }

  }

  return (
    <div className="h-60 w-72 border border-fontColor rounded-xl p-4 flex flex-col">
      <span className="mb-2 bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
        <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
        {discount} Discount
      </span>
      <div>

        <div className="flex items-center">
          <img src={planSmall} alt="icon" className="mr-2" />
          <p className="text-lg text-fontColor capitalize">{name.replaceAll("_"," ")}</p>
        </div>
        <div className="mt-4 flex items-start">
          <img src={rupi} alt="rupi icon" className="w-5" />

          <span className="text-2xl text-fontColor-gray font-semibold ml-2 -mt-2">
            {price}
          </span>
          
        </div>
        <p className="mt-4  text-fontColor text-sm">Claims : {Claims}</p>
        {/* <p className="mt-2 text-sm text-fontColor">Ends on : {endDate}</p> */}

        <div className="mt-6">
          <PlanSelectButton text="Select" handleClick={toggleBuyModal} />
        </div>
      </div>
      <Modal
      isOpen={openBuyModal}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={toggleBuyModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="px-10 py-8 relative">
        <IoClose
          className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
          onClick={toggleBuyModal}
        />

        <div className="w-full h-auto border-fontColor rounded-lg text-center">
          <h1 className="text-2xl text-fontColor-gray pt-4">
            Add On
          </h1>
          <div className="flex justify-around mt-8 mb-16">
            {/* <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Plan T</p>
              <p className="text-base text-fontColor font-semibold mt-1">Platimun</p>
            </div> */}
            <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Plan Amount</p>
              <p className="text-base text-fontColor font-semibold mt-1">₹ {price}</p>
            </div>
            <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Total Claims</p>
              
              <p className="text-base text-fontColor font-semibold mt-1">
                {/* @ts-ignore */}
                {Claims}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-around mt-8">
          <PlanSelectButton
            text="Confirm"
            style={{ maxWidth: "180px" }}
            handleClick={() => buyAddOn(name,price,Claims)}       
          />
          <PlanSelectButton
            text="Cancel"
            style={{ maxWidth: "180px" }}
            handleClick={toggleBuyModal}     
          />
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default SinglePlan;
