/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from './ConfirmModal1.module.css';
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoading } from "../../redux/slices/utilitySlice";
import {  useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import notification from "../theme/utility/notification";



Modal.setAppElement("#root");

type ApproveModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  fetchData?: Object ,
  inputOfferAmount?: object,
};

const ConfirmModal1 = ({
  isOpen = false,
  closeModal = () => {},
  fetchData = Object ,
  inputOfferAmount,
}: ApproveModalProps) => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const Submitme = async( inputOfferAmount : any ,  fetchData:any ) =>{
    //@ts-ignore
    if(!inputOfferAmount.Amount.length){
      notification("error","Please Enter Offer Amount");
      return ;
    }
    
    dispatch(setLoading(true));
    const viewURL = `/patientApprovedDetailsCaseSummary/${param.case}?email=${param.id}` ;
  

    const formDetails = new FormData();
    //@ts-ignore
    formDetails.append("offer_Amount_IG", inputOfferAmount?.Amount);
    //@ts-ignore
    formDetails.append("claimno", fetchedData?.data1?.Claim_Number);
    //@ts-ignore
    formDetails.append("patient_name", fetchedData?.data1?.Patient_name);
    //@ts-ignore
    formDetails.append("Insurance_Company", fetchedData?.data1?.Insurance_Company);
    //@ts-ignore
    formDetails.append("discharge_approved_amount", fetchedData?.data1?.discharge_approved_amount);
    //@ts-ignore
    formDetails.append("Health_Id", fetchedData?.data1?.HealthId);
    //@ts-ignore
    formDetails.append("average_settlement_tat", fetchedData?.data2?.average_settlement_tat);
    //@ts-ignore
    formDetails.append("maxtat", fetchedData?.data2?.maxtat);
    //@ts-ignore
    formDetails.append("mintat", fetchedData?.data2?.mintat);
    //@ts-ignore
    formDetails.append("avg_discount_percent", fetchedData?.data2?.avg_discount_percent);
    //@ts-ignore
    formDetails.append("Bank_percent", fetchedData?.data2?.Bank_percent);
    //@ts-ignore
    formDetails.append("processing_fees_IG", fetchedData?.data2?.processing_fees_IG);
    //@ts-ignore
    formDetails.append("processing_fees_ING", fetchedData?.data2?.processing_fees_ING);
    //@ts-ignore
    formDetails.append("offer_Amount_ING", inputOfferAmount?.Amount1);
    formDetails.append("status", 'Rejected');


    try{
        
        const { data } = await axiosConfig.post(viewURL,formDetails);
        dispatch(setLoading(false));
        notification("info","Submitted Successfully");
        navigate(`/patientRejectCase/${param.id}`);
    }catch(error){
        dispatch(setLoading(false));
    }

  }


  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="px-10 py-8 relative">
        <IoClose
          className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
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
          <button onClick={() => Submitme(inputOfferAmount,fetchData)} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">Yes</button>
          <button onClick={closeModal} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">No</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal1;
