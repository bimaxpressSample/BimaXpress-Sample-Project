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
 
  const Submitme = async( fetchData : any ) =>{
    //@ts-ignore
    if(!inputOfferAmount.Amount.length){
      notification("error","Please Enter Offer Amount");
      return ;
    }
    
    dispatch(setLoading(true));
    const viewURL = `/patientApprovedDetailsCaseSummary/${param.case}?email=${param.id}` ;
    const submitForm = new FormData() ;

    submitForm.append("status",'Rejected');
    submitForm.append("claimno",fetchData.Claim_Number);
    submitForm.append("patient_name",fetchData.Patient_name);
    submitForm.append("Insurance_Company",fetchData.Insurance_Company);

    submitForm.append("Health_Id",fetchData.HealthId);
    submitForm.append("discharge_approved_amount",fetchData.discharge_approved_amount);
    submitForm.append("average_settlement_tat",fetchData.average_settlement_tat);
    submitForm.append("avg_discount_factor",fetchData.avg_discount_factor);
    submitForm.append("Bank_percent",fetchData.Bank_percent);
    submitForm.append("mintat",fetchData.mintat);
    submitForm.append("maxtat",fetchData.maxtat);
    submitForm.append("processing_fee",fetchData.processing_fee);
    //@ts-ignore
    submitForm.append("offer_Amount",inputOfferAmount.Amount);


    try{
        
        const { data } = await axiosConfig.post(viewURL,submitForm);
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
          <button onClick={() => Submitme(fetchData)} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">Yes</button>
          <button onClick={closeModal} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">No</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal1;
