/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./NameModal.module.css";
import { IoClose } from "react-icons/io5";
Modal.setAppElement("#root");

type NameModalProps = {
  isOpen?: boolean;
  closeModal?: () => any;
  Data: any;
};

const NameModal = ({
  isOpen = false,
  closeModal = () => {},
  Data,
}: NameModalProps) => {
  const [data, setData] = useState<any>({ file: []});
  // console.log(Data);

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

        <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
          <p className="text-sm text-fontColor-gray pt-4">
            {Data}
          </p>
          <div className="flex items-center justify-center mt-4">
           
          </div>
         
        </div>
      </div>
    </Modal>
  );
};

export default NameModal;
