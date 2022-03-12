/* eslint-disable @typescript-eslint/no-use-before-define */
import Modal from "react-modal";
import styles from "./AddToWalletModal.module.css";
import { IoClose } from "react-icons/io5";
import PlanSelectButton from "../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

type AddToWalletModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  handleChange?: (e:any) => void ;
  addAmount?: (e:any) => void ;
  amount?: any
};

const AddToWalletModal = ({
  isOpen = false,
  closeModal = () => {},
  handleChange = () => {} ,
  addAmount = () => {} ,
  amount,
}: AddToWalletModalProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userPlanData } = useAppSelector((state) => state?.user);
  const { currentBucket } = useAppSelector((state) => state?.home);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.walletModalContainer}
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
            Add To Wallet
          </h1>
          {/* <div className="flex justify-center mt-8 mb-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" className="bi bi-exclamation-triangle-fill text-yellow-400" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
          </div> */}
          {/* <div>
            <p className="text-xl text-fontColor font-semibold mt-1">Enter The Amount</p>
          </div> */}
          <div className="flex flex-row items-center mx-10 my-16">
            <label htmlFor="price" className="block text-xl font-medium text-fontColor mx-6">Enter The Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-700 sm:text-xl"> ₹ </span>
              </div>
              <input value={amount} onChange={handleChange} type="text" name="amount" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 py-3 sm:text-base border-gray-300 rounded-md" placeholder="0.00" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-around mt-8">
          <button onClick={closeModal}  className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Cancel</button>
          <button onClick={addAmount} className="px-8 h-10 outline-none bg-fontColor text-sm text-primary-dark rounded font-bold">Add</button>
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

export default AddToWalletModal;
