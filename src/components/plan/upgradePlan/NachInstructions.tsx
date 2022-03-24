/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./preAuthModal.module.css";
import { IoClose } from "react-icons/io5";
import paperclip from "./../../../assets/icon/paperclip.svg";
// import paperclip from './../../../assets/icon/'
import Input from "../../theme/input/Input";
import InputDate from "../../theme/inputDate/InputDate";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { TYPE } from "react-toastify/dist/utils";
import axios from 'axios';
Modal.setAppElement("#root");

type NachInstructionsProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  // PreAuthModalDetails?: any
  // action?: string;
};

const NachInstructions = ({
  isOpen = false,
  closeModal = () => { },
  // PreAuthModalDetails,
  // action,
}: NachInstructionsProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);

  const [Continue, setContinue] = useState(false);

  const [emandateDetails , setemandateDetails] = useState({
    email: user ,
    phone: ''
  })

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>) => {
    const { name, value } = e?.target;
    setemandateDetails((pre: any) => ({ ...pre, [name] : value }));
  }

  console.log("E mandate",emandateDetails);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      // shouldCloseOnOverlayClick={true}
    >
      <div className="px-10 py-8 relative">
        <IoClose
          className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        />
        {
          !Continue &&
          <div>
            <div className="w-full h-auto border-fontColor rounded-lg text-center">
              {/* <h1 className="text-2xl text-fontColor-gray pt-4">
                  Click Here To Proceed Further
                </h1> */}
              <div className="flex justify-center mt-2 mb-4">
                <div className="col-span-4 mt-8 ml-2">
                  <p className="text-base text-fontColor-gray">E-Mandate Authorisation link will be sent shortly on your E-mail Id and Mobile Number</p>
                </div>
              </div>
              <div className="flex mt-8 mb-16">
                <div className="col-span-4 ml-2">
                  <p className="text-base text-fontColor-gray">Follow these steps to complete your E-Mandate :-</p>
                  <dl className="text-base text-fontColor-gray flex flex-col" style={{alignItems:"flex-start"}}>
                    <dt>1. Click on the link</dt>
                    <dt>2. Choose the Authorisation Mode :</dt>
                    <dd>&emsp;&emsp;A) Net Banking</dd>
                    <dd>&emsp;&emsp;B) Debit Card</dd>
                    <dt>3) Fill the Details : -</dt>
                    <dd>&emsp;&emsp;A) Choose Bank</dd>
                    <dd>&emsp;&emsp;B) Bank Account Number</dd>
                    <dd>&emsp;&emsp;C) Bank Holder Name</dd>
                    <dd>&emsp;&emsp;D) Agree to Term and Conditions</dd>
                    <dd>&emsp;&emsp;E) Continue</dd>
                    <dt>4) Confrm the Subscription Summary</dt>
                  </dl>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-8">
              {/* <a onClick={()=> setContinue(!Continue) } className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Continue</a> */}
              <a onClick={closeModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Close</a>
            </div>
          </div>
        }
        {/* <div className="flex justify-around mt-8">
          <PlanSelectButton
            text="Confirm"
            style={{ maxWidth: "180px" }}          
            handleClick={ () => buyPlan(buyModalDetails.planType , buyModalDetails.planId)}
          />
          <PlanSelectButton
            text="Cancel"
            style={{ maxWidth: "180px" }}
            handleClick={closeModal}     
          />
        </div> */}

        {
          Continue &&
          <div>
            <div className="w-full h-auto border-fontColor rounded-lg text-center">
              <h1 className="text-2xl text-fontColor-gray pt-4">
                Update Your E-Mandate
              </h1>
              <div className="flex flex-row justify-around mt-8 mb-16">
                <div className="col-span-4 mt-8 ml-2">
                  <Input
                    handleChange={handleChange}
                    name="email"
                    value={emandateDetails?.email || ''}
                    // label="Name"
                    placeHolder="Name"
                    isEdit={true}
                    style={{
                      width:"250px"
                    }}
                  />
                </div>
                <div className="col-span-4 mt-8 ml-2">
                  <Input
                    handleChange={handleChange}
                    name="phone"
                    value={emandateDetails?.phone || ''}
                    // label="Email"
                    placeHolder="Phone"
                    isEdit={true}
                    style={{
                      width:"250px"
                    }}
                  />
                </div>
                {/* <div className="col-span-4 mt-8 ml-2">
                  <a href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Copy Link</a>
                </div> */}
              </div>
            </div>
            <div className="flex justify-around mt-8">
              <a href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Continue</a>
              <a onClick={() => {closeModal(); setContinue(false)}} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Cancel</a>
            </div>
          </div>
        }




      </div>
    </Modal>
  );
};

export default NachInstructions ;
  ;
