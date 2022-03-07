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
import Input from '../../../theme/input/Input';

Modal.setAppElement('#root');

type bnplViewDocumentsProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  CaseData?: any;
  handleChange: (e: any) => void;
};

const BnplApplicationNumberModel = ({
  isOpen = false,
  closeModal = () => {},
  CaseData,
  handleChange,
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
              Enter Application Number
            </h1>
          </div>

          <div className='col-span-1 mt-2'>
            <Input
              handleChange={handleChange}
              name='application_id'
              value={CaseData.application_id || ''}
              label='Enter Application ID'
              labelStyle={{ paddingBottom: '6px' }}
              placeHolder='Enter Application ID'
              style={{ height: '35px' }}
              type='text'
            />
          </div>

          <div className='flex flex-row justify-center pt-8'>
            <Button
              text='Submit'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={() => {}}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BnplApplicationNumberModel;
