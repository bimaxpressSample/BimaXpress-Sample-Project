import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter, usePagination, Row } from 'react-table';
import { setesData } from '../../redux/slices/earlySettlementSlice';
import { setLoading } from '../../redux/slices/utilitySlice';
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import PaginationButton from '../theme/PaginationButton/PaginationButton';
import notification from '../theme/utility/notification';
import scrollbar from '../../scrollbar.module.css';
import styles from './EarlySettlementDash.module.css';

interface ColumnDetails {
  [key: string]: any;
}

const EarlySettlementDash = () => {
  const [inputValue, setInputValue] = useState('');
  const { esData } = useAppSelector((state) => state?.esData);
  const { user } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);

  const fetchESDashboardData = async () => {
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(`/Es_dashboard?email=${user}`);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    try {
      const { data } = await axiosConfig.get(`/Es_dashboard?email=${user}`);
      dispatch(setLoading(false));
      dispatch(setesData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    fetchESDashboardData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (Object.entries(esData)?.length) {
      const res = Object.entries(esData)?.map(
        (
          //@ts-ignore
          [
            key,
            {
              Patient_name,
              claim_number,
              es_status,
              Insurance_Company,
              Offer_date,
              offer_Amount,
              repayment_date,
              Discharge_Approvedamount,
              settled,
              processing_fee,
            },
          ]
        ) => ({
          name: Patient_name,
          claimNo: claim_number,
          tpa: Insurance_Company,
          disAmount: Discharge_Approvedamount,
          offerAmt: offer_Amount,
          es_status: es_status,
          offerAvailDate: Offer_date,
          settleAmt: settled,
          dateOfSettle: repayment_date,
          processingFees: processing_fee,
        })
      );
      setTableRow(res);
    }
  }, [esData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Patient Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Claim Number',
        accessor: 'claimNo',
      },
      {
        Header: 'TPA/ Insurance Company',
        accessor: 'tpa',
      },
      {
        Header: 'Discharge Approve Amount',
        accessor: 'disAmount',
      },
      {
        Header: 'Offer Amount',
        accessor: 'offerAmt',
      },
      {
        Header: 'Status',
        accessor: 'es_status',
      },
      {
        Header: 'Offer Availed Date',
        accessor: 'offerAvailDate',
      },
      {
        Header: 'Settled Amount',
        accessor: 'settleAmt',
      },
      {
        Header: 'Date of Settlement',
        accessor: 'dateOfSettle',
      },
      {
        Header: 'Processing Fees',
        accessor: 'processingFees',
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
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <div
      className={`py-6 px-10 w-full flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}
    >
      <div className='flex items-center justify-between  flex-wrap'>
        <div className='flex items-center flex-wrap'>
          <div className='mr-4 mt-6'>
            <TableSearch
              value={inputValue}
              handleChange={(val) => setInputValue(val)}
              placeholder='Search'
            />
          </div>
          <div className='mt-6 '>
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>
      </div>

      <table {...getTableProps()} className={`w-full mt-8 my-10`}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`bg-secondary py-3 px-4 text-sm font-semibold text-fontColor text-left ${styles.tableHeader}`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<ColumnDetails>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='px-4 pt-5 pb-12 border-b border-fontColor-darkGray text-sm text-fontColor font-thin last:border-b-0'
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='flex items-center justify-between pt-7'>
        <p className='text-sm text-fontColor text-semibold'>
          Results:{' '}
          <span className='text-sm text-fontColor pl-1'>{page?.length}</span>{' '}
        </p>
        <div className='flex'>
          <div className='pr-2'>
            <PaginationButton
              leftIcon={true}
              handleClick={() => previousPage()}
              disability={!canPreviousPage}
            />
          </div>
          <PaginationButton
            rightIcon={true}
            handleClick={() => nextPage()}
            disability={!canNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default EarlySettlementDash;
