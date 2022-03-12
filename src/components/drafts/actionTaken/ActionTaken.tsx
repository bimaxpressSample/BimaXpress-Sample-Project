import React, { useEffect, useState } from 'react';
import FormButton from '../../theme/button/FormButton';
import { IoDocumentsOutline } from 'react-icons/io5';
import { Row, useTable } from 'react-table';
import styles from './ActionTaken.module.css';
import scrollbar from '../../../scrollbar.module.css';
import notification from '../../theme/utility/notification';
import { format } from 'date-fns';

interface ColumnDetails {
  [key: string]: any;
}
type ActionTakenProps = {
  audit_trail?: [];
  summeryData: any;
  toggleNewActionModal: () => void;
  toggleSummeryModal: () => void;
};

const ActionTaken = ({
  audit_trail,
  summeryData,
  toggleNewActionModal,
  toggleSummeryModal,
}: ActionTakenProps) => {
  // const [aditTrailData, setAditTrailData] = useState<any>([]);
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Action Taken',
        accessor: 'actionTaken', // accessor is the "key" in the data
      },
      {
        Header: 'Last Action Date',
        accessor: 'last_action_date',
      },
      {
        Header: 'Summary',
        accessor: 'summery',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Documents',
        accessor: 'documents',
      },
    ],
    []
  );

  const showDoc = (doc: any) => {
    console.log('document in tab', doc);
    for (let i = 5; i < doc.length; i++) {
      console.log('single document', doc[i]);
      window.open(doc[i]);
    }
  };

  useEffect(() => {
    let array: any[] = [];
    if (audit_trail?.length) {
      audit_trail?.forEach((item) => {
        const res = JSON.parse(JSON.stringify(item)).split('+');
        array.push(res);
      });
    }

    const res = array?.map((item, index) => {
      console.log(
        'Testing Date',
        format(new Date(item[1]), "dd-MM-yyyy' 'HH:mm"),
        item[1]
      );
      let toReturn = {
        actionTaken: item[0],
        last_action_date: format(new Date(item[1]), "dd-MM-yyyy' 'HH:mm"), // format(new Date(item[1]), "do MMMM Y"),
        summery: item[2],
        amount: item[3],
        index: index,
      };

      if (item.length > 4 && item[4] !== '' && item[4] !== 'N/A') {
        let new_toReturn = {
          ...toReturn,
          doc: item[4],
          documents: (
            <a
              href={`${item[4] ? (item[4] === 'N/A' ? '#' : item[4]) : '#'}`}
              target={`${item[4] ? (item[4] === 'N/A' ? '#' : '_blank') : '#'}`}
              rel='noreferrer'
            >
              <IoDocumentsOutline
                className='mr-2 text-2xl cursor-pointer'
                onClick={() => showDoc(item)}
              />
            </a>
          ),
        };
        return new_toReturn;
      }

      return toReturn;
    });
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className='mt-6'>
      <div className='flex justify-end'>
        <FormButton
          text='Add Action'
          iconPlus={true}
          handleClick={() => {
            if (!summeryData?.claimno) {
              notification('info', 'Please fill claim number');
              return;
            }
            toggleNewActionModal();
          }}
        />
      </div>

      <div>
        <table
          {...getTableProps()}
          className={`w-full mt-8 overflow-x-scroll ${scrollbar.scrollBarDesign}`}
        >
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
            {rows.map((row: Row<ColumnDetails>) => {
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
      </div>
    </div>
  );
};

export default ActionTaken;
