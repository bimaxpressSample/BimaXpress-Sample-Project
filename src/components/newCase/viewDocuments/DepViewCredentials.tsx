import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './ViewDocuments.module.css';
import axiosConfig from '../../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useEffect } from 'react';
import { setDepUserCredential } from '../../../redux/slices/userSlice';
import Input from '../../drafts/enhanceAndFci/Input';
import notification from '../../theme/utility/notification';

type DepViewCredentialsProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  hospital_mail?: string;
};
const DepViewCredentials = ({
  closeModal,
  isOpen = false,
  newCaseData,
  hospital_mail,
}: DepViewCredentialsProps) => {
  const dispatch = useAppDispatch();
  const { depUserCredential } = useAppSelector((state) => state.user);

  //@ts-ignore
  const { username, password } = depUserCredential;
  const fetchCredentialAPI = async () => {
    // HardCode Value
    // const URL = `/usernamepass?email=abnew@gmail.com&company=Acko_General_Insurance`;

    // #Uncomment This#
    const URL = `/usernamepass?email=${hospital_mail}&company=${
      newCaseData?.detailsOfTPA?.TPA
        ? newCaseData?.detailsOfTPA?.TPA
        : newCaseData?.detailsOfTPA?.insuranceCompany
    }`;

    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      dispatch(setDepUserCredential(data));
    } catch (error) {
      //@ts-ignore
      console.log(error);
      // notification('error', error.message);
    }
  };
  useEffect(() => {
    if (
      newCaseData?.detailsOfTPA?.TPA ||
      newCaseData?.detailsOfTPA?.insuranceCompany
    ) {
      dispatch(setDepUserCredential({}));
      fetchCredentialAPI();
    }
  }, [newCaseData?.detailsOfTPA, hospital_mail]);

  const inputStyle = {
    height: '40px',
    color: 'black !important',
  };

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className='px-10 py-8 relative'>
        <IoClose
          className='absolute top-2 right-2 text-2xl text-fontColor-darkGray cursor-pointer'
          onClick={closeModal}
        />

        <div className='flex items-center justify-center flex-wrap'>
          <h1
            style={{
              fontSize: '19px',
              position: 'relative',
              top: '-18px',
              fontWeight: '500',
            }}
          >
            Credentials
          </h1>
          <br />
        </div>

        {newCaseData?.detailsOfTPA?.TPA ||
        newCaseData?.detailsOfTPA?.insuranceCompany ? (
          <>
            <div className='mt-6'>
              <Input
                handleChange={() => {}}
                name='hospital_email'
                value={hospital_mail || ''}
                label='Hospital Email'
                isEdit={false}
                style={inputStyle}
              />
            </div>

            <div className='mt-6'>
              <Input
                handleChange={() => {}}
                name={
                  newCaseData?.detailsOfTPA?.TPA
                    ? 'TPA_Company'
                    : 'insurance_Company'
                }
                value={
                  newCaseData?.detailsOfTPA?.TPA
                    ? newCaseData?.detailsOfTPA?.TPA
                    : newCaseData?.detailsOfTPA?.insuranceCompany
                }
                label={
                  newCaseData?.detailsOfTPA?.TPA
                    ? 'TPA_Company'
                    : 'Insurance Company'
                }
                isEdit={false}
                style={inputStyle}
              />
            </div>

            <div className='mt-6'>
              <Input
                handleChange={() => {}}
                name='Username'
                value={username || ''}
                label='Username'
                isEdit={false}
                style={inputStyle}
              />
            </div>

            <div className='mt-6'>
              <Input
                handleChange={() => {}}
                name='Password'
                value={password || ''}
                label='Password'
                isEdit={false}
                style={inputStyle}
              />
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>
            Select TPA/Insurance Company First
          </p>
        )}
      </div>
    </Modal>
  );
};

export default DepViewCredentials;
