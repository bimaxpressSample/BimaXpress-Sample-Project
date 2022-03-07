import React, { useEffect, useState } from 'react';
import search_icon from '../../assets/icon/search_icon.svg';
import deleteIcon from '../../assets/icon/delete_icon.svg';
import openBook from '../../assets/icon/book_open.svg';
import smellEditIcon from '../../assets/icon/small_edit_icon.svg';
import { RiSpamLine } from 'react-icons/ri';
import styles from './Mail.module.css';
import GeneralCheckbox from '../theme/generalCheckbox/GeneralCheckbox';
import big_edit_icon from '../../assets/icon/big_edit_icon.svg';
import MailDescripationHeader from './mailDescripationHeader/MailDescripationHeader';
import MailDescripation from './mailDescripatio/MailDescripation';
// import ApproveModal from "./approveModal/ApproveModal";
import ComposeModal from './composeModal/ComposeModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setComposeMailStatus,
  setInboxMailList,
  setSentMailList,
} from '../../redux/slices/mailSlice';
import { setLoading } from '../../redux/slices/utilitySlice';
import notification from '../theme/utility/notification';
import axiosConfig from '../../config/axiosConfig';
import PaginationButton from '../theme/PaginationButton/PaginationButton';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import RejectModal from './mailDescripatio/models/RejectModal';
import EnhanceModal from './mailDescripatio/models/EnhanceModal';
import FciModal from './mailDescripatio/models/FciModal';
import DischargeApprovedModal from './mailDescripatio/models/DischargeApprovedModal';
import SettledModal from './mailDescripatio/models/SettledModal';
import ApproveModal from './mailDescripatio/models/ApproveModal';

const Mail = () => {
  const [mailDes, setMailDes] = useState(0);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openComposeModal, setOpenComposeModal] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { inboxMailList, sentMailList, currentMailList } = useAppSelector(
    (state) => state?.mail
  );
  const [selectedMail, setSelectedMail] = useState({});
  const [totalNoInboxpage, settotalNoInboxpage] = useState(5);
  const [totalNoSentpage, settotalNoSentpage] = useState(5);
  const [currentSentPage, setSentCurrentPage] = useState(1);
  const [currentInboxPage, setInboxCurrentPage] = useState(1);
  const [nextButDisable, setNextBtnDisable] = useState(false);
  const [previousButDisable, setpreviousBtnDisable] = useState(true);

  const nextPage = () => {
    if (
      (currentMailList === 'inbox'
        ? currentInboxPage + 1
        : currentSentPage + 1) >
      (currentMailList === 'inbox' ? totalNoInboxpage : totalNoSentpage)
    ) {
      //
    } else if (
      (currentMailList === 'inbox'
        ? currentInboxPage + 1
        : currentSentPage + 1) ===
      (currentMailList === 'inbox' ? totalNoInboxpage : totalNoSentpage)
    ) {
      setNextBtnDisable(true);
    } else {
      currentMailList === 'inbox'
        ? setSentCurrentPage((pre) => pre + 1)
        : setInboxCurrentPage((pre) => pre + 1);
      setpreviousBtnDisable(false);
      paginateMailList(
        currentMailList === 'inbox' ? currentInboxPage + 1 : currentSentPage + 1
      );
    }
  };

  const previousPage = () => {
    if (
      (currentMailList === 'inbox'
        ? currentInboxPage - 1
        : currentSentPage - 1) === 0
    ) {
      //
    } else if (
      (currentMailList === 'inbox'
        ? currentInboxPage - 1
        : currentSentPage - 1) === 1
    ) {
      setpreviousBtnDisable(true);
    } else {
      currentMailList === 'inbox'
        ? setSentCurrentPage((pre) => pre - 1)
        : setInboxCurrentPage((pre) => pre - 1);
      paginateMailList(
        currentMailList === 'inbox' ? currentInboxPage - 1 : currentSentPage - 1
      );
    }
  };

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState({
    inbox: [],
    sent: [],
  });

  const mailList = {
    inbox: [...inboxMailList],
    sent: [...sentMailList],
  };

  // const filteredMailList = {
  //     inbox: [...filteredResults],
  //     sent: [...sentMailList],
  // };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      // @ts-ignore
      const filteredData = mailList[currentMailList].filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      // @ts-ignore
      setFilteredResults({
        [currentMailList]: [...filteredData],
      });
    } else {
      // @ts-ignore
      setFilteredResults({
        // @ts-ignore
        [currentMailList]: [...mailList[currentMailList]],
      });
    }
  };
  // console.log("filerted data", filteredResults);
  // console.log(searchInput);

  //@ts-ignore
  // var decodedStringAtoB = atob(inboxMailList[0]?.message);
  // console.log(decodedStringAtoB);

  const handleOpenApproveModal = () => {
    setOpenApproveModal((pre) => !pre);
  };
  const handleOpenComposeModal = () => {
    setOpenComposeModal((pre) => !pre);
  };

  const handleSelectMail = (num: number) => {
    setMailDes(1);
    //@ts-ignore
    const singleMail = mailList[currentMailList][num];
    setSelectedMail(singleMail);
  };

  const paginateMailList = async (pageNo: number) => {
    dispatch(setLoading(true));

    const GETINBOXMAIL = `/inboxmails?email=${user}&pagenumber=${pageNo}`;
    const GETSENTMAIL = `/sentinboxmails?email=${user}&pagenumber=${pageNo}`;
    try {
      if (currentMailList === 'inbox') {
        const { data: inboxMail } = await axiosConfig.get(GETINBOXMAIL);
        dispatch(setInboxMailList(inboxMail?.data));
      } else {
        const { data: sentMail } = await axiosConfig.get(GETSENTMAIL);
        dispatch(setSentMailList(sentMail?.data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const fetchMailList = async () => {
    dispatch(setLoading(true));
    settotalNoInboxpage(5);
    settotalNoSentpage(5);
    const GETINBOXMAIL = `/inboxmails?email=${user}&pagenumber=1`;
    const GETSENTMAIL = `/sentinboxmails?email=${user}&pagenumber=1`;
    try {
      const { data: inboxMail } = await axiosConfig.get(GETINBOXMAIL);
      const { data: sentMail } = await axiosConfig.get(GETSENTMAIL);
      dispatch(setLoading(false));
      dispatch(setInboxMailList(inboxMail?.data));
      dispatch(setSentMailList(sentMail?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    if (!inboxMailList?.length || !sentMailList?.length) {
      fetchMailList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openApprovedModal, setOpenApprovedModal] = useState<boolean>(false);
  const toggleApprovedModal = () => {
    setOpenApprovedModal((pre) => !pre);
  };
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const toggleRejectModal = () => {
    setOpenRejectModal((pre) => !pre);
  };
  const [openFciModal, setOpenFciModal] = useState<boolean>(false);
  const toggleFciModal = () => {
    setOpenFciModal((pre) => !pre);
  };

  const [openEnhanceModal, setOpenEnhanceModal] = useState<boolean>(false);
  const toggleEnhanceModal = () => {
    setOpenEnhanceModal((pre) => !pre);
  };

  const [openDischargeApprovedModal, setOpenDischargeApprovedModal] =
    useState<boolean>(false);
  const toggleDischargeApprovedModal = () => {
    setOpenDischargeApprovedModal((pre) => !pre);
  };

  const [openSettledModal, setOpenSettledModal] = useState<boolean>(false);
  const toggleSettledModal = () => {
    setOpenSettledModal((pre) => !pre);
  };

  const actions = [
    {
      label: 'Approved',
      value: 'Approved',
    },
    {
      label: 'Reject',
      value: 'Reject',
    },
    {
      label: 'Enhance',
      value: 'Enhance',
    },
    {
      label: 'Fci',
      value: 'fci',
    },
    {
      label: 'Discharge_Approved',
      value: 'Discharge_Approved',
    },
    {
      label: 'Settled',
      value: 'Settled',
    },
  ];

  const [options, setOptions] = useState({
    action: '',
  });

  useEffect(() => {
    if (options?.action === 'Approved') {
      toggleApprovedModal();
    }
    if (options?.action === 'Enhance') {
      toggleEnhanceModal();
    }
    if (options?.action === 'Discharge_Approved') {
      toggleDischargeApprovedModal();
    }
    if (options?.action === 'Reject') {
      toggleRejectModal();
    }
    if (options?.action === 'fci') {
      toggleFciModal();
    }
    if (options?.action === 'Settled') {
      toggleSettledModal();
    }

    /* if (
          action === 'Approved' ||
          action === 'Reject' ||
          action === 'Discharge_Approved'
        ) {
          toggleApproveModal();
        }
        if (action === 'Enhance' || action === 'fci') {
          toggleEnhanceAndFciModal();
        } */
  }, [options]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    setOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };

  const renderUI = () => {
    switch (mailDes) {
      case 0:
        return <MailDescripationHeader />;
      case 1:
        return (
          <MailDescripation
            openApproveModal={openApproveModal}
            handleOpenApproveModal={handleOpenApproveModal}
            openModal={handleOpenComposeModal}
            selectedMail={selectedMail}
          />
        );

      default:
        return <MailDescripationHeader />;
    }
  };
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-5 bg-primary-dark min-h-screen'>
        <div className='p-4 '>
          <div className={styles.mailSearchBox}>
            <img src={search_icon} alt='icon' className='px-4 ' />

            <input
              className='border-none outline-none text-base text-fontColor h-10 w-full bg-transparent  pr-4'
              placeholder='Search'
              id='searchbar'
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between mt-4'>
            <div className='flex'>
              <img src={deleteIcon} alt='icon' className='px-2' />
              <img src={openBook} alt='icon' className='px-2' />

              <RiSpamLine className='mx-2 text-fontColor text-2xl' />
            </div>
            <img
              src={smellEditIcon}
              alt='icon'
              onClick={() => {
                dispatch(setComposeMailStatus('new'));
                handleOpenComposeModal();
              }}
              className='cursor-pointer'
            />
          </div>
        </div>
        <div
          className='border-t-2 border-fontColor-darkGray p-4  '
          style={{ height: '100vh', overflow: 'scroll' }}
        >
          {/* @ts-ignore */}
          {searchInput.length > 1
            ? //@ts-ignore
              filteredResults[currentMailList]?.map((mail, index) => {
                return (
                  <div
                    key={index}
                    className='grid grid-cols-12 searchedmail'
                    onClick={() => handleSelectMail(index)}
                  >
                    <div className='col-span-1'>
                      <GeneralCheckbox />
                    </div>
                    <div className='col-span-11 mb-4 pb-3 border-b border-fontColor-darkGray'>
                      <h2 className='text-lg text-fontColor cursor-pointer'>
                        {' '}
                        {/* @ts-ignore */}
                        {mail?.name}
                      </h2>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-300 mr-2'>
                            {/* @ts-ignore */}
                            {mail?.subject}
                          </p>
                        </div>
                        <p className='text-xs text-fontColor w-10'>
                          {/* @ts-ignore */}
                          {mail?.date}
                        </p>
                      </div>

                      <p
                        className={`text-sm text-fontColor mt-4 ${styles.mailDiscriptationContainer}`}
                        // dangerouslySetInnerHTML={{ __html: mail?.message }}
                      >
                        {/* @ts-ignore */}
                        {/* <div dangerouslySetInnerHTML={mail?.message}></div> */}
                        {/* {parse(mail?.message)} */}
                      </p>
                    </div>
                  </div>
                );
              })
            : // @ts-ignore
              mailList[currentMailList]?.map((mail, index) => {
                return (
                  <div
                    key={index}
                    className='grid grid-cols-12 searchedmail'
                    onClick={() => handleSelectMail(index)}
                  >
                    <div className='col-span-1'>
                      <GeneralCheckbox />
                    </div>
                    <div className='col-span-11 mb-4 pb-3 border-b border-fontColor-darkGray'>
                      <h2 className='text-lg text-fontColor cursor-pointer'>
                        {' '}
                        {/* @ts-ignore */}
                        {mail?.name}
                      </h2>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-gray-300 mr-2'>
                            {/* @ts-ignore */}
                            {mail?.subject}
                          </p>
                        </div>
                        <p className='text-xs text-fontColor w-10'>
                          {/* @ts-ignore */}
                          {mail?.date}
                        </p>
                      </div>

                      <p
                        className={`text-sm text-fontColor mt-4 ${styles.mailDiscriptationContainer}`}
                        // dangerouslySetInnerHTML={{ __html: mail?.message }}
                      >
                        {/* @ts-ignore */}
                        {/* <div dangerouslySetInnerHTML={mail?.message}></div> */}
                        {/* {parse(mail?.message)} */}
                      </p>
                    </div>
                  </div>
                );
              })}
          <div className='flex justify-end my-2'>
            <div className='pr-2'>
              <PaginationButton
                leftIcon={true}
                handleClick={() => previousPage()}
                disability={previousButDisable}
              />
            </div>
            <PaginationButton
              rightIcon={true}
              handleClick={() => nextPage()}
              disability={nextButDisable}
            />
          </div>
        </div>
      </div>

      <ApproveModal
        closeModal={toggleApprovedModal}
        isOpen={openApprovedModal}
        // newCaseData={summeryData}
        action={options?.action}
      />
      <EnhanceModal
        closeModal={toggleEnhanceModal}
        isOpen={openEnhanceModal}
        // newCaseData={summeryData}
        action={options?.action}
      />
      <DischargeApprovedModal
        closeModal={toggleDischargeApprovedModal}
        isOpen={openDischargeApprovedModal}
        // newCaseData={summeryData}
        action={options?.action}
      />
      <RejectModal
        closeModal={toggleRejectModal}
        isOpen={openRejectModal}
        // newCaseData={summeryData}
        action={options?.action}
      />
      <FciModal
        closeModal={toggleFciModal}
        isOpen={openFciModal}
        // newCaseData={summeryData}
        action={options?.action}
      />
      <SettledModal
        closeModal={toggleSettledModal}
        isOpen={openSettledModal}
        // newCaseData={summeryData}
        action={options?.action}
      />

      <div className='col-span-7 bg-primary-light min-h-full p-4 '>
        {renderUI()}

        <div className={styles.compareButContainer}>
          <div className='mr-8'>
            <NewCaseSelect
              options={actions}
              name='action'
              handleChange={handleChange}
              defaultOption='Select Status'
              value={options?.action || ''}
            />
          </div>
          <button
            className={`${styles.compostBtn}`}
            onClick={() => {
              dispatch(setComposeMailStatus('new'));
              handleOpenComposeModal();
            }}
          >
            <img src={big_edit_icon} alt='icon' className='mr-2' />
            Compose
          </button>
        </div>
        <ApproveModal
          isOpen={openApproveModal}
          closeModal={handleOpenApproveModal}
        />
        <ComposeModal
          isOpen={openComposeModal}
          closeModal={handleOpenComposeModal}
          selectedMail={selectedMail}
        />
      </div>
    </div>
  );
};

export default Mail;
