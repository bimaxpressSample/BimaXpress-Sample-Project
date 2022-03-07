import React, { useState, useEffect } from 'react';
import scrollbar from '../../scrollbar.module.css';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import eyeIcon from '../../assets/icon/eye.svg';
import filter from '../../assets/icon/filter.svg';
import { setLoading } from '../../redux/slices/utilitySlice';
import { setBnplCaseData } from '../../redux/slices/bnplSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '@mui/material/Button';
import notification from '../theme/utility/notification';
import axiosConfig from '../../config/axiosConfig';
import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../theme/reactTable/ReactTable';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';

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

const BnplTable = () => {
  const { user } = useAppSelector((state) => state?.user);
  const { bnplCaseData, bnplCurrentBucket } = useAppSelector(
    (state) => state.bnpl
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);

  // const fetchBnplTable = () => {
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

  //   const { user } = useAppSelector((state) => state?.user);
  //   const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  //   const [inputValue, setInputValue] = useState('');

  //   const fetchbnplData = async () => {
  //     dispatch(setLoading(true));
  //     const URL = `URLHERE`;
  //     try {
  //       const { data } = await axiosConfig.get(URL);
  //       dispatch(setLoading(false));
  //       dispatch(setBnplCaseData(data?.data));
  //     } catch (error) {
  //       dispatch(setLoading(false));
  //       //@ts-ignore
  //       notification('error', error?.message);
  //     }
  //   };

  useEffect(() => {
    // fetchBnplTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetails = (value: string) => {
    //@ts-ignore
    const obj = bnplCaseData[value] || {};
  };

  useEffect(() => {
    const res = Object.entries(bnplCaseData)?.map(([key, {}]) => ({
      name: '',
      phone: '',
      hospitalName: '',
      requestedAmount: '',
      tenure: '',
      action: '',
    }));
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bnplCaseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  let columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'Hospital Name',
        accessor: 'hospitalName',
      },
      {
        Header: 'Requested Amount',
        accessor: 'requestedAmount',
      },
      {
        Header: 'Tenure',
        accessor: 'tenure',
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
    </div>
  );
};

export default BnplTable;
