import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scrollbar from '../../scrollbar.module.css';
import { setpreAuthData } from '../../redux/slices/caseSlice';

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
import Button from '@mui/material/Button';
import download from '../../assets/icon/eye.svg';
import filter from '../../assets/icon/filter.svg';

// import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';

import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';
import SummeryModal from './Summary/SummeryModal';
import NewAction from './newAction/NewAction';
import SentMail from './sentMail/SentMail';
import ApproveModal from './approveModal/ApproveModal';
import EnchanceAndFciModal from './enhanceAndFci/EnchanceAndFci';

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
  { label: 'Last day', value: '1' },
  { label: 'Last 15 days', value: '15' },
  { label: 'Last month', value: '30' },
  { label: 'Last quarter', value: '90' },
  { label: 'Last year', value: '365' },
];

interface ColumnDetails {
  [key: string]: any;
}

const Drafts = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const [summeryData, setSummeryData] = useState({});
  const [action, setAction] = useState('');

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

  const [TPAList, setTPAList] = useState<any>([]);

  console.log(TPAList);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/${param?.case}?email=${user}`;
    try {
      const listOfTPA = await axiosConfig.get(
        `/empanelledinsurancecompany?email=${user}`
      );

      Object.entries(listOfTPA.data.data).map(([key, value]) => {
        TPAList.push({
          label: value,
          value: value,
        });
      });
      setTPAList(TPAList);

      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCaseData(data?.data));
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

  const [openEnhanceAndFciModal, setOpenEnhanceAndFciModal] =
    useState<boolean>(false);
  const toggleEnhanceAndFciModal = () => {
    setOpenEnhanceAndFciModal((pre) => !pre);
  };

  const convertcasetoclaimRem = async (e: string) => {
    dispatch(setLoading(true));
    const URL = `/convertcasetoreimbursementcase?email=${user}&casenumber=${e}`;
    try {
      const {
        data: { data },
      } = await axiosConfig.post(URL);
      dispatch(setLoading(false));

      if (data === 'case is already converted') {
        //@ts-ignore
        notification('info', 'Case already converted to Reimbursement');
      } else {
        navigate('/reimbursementHome');
      }
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const showDetails = (value: string) => {
    if (param?.case === 'draftcases') {
      navigate(`/newCase/${value}`);
    } else {
      //@ts-ignore
      const obj = caseData[value] || {};
      setSummeryData(obj);
      toggleSummeryModal();
    }
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

  // In case of dischage approved an additional btn is mapped else not
  //Choose object name same as accessor of header
  useEffect(() => {
    console.log('Entire case data', caseData);
    const res = Object.entries(caseData)?.map(
      ([
        key,
        {
          patient_details: { Name, Phone, Tpa_Company, Insurance_Company },
          hospital_details: { total, Date_of_Admission, admission_time },
          formstatus,
          claimno,
          audit_trail,
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
            src={download}
            alt='icon'
            onClick={() => showDetails(key)}
            className='cursor-pointer'
          />
        ),
        reimbursement: (
          <Button
            variant='contained'
            size='small'
            style={{
              marginLeft: '15%',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '600',
            }}
            onClick={() => convertcasetoclaimRem(key)}
          >
            Convert
          </Button>
        ),
      })
    );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData, summeryData]);

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
    ],
    []
  );

  if (param?.case === 'rejectcases') {
    columns.push({
      Header: 'Convert to Reimbursement',
      accessor: 'reimbursement',
    });
  }

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

  console.log(
    'Cases Selected',
    selectedFlatRows.map((d: any) => d.original.case)
  );

  const fetchSelectedTPA = async () => {
    dispatch(setLoading(true));
    // const URL = `/${param?.case}`;
    let formstatus = '';
    switch (param.case) {
      case 'draftcases':
        formstatus = 'draft';
        break;
      case 'unprocessedcases':
        formstatus = 'unprocessed';
        break;
      case 'querycases':
        formstatus = 'query';
        break;
      case 'approvedcases':
        formstatus = 'approved';
        break;
      case 'rejectcases':
        formstatus = 'reject';
        break;
      case 'enhancedcases':
        formstatus = 'enhance';
        break;
      case 'fcicases':
        formstatus = 'fci';
        break;
      case 'discharge_approved':
        formstatus = 'dischargeapproved';
        break;
      case 'settledcases':
        formstatus = 'settle';
        break;
      default:
        formstatus = 'draft';
    }
    let URL = `/insurancecompanyfilter?email=${user}&insurancecompany=${options.insuranceTPA}&days=${options.dateRange}&formstatus=${formstatus}`;
    console.log(URL);
    try {
      if (options.insuranceTPA === '' || options.dateRange === '') {
        const { data } = await axiosConfig.get(`/${param?.case}?email=${user}`);
        console.log('After select URL - ', URL);
        console.log(data); // -------------------------------
        dispatch(setLoading(false));
        dispatch(setCaseData(data?.data));
      } else {
        console.log('option date', options.dateRange);
        const { data } = await axiosConfig.get(
          `/insurancecompanyfilter?email=${user}&insurancecompany=${options.insuranceTPA}&days=${options.dateRange}&formstatus=${formstatus}`
        );
        console.log('After select URL - ', URL);
        console.log(data); // -------------------------------
        dispatch(setLoading(false));
        dispatch(setCaseData(data?.data));
      }
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };
  console.log('date range option', options);

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
    // fetchSelectedTPA();
  };

  useEffect(() => {
    fetchSelectedTPA();
  }, [options]);

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
                options={TPAList}
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
          <div
            className='flex items-center text-xs text-fontColor cursor-pointer'
            onClick={() => {
              notification('info', 'delete will be soon implemented');
            }}
          >
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

      <SummeryModal
        summeryData={summeryData}
        setSummeryData={setSummeryData}
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

export default Drafts;
