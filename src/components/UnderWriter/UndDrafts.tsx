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
import ReactTable from '../theme/reactTable/ReactTable';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';
import { Link, To } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';
import SummeryModal from '../drafts/Summary/SummeryModal';
import ApproveModal from '../drafts/approveModal/ApproveModal';
import EnchanceAndFciModal from '../drafts/enhanceAndFci/EnchanceAndFci';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setCounter, setCurrentBucket } from '../../redux/slices/homeSlice';

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

const UndDrafts = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { user, UndSelectedHospital } = useAppSelector((state) => state?.user);
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
  const [openEnhanceAndFciModal, setOpenEnhanceAndFciModal] =
    useState<boolean>(false);
  const toggleEnhanceAndFciModal = () => {
    setOpenEnhanceAndFciModal((pre) => !pre);
  };

  useEffect(() => {
    fetchDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const showDetails = (value: string) => {
  //   if (param?.case === 'draftcases') {
  //     navigate(`/newCase/${value}`);
  //   } else {
  //     //@ts-ignore
  //     const obj = caseData[value] || {};
  //     console.log(obj);
  //     setSummeryData(obj);
  //     toggleSummeryModal();
  //   }
  // };

  useEffect(() => {
    const res = Object.entries(caseData)?.map(
      (
        //@ts-ignore
        [
          key,
          {
            Patient_name: Name,
            Insurance_Company: Name2,
            Claim_Number: Policy_Id,
            discharge_approved_date: Date_of_Admission,
            discharge_approved_amount: total,

            Expected_date_of_return: Expected_date_of_return,
            offer_Amount: offer_Amount,
            date_of_availed: date_of_availed,
            days_since_availed: days_since_availed,
          },
        ]
      ) => ({
        name: Name,
        name2: Name2,
        claimNumber: Policy_Id,
        claimAmount: total,
        date: Date_of_Admission,
        expectedDateOfReturn: Expected_date_of_return,
        esoffered: offer_Amount,
        date_of_availed: date_of_availed,
        days_since_availed: days_since_availed,

        action: (
          <Link to={`/patientAvailedCase/${key}/${param.id}`}>
            <BsEye className='text-lg' />
          </Link>
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  console.log(param?.case);

  // const columns ;
  // let columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'Patient Name',
  //       accessor: 'name', // accessor is the "key" in the data
  //     },
  //     {
  //       Header: 'Insurance Company/TPA',
  //       accessor: 'name2',
  //     },
  //     {
  //       Header: 'Claim number',
  //       accessor: 'claimNumber',
  //     },
  //     {
  //       Header: 'Discharge Approved Amount',
  //       accessor: 'claimAmount',
  //     },

  //   ],
  //   []
  // );

  const [hospitalList, sethospitalList] = useState<any>([]);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    // console.log(param?.case);                        // -------------------------------
    // let URL ;
    const URL = `/${param?.case}`;
    // if(selectedHospital === ""){
    // }
    // else{
    //   URL =`/${param?.case}?email=${selectedHospital}` ;
    // }

    try {
      const listOfHospital = await axiosConfig.get(
        `/listofhospitals?email=${user}`
      );

      // Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
      //   hospitalList.push({ label: value, value: key });
      // });
      // sethospitalList(hospitalList);
      // console.log(hospitalList);

      const { data } = await axiosConfig.get(URL);
      // console.log(data);                                // -------------------------------
      dispatch(setLoading(false));
      console.log(data);
      dispatch(setCaseData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    // fetchAnalyst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('email', param.id);
  const fetchDetails = async () => {
    dispatch(setLoading(true));
    // console.log("Params",param?.case);
    let URL = `/${param?.case}?email=${param.id}`;
    // if(UndSelectedHospital === ""){
    //     URL = `/${param?.case}`;
    // }
    try {
      const { data } = await axiosConfig.get(URL);
      console.log(param?.case, '  ', data);
      dispatch(setLoading(false));
      dispatch(setCaseData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const [menuList, setMenuList] = useState<any>([]);
  const { counter } = useAppSelector((state) => state?.home);

  const fetchCounter = async () => {
    dispatch(setLoading(true));
    const URL = `/counter?email=${user}`;

    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCounter(data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification(
        'error',
        //@ts-ignore
        `API Unable to serve data, Please Check API ${error?.message}`
      );
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (!Object.entries(counter).length) {
        fetchCounter();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GoDraftPage = (pageLink: string | To, value: string) => {
    dispatch(setCurrentBucket(value));
    navigate(pageLink);
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   } else {
  //     if (!Object.entries(counter)?.length) {
  //       fetchCounter();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  let columns = React.useMemo(() => {
    switch (param?.case) {
      case 'dischargeBucket':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Discharge Approved Amount',
            accessor: 'claimAmount',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'Date of Discharge Approval ',
            accessor: 'date',
          },
          {
            Header: 'Action',
            accessor: 'action',
          },
        ];

        break;

      case 'patientEnabledCase':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Compnay Name',
            accessor: 'name2',
          },
          {
            Header: 'Discharge Approved Amount',
            accessor: 'claimAmount',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'ES Offered Amount',
            accessor: 'esoffered',
          },
          {
            Header: 'Expected Date of Return',
            accessor: 'expectedDateOfReturn',
          },
        ];
        break;

      case 'patientAvailedCase':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'ES Offered Amount',
            accessor: 'esoffered',
          },
          {
            Header: 'Date of Offer Availed',
            accessor: 'date_of_availed',
          },
          {
            Header: 'Expected Date of Return',
            accessor: 'expectedDateOfReturn',
          },
          {
            Header: 'Days Since ES Offer Availed',
            accessor: 'days_since_availed',
          },
        ];

        break;

      case 'settlementRejected':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'Discharge Approved Amount',
            accessor: 'claimAmount',
          },
        ];

        break;

      case 'settlementSettled':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'ES Offered Amount',
            accessor: 'claimAmount',
          },
          {
            Header: 'Date of Settlement',
            accessor: 'date',
          },
          {
            Header: 'TAT',
            accessor: 'phone',
          },
          {
            Header: 'Interest Charged',
            accessor: 'phone2',
          },
        ];

        break;

      case 'patientSettledCase':
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'ES Offered Amount',
            accessor: 'claimAmount',
          },
          {
            Header: 'Date of Settlement',
            accessor: 'date',
          },
          {
            Header: 'TAT',
            accessor: 'phone',
          },
          {
            Header: 'Interest Charged',
            accessor: 'phone2',
          },
        ];

        break;
      default:
        return [
          {
            Header: 'Patient Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Insurance Company/TPA',
            accessor: 'name2',
          },
          {
            Header: 'Claim number',
            accessor: 'claimNumber',
          },
          {
            Header: 'Discharge Approved ',
            accessor: 'claimAmount',
          },
        ];

        break;
    }
  }, []);

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

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <>
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

        <SummeryModal
          summeryData={summeryData}
          closeModal={toggleSummeryModal}
          isOpen={openSummeryModal}
          toggleNewActionModal={toggleNewActionModal}
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
    </>
  );
};

export default UndDrafts;
