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

type NachWarningProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  PreAuthModalDetails?: any
  // action?: string;
};

const NachWarning = ({
  isOpen = false,
  closeModal = () => { },
  PreAuthModalDetails,
  // action,
}: NachWarningProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);

  const buyPlan = async (planType: any, planId: any) => {
    const maxAmount = "100000";
    const type = "ON_DEMAND";


    dispatch(setLoading(true));

    const URL = `https://api.cashfree.com/api/v2/subscription-plans`;
    const updateURL = `updateplandetails?email=${user}`;
    const headerparam = {
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": "12520459b7627265396090ee67402521",
        "X-Client-Secret": "c8de410acb59f978447de3f6706bdc35aa75c9d6",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      }
    }
    const body = {
      planId: planId,
      planName: planType,
      type: type,
      maxAmount: maxAmount
    }
    try {


      const { data } = await axiosConfig.post(
        'https://api.cashfree.com/api/v2/subscription-plans',
        {
          planId: planId,
          planName: planType,
          type: type,
          maxAmount: maxAmount
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Client-Id": "12520459b7627265396090ee67402521",
            "X-Client-Secret": "c8de410acb59f978447de3f6706bdc35aa75c9d6",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST",
          }
        }
      );

      console.log(data);
      const updatePlan = new FormData();

      updatePlan.append("planId", planId)
      // @ts-ignore
      const { respone } = await axiosConfig.post(updateURL, updatePlan);
      console.log(respone);
      dispatch(setLoading(false));

      notification("info", "New plan will be active after the expiry of the current plan")
      // console.log("all plan from api " ,data.data);
      // dispatch(setAllPlans(data?.data));
      // console.log("all [lan" ,allPlans);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }


  }

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
              <div className="flex justify-center mt-8 mb-16">
                <div className="col-span-4 mt-8 ml-2">
                  <p className="text-base text-fontColor-gray">You Have To Increase Your Nach Limit To Continue This Transaction</p>
                </div>
                {/* <div className="col-span-4 mt-8 ml-2">
                    <a href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Copy Link</a>
                  </div> */}
              </div>
            </div>
            <div className="flex justify-around mt-8">
              <a onClick={()=> setContinue(!Continue) } className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Continue</a>
              <a href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Cancel</a>
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
                    placeHolder="Email"
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

export default NachWarning;
