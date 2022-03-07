import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import ActionTaken from '../actionTaken/ActionTaken';
import Details from '../Details/Details';
import styles from './SummeryModal.module.css';

type SummeryModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  summeryData: object;
  fetchData?: () => void;
  toggleNewActionModal: () => void;
  setSummeryData?: any;
};

const SummeryModal = ({
  closeModal,
  isOpen,
  summeryData,
  toggleNewActionModal,
  fetchData,
  setSummeryData,
}: SummeryModalProps) => {
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <p className='text-lg text-fontColor mb-2'>Summary</p>
      <div className={`${styles.summerModalContainer} relative`}>
        <IoClose
          className=' absolute top-4 right-6 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
        <div className='flex items-center'>
          <p
            className={`text-lg text-fontColor-deepGray mr-3 pr-3 tracking-wide cursor-pointer ${
              activeMenu === 0 ? 'text-fontColor' : ''
            }`}
            style={{ borderRight: '1px solid gray' }}
            onClick={() => setActiveMenu(0)}
          >
            Details
          </p>

          <p
            className={`text-lg text-fontColor-deepGray mr-6 tracking-wide cursor-pointer ${
              activeMenu === 1 ? 'text-fontColor' : ''
            }`}
            onClick={() => setActiveMenu(1)}
          >
            Action Taken
          </p>
        </div>
        {activeMenu === 0 ? (
          <Details
            summeryData={summeryData}
            fetchData={fetchData}
            setSummeryData={setSummeryData}
          />
        ) : (
          <ActionTaken
            //@ts-ignore
            audit_trail={summeryData?.audit_trail}
            summeryData={summeryData}
            toggleNewActionModal={toggleNewActionModal}
            toggleSummeryModal={closeModal}
          />
        )}
      </div>
    </Modal>
  );
};

export default SummeryModal;
