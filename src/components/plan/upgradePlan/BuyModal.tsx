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
import { setCurrentPlan } from "../../../redux/slices/planSlice";
import NachWarning from "./NachWarning";
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
    const { customerWalletDetails } = useAppSelector((state) => state?.wallet);

    console.log("curent plan in buy modal", currentPlan);
    console.log("all plan in buy modal", allPlans);

    const [NachPlanData, setNachPlanData] = useState({
        planName:'',
        planId:'',
        planAmount:'',
        totalClaims:'',
        startDate: '',
        endDate: '',
    });

    const [currentTime, setCurrentTime] = useState("");

    const [openPreAuthModal, setOpenPreAuthModal] = useState<boolean>(false);

    const toggleNachModal = (planName: any, planId: any, planAmount: any, totalClaims: any , startDate: any , endDate:any) => {
        setNachPlanData({
            planName:planName,
            planId:planId,
            planAmount:planAmount,
            totalClaims:totalClaims,
            startDate: startDate,
            endDate: endDate,
        });
        setOpenPreAuthModal((pre) => !pre);
    };

    const buyPlan = async (planName: any, planId: any, planAmount: any, totalClaims: any) => {

        // @ts-ignore
        const currentPlanPrice = allPlans.filter((plan) => {
            //@ts-ignore
            return plan?.planId === currentPlan?.planId;
        })[0]?.price;
        console.log("current price", currentPlanPrice);
        let today = new Date();
        let futureDate = new Date();
        console.log("date ", today);
        futureDate.setDate(futureDate.getDate() + buyModalDetails?.duration);
        const startDate = `${today.getDate()}-${(today.getMonth() + 1)}-${today.getFullYear()}` ;
        const endDate = `${futureDate.getDate()}-${(futureDate.getMonth() + 1)}-${futureDate.getFullYear()}` ;
        console.log("startdate" , startDate);
        console.log("enddate" , endDate);
        // @ts-ignore
        const subscriptionId = `${today.getDate()}${(today.getMonth() + 1)}${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`
        // const subscriptionId = `${today.toLocaleDateString({timeZone: 'UTC' }).replaceAll("/","").replaceAll(",","").replaceAll(":","").replaceAll(" ","")}`;

        console.log(subscriptionId);
        // dispatch(setLoading(true));
        console.log("plan amount", planAmount);
        console.log("plan amount * 12", currentPlanPrice * 12);

        const PlanDetailURL = `/plandetails?email=${user}`;

        //  if( planAmount > currentPlanPrice * 12){

        const wallet_balance = await axiosConfig.get(`/walletBalance?customerId=cust_J5HP8WMDYXO6D9`);
        let currentBalance = wallet_balance?.data?.data?.balance / 100;

        if (currentBalance >= planAmount) {

            // notification('error', "Insufficient Wallet Balance");
            // dispatch(setLoading(false));
            // return;
            const URL = `/updateplandetails?email=${user}`;

            const MAILURL = `/sendmail`;
            const mailForm = new FormData();
            mailForm.append("receiver_email", user);
            // @ts-ignore
            mailForm.append("gotmessage", `Dear ${currentPlan?.customerName} ,
            As per your request, Your plan has been changed to ${planName}. It will be valid from ${startDate} to ${endDate}.\n
            Regards,
            Team BimaXpress`);
            // @ts-ignore

            const updatePlan = new FormData();

            // @ts-ignore
            updatePlan.append("customerName", customerWalletDetails?.hospital_name);
            updatePlan.append("customerEmail", user);
            //@ts-ignore
            updatePlan.append("customerPhone", customerWalletDetails?.contact);
            updatePlan.append("planId", planId);
            updatePlan.append("planName", planName);
            updatePlan.append("total_claims", totalClaims);
            updatePlan.append("addonClaims", '0');
            updatePlan.append("planStartDate", startDate);
            updatePlan.append("planEndDate",endDate);
            updatePlan.append("claimsleft", totalClaims);
            updatePlan.append("subReferenceId",'');

            const orderformData = new FormData();
            orderformData?.append("amount", `${Number(planAmount) * 100}`);
            orderformData?.append("currency", "INR");

            const transferData = new FormData();
            transferData.append("method", 'wallet');
            transferData.append("wallet", 'openwallet');
            transferData.append("customer_id", 'cust_J5HP8WMDYXO6D9');
            // transferData.append("order_id",'');
            transferData.append("amount", `${Number(planAmount) * 100}`);
            transferData.append("currency", 'INR');
            transferData.append("contact", '9198765432');
            transferData.append("email", user);
            transferData.append("description", `New Plan(${planName})`);

            dispatch(setLoading(true));
            // console.log(typeof totalClaims);
            try {
                const createOrder = await axiosConfig.post('/createOrder', orderformData);
                const orderId = createOrder?.data?.data?.id;

                transferData.append("order_id", orderId);

                const response = await axiosConfig.post('/createPaymentCapture', transferData);


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
        else{
            toggleNachModal(planName, planId, planAmount, totalClaims,startDate,endDate);
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
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails?.planType}</p>
                                {/* <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails.planId}</p> */}
                            </div>
                            <div className="col-span-4 mt-8 ml-2">
                                <p className="text-sm text-fontColor-gray">Plan Amount</p>
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails?.planAmount}</p>
                            </div>
                            <div className="col-span-4 mt-8 ml-2">
                                <p className="text-sm text-fontColor-gray">Total Claims Number</p>
                                <p className="text-base text-fontColor font-semibold mt-1">{buyModalDetails?.totalClaims}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around mt-8">
                        <PlanSelectButton
                            text="Confirm"
                            style={{ maxWidth: "180px" }}
                            handleClick={() => buyPlan(buyModalDetails?.planType, buyModalDetails?.planId, buyModalDetails?.planAmount, buyModalDetails?.totalClaims)}
                        />
                        <PlanSelectButton
                            text="Cancel"
                            style={{ maxWidth: "180px" }}
                            handleClick={closeModal}
                        />
                    </div>
                </div>
            </Modal>
            <NachWarning
                closeModal={() => setOpenPreAuthModal((pre) => !pre)}
                isOpen={openPreAuthModal}
                ModalDetails={NachPlanData}
            />
        </>
    );
};

export default BuyModal;
