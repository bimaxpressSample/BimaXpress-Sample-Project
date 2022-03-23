import React, { useState, useEffect } from 'react';
import scrollbar from '../../scrollbar.module.css';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../theme/reactTable/ReactTable';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';
import SummeryModal from '../drafts/Summary/SummeryModal';
import NewAction from '../drafts/newAction/NewAction';
import SentMail from '../drafts/sentMail/SentMail';
import ApproveModal from '../drafts/approveModal/ApproveModal';
import EnchanceAndFciModal from '../drafts/enhanceAndFci/EnchanceAndFci';
import filter from '../../assets/icon/filter.svg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setDACaseData } from '../../redux/slices/dischargeApprovedSlice';
import notification from '../theme/utility/notification';
import Button from '@mui/material/Button';
import EsOfferDetailsModal from '../drafts/esModals/esOfferDetailsModal';
import eyeIcon from '../../assets/icon/eye.svg';
import { setCaseData } from '../../redux/slices/homeSlice';
import { useNavigate } from 'react-router-dom';
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

const DischargeApproved = () => {
  const { user } = useAppSelector((state) => state?.user);
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { caseData } = useAppSelector((state) => state?.home);
  const { DACaseData } = useAppSelector((state) => state?.dischargeApproved);
  const [ESCaseData, setESCaseData] = useState({});
  const [summeryData, setSummeryData] = useState({});
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [openEsOfferDetailsModal, setopenEsOfferDetailsModal] =
    useState<boolean>(false);
  const toggleEsOfferDetailsModal = () => {
    setopenEsOfferDetailsModal((pre) => !pre);
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
    const URL = `/Discharge_approved?email=${user}`;
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
  const showESOfferDetails = (value: string) => {
    const fetchESOfferData = async () => {
      dispatch(setLoading(true));
      const URL = `/es_offer_details/${value}?email=${user}`;
      try {
        const { data } = await axiosConfig.get(URL);
        dispatch(setLoading(false));
        let obj = data.data;
        let newData = [];
        newData.push(obj);
        newData.push({ caseNumber: value });

        setESCaseData(newData);
      } catch (error) {
        dispatch(setLoading(false));
        //@ts-ignore
        notification('error', error?.message);
      }
    };
    fetchESOfferData();
    toggleEsOfferDetailsModal();
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

  useEffect(() => {
    const res = Object.entries(DACaseData)?.map(
      ([
        key,
        {
          patient_details: { Name, Phone, Tpa_Company, Insurance_Company },
          hospital_details: { total, Date_of_Admission, admission_time },
          formstatus,
          claimno,
          audit_trail,
          bucketStatus,
        },
      ]) => ({
        case: key,
        name: Name,
        phone: Phone,
        claimNumber: claimno,
        admissionDate: `${Date_of_Admission}  ${admission_time}`,
        claimAmount: total,
        formstatus: formstatus,
        insuranceTPA:
          Tpa_Company && Tpa_Company !== 'NA' ? Tpa_Company : Insurance_Company,
        lastaction: audit_trail[audit_trail.length - 1].split('+')[2],
        action: (
          <img
            src={eyeIcon}
            alt='icon'
            onClick={() => showDetails(key)}
            className='cursor-pointer'
          />
        ),
        earlySettlement: (
          <>
            <Button
              variant='contained'
              size='small'
              style={{
                marginLeft: '5px',
                backgroundColor: bucketStatus === 'Enabled' ? 'white' : 'gray',
                color: 'black',
                fontWeight: '600',
              }}
              onClick={() => showESOfferDetails(key)}
              disabled={false}
              // disabled={bucketStatus === 'Enabled' ? false : true}
            >
              {bucketStatus === 'Enabled' || bucketStatus === ''
                ? 'Settle'
                : bucketStatus === 'Availed'
                ? 'Availed'
                : ''}
            </Button>
          </>
        ),
      })
    );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DACaseData]);

  console.log('DA case', DACaseData);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  let columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Form Status',
        accessor: 'formstatus',
      },
      {
        Header: 'Admission date',
        accessor: 'admissionDate',
      },
      {
        Header: 'Last action',
        accessor: 'lastaction',
      },
      {
        Header: 'Insurance TPA',
        accessor: 'insuranceTPA',
      },
      {
        Header: 'Claim number',
        accessor: 'claimNumber',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
      {
        Header: 'Early Settlement',
        accessor: 'earlySettlement',
      },
    ],
    []
  );

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
    // @ts-ignore
    selectedFlatRows,
    // @ts-ignore
    state: { selectedRowIds },
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

  const [userData, setuserData] = useState({});

  // selectedFlatRows.map(
  //   (d:any) =>  setuserData(d.original)
  // )

  // console.log(selectedFlatRows.map( (d:any) => d.original));

  const casesArr = selectedFlatRows.map((d: any) => d.original.case);
  console.log('arr', casesArr);

  const TPA = selectedFlatRows.map((d: any) =>
    d.original.insuranceTPA.replace(/&/, '%26')
  );

  console.log('TPA ', TPA);
  console.log(
    'is equal',
    TPA.every((val: any) => val === TPA[0])
  );
  console.log('State', userData);

  const handleBookOrder = async (TPA: any, casesArr: any) => {
    let caseString = '';
    for (let i = 0; i < casesArr.length; i++) {
      if (i === casesArr.length - 1) {
        caseString = caseString + casesArr[i];
        break;
      }
      caseString = caseString + casesArr[i] + ',';
    }
    // console.log( "cases string ", caseString);
    // console.log("tpa --- " , TPA[0]);

    dispatch(setLoading(true));
    const URL = `/casesforshipment?email=${user}&cases=${caseString}&insurancecompany=${TPA[0]}`;
    console.log(URL);
    try {
      const { data } = await axiosConfig.post(URL);
      dispatch(setLoading(false));
      // dispatch(setDACaseData(data?.data));
      navigate('/order');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

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
        selectedFlatRows={selectedFlatRows}
        selectedRowIds={selectedRowIds}
      />

      <EsOfferDetailsModal
        closeModal={toggleEsOfferDetailsModal}
        isOpen={openEsOfferDetailsModal}
        caseData={ESCaseData}
      />
      <div style={{ textAlign: 'center' }}>
        {TPA.every((val: any) => val === TPA[0]) && TPA.length ? (
          <button
            style={{
              backgroundColor: 'white',
              width: '200px',
              position: 'relative',
              top: '-25px',
            }}
            onClick={() => handleBookOrder(TPA, casesArr)}
          >
            Book For Shipment
          </button>
        ) : null}
      </div>
      <SummeryModal
        summeryData={summeryData}
        closeModal={toggleSummeryModal}
        isOpen={openSummeryModal}
        toggleNewActionModal={toggleNewActionModal}
        fetchData={fetchAnalyst}
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

export default DischargeApproved;
