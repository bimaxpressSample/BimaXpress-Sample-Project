import Modal from 'react-modal';
import styles from './bnplViewDocument.module.css';
import { IoClose } from 'react-icons/io5';
import PlanSelectButton from '../../../theme/button/PlanSelectButton';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setLoading } from '../../../../redux/slices/utilitySlice';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../theme/utility/notification';
import Button from '../../../theme/nextButton/NextButton';
Modal.setAppElement('#root');

type bnplViewDocumentsProps = {
  isOpen?: boolean;
  closeModal?: () => void;
};

const BnplViewDocumentModel = ({
  isOpen = false,
  closeModal = () => {},
}: bnplViewDocumentsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);

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
                fontSize: '24px',
                position: 'relative',
                top: '-25px',
              }}
            >
              Documents
            </h1>
          </div>

          <div className='flex flex-row justify-center'>
            <Button
              text='Salary Slip'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
            <Button
              text='Bank Satement'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
          </div>

          <div className='flex flex-row justify-center'>
            <Button
              text='PAN Card Front'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
            <Button
              text='PAN Card Back'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
          </div>

          <div className='flex flex-row justify-center'>
            <Button
              text='Aadhar Card Front'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
            <Button
              text='Aadhar Card Back'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BnplViewDocumentModel;
