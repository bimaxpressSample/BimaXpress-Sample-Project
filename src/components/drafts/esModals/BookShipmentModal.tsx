import Modal from 'react-modal';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import PlanSelectButton from '../../theme/button/PlanSelectButton';

import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

type ApproveModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  BookShipmentCaseData?: any;
  skipItforlater?: any;
};

const BookShipmentModal = ({
  isOpen = false,
  closeModal = () => {},
  BookShipmentCaseData,
  skipItforlater,
}: ApproveModalProps) => {
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
              BOOK YOUR SHIPMENT
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
              {BookShipmentCaseData[0]?.claimno}
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
              {BookShipmentCaseData[0]?.Name}
            </div>
          </div>
          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Insurance Company/TPA</span>
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
              {BookShipmentCaseData[0]?.insurance_company}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Discharge Approve Amount</span>
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
              {BookShipmentCaseData[0]?.discharge_appr}
            </div>
          </div>
          <div
            className='flex mt-8 justify-center'
            // style={{ position: 'relative', left: '60%' }}
          >
            <PlanSelectButton
              text='Book Your Slot'
              style={{ maxWidth: '180px', marginRight: '10px' }}
              handleClick={() => {
                navigate('/LogisticsBookSlot');
              }}
            />
            <PlanSelectButton
              text='Skip It For Later'
              style={{ maxWidth: '180px' }}
              handleClick={skipItforlater}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookShipmentModal;
