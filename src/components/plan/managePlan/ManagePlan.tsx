import React, { Dispatch, SetStateAction } from "react";
import styles from "./ManagePlan.module.css";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
type ManagePlanProps = {
  setRender: Dispatch<SetStateAction<string>>;
};

const ManagePlan = ({ setRender }: ManagePlanProps) => {
  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="text-base text-fontColor">Manage Plans</p>
      </div>
      <div className={`${styles.managePlanContainer}`}>
        <p className="text-sm text-fontColor-gray">
          Choose to Renew your plans or upgrade to get more benefits
        </p>
        <div className="mt-4">
          <PlanSelectButton
            outlined={true}
            text="Add On"
            handleClick={() => setRender("addOn")}
          />
        </div>
        <div className="mt-4">
          <PlanSelectButton
            text="Change Subscription Plan"
            handleClick={() => setRender("subscription")}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagePlan;
