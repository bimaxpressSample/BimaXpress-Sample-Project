import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './esOfferDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import PlanSelectButton from '../../../theme/button/PlanSelectButton';
import BookShipmentModal from '../../../drafts/esModals/BookShipmentModal';
import NonCashlessOfferSummary from './NonCashlessOfferSummary';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setLoading } from '../../../../redux/slices/utilitySlice';
import axiosConfig from '../../../../config/axiosConfig';
import notification from '../../../theme/utility/notification';
Modal.setAppElement('#root');

type ApproveModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  caseData?: any;
};

const NonCashlessEsOfferDetailsModal = ({
  isOpen = false,
  closeModal = () => {},
  caseData,
}: ApproveModalProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const [OpenPddocument, setPdOpenPddocument] = useState<boolean>(false);
  const [openBookShipmentModal, setOpenBookShipmentModal] =
    useState<boolean>(false);

  const [openOfferSummery, setOpenOfferSummery] = useState<boolean>(false);
  const [bookShipment, setBookShipment] = useState({});
  const [offerSummaryData, setofferSummaryData] = useState({});
  function openPDOption() {
    closeModal();
    setPdOpenPddocument(true);
  }

  const fetchOfferSummary = async () => {
    dispatch(setLoading(true));
    const URL = `/offer_summary/${caseData[1].caseNumber}?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      let obj = data.data;
      let newData = [];
      newData.push(obj);
      newData.push({ caseNumber: caseData[1].caseNumber });
      setofferSummaryData(newData);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  function showOfferSummary() {
    setOpenBookShipmentModal(false);
    setOpenOfferSummery(true);
    fetchOfferSummary();
  }

  function showBookshipmentModal() {
    setPdOpenPddocument(false);
    setOpenBookShipmentModal(true);
    const fetchESOfferData = async () => {
      dispatch(setLoading(true));
      const URL = `/book_shipment/${caseData[1].caseNumber}?email=${user}`;
      try {
        const { data } = await axiosConfig.get(URL);
        dispatch(setLoading(false));
        let obj = data.data;
        let newData = [];
        newData.push(obj);
        newData.push({ caseNumber: caseData[1].caseNumber });
        setBookShipment(newData);
      } catch (error) {
        dispatch(setLoading(false));
        //@ts-ignore
        notification('error', error?.message);
      }
    };
    fetchESOfferData();
  }

  useEffect(() => {
    setPdOpenPddocument(false);
  }, []);
  const pushAPIavailOffer = async () => {
    dispatch(setLoading(true));
    const URL = `/NCP_es_offer_details/${caseData[1].caseNumber}?email=${user}`;
    try {
      await axiosConfig.post(URL);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  // console.log("offercasedata", caseData);

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
              Non Cashless Early Settlement Offer Details
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
              {caseData[0]?.claimno}
            </div>
          </div>
          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Patient Name </span>
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
              {caseData[0]?.Patient_name}
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
              {caseData[0]?.discharge_appr}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>Processing Fees</span>
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
              {caseData[0]?.discharge_appr}
            </div>
          </div>

          <div style={{ width: '90%', color: 'white', marginTop: '15px' }}>
            <div
              style={{
                width: '40%',
                display: 'inline-block',
              }}
            >
              <span>offer Amount</span>
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
              {caseData[0]?.offer_Amount}
            </div>
          </div>
          <div className='flex justify-center mt-8'>
            <PlanSelectButton
              text='Avail Offer'
              style={{ maxWidth: '180px' }}
              handleClick={() => {
                openPDOption();
                pushAPIavailOffer();
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={OpenPddocument}
        className={styles.approveModalContainer}
        overlayClassName={styles.overlayContainer}
        onRequestClose={() => setPdOpenPddocument(false)}
        shouldCloseOnOverlayClick={true}
      >
        <div className='px-10 py-8 relative'>
          <IoClose
            className='absolute top-2 right-2 text-2xl text-fontColor cursor-pointer'
            onClick={() => setPdOpenPddocument(false)}
          />

          <div className='flex justify-center'>
            <h1
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '18px',
                marginBottom: '15px',
              }}
            >
              Have you sent the physical documents to the insurance company ?
            </h1>
          </div>
          <div className='flex justify-center mt-8'>
            <PlanSelectButton
              text='Yes'
              style={{ maxWidth: '90px' }}
              handleClick={() => {
                setPdOpenPddocument(false);
                setOpenOfferSummery(true);
                showOfferSummary();
              }}
            />
            <PlanSelectButton
              text='No'
              style={{ maxWidth: '90px', marginLeft: '10px' }}
              handleClick={() => {
                showBookshipmentModal();
              }}
            />
          </div>
        </div>
      </Modal>

      <BookShipmentModal
        closeModal={() => setOpenBookShipmentModal(false)}
        isOpen={openBookShipmentModal}
        BookShipmentCaseData={bookShipment}
        skipItforlater={showOfferSummary}
      />

      <NonCashlessOfferSummary
        closeModal={() => setOpenOfferSummery(false)}
        isOpen={openOfferSummery}
        offerSummaryData={offerSummaryData}
      />
    </>
  );
};

export default NonCashlessEsOfferDetailsModal;
