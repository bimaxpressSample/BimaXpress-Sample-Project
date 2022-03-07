import React, { useEffect, useState } from "react";
import styles from "./OverView.module.css";
import planBig from "../../../assets/icon/planBig.svg";
import clamsLeft from "../../../assets/icon/clamsLeft.svg";
import clamsToken from "../../../assets/icon/clamsToken.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setCurrentPlan } from "../../../redux/slices/planSlice";
import axiosConfig from "../../../config/axiosConfig";
// import { format } from "date-fns";
import rupi from "../../../assets/icon/rupi.svg";
import notification from "../../theme/utility/notification";

// type typeCurrentPlanDetails = {
//   claimsleft: null | number | undefined;
//   amount: null | number | undefined;
//   planstartdate: string | number | Date;
//   planenddate: null | string | undefined;
//   planId: null | string | undefined;
//   claimstaken: null | number | undefined;
// };

const OverView = () => {
    const [currentPlanDetails, setCurrentPlanDetails] = useState<any>({
        claimsleft: "",
        amount: "",
        planstartdate: "",
        planenddate: "",
        planId: "",
        total_claims: "",
        planName : "" ,
    });

    const[endDateOfPlan , setEndDateOfPlan] = useState("");

    const { currentPlan } = useAppSelector((state) => state?.plan);
    const { user } = useAppSelector((state) => state?.user);
    const dispatch = useAppDispatch();

    const fetchCurrentPlan = async () => {
        dispatch(setLoading(true));
        const URL = `/plandetails?email=${user}`;
        try {
            const { data } = await axiosConfig.get(URL);
            console.log("plain details ", data);

            dispatch(setLoading(false));
            dispatch(setCurrentPlan(data?.data));
        } catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    };

    console.log("currentPlanDetails ", currentPlanDetails);

    useEffect(() => {
        //@ts-ignore
        if (!currentPlan?.planId) {
            fetchCurrentPlan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlan]);

    useEffect(() => {
        //@ts-ignore
        if (currentPlan?.planId) {
            const {
                //@ts-ignore
                claimsleft,
                //@ts-ignore
                amount,
                //@ts-ignore
                planstartdate,
                //@ts-ignore
                planenddate,
                //@ts-ignore
                planId,
                //@ts-ignore
                total_claims,
                //@ts-ignore
                planName,
            } = currentPlan;
            setCurrentPlanDetails((pre: any) => ({
                ...pre,
                claimsleft,
                amount,
                planstartdate,
                planenddate,
                planId,
                total_claims,
                planName,
            }));
        }
        // @ts-ignore
            // @ts-ignore
            console.log("Start date - ",currentPlan.planstartdate);
            // @ts-ignore
            let date = new Date(currentPlan.planstartdate);
            let local = new Date(date.toLocaleDateString('en-GB'));
            let lastDayOfMonth = new Date(local.getFullYear(), local.getMonth() + 1, 0);
            let requiredLastDayOfMonth = lastDayOfMonth.toLocaleDateString('en-GB').replaceAll("/", "-")
            setEndDateOfPlan(requiredLastDayOfMonth);
            console.log("end date - ", lastDayOfMonth.toLocaleDateString('en-GB').replaceAll("/", "-"));

    }, [currentPlan]);


    return (
        <div className="w-auto">
            <div className="pb-5">
                <p className="text-base text-fontColor">Overview</p>
            </div>
            <div className={`${styles.overviewContainer}`}>
                <div className="flex items-center">
                    <img src={planBig} alt="icon" className="mr-4" />
                    <div>
                        <p className="text-lg text-fontColor font-semibold capitalize">
                            {currentPlanDetails?.planName}
                        </p>
                        <p className="text-xs text-fontColor-gray">plan</p>
                    </div>
                </div>

                <div className="flex flex-col md:grid grid-cols-12 relative">
                    {/* first-4-col */}
                    <div className="col-span-4 mt-auto ml-2">
                        <p className="text-xs text-fontColor-gray">
                            Subscription Plan Started On
                        </p>
                        <p className="text-xs md:text-sm text-fontColor font-semibold mt-1 ">
                            {currentPlanDetails?.planstartdate}
                            {/* {format(new Date(currentPlanDetails?.planstartdate), "do MMMM Y")} */}
                        </p>

                        <div
                            className="mt-4 border border-fontColor rounded w-full h-auto min-h-10 flex items-center justify-center"
                            style={{ maxWidth: "200px" }}
                        >
                            <div className="flex items-center">
                                <img src={clamsLeft} alt="icon" className="mr-2" />
                                <div className="flex items-center">
                                    <span className="mr-2 text-base text-fontColor ">
                                        Claims left :
                                    </span>
                                    <span className="mr-1 text-base text-fontColor font-semibold">
                                        {currentPlanDetails?.claimsleft || '00'}
                                    </span>
                                    <span className="text-xs pt-1 text-fontColor">No's</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* second-4-col */}

                    <div className="col-span-4 mt-8 ml-2">
                        <p className="text-xs text-fontColor-gray">Subscription Plan Ends On </p>
                        <p className="text-sm text-fontColor font-semibold mt-1">
                            {currentPlanDetails?.planenddate || endDateOfPlan || 'N/A'}
                            {/* {format(new Date(currentPlanDetails?.planenddate), "do MMMM Y")} */}
                        </p>

                        <div
                            className="mt-4 border border-fontColor rounded w-full h-auto min-h-10 flex items-center justify-center"
                            style={{ maxWidth: "200px" }}
                        >
                            <div className="flex items-center">
                                <img src={clamsToken} alt="icon" className="mr-2" />
                                <div className="flex items-center">
                                    <span className="mr-2 text-base text-fontColor ">
                                        Total Claims :
                                    </span>
                                    <span className="mr-1 text-base text-fontColor font-semibold">
                                        {currentPlanDetails?.total_claims || '00'}
                                    </span>
                                    <span className="text-xs pt-1 text-fontColor">No's</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* third-4-col */}
                    <div className="col-span-4 hidden sm:flex items-center -mt-12 absolute right-4 top-4 sm:right-52 sm:top-32  md:right-20 md:top-20">
                        <img src={rupi} alt="rupi icon" className="w-12" />
                        {/* <p className="text-8xl text-fontColor-gray -mt-20">₹</p> */}
                        <span className="text-5xl text-fontColor-gray font-thin">
                            {" "}
                            {currentPlanDetails?.amount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverView;
