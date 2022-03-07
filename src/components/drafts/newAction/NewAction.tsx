import React from "react";
import left_arrow from "../../../assets/icon/left_arrow.svg";
import NewCaseSelect from "../../theme/select/newCaseSelect/NewCaseSelect";
import styles from "./newAction.module.css";
import Modal from "react-modal";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Unprocessed",
    value: "Unprocessed",
  },
  {
    label: "query",
    value: "query",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Reject",
    value: "Reject",
  },
  {
    label: "Enhance",
    value: "Enhance",
  },
  {
    label: "fci",
    value: "fci",
  },
  {
    label: "Discharge_Approved",
    value: "Discharge_Approved",
  },
  {
    label: "Settled",
    value: "Settled",
  },
];

type NewActionProps = {
  isOpen: boolean;
  closeModal: () => void;
  selectValue: string;
  setSelectValue: any;
  toggleSummeryModal: () => void;
  newCaseData: any;
  action: string;
};

const NewAction = ({
  closeModal,
  isOpen,
  selectValue,
  setSelectValue,
  toggleSummeryModal,
  newCaseData,
  action,
}: NewActionProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { currentBucket } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();

  const updateCase = async () => {
    dispatch(setLoading(true));

    const URLINCEMENT = `/incrementcounter?email=${user}`;
    const URLCHANGESTATUS = `/changeformstatus?email=${user}&casenumber=${newCaseData?.caseNumber}`;

    const formStatus = new FormData();
    formStatus?.append(
      "companyname",
      newCaseData?.patient_details?.Insurance_Company
    );
    formStatus?.append("lastformstatus", currentBucket);
    //@ts-ignore
    formStatus?.append("newformstatus", action);
    const formNewStatus = new FormData();
    //@ts-ignore
    formNewStatus?.append("newformstatus", action);

    try {
      await axiosConfig.post(URLINCEMENT, formStatus);
      await axiosConfig.post(URLCHANGESTATUS, formNewStatus);

      dispatch(setLoading(false));
      notification("info", `Case moved ${action} successfully`);
      closeModal();

      navigate("/");
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <div
          className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-primary-lighter opacity-95 cursor-pointer "
          onClick={() => {
            closeModal();
          }}
        >
          <img src={left_arrow} alt="icon" />
        </div>
        <div className={styles.newActionModalContainer}>
          <div className={styles.selectContainer}>
            <p className="text-lg text-fontColor-gray mb-2">New Action</p>

            <NewCaseSelect
              options={actions}
              name="actions"
              handleChange={(e) => setSelectValue(e?.target?.value)}
              defaultOption="Select Status"
              value={selectValue}
            />
          </div>
          {selectValue === "Unprocessed" || selectValue === "Settled" ? (
            <div className="flex justify-center mt-8">
              <PlanSelectButton
                text="Submit"
                style={{ width: "180px" }}
                handleClick={updateCase}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default NewAction;
