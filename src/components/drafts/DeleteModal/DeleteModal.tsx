import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import styles from './DeleteModal.module.css';
import Button from '../../theme/nextButton/NextButton';

type DeleteModalProps = {
  isOpen: boolean;
  closeModal?: () => void;
  numberOfCaseDelete: Number;
  deleteCase?: () => void;
};

const DeleteModal = ({
  isOpen,
  closeModal,
  numberOfCaseDelete,
  deleteCase,
}: DeleteModalProps) => {
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
            Are you sure want to delete {numberOfCaseDelete} case from drafts ?
          </p>
        </div>
        <br />

        <div className='flex justify-center gap-4'>
          <Button text='Yes' handleClick={deleteCase} />
          <Button text='No' handleClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
