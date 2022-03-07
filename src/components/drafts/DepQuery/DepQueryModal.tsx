import React, { useState } from "react";
import InputRadio from "../../theme/inputRadio/InputRadio";
import styles from "./EnhanceAndFic.module.css";
import Modal from "react-modal";
import ReceivedandQueryUploadedonPortal from "./ReceivedandQueryUploadedonPortal/ReceivedandQueryUploadedonPortal";
import { IoClose } from "react-icons/io5";

type DepEnchanceModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  action?: string;
};

const DepQueryModal = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  action = "",
}: DepEnchanceModalProps) => {
  const [status, setStatus] = useState("Received");

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
              name="Received"
              value="Received"
              radioLabel="Received"
              fieldName={status || ""}
            />
          </div>
          <div className="mr-8">
            <InputRadio
              handleChange={(e) => setStatus(e?.target?.value)}
              name="Submitted"
              value="Submitted"
              radioLabel="Submitted"
              fieldName={status || ""}
            />
          </div>
        </div>
        <IoClose
          className=" text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        />
      </div>
        <ReceivedandQueryUploadedonPortal
          status={status}
          newCaseData={newCaseData}
          action={action}
        />
      )
    </Modal>
  );
};

export default DepQueryModal;
