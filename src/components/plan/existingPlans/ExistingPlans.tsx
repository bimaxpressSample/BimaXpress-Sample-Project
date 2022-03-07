import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import SinglePlan from "../../theme/plan/SinglePlan";
import styles from "./ExistingPlan.module.css";
import axiosConfig from "../../../config/axiosConfig";
import { setAllAddonPlans } from "../../../redux/slices/planSlice";
import scrollbar from '../../../scrollbar.module.css';
import notification from "../../theme/utility/notification";

type ExistingPlansProps = {
  setRender: Dispatch<SetStateAction<string>>;
};

const ExistingPlans = ({ setRender }: ExistingPlansProps) => {
  const [planDetails, setPlanDetails] = useState<{}[]>([]);
  const dispatch = useAppDispatch();
  const { allAddonPlans, currentPlan } = useAppSelector((state) => state?.plan);
  const { user } = useAppSelector((state) => state?.user);



  const fetchAnalyst = async () => {
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
  };
  console.log("all add on",allAddonPlans)
  useEffect(() => {
    if (!Object.entries(allAddonPlans)?.length) {
    }
    fetchAnalyst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Object.entries(allAddonPlans)?.length) {
      const res = Object.entries(allAddonPlans)?.map(
        (
          //@ts-ignore
          [key, { cases, price , discount }]
        ) => ({
          cases,
          price,
          name: key,
          discount: discount,
        })
      );
      setPlanDetails(res);
    }
  }, [allAddonPlans]);
  console.log("plan de",planDetails);
  return (
    <div className="flex flex-col py-5 px-8">
      <h2 className="text-3xl font-semibold  text-fontColor">
        Renew or Add up to Existing plans
      </h2>
      <div className="mt-2">
        <h4 className="text-xl font-semibold text-fontColor">
          Current plan : {/* @ts-ignore */}
          <span className="text-lg font-normal  text-fontColor capitalize">
            {/* @ts-ignore */}
            {currentPlan?.planName}
          </span>
        </h4>
      </div>

      <div
        className={`py-8 mb-12 flex items-center overflow-x-scroll ${scrollbar.scrollBarDesign} overflow-y-hidden ${styles.plansContainer}`}
      >
        {planDetails?.map((plan, index) => {
          //@ts-ignore
          if(plan.name === 'Addon_6' ){
            return ;
          }
          //@ts-ignore
          const { cases, price, name , discount} = plan;
          return (
            <div key={index} className="mr-6">
              <SinglePlan
                // endDate={endDate}
                // duration={duration}
                price={price}
                name={name}
                Claims={cases}
                discount={discount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExistingPlans;
