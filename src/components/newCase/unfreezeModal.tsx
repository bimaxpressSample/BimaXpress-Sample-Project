import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import styles from './unfreezeCase.module.css';
import Button from '../theme/nextButton/NextButton';

type UnfreezeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  unfreezeCase: () => void;
};

const UnfreezeModal = ({
  isOpen,
  closeModal,
  unfreezeCase,
}: UnfreezeModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={`${styles.summerModalContainer} relative`}>
        <IoClose
          className=' absolute top-4 right-6 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
        <div className='flex items-center'>
          <p className={`text-lg mr-3 pr-3 tracking-wide text-fontColor`}>
            Are you sure want to unfreeze this case ?
          </p>
        </div>
        <br />

        <div className='flex justify-center gap-4'>
          <Button text='Yes' handleClick={unfreezeCase} />
          <Button text='No' handleClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default UnfreezeModal;
