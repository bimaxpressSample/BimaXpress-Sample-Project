import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scrollbar from '../../scrollbar.module.css';
import Button from '@mui/material/Button';
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

import { setRemremTableData } from '../../redux/slices/reimbursementSlice';
import filter from '../../assets/icon/filter.svg';

// import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';

import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setRemCaseData } from '../../redux/slices/reimbursementSlice';
import notification from '../theme/utility/notification';
import eyeIcon from '../../assets/icon/eye.svg';
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

const ReimbursementTableData = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { remTableData } = useAppSelector((state) => state?.reimbursement);
  const navigate = useNavigate();

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/${
      param.case === 'rmdraftcases'
        ? 'CRdraftcases'
        : param?.case === 'rmcompletecase'
        ? 'CRcompletecases'
        : 'caseprinted'
    }?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setRemremTableData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  function printform(key: any, Tpa_Company: any, Insurance_Company: any) {
    window.open(
      // Hardcoded value Need to be changed
      `http://localhost:3001/${
        Tpa_Company && Tpa_Company !== 'NA' ? Tpa_Company : Insurance_Company
      }/${user}/${key}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
  const openCRCase = async (caseNumber: string) => {
    dispatch(setLoading(true));
    const URL = `/CRauthdata?email=${user}&casenumber=${caseNumber}`;
    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      console.log(data);
      dispatch(setLoading(false));
      dispatch(setRemCaseData(data));
      navigate(`/reimbursementNewCase/${caseNumber}`);
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

  useEffect(() => {
    const res = Object.entries(remTableData)?.map(
      ([
        key,
        {
          patient_details: {
            Name,
            name_patient,
            ipd_patient_number,
            Insurance_Company,
            Tpa_Company,
          },
          reimbursementstatus,
          formstatus,
          hospital_details: {},
        },
      ]) => ({
        name: Name,
        ipdNumber: ipd_patient_number,
        insuranceTPA:
          Tpa_Company && Tpa_Company !== 'NA' ? Tpa_Company : Insurance_Company,
        claimReimStatus: reimbursementstatus,
        formStatus: formstatus ? 'Moved Case' : 'Fresh Case',
        viewEdit: (
          <img
            src={eyeIcon}
            alt='icon'
            onClick={() => openCRCase(key)}
            className='cursor-pointer'
          />
        ),
        printForm: (
          <Button
            variant='contained'
            size='small'
            style={{
              marginLeft: '5px',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '600',
            }}
            onClick={() => printform(key, Tpa_Company, Insurance_Company)}
          >
            Print
          </Button>
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remTableData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);
  let columns = React.useMemo(
    () => [
      {
        Header: 'Patient Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'IPD Number',
        accessor: 'ipdNumber',
      },

      {
        Header: 'Insurance TPA',
        accessor: 'insuranceTPA',
      },

      {
        Header: 'Reimbursement Status',
        accessor: 'claimReimStatus',
      },
      {
        Header: 'Form Status',
        accessor: 'formStatus',
      },
    ],
    []
  );

  if (param?.case !== 'printcase') {
    columns.push({
      Header: 'View/Edit',
      accessor: 'viewEdit',
    });
  } else {
    columns.push({
      Header: 'Print Form',
      accessor: 'printForm',
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
    </div>
  );
};

export default ReimbursementTableData;
