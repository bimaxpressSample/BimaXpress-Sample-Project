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
import { setCurrentPlan } from "../../../redux/slices/planSlice";
import { TYPE } from "react-toastify/dist/utils";
import axios from 'axios';
import NachInstructions from "./NachInstructions";
Modal.setAppElement("#root");

type NachWarningProps = {
    isOpen?: boolean;
    closeModal?: () => void;
    ModalDetails?: any
    // action?: string;
};

const NachWarning = ({
    isOpen = false,
    closeModal = () => { },
    ModalDetails,
    // action,
}: NachWarningProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.user);
    const { customerWalletDetails } = useAppSelector((state) => state?.wallet);
    const { currentPlan } = useAppSelector((state) => state?.plan);
    const { allPlans } = useAppSelector((state) => state?.plan);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const toggleModal = () => {
        // setNachPlanData();
        setOpenModal((pre) => !pre);
    };

    const chargeSubscribtion = async () => {

        //@ts-ignore
        const currentPlanPrice = allPlans.filter((plan: any) => {
            //@ts-ignore
            return plan.planId === currentPlan.planId;
        })[0].price;

        let today = new Date();
        console.log("date ", today);
        // @ts-ignore
        const subscriptionId = `${today.getDate()}${(today.getMonth() + 1)}${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`

        if (ModalDetails?.planAmount > currentPlanPrice * 3) {

            const SubscriptionURL = `/subscription`;
            // const URL = `/if` ;
            const subFormData = new FormData();
            // @ts-ignore
            subFormData.append("subscriptionId", `Sub${subscriptionId}`);
            // @ts-ignore
            subFormData.append("customerEmail", user);
            // @ts-ignore
            subFormData.append("customerName", customerWalletDetails?.hospital_name);
            // @ts-ignore
            subFormData.append("customerPhone", customerWalletDetails?.contact);
            // @ts-ignore
            subFormData.append("planId",ModalDetails?.planId);
            // @ts-ignore
            // subFormData.append("planId", "premiumyearly1");
            // @ts-ignore
            subFormData.append("returnUrl", "www.bimaxpress.com");

            const UPDATEURL = `/updateplandetails?email=${user}`;
            const PlanDetailURL = `/plandetails?email=${user}`;

            const MAILURL = `/sendmail`;
            const mailForm = new FormData();
            mailForm.append("receiver_email", user);
            // @ts-ignore
            mailForm.append("gotmessage", `Dear ${currentPlan.customerName} ,
            As per your request, Your plan has been changed to ${ModalDetails?.planName}. It will be valid from ${ModalDetails?.startDate} to ${ModalDetails?.endDate}.\n
            Regards,
            Team BimaXpress`);
            // @ts-ignore

            // const URL = "/else" ;
            const updatePlan = new FormData();

            // @ts-ignore
            updatePlan.append("customerName", customerWalletDetails?.hospital_name);
            updatePlan.append("customerEmail", user);
            //@ts-ignore
            updatePlan.append("customerPhone", customerWalletDetails?.contact);
            updatePlan.append("planId", ModalDetails?.planId);
            updatePlan.append("planName", ModalDetails?.planName);
            updatePlan.append("total_claims", ModalDetails?.totalClaims);
            updatePlan.append("addonClaims", '0');
            
            updatePlan.append("planStartDate", ModalDetails?.startDate);
            updatePlan.append("planEndDate", ModalDetails?.endDate);
            updatePlan.append("claimsleft", ModalDetails?.totalClaims);


            const AmtURL = `/amounttracker?email=${user}`;
            const amtFormData = new FormData() ;

            let today = new Date();
            const date = `${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`

            amtFormData?.append("amount", ModalDetails?.planAmount);
            amtFormData?.append("date", date);
            amtFormData?.append("discount",'0');
            amtFormData?.append("plan_name",ModalDetails?.planName);

            try {
                const { data } = await axiosConfig.post(SubscriptionURL, subFormData);
                console.log("cashfree", data);

                updatePlan.append("subReferenceId", data?.data?.subReferenceId);
                //@ts-ignore
                const { respone } = await axiosConfig.post(UPDATEURL, updatePlan);
                console.log(respone);

                await axiosConfig.post(AmtURL,amtFormData);

                //@ts-ignore
                const { plandata } = await axiosConfig.get(PlanDetailURL);
                dispatch(setCurrentPlan(plandata?.data?.data[0]));
                dispatch(setLoading(false));

                closeModal();
                toggleModal();

                await axiosConfig.post(MAILURL, mailForm);
                // notification("info", "New plan will be active after the expiry of the current plan")
            } catch (error) {
                dispatch(setLoading(false));
                //@ts-ignore
                notification("error", error?.message);
            }
        }
    }

    const [Continue, setContinue] = useState(false);

    const [emandateDetails, setemandateDetails] = useState({
        email: user,
        phone: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>) => {
        const { name, value } = e?.target;
        setemandateDetails((pre: any) => ({ ...pre, [name]: value }));
    }

    console.log("E mandate", emandateDetails);

    return (
        <>
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
                                <div className="flex justify-center mt-8 mb-16">
                                    <div className="col-span-4 mt-8 ml-2">
                                        <p className="text-base text-fontColor-gray">You Have To Increase Your Nach Limit To Continue This Transaction</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around mt-8">
                                <a onClick={() => setContinue(!Continue)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Continue</a>
                                <a onClick={closeModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Cancel</a>
                            </div>
                        </div>
                    }
                    

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
                                                width: "250px"
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
                                                width: "250px"
                                            }}
                                        />
                                    </div>
                                    {/* <div className="col-span-4 mt-8 ml-2">
                  <a href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Copy Link</a>
                </div> */}
                                </div>
                            </div>
                            <div className="flex justify-around mt-8">
                                <a onClick={chargeSubscribtion} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Continue</a>
                                <a onClick={() => { closeModal(); setContinue(false) }} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Cancel</a>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
            <NachInstructions
                isOpen={openModal}
                closeModal={toggleModal}
            // ModalDetails={NachPlanData}
            />
        </>
    );
};

export default NachWarning;
