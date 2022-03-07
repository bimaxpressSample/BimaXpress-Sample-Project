/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./BuyModal.module.css";
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import PreAuthModal from './PreAuthModal';
import { setCurrentPlan } from "../../../redux/slices/planSlice";
Modal.setAppElement("#root");

type BuyModalProps = {
    isOpen?: boolean;
    closeModal?: () => void;
    buyModalDetails?: any
    // action?: string;
};

const BuyModal = ({
    isOpen = false,
    closeModal = () => { },
    buyModalDetails,
    // action,
}: BuyModalProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.user);
    const { currentPlan } = useAppSelector((state) => state?.plan);
    const { allPlans } = useAppSelector((state) => state?.plan);

    console.log( "curent plan in buy modal" , currentPlan);
    console.log( "all plan in buy modal" , allPlans);

    const[responseLink , setResponseLink] = useState("");

    const[currentTime , setCurrentTime] = useState("");

    const [openPreAuthModal, setOpenPreAuthModal] = useState<boolean>(false);
    const togglePreAuthModal = (data : any) => {
        setResponseLink(data);
        setOpenPreAuthModal((pre) => !pre);
    };

    const buyPlan = async (planName: any, planId: any , planAmount : any , totalClaims:any) => {
        
        // @ts-ignore
        const currentPlanPrice = allPlans.filter((plan)=>{
            //@ts-ignore
            return plan.planId === currentPlan.planId ;
        })[0].price;
        console.log("current price" ,currentPlanPrice);
        let today = new Date() ;
        console.log("date ",today);
        // @ts-ignore
        const subscriptionId = `${today.getDate()}${(today.getMonth()+1)}${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`
        // const subscriptionId = `${today.toLocaleDateString({timeZone: 'UTC' }).replaceAll("/","").replaceAll(",","").replaceAll(":","").replaceAll(" ","")}`;

        console.log(subscriptionId)
        dispatch(setLoading(true));
        console.log("plan amount" ,planAmount);
        console.log("plan amount * 12" ,currentPlanPrice * 12);

        const PlanDetailURL = `/plandetails?email=${user}`;

         if( planAmount > currentPlanPrice * 12){
            const URL = `/chargesubscription` ;
            // const URL = `/if` ;

            const subFormData = new FormData();
            // @ts-ignore
            subFormData.append("subscriptionId",subscriptionId);
            // @ts-ignore
            subFormData.append("customerEmail",currentPlan.customerEmail);
            // @ts-ignore
            subFormData.append("customerName",currentPlan.customerName);
            // @ts-ignore
            subFormData.append("customerPhone",currentPlan.customerPhone);
            // @ts-ignore
            subFormData.append("planId",planId);
            // @ts-ignore
            subFormData.append("returnUrl","www.bimaxpress.com");

            try {
                const { data } = await axiosConfig.post(URL,subFormData);
                console.log(data);
                
                //@ts-ignore
                const { plandata } = await axiosConfig.get(PlanDetailURL);
                dispatch(setCurrentPlan(plandata?.data));
                dispatch(setLoading(false));
                togglePreAuthModal(data);
                // notification("info", "New plan will be active after the expiry of the current plan")
            } catch (error) {
                dispatch(setLoading(false));
                //@ts-ignore
                notification("error", error?.message);
            }

         }
         else{
            const URL = `/updateplandetails?email=${user}`;
           
            const MAILURL = `/sendmail`;
            const mailForm = new FormData();
            mailForm.append("receiver_email",user);
            // @ts-ignore
            mailForm.append("gotmessage", `Dear ${currentPlan.customerName} ,
            As per your request, Your plan has been changed to ${planName}. It will be valid from (date) to (date).\n
            Regards,
            Team BimaXpress`);
            // @ts-ignore

            // const URL = "/else" ;
            const updatePlan = new FormData();

            updatePlan.append("planId", planId);
            updatePlan.append("planName", planName);
            updatePlan.append("total_claims", totalClaims);
            // console.log(typeof totalClaims);
            try {
                // @ts-ignore
                const { respone } = await axiosConfig.post(URL, updatePlan);
                console.log(respone);
                const { data } = await axiosConfig.get(PlanDetailURL);
                dispatch(setCurrentPlan(data?.data));
                dispatch(setLoading(false));
                closeModal();
                notification("info", "New plan will be active after the expiry of the current plan")
                await axiosConfig.post(MAILURL, mailForm);
            } catch (error) {
                dispatch(setLoading(false));
                //@ts-ignore
                notification("error", error?.message);
            }

         }

    }

    return (
        <>
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
                        <h1 className="text-2xl text-fontColor-gray pt-4">
                            Upgrade Your Plan
                        </h1>
                        <div className="flex justify-between mt-8 mb-16">
                            <div className="col-span-4 mt-8 ml-2">
                                <p className="text-sm text-fontColor-gray">Plan Type</p>
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails.planType}</p>
                                {/* <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails.planId}</p> */}
                            </div>
                            <div className="col-span-4 mt-8 ml-2">
                                <p className="text-sm text-fontColor-gray">Plan Amount</p>
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails.planAmount}</p>
                            </div>
                            <div className="col-span-4 mt-8 ml-2">
                                <p className="text-sm text-fontColor-gray">Total Claims Number</p>
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails.totalClaims}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around mt-8">
                        <PlanSelectButton
                            text="Confirm"
                            style={{ maxWidth: "180px" }}
                            handleClick={() => buyPlan(buyModalDetails.planType, buyModalDetails.planId, buyModalDetails.planAmount , buyModalDetails.totalClaims)}
                        />
                        <PlanSelectButton
                            text="Cancel"
                            style={{ maxWidth: "180px" }}
                            handleClick={closeModal}
                        />
                    </div>
                </div>
            </Modal>
            <PreAuthModal
                closeModal={() => setOpenPreAuthModal((pre) => !pre)}
                isOpen={openPreAuthModal}
                PreAuthModalDetails={responseLink}
            />
        </>
    );
};

export default BuyModal;
