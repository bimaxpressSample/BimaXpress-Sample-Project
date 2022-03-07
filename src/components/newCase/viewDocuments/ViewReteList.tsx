import React, { useEffect, useState } from 'react';
import styles from './ViewDocuments.module.css';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { setReteList } from '../../../redux/slices/empanelledCompaniesSlice';
type ReteListModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  detailsOfTPA: string;
};

const ReteListModal = ({
  closeModal,
  isOpen = false,
  detailsOfTPA,
}: ReteListModalProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { retelist } = useAppSelector((state) => state.empanelledCompanies);
  const dispatch = useAppDispatch();
  const [reteListURL, setReteListURL] = useState<string>('');

  const fetchretelist = async () => {
    dispatch(setLoading(true));
    try {
      const URL = `/empanelcompany?email=${user}`;
      const { data } = await axiosConfig.get(URL);
      dispatch(setReteList(data?.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    fetchretelist();
  }, []);

  useEffect(() => {
    if (detailsOfTPA && detailsOfTPA !== undefined && detailsOfTPA !== '') {
      //@ts-ignore
      setReteListURL(retelist[detailsOfTPA]?.Ratelist);
    } else {
      setReteListURL('');
    }
  }, [detailsOfTPA, retelist]);
  console.log(reteListURL);
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
          {reteListURL === '' ? (
            <h1 className='py-8 text-xl font-semibold'>
              No Docuemnts in Rate List
            </h1>
          ) : (
            <a
              //@ts-ignore
              href={reteListURL}
              target='_blank'
              rel='noreferrer noopener'
              style={{ color: 'blue' }}
            >
              View Document
            </a>
          )}

          {/* {retListDomumnetURL ? (
            <a
              href={retListDomumnetURL}
              target='_blank'
              rel='noreferrer noopener'
            >
              ViewRete List
            </a>
          ) : (
            
          )} */}
        </div>
      </div>
    </Modal>
  );
};

export default ReteListModal;
