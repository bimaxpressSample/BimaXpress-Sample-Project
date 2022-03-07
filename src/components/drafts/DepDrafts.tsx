import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scrollbar from '../../scrollbar.module.css';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import DepReactTable from '../theme/reactTable/DepReactTable';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';

import download from '../../assets/icon/eye.svg';
import filter from '../../assets/icon/filter.svg';

// import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';

import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';
import DepSummeryModal from './Summary/DepSummeryModal';
import DepNewAction from './newAction/DepNewAction';
import DepSentMail from './sentMail/DepSentMail';
import DepApproveModal from './approveModal/DepApproveModal';
import DepEnchanceAndFciModal from './enhanceAndFci/DepEnchanceAndFci';
import DepUnprocessedModal from './unprocessedModal/DepUnprocessedModal';
import DepEnchanceModal from './Depenhance/DepEnchanceModal';
import DepQueryModal from './DepQuery/DepQueryModal';
import DepHome from '../dep/depHome';

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

const DepDrafts = () => {
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
  const [openUnprocessedModal, setOpenUnprocessedModal] =
    useState<boolean>(false);
  const toggleUnprocessedModal = () => {
    setOpenUnprocessedModal((pre) => !pre);
  };
  const [openEnhanceAndFciModal, setOpenEnhanceAndFciModal] =
    useState<boolean>(false);
  const toggleEnhanceAndFciModal = () => {
    setOpenEnhanceAndFciModal((pre) => !pre);
  };
  const [openDepEnhanceModal, setOpenDepEnhanceModal] =
    useState<boolean>(false);
  const toggleDepEnhanceModal = () => {
    setOpenDepEnhanceModal((pre) => !pre);
  };
  const [openDepQueryModal, setOpenDepQueryModal] = useState<boolean>(false);
  const toggleDepQueryModal = () => {
    setOpenDepQueryModal((pre) => !pre);
  };

  const [hospitalList, sethospitalList] = useState<any>([]);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    // console.log(param?.case);                        // -------------------------------
    const URL = `/all${param?.case}`;

    try {
      const listOfHospital = await axiosConfig.get(
        `/listofhospitals?email=${user}`
      );

      Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
        hospitalList.push({ label: value, value: key });
      });
      sethospitalList(hospitalList);
      // console.log(hospitalList);

      const { data } = await axiosConfig.get(URL);
      // console.log(data);                                // -------------------------------
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

  const showDetails = (value: string, value1: string) => {
    if (param?.case === 'dedraftcases') {
      navigate(`/depnewCase/${value}`, { state: { hospital_email: value1 } });
    } else {
      //@ts-ignore
      const obj = caseData[value] || {};
      console.log(obj);
      setSummeryData(obj);
      toggleSummeryModal();
    }
  };

  useEffect(() => {
    if (action === 'query') {
      toggleDepQueryModal();
    }
    if (
      action === 'Approved' ||
      action === 'Reject' ||
      action === 'Discharge_Approved'
    ) {
      toggleApproveModal();
    }
    if (action === 'fci') {
      toggleEnhanceAndFciModal();
    }
    if (action === 'Enhance') {
      toggleDepEnhanceModal();
    }
    if (action === 'Unprocessed') {
      toggleUnprocessedModal();
    }
  }, [action]);

  useEffect(() => {
    const res = Object.entries(caseData)?.map(
      (
        //@ts-ignore
        [
          key,
          {
            patient_details: { Name, Phone, Tpa_Company, Insurance_Company },
            claimno,
            hospital,
            date,
            audit_trail,
            hospital_details: { Date_of_Admission },
            hospital_email,
          },
        ]
      ) => ({
        name: Name,
        phone: Phone,
        claimNumber: claimno,
        admissionDate: Date_of_Admission,
        lastAction: audit_trail[audit_trail.length - 1].split('+')[2],
        hospitalName: hospital,
        insuranceTPA:
          Tpa_Company == null || Tpa_Company == '' || Tpa_Company == 'unselect'
            ? Insurance_Company
            : Tpa_Company,
        date: date,
        action: (
          <img
            src={download}
            alt='icon'
            onClick={() => showDetails(key, hospital_email)}
            className='cursor-pointer'
          />
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
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
        Header: 'Claim number',
        accessor: 'claimNumber',
      },
      {
        Header: 'Admission date',
        accessor: 'admissionDate',
      },
      {
        Header: 'Last Action',
        accessor: 'lastAction',
      },
      {
        Header: 'Hospital Name',
        accessor: 'hospitalName',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },

      {
        Header: 'Insurance TPA',
        accessor: 'insuranceTPA',
      },

      {
        Header: 'Action',
        accessor: 'action',
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
    hospitalList: '',
    insuranceTPA: '',
    dateRange: '',
  });

  const fetchSelectedHospital = async (selectedHospital: any) => {
    dispatch(setLoading(true));
    // const URL = `/${param?.case}`;
    let URL = `/${param?.case}?email=${selectedHospital}`;
    try {
      if (selectedHospital === '') {
        URL = `/all${param?.case}`;
      }
      const { data } = await axiosConfig.get(URL);
      console.log('After select URL - ', URL);
      console.log(data); // -------------------------------
      dispatch(setLoading(false));
      dispatch(setCaseData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const handleHospitalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    setOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    fetchSelectedHospital(value);
  };

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
                options={hospitalList}
                // options={listOfHospitals}
                name='hospitalList'
                handleChange={handleHospitalChange}
                defaultOption='All Hospital'
                value={options?.hospitalList || ''}
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
            <div className='mr-2'>
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
      <DepReactTable
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

      <DepSummeryModal
        summeryData={summeryData}
        closeModal={toggleSummeryModal}
        isOpen={openSummeryModal}
        toggleNewActionModal={toggleNewActionModal}
      />

      <DepNewAction
        closeModal={toggleNewActionModal}
        isOpen={openNewActionModal}
        selectValue={action}
        setSelectValue={setAction}
        toggleSummeryModal={toggleSummeryModal}
        newCaseData={summeryData}
        action={action}
      />

      <DepSentMail
        newCaseData={summeryData}
        closeModal={toggleSentmailModal}
        isOpen={openSentmailModal}
        action={action}
      />

      <DepApproveModal
        closeModal={toggleApproveModal}
        isOpen={openApproveModal}
        newCaseData={summeryData}
        action={action}
      />
      <DepUnprocessedModal
        closeModal={toggleUnprocessedModal}
        isOpen={openUnprocessedModal}
        newCaseData={summeryData}
        action={action}
      />
      <DepEnchanceAndFciModal
        closeModal={toggleEnhanceAndFciModal}
        isOpen={openEnhanceAndFciModal}
        newCaseData={summeryData}
        action={action}
      />
      <DepEnchanceModal
        closeModal={toggleDepEnhanceModal}
        isOpen={openDepEnhanceModal}
        newCaseData={summeryData}
        action={action}
      />
      <DepQueryModal
        closeModal={toggleDepQueryModal}
        isOpen={openDepQueryModal}
        newCaseData={summeryData}
        action={action}
      />
    </div>
  );
};

export default DepDrafts;
