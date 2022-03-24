/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./esOfferDetailsModal.module.css";
import { IoClose } from "react-icons/io5";
// import paperclip from './../../../assets/icon/';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useNavigate } from "react-router-dom";
import notification from "../../theme/utility/notification";
import { setCurrentPlan } from "../../../redux/slices/planSlice";
import axiosConfig from '../../../config/axiosConfig';

Modal.setAppElement("#root");

type InsufficientWalletBalanceProps = {
    isOpen?: boolean;
    closeModal?: () => void;
    ProcessingFee?: any
    ConfirmCaseNumber?: any
    // action?: string;
};

const InsufficientWalletBalance = ({
    isOpen = false,
    closeModal = () => { },
    ProcessingFee,
    ConfirmCaseNumber
    // action,
}: InsufficientWalletBalanceProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.user);
    const { customerWalletDetails } = useAppSelector((state) => state?.wallet);
    const { currentPlan } = useAppSelector((state) => state?.plan);
    const { allPlans } = useAppSelector((state) => state?.plan);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const amountTracker = async() =>{
        const amtFormData = new FormData() ;

        let today = new Date();
        const date = `${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`

        amtFormData?.append("amount", ProcessingFee);
        amtFormData?.append("date", date);
        amtFormData?.append("discount",'0');
        amtFormData?.append("plan_name","Processing Fee");

        const AmtURL = `/amounttracker?email=${user}`;
        const URL = `/Confirm_order/${ConfirmCaseNumber}?email=${user}`;
        try{
            dispatch(setLoading(true));
            await axiosConfig.post(AmtURL,amtFormData);
            await axiosConfig.post(URL);
            dispatch(setLoading(false));
            // notification("success", );
            navigate('/earlysettlementDash');
            notification('success', 'Your Order Has been Submitted');
        }
        catch(error){
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message );
        }
    }

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
                    <div>
                        <div className="w-full h-auto border-fontColor rounded-lg text-center">
                            <div className="flex justify-center mt-8 mb-16">
                                <div className="col-span-4 mt-8 ml-2">
                                    <p className="text-base text-fontColor-gray">Insufficient Wallet Balance</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mt-8">
                            <a onClick={amountTracker} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer ">Continue, Any</a>
                            <a onClick={closeModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer">Cancel</a>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default InsufficientWalletBalance;
