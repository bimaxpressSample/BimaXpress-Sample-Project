import Modal from 'react-modal';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import PlanSelectButton from '../../theme/button/PlanSelectButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
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
  const confirmOrderAPI = async () => {
    dispatch(setLoading(true));
    const URL = `/Confirm_order/${offerSummaryData[1].caseNumber}?email=${user}`;
    notification('success', 'Your Order Has been Submitted');
    try {
      await axiosConfig.post(URL);
      dispatch(setLoading(false));
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
              <span>Claim Number</span>
            </div>
            <div
              style={{
                width: '60%',
                backgroundColor: 'rgba(245, 255, 255, 0.1)',
                height: '28px',
                display: 'inline-block',
                border: '1px solid white',
                borderRadius: '5px',
                //   position: 'relative',
                //   top: '6px',
                paddingLeft: '10px',
                whiteSpace: 'pre',
              }}
            >
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
              <span>Patient Name</span>
            </div>
            <div
              style={{
                width: '60%',
                backgroundColor: 'rgba(245, 255, 255, 0.1)',
                height: '28px',
                display: 'inline-block',
                border: '1px solid white',
                borderRadius: '5px',
                //   position: 'relative',
                //   top: '6px',
                paddingLeft: '10px',
                whiteSpace: 'pre',
              }}
            >
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
              <span>Offer Amount</span>
            </div>
            <div
              style={{
                width: '60%',
                backgroundColor: 'rgba(245, 255, 255, 0.1)',
                height: '28px',
                display: 'inline-block',
                border: '1px solid white',
                borderRadius: '5px',
                //   position: 'relative',
                //   top: '6px',
                paddingLeft: '10px',
                whiteSpace: 'pre',
              }}
            >
              {offerSummaryData[0]?.offer_Amount}
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
            <div
              style={{
                width: '60%',
                backgroundColor: 'rgba(245, 255, 255, 0.1)',
                height: '28px',
                display: 'inline-block',
                border: '1px solid white',
                borderRadius: '5px',
                //   position: 'relative',
                //   top: '6px',
                paddingLeft: '10px',
                whiteSpace: 'pre',
              }}
            >
              {offerSummaryData[0]?.od_limit}
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
            <div
              style={{
                width: '60%',
                backgroundColor: 'rgba(245, 255, 255, 0.1)',
                height: '28px',
                display: 'inline-block',
                border: '1px solid white',
                borderRadius: '5px',
                //   position: 'relative',
                //   top: '6px',
                paddingLeft: '10px',
                whiteSpace: 'pre',
              }}
            >
              {offerSummaryData[0]?.processing_fee}
            </div>
          </div>

          <div
            className='flex mt-8 justify-center'
            // style={{ position: 'relative', left: '60%' }}
          >
            <PlanSelectButton
              text='Confirm Order'
              style={{ maxWidth: '180px' }}
              handleClick={() => {
                navigate('/earlysettlementDash');
                confirmOrderAPI();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OfferSummary;
