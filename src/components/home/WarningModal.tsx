/* eslint-disable @typescript-eslint/no-use-before-define */
import Modal from "react-modal";
import styles from "./WarningModal.module.css";
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

type WarningModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  planDetails?: any
  // action?: string;
};

const WarningModal = ({
  isOpen = false,
  closeModal = () => {},
  planDetails,
  // action,
}: WarningModalProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userPlanData } = useAppSelector((state) => state?.user);
  const { currentBucket } = useAppSelector((state) => state?.home);

  console.log(planDetails)

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
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
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
              {/* @ts-ignore */}
              YOU HAVE ONLY {userPlanData.claimsleft} CLAIMS LEFT</p>
          </div>
        </div>
        
        <div className="flex justify-around mt-8">
          <button onClick={ () => navigate('/plan')} className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Buy Add On</button>
          <button onClick={closeModal} className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Ok</button>
          {/* <PlanSelectButton
            text="Ok"
            style={{ maxWidth: "180px" }}
            handleClick={closeModal}     
          /> */}
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
