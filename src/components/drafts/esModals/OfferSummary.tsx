import Modal from 'react-modal';
import {useState} from 'react';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import PlanSelectButton from '../../theme/button/PlanSelectButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import InsufficientWalletBalance from './InsufficientWalletBalance';
Modal.setAppElement('#root');

type ApproveModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  offerSummaryData?: any;
};

const OfferSummary = ({
  isOpen = false,
  closeModal = () => {},
  offerSummaryData,
}: ApproveModalProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { customerWalletDetails } = useAppSelector((state) => state?.wallet);

  const deductAmountFromWallet = async(amount : any) =>{

      const orderformData = new FormData();
      orderformData?.append("amount", `${Number(amount) * 100}` );
      orderformData?.append("currency","INR");

      const transferData = new FormData();
      transferData.append("method",'wallet');
      transferData.append("wallet",'openwallet');
      //@ts-ignore
      transferData.append("customer_id",customerWalletDetails?.walletdetails);
      // transferData.append("order_id",'');
      transferData.append("amount",`${Number(amount) * 100}`);
      transferData.append("currency",'INR');
      //@ts-ignore
      transferData.append("contact",customerWalletDetails?.contact);
      transferData.append("email",user);
      transferData.append("description",`Processing Fee`);

      const createOrder = await axiosConfig.post('/createOrder',orderformData);
      const orderId = createOrder.data.data.id ;

      transferData.append("order_id",orderId);
        
      const response = await axiosConfig.post('/createPaymentCapture',transferData);

  }

  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
      setOpenModal((pre) => !pre);
  };

  const confirmOrderAPI = async () => {
    console.log("offer detail",offerSummaryData[0]?.Selected_processing_fees);
    
    dispatch(setLoading(true));
    const URL = `/Confirm_order/${offerSummaryData[1].caseNumber}?email=${user}`;
    try {
      
      //@ts-ignore
      const wallet_balance = await axiosConfig.get(`/walletBalance?customerId=${customerWalletDetails?.walletdetails}`);
      let currentBalance = wallet_balance.data.data.balance / 100 ;
      console.log(currentBalance);
      if(currentBalance < Number(offerSummaryData[0]?.Selected_processing_fees)){
        // notification('error',"Insufficient Wallet Balance");
        dispatch(setLoading(false));
        setOpenModal(true);
      }
      else{
        await axiosConfig.post(URL);
        
        // Function To Deduct Processing Fee From Wallet 
        deductAmountFromWallet(offerSummaryData[0]?.Selected_processing_fees);
        navigate('/earlysettlementDash');
        notification('success', 'Your Order Has been Submitted');
        dispatch(setLoading(false));
      }
      

    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Modal
        isOpen={isOpen}
        className={styles.approveModalContainer}
        overlayClassName={styles.overlayContainer}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
      >
        <div className='px-10 py-8 relative'>
          <IoClose
            className='absolute top-2 right-2 text-2xl text-fontColor cursor-pointer'
            onClick={closeModal}
          />
          <div className='flex justify-center'>
            <h1
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '22px',
                marginBottom: '15px',
              }}
            >
              OFFER SUMMARY
            </h1>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Patient Name</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.name}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Claim Number</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.claimno}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Discharge Approved Amount</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.discharge_approved_amount}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Offer Type</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.Offer_Type}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Offer Amount</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.Selected_offer_Amount}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Processing Fee</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.Selected_processing_fees}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>OD Limit</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.od_limit}
            </div>
          </div>

          {/* <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Limit Utilised</span>
            </div>
            <div className={styles.inputMainDiv}>
              {offerSummaryData[0]?.Limit_Utilization}
            </div>
          </div> */}

          <div
            className='flex mt-8 justify-center'
            // style={{ position: 'relative', left: '60%' }}
          >
            <PlanSelectButton
              text='Confirm'
              style={{ maxWidth: '180px' }}
              handleClick={() => {
                confirmOrderAPI();
              }}
            />
          </div>
        </div>
      </Modal>
      {
        openModal &&
        <InsufficientWalletBalance
        closeModal={() => setOpenModal((pre) => !pre)}
        isOpen={openModal}
        ProcessingFee={offerSummaryData[0]?.Selected_processing_fees}
        ConfirmCaseNumber={offerSummaryData[1]?.caseNumber}
      />}
    </>
  );
};

export default OfferSummary;
