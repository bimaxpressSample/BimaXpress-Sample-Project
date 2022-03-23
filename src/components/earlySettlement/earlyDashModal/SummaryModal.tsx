import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import styles from './summaryModal.module.css';

type SummeryModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  summaryData: any;
};

const SummaryModal = ({
  closeModal,
  isOpen,
  summaryData,
}: SummeryModalProps) => {
  console.log('SummaryData At Modal', summaryData);
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      {/* <p className='text-lg text-fontColor mb-2'>Summary</p> */}
      <div className={`${styles.summerModalContainer} relative`}>
        <IoClose
          className=' absolute top-4 right-6 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
        <div className='flex items-center'>
          <p
            className={`text-lg text-fontColor-deepGray mr-3 pr-3 tracking-wide text-fontColor`}
          >
            Early Settlement Case Summary | Case {'numHere'}
          </p>
        </div>

        {/* Main Summary Starts */}
        <div className='grid grid-cols-2 gap-x-8 gap-y-4 mt-6 pb-4'>
          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Claim Number
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.claim_number}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Insurance Company/TPA
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.Insurance_Company}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>Phone</p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              'Phone Number Here'
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Dischrage Approved Amount
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.Discharge_Approvedamount}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Offer Availed Date
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.Date_of_avail}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              ES Offer Amount
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.offer_Amount}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Processing Fee
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.processing_fee}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Settlement Date
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.repayment_date || 'Not got yet'}
            </p>
          </div>

          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-3 text-sm text-fontColor font-thin py-2'>
              Settled Amount
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray w-full text-base text-fontColor-deepGray `}
            >
              {summaryData?.settled}
            </p>
          </div>
        </div>
        {/* Main Summary Ends */}
      </div>
    </Modal>
  );
};

export default SummaryModal;
