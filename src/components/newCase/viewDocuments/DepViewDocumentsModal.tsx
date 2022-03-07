import { useState } from 'react';
import styles from './ViewDocuments.module.css';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import axiosConfig from '../../../config/axiosConfig';
import DepViewCredentials from './DepViewCredentials';

type ViewDocumentsModalProps = {
  hospitalmail: string;
  newCaseData: any;
  isOpen?: boolean;
  closeModal?: () => void;
  documents?: string[];
};

const ViewDocumentsModal = ({
  newCaseData,
  hospitalmail,
  closeModal = () => {},
  documents,
  isOpen = false,
}: ViewDocumentsModalProps) => {
  const hospitalEmail = hospitalmail;
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const dispatch = useAppDispatch();

  const [openDepViewCredentials, setopenDepViewCredentials] =
    useState<boolean>(false);
  const toggleDepViewCredentials = () => {
    setopenDepViewCredentials((pre: boolean) => !pre);
  };

  function openWindow(e: string) {
    window.open(e);
  }

  const viewDocument1 = async () => {
    dispatch(setLoading(true));
    const viewURL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;

    try {
      await axiosConfig.get(viewURL).then((response) => {
        const a = response.data.data.UrluploadSignedPreAuth;

        console.log(a);

        for (let i = 0; i < a.length; i++) {
          openWindow(a[i]);
        }
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const viewDocument2 = async () => {
    dispatch(setLoading(true));
    const viewURL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;

    try {
      await axiosConfig.get(viewURL).then((response) => {
        const b = response.data.data.UrluploadConsultation;

        console.log(b);

        for (let i = 0; i < b.length; i++) {
          openWindow(b[i]);
        }
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const viewDocument3 = async () => {
    dispatch(setLoading(true));
    const viewURL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;

    try {
      await axiosConfig.get(viewURL).then((response) => {
        const c = response.data.data.UrluploadPatientsHealthIDCard;

        console.log(c);

        for (let i = 0; i < c.length; i++) {
          openWindow(c[i]);
        }
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const viewDocument4 = async () => {
    dispatch(setLoading(true));
    const viewURL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;

    try {
      await axiosConfig.get(viewURL).then((response) => {
        const d = response.data.data.id_proof;

        console.log(d);

        for (let i = 0; i < d.length; i++) {
          openWindow(d[i]);
        }
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const viewDocument5 = async () => {
    dispatch(setLoading(true));
    const viewURL = `/preauthdata?email=${hospitalmail}&casenumber=${newCaseNum}`;

    try {
      await axiosConfig.get(viewURL).then((response) => {
        const e = response.data.data.UrlotherDocuments;

        console.log(e);

        for (let i = 0; i < e.length; i++) {
          openWindow(e[i]);
        }
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
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
            {documents?.length ? (
              documents?.map((img, index) => {
                return (
                  <img
                    key={index}
                    src={img}
                    alt='doucemnts'
                    style={{
                      width: '300px',
                      height: '300px',
                      objectFit: 'contain',
                      margin: '16px',
                    }}
                  />
                );
              })
            ) : (
              <div className='flex flex-col'>
                <div className='flex flex-row justify-center'>
                  <button
                    onClick={viewDocument1}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Signed Pre Auth Form
                  </button>
                  <button
                    onClick={viewDocument2}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Consultation Papers
                  </button>
                </div>
                <div className='flex flex-row justify-center'>
                  <button
                    onClick={viewDocument3}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Health ID Card
                  </button>
                  <button
                    onClick={viewDocument4}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    ID Proof
                  </button>
                </div>
                <div className='flex flex-row justify-center'>
                  <button
                    onClick={viewDocument5}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Other Documents
                  </button>
                  <button
                    onClick={() => {
                      toggleDepViewCredentials();
                      closeModal();
                    }}
                    className='m-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    View Credentials
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <DepViewCredentials
        closeModal={toggleDepViewCredentials}
        isOpen={openDepViewCredentials}
        newCaseData={newCaseData}
        hospital_mail={hospitalmail}
      />
    </>
  );
};

export default ViewDocumentsModal;
