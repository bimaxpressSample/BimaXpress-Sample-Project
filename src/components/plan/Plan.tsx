import React, { useState , useEffect } from "react";
import OverView from "./overView/OverView";
import ManagePlan from "./managePlan/ManagePlan";
import ExistingPlans from "./existingPlans/ExistingPlans";
import UpgradePlan from "./upgradePlan/UpgradePlan";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoading } from "../../redux/slices/utilitySlice";
import { setAllPlans } from "../../redux/slices/planSlice";
import axiosConfig from '../../config/axiosConfig';



const Plan = () => {
  const [render, setRender] = useState("");
  const [currentPlan, setCurrentPlan] = useState("standard");

  const dispatch = useAppDispatch();
  const { allPlans } = useAppSelector((state) => state?.plan);
  const { user } = useAppSelector((state) => state?.user);

  const fetchAllPlans = async() =>{
    dispatch(setLoading(true));
    const URL = `/allplansdetails`;
    try {
    const { data } = await axiosConfig.get(URL);
    dispatch(setLoading(false));
    console.log("all plan from api " ,data.data);
    dispatch(setAllPlans(data?.data));
    console.log("all [lan" ,allPlans);
    } catch (error) {
    dispatch(setLoading(false));
    //@ts-ignore
    notification("error", error?.message);
    }
   
    }


    useEffect(() => {
        fetchAllPlans();
    },[]);

  const renderUI = () => {
    switch (render) {
      case "addOn":
        return <ExistingPlans setRender={setRender} />;
      case "subscription":
        return (
          <UpgradePlan
            setCurrentPlan={setCurrentPlan}
            currentPlan={currentPlan}
          />
        );

      default:
        break;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-8 pt-5 pb-8 px-2 sm:px-8 border-b border-fontColor-darkGray">
        <div className="col-span-12 xl:col-span-9">
          <OverView />
        </div>
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <ManagePlan setRender={setRender} />
        </div>
      </div>
      <div>{renderUI()}</div>
    </div>
  );
};

export default Plan;
