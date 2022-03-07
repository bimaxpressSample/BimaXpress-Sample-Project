import React, { useState } from "react";
import InputRadio from "../../theme/inputRadio/InputRadio";
import styles from "./EnhanceAndFic.module.css";
import Modal from "react-modal";
import ApproveAndRejected from "./depapproveAndRejected/DepApproveAndRejected";
import { IoClose } from "react-icons/io5";

type DepEnchanceModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  action?: string;
};

const DepEnchanceModal = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  action = "",
}: DepEnchanceModalProps) => {
  const [status, setStatus] = useState("rejected");

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center ">
          <div className="mr-8">
            <InputRadio
              handleChange={(e) => setStatus(e?.target?.value)}
              name="rejected"
              value="rejected"
              radioLabel="Rejected"
              fieldName={status || ""}
            />
          </div>
          <div className="mr-8">
            <InputRadio
              handleChange={(e) => setStatus(e?.target?.value)}
              name="approved"
              value="approved"
              radioLabel="Approved"
              fieldName={status || ""}
            />
          </div>
        </div>
        <IoClose
          className=" text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        />
      </div>
        <ApproveAndRejected
          status={status}
          newCaseData={newCaseData}
          action={action}
        />
      )
    </Modal>
  );
};

export default DepEnchanceModal;
