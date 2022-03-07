import React from "react";
import styles from "./ViewDocuments.module.css";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

type ViewDocumentsModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  documents?: string[];
};

const ViewDocumentsModal = ({
  closeModal,
  documents,
  isOpen = false,
}: ViewDocumentsModalProps) => {
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
          className="absolute top-2 right-2 text-2xl text-fontColor-darkGray cursor-pointer"
          onClick={closeModal}
        />
        <div className="flex items-center justify-center flex-wrap">
          {documents?.length ? (
            documents?.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  alt="doucemnts"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    margin: "16px",
                  }}
                />
              );
            })
          ) : (
            <h1 className="py-8 text-xl font-semibold">No Docuemnts</h1>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewDocumentsModal;
