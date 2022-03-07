import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scrollbar from '../../../scrollbar.module.css';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import TableSearch from '../../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../../theme/reactTable/ReactTable';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../../theme/table/tableCheckbox/TableCheckbox';
import download from './../../../assets/icon/eye.svg'
import filter from '../../../assets/icon/filter.svg';
// import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import { setCaseData } from '../../../redux/slices/homeSlice';
import notification from '../../theme/utility/notification';
import Button from '@mui/material/Button';
import UploadModal from './UploadModal';


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

const NonCashlessDrafts = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const [summeryData, setSummeryData] = useState({});
  const [action, setAction] = useState('');

  const [TPAList , setTPAList] = useState<any>([]);

  console.log(TPAList);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/${param?.case}?email=${user}`;
    try {

      /* const listOfTPA = await axiosConfig.get(
        `/empanelcompany?email=${user}`
      );

      Object.entries(listOfTPA.data.data).forEach(([key, value]) => {
        TPAList.push({ label: key.replaceAll("_"," "), value: key });
      });
      setTPAList(TPAList); */


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

  /* const showDetails = (value: string) => {
    if (param?.case === 'draftcases') {
      navigate(`/newCase/${value}`);
    } else {
      //@ts-ignore
      const obj = caseData[value] || {};
      setSummeryData(obj);
      toggleSummeryModal();
    }
  }; */

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
        navigate('/ReimbursementTableData/rmdraftcases');
      }
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  /* useEffect(() => {
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
  }, [action]); */

  // In case of dischage approved an additional btn is mapped else not
  //Choose object name same as accessor of header
  useEffect(() => {
    const res = Object.entries(caseData)?.map(
      ([
        key,
        {
          //@ts-ignore
          Patient_name: Patient_name,
          //@ts-ignore
          claimno: claimno,
          //@ts-ignore
          Insurance_Company: insurance_Company,
          //@ts-ignore
          discharge_approved_amount:discharge_approved_amount ,
        },
      ]) => ({
        name: Patient_name,
        claimNumber: claimno,
        dischargeApprovedAmount: discharge_approved_amount,
        insuranceCompany: insurance_Company,
        attachDocuments: (
            <UploadModal
                casenum={key}
            />
        ),
      })
    );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData]);

  console.log("case Data",caseData)

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  let columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
     
      {
        Header: 'Claim number',
        accessor: 'claimNumber',
      },

      {
        Header: 'Insurance Company',
        accessor: 'insuranceCompany',
      },
      {
        Header: 'Discharge Approved Amount',
        accessor: 'dischargeApprovedAmount',
      },
      {
        Header: 'Attach Documents',
        accessor: 'attachDocuments',
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

  const fetchSelectedTPA = async ( selectOption: any) => {
    dispatch(setLoading(true));
    // const URL = `/${param?.case}`;
    let formstatus = "" ;
    switch(param.case){
      case 'draftcases': 
          formstatus = "draft" 
          break ;
      case 'unprocessedcases': 
          formstatus = "unprocessed" 
          break ;
      case 'querycases': 
          formstatus = "query" 
          break ;
      case 'approvedcases': 
          formstatus = "approved" 
          break ;
      case 'rejectcases': 
          formstatus = "reject" 
          break ;
      case 'enhancedcases': 
          formstatus = "enhance" 
          break ;
      case 'fcicases': 
          formstatus = "fci" 
          break ;
      case 'discharge_approved': 
          formstatus = "dischargeapproved" 
          break ;
      case 'settledcases': 
          formstatus = "settle" 
          break ;
      default :
          formstatus = "draft"   
    }
    let URL = `/insurancecompanyfilter?email=${user}&insurancecompany=${selectOption.insuranceTPA}&days=${selectOption.dateRange}&formstatus=${formstatus}`;
    try {
      if (selectOption.insuranceTPA === '' && selectOption.dateRange === '') {
        URL = `/${param?.case}?email=${user}`;
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
  console.log()
 

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
    fetchSelectedTPA(options);                      //       uncomment and change API to use filter 
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
                value={options?.dateRange}
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

export default NonCashlessDrafts;
