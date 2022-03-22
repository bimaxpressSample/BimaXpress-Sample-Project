import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import ReactTable from '../../theme/reactTable/ReactTable';
import TableCheckbox from '../../theme/table/tableCheckbox/TableCheckbox';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import { setCaseData } from '../../../redux/slices/homeSlice';
import notification from '../../theme/utility/notification';
import SentMail from './SentMail';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';

interface ColumnDetails {
  [key: string]: any;
}

const confirmationStatus = [
  { label: 'Confirmation Pending', value: 'Confirmation Pending' },
  { label: 'Confirmed', value: 'Confirmed' },
  { label: 'Denied', value: 'Denied' },
];

export default function IntimationPanel() {
  const navigate = useNavigate();
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);

  const [AccountDetails, setAccountDetails] = useState({
    bankName: 'Axis Bank',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const [selectedModal, setselectedModal] = useState({
    companyName: '',
  });

  const toggleModal = (companyname: any) => {
    setselectedModal({
      companyName: companyname,
    });
    setOpenModal((pre) => !pre);
  };

  const closeModal = () => {
    setOpenModal((pre) => !pre);
  };

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const fetchEmpanelCompany = async () => {
    dispatch(setLoading(true));
    const URL = `/EmailResponse?email=${user}`;
    const AccountDetailURL = `/AccountDeta?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      console.log(data);
      dispatch(setCaseData(data?.data));

      const AccData = await axiosConfig.get(AccountDetailURL);
      console.log('account details', AccData.data.data);
      setAccountDetails({
        bankName: 'Axis Bank',
        accountNumber: AccData.data.data.HospitalAccount.AccountNumber,
        ifscCode: AccData.data.data.HospitalAccount.IFSC_CODE,
        accountHolderName: AccData.data.data.HospitalAccount.AccountHolderName,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    fetchEmpanelCompany();
    // console.log("new case data intimation",newCaseData);
    console.log('case data intimation', caseData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Insurance Company/TPA',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Mail',
        accessor: 'mail',
      },
      {
        Header: 'Mail Status',
        accessor: 'mailStatus',
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status2',
      // },
      {
        Header: 'Confirmation Status',
        accessor: 'confirmationStatus',
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

  // ----------------- used to send data t react table ----------------------------
  const [status , setStatus] = useState({});

  const handleChange = (e:any) =>{
    const {name , value} = e.target ;
    setStatus((pre : any) =>({
      ...pre,
      [name]:value
    }));
  }
  console.log(status);

  useEffect(() => {

    const res = Object.entries(caseData)?.map(
      
      (
        //@ts-ignore
        [companyname, value]
      ) => (
        {

        name: companyname,

        mail: (
          <svg
            onClick={() => toggleModal(companyname)}
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-envelope'
            viewBox='0 0 16 16'
          >
            <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z' />
          </svg>
        ),
        mailStatus: (
          <div>
            <div className='dropdown inline-block relative'>
              {/* <span className="w-2 bg-gray-300 text-gray-700 font-semibold py-2 px-2 text-center rounded inline-flex items-center"> */}
              <span className='px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-300 text-gray-700'>
                {value === 'Sent' ? 'Mail Sent' : 'Mail Not Sent' }
              </span>
            </div>
          </div>
        ),
        // status2: (
        //   <span className='px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-400 text-green-900'>
        //     {value === ''
        //       ? 'Mail Not Sent'
        //       : value === 'Sent'
        //       ? 'Yet to Confirm'
        //       : 'No Response'}
        //   </span>
        // ),
        confirmationStatus: (
          // <span className='px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-400 text-yellow-900'>
          //   Pending
          // </span>
          <NewCaseSelect
            options={confirmationStatus}
            name={companyname}
            handleChange={handleChange}
            defaultOption='Select Status'
            // label='Third Party Administrator (TPA)'
            //@ts-ignore
            value={status[`${companyname}`] || ''}
            />
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData,status]);

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <div className='p-8'>
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
      <SentMail
        closeModal={closeModal}
        isOpen={openModal}
        AccountDetails={AccountDetails}
        companyDetail={selectedModal}
        fetchEmpanelCompany={fetchEmpanelCompany}
      />
    </div>
  );
}
