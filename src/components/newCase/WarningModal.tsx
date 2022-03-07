/* eslint-disable @typescript-eslint/no-use-before-define */
import Modal from "react-modal";
import styles from "./WarningModal.module.css";
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import axiosConfig from "../../config/axiosConfig";
import notification from "../theme/utility/notification";
import { setLoading } from "../../redux/slices/utilitySlice";
import { setCurrentPlan } from "../../redux/slices/planSlice";
import { setAllAddonPlans } from "../../redux/slices/planSlice";

Modal.setAppElement("#root");

type WarningModalProps = {
    isOpen?: boolean;
    closeModal?: () => void;
    planDetails?: any
    // action?: string;
};

const WarningModal = ({
    isOpen = false,
    closeModal = () => { },
    planDetails,
    // action,
}: WarningModalProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentBucket } = useAppSelector((state) => state?.home);
    const { user, userPlanData } = useAppSelector((state) => state?.user);
    const { allAddonPlans } = useAppSelector((state) => state?.plan);

    console.log(allAddonPlans);

    const FetchAddOnDetails = async() =>{
        dispatch(setLoading(true));
        const URL = `/getaddonplans?email=${user}`;
        try {
            const { data } = await axiosConfig.get(URL);
            console.log("add on plans " , data.data);
            dispatch(setLoading(false));
            dispatch(setAllAddonPlans(data?.data));
        } catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    }

    useEffect(() => {
        if(!Object.entries(allAddonPlans)?.length){
            FetchAddOnDetails();
        }
    }, [])
    
    const proceedAnyway = async () => {

        //@ts-ignore
        console.log("inside" ,allAddonPlans.Addon_6);

        const planName = "Addon_6";
        //@ts-ignore
        const Claims = allAddonPlans.Addon_6.cases;
        //@ts-ignore
        const price = allAddonPlans.Addon_6.price;

        // console.log(planName , Claims , price);

        const AmtURL = `/amounttracker?email=${user}`;
        const UpdateTodbURL = `/updateaddontodb?email=${user}`;
        const PlanDetailURL = `/plandetails?email=${user}`;


        const MAILURL = `/sendmail`;
        const mailForm = new FormData();
        mailForm.append("receiver_email",user);
        // @ts-ignore
        mailForm.append("gotmessage", 
            `Dear ${user},\n
            As per your request, We have activated the ${planName} plan to your current pack. You will be charged at a standard rate. You can also take upgraded adds-on plans as your hospital requirement.\n
            Regards,
            Team Bimaxpress
            `);
        

        // console.log(price);
        // console.log(name);

        const amtFormData = new FormData();
        const updateTodbFormData = new FormData();

        amtFormData?.append("amount", price);
        updateTodbFormData?.append("addonn", planName);

        dispatch(setLoading(true));
        try {
            await axiosConfig.post(AmtURL, amtFormData);
            const { data } = await axiosConfig.get(PlanDetailURL);
            dispatch(setCurrentPlan(data?.data));

            // console.log(" post Amount tracker ",Amtdata);                                   //---------------------------------------------------
            await axiosConfig.post(UpdateTodbURL, updateTodbFormData);
            // console.log(" post Amount tracker ",data);                                   //---------------------------------------------------
            dispatch(setLoading(false));
            notification("info", `${Claims} Claims Has Been Added To Your Plan`);
            navigate('/preauthform');
            await axiosConfig.post(MAILURL, mailForm);
        }
        catch (error) {

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
                    <h1 className="text-2xl text-fontColor-gray">
                        Warning
                    </h1>
                    <div className="flex justify-center mt-8 mb-8">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" className="bi bi-exclamation-triangle-fill text-yellow-400" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </div>
                        {/* <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Plan Type</p>
              <p className="text-base text-fontColor font-semibold mt-1">Platimun</p>
            </div>
            <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Plan Amount</p>
              <p className="text-base text-fontColor font-semibold mt-1">20,000</p>
            </div>
            <div className="col-span-4 mt-8 ml-2">
              <p className="text-sm text-fontColor-gray">Total Claims Number</p>
              <p className="text-base text-fontColor font-semibold mt-1">500</p>
            </div> */}
                    </div>
                    <div>
                        <p className="text-xl text-fontColor font-semibold mt-1">
                            YOU have 0 claim left in your current pack take add on or you will be charged at standard rate
                        </p>
                    </div>
                </div>

                <div className="flex justify-around mt-8">
                    <button onClick={() => navigate('/plan')} className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Buy Add On</button>
                    <button onClick={proceedAnyway} className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Proceed Anyway</button>
                </div>
            </div>
        </Modal>
    );
};

export default WarningModal;
