import React, { useState, useEffect } from 'react';
import scrollbar from '../../../scrollbar.module.css';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../../theme/table/tableSearchInput/TableSearchInput';
import { setesData } from '../../../redux/slices/earlySettlementSlice';
import TableSearchButton from '../../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../../theme/reactTable/ReactTable';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../../theme/table/tableCheckbox/TableCheckbox';
import SummeryModal from '../../drafts/Summary/SummeryModal';
import NewAction from '../../drafts/newAction/NewAction';
import SentMail from '../../drafts/sentMail/SentMail';
import ApproveModal from '../../drafts/approveModal/ApproveModal';
import EnchanceAndFciModal from '../../drafts/enhanceAndFci/EnchanceAndFci';
import filter from '../../../assets/icon/filter.svg';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import { setDACaseData } from '../../../redux/slices/dischargeApprovedSlice';
import notification from '../../theme/utility/notification';
import Button from '@mui/material/Button';
import OfferSummary from './OfferSummerModal/NonCashlessOfferSummary';
import eyeIcon from '../../assets/icon/eye.svg';
import { setCaseData } from '../../../redux/slices/homeSlice';
const insuranceCompany = [
  { label: 'Health India Insurance', value: 'health_india_insurance' },
  { label: 'Reliance General Insurance', value: 'reliance_general_nsurance' },
  { label: 'Futura General Insurance', value: 'futura_general_insurance' },
  { label: 'Medsave Health Insurance', value: 'medsave_health_insurance' },
  {
    label: 'Bajaj Allianz Life Insurance',
    value: 'bajaj_allianz_life_insurance',
  },
];

const dateRange = [
  { label: 'Last day', value: 'last_day' },
  { label: 'Last 15 days', value: 'last_15_days' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Last quarter', value: 'last_quarter' },
  { label: 'Last year', value: 'last_year' },
];

interface ColumnDetails {
  [key: string]: any;
}

const NonCashlessEarlySettlement = () => {
  const { user } = useAppSelector((state) => state?.user);
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { caseData } = useAppSelector((state) => state?.home);
  const { DACaseData } = useAppSelector((state) => state?.dischargeApproved);
  const [NonCashlessESCaseOfferData, setNonCashlessESCaseOfferData] = useState(
    {}
  );
  const [summeryData, setSummeryData] = useState({});
  const [action, setAction] = useState('');
  const [
    openNonCashlessEsOfferDetailsModal,
    setopenNonCashlessEsOfferDetailsModal,
  ] = useState<boolean>(false);
  const toggleNonCashlessEsOfferDetailsModal = () => {
    setopenNonCashlessEsOfferDetailsModal((pre) => !pre);
  };
  const [openSummeryModal, setOpenSummeryModal] = useState<boolean>(false);
  const toggleSummeryModal = () => {
    setOpenSummeryModal((pre) => !pre);
  };
  const [openNewActionModal, setOpenNewActionModal] = useState<boolean>(false);
  const toggleNewActionModal = () => {
    setOpenNewActionModal((pre) => !pre);
  };
  const [openSentmailModal, setOpenSentmailModal] = useState<boolean>(false);
  const toggleSentmailModal = () => {
    setOpenSentmailModal((pre) => !pre);
  };
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);
  const toggleApproveModal = () => {
    setOpenApproveModal((pre) => !pre);
  };

  const [openEnhanceAndFciModal, setOpenEnhanceAndFciModal] =
    useState<boolean>(false);
  const toggleEnhanceAndFciModal = () => {
    setOpenEnhanceAndFciModal((pre) => !pre);
  };

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/ES_Case?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCaseData(data?.data));
      dispatch(setDACaseData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };
  useEffect(() => {
    fetchAnalyst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetails = (value: string) => {
    //@ts-ignore
    const obj = caseData[value] || {};
    setSummeryData(obj);
    toggleSummeryModal();
  };

  // For ES Offer Details
  const showNonCashlessESOfferDetails = (value: string) => {
    const fetchNonCashlessESOfferData = async () => {
      dispatch(setLoading(true));
      const URL = `/NCP_Offer_summary/${value}?email=${user}`;
      try {
        const { data } = await axiosConfig.get(URL);
        dispatch(setLoading(false));
        let obj = data.data;
        let newData = [];
        newData.push(obj);
        newData.push({ caseNumber: value });
        setNonCashlessESCaseOfferData(newData);
      } catch (error) {
        dispatch(setLoading(false));
        //@ts-ignore
        notification('error', error?.message);
      }
    };
    fetchNonCashlessESOfferData();
    toggleNonCashlessEsOfferDetailsModal();
  };

  useEffect(() => {
    if (action === 'query') {
      toggleSentmailModal();
    }
    if (
      action === 'Approved' ||
      action === 'Reject' ||
      action === 'Discharge_Approved'
    ) {
      toggleApproveModal();
    }
    if (action === 'Enhance' || action === 'fci') {
      toggleEnhanceAndFciModal();
    }
  }, [action]);

  console.log('DAcasedata: ', DACaseData);

  // In case of dischage approved an additional btn is mapped else not
  //Choose object name same as accessor of header
  useEffect(() => {
    const res = Object.entries(DACaseData)?.map(
      ([
        key,
        {
          Patient_name: patientName,
          patient_details_contact_number: phoneNo,
          Insurance_Company: insuranceCompany,
          claimno: claimNo,
          Date_of_Admission: admissionDate,
          discharge_approved_amount: dischargeApprovedAmount,
          bucketStatus: bucketStatus,
        },
      ]) => ({
        name: patientName,
        phone: phoneNo,
        claimNumber: claimNo,
        admissionDate: admissionDate,
        // claimAmount: total,
        insuranceTPA: insuranceCompany,
        dischargeApprovedAmount: dischargeApprovedAmount,
        earlySettlement: (
          <Button
            variant='contained'
            size='small'
            style={{
              marginLeft: '27px',
              backgroundColor: bucketStatus[0] === 'Enabled' ? 'white' : 'grey',
              color: 'black',
              fontWeight: '600',
            }}
            onClick={() => showNonCashlessESOfferDetails(key)}
            // disabled={false}
            disabled={
              bucketStatus[0] === ''
                ? true
                : bucketStatus[0] === 'Availed'
                ? true
                : false
            }
            // disabled={false}
          >
            {bucketStatus[0] === ''
              ? 'Check'
              : bucketStatus[0] === 'Availed'
              ? 'Availed'
              : 'Check'}
          </Button>
        ),
      })
    );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DACaseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  let columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Phone',
        accessor: 'phone', // accessor is the "key" in the data
      },
      {
        Header: 'Claim number',
        accessor: 'claimNumber',
      },
      {
        Header: 'Admission Date',
        accessor: 'admissionDate',
      },
      /*   {
        Header: 'Claim Amount',
        accessor: 'claimAmount',
      }, */
      {
        Header: 'Insurance TPA',
        accessor: 'insuranceTPA',
      },

      {
        Header: 'Early Settlement',
        accessor: 'earlySettlement',
      },
    ],
    []
  );

  console.log('DA', DACaseData);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //@ts-ignore
    page,
    prepareRow,
    //@ts-ignore
    setGlobalFilter,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    // selectedFlatRows,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <TableCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),

          Cell: ({ row }) => (
            <div>
              {/* @ts-ignore */}
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const [options, setOptions] = useState({
    insuranceTPA: '',
    dateRange: '',
  });

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

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <div
      className={`py-6 px-10 w-auto flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}
    >
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex items-center mt-6'>
          <div className='mr-4 '>
            <TableSearch
              value={inputValue}
              handleChange={(val: React.SetStateAction<string>) =>
                setInputValue(val)
              }
              placeholder='Search for Name, claim number'
            />
          </div>
          <div className=' '>
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>

        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <img src={filter} alt='icon' />
            </div>
            <div className='mr-2'>
              <NewCaseSelect
                options={insuranceCompany}
                name='insuranceTPA'
                handleChange={handleChange}
                defaultOption='Insurance TPA'
                value={options?.insuranceTPA || ''}
                style={{
                  minWidth: '170px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }}
              />
            </div>
            <div className='mr-12'>
              <NewCaseSelect
                options={dateRange}
                name='dateRange'
                handleChange={handleChange}
                defaultOption='Status'
                value={options?.dateRange || ''}
                style={{
                  minWidth: '125px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }}
              />
            </div>
          </div>
          <div className='flex items-center text-xs text-fontColor'>
            <RiDeleteBin6Line className='text-fontColor text-lg mr-2 ' />
            Delete
          </div>
        </div>
      </div>
      <ReactTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />

      <OfferSummary
        closeModal={toggleNonCashlessEsOfferDetailsModal}
        isOpen={openNonCashlessEsOfferDetailsModal}
        offerSummaryData={NonCashlessESCaseOfferData}
      />

      <SummeryModal
        summeryData={summeryData}
        closeModal={toggleSummeryModal}
        isOpen={openSummeryModal}
        toggleNewActionModal={toggleNewActionModal}
      />

      <NewAction
        closeModal={toggleNewActionModal}
        isOpen={openNewActionModal}
        selectValue={action}
        setSelectValue={setAction}
        toggleSummeryModal={toggleSummeryModal}
        newCaseData={summeryData}
        action={action}
      />

      <SentMail
        newCaseData={summeryData}
        closeModal={toggleSentmailModal}
        isOpen={openSentmailModal}
        action={action}
      />

      <ApproveModal
        closeModal={toggleApproveModal}
        isOpen={openApproveModal}
        newCaseData={summeryData}
        action={action}
      />
      <EnchanceAndFciModal
        closeModal={toggleEnhanceAndFciModal}
        isOpen={openEnhanceAndFciModal}
        newCaseData={summeryData}
        action={action}
      />
    </div>
  );
};

export default NonCashlessEarlySettlement;
