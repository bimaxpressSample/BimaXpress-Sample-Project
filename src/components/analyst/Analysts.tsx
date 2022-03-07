import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination, Row } from "react-table";
import { BsEye } from "react-icons/bs";
import scrollbar from "../../scrollbar.module.css";
import styles from './Analysts.module.css';
import FormButton from "../theme/button/FormButton";
import TableSearch from "../theme/table/tableSearchInput/TableSearchInput";
import TableSearchButton from "../theme/table/tableSearchButton/TableSearchButton";
import { Link } from "react-router-dom";
import PaginationButton from "../theme/PaginationButton/PaginationButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import axiosConfig from "../../config/axiosConfig";
import { setAnalystList } from "../../redux/slices/analystSlice";
import notification from "../theme/utility/notification";

interface ColumnDetails {
  [key: string]: any;
}

const Analyst = () => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useAppSelector((state) => state?.user);
  const { analystList } = useAppSelector((state) => state?.analyst);
  const dispatch = useAppDispatch();
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/analyst?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setAnalystList(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (!Object.entries(analystList)?.length) {
      fetchAnalyst();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Object.entries(analystList)?.length) {
      const res = Object.entries(analystList)?.map(
        (
          //@ts-ignore
          [key, { name, phone, email, employeeId }]
        ) => ({
          name,
          mobile: phone,
          emailAddress: email,
          employeeId,

          action: (
            <Link to={`/analyst/${key}`}>
              <BsEye className="text-lg" />
            </Link>
          ),
        })
      );
      setTableRow(res);
    }
  }, [analystList]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Employee ID",
        accessor: "employeeId",
      },
      {
        Header: "Email address",
        accessor: "emailAddress",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Action",
        accessor: "action",
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
    <div className={`py-6 px-10 w-full flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}>
      <p className="text-base text-fontColor-gray ">
        Find details about analyst and can update details
      </p>
      <div className="flex items-center justify-between  flex-wrap">
        <div className="flex items-center flex-wrap">
          <div className="mr-4 mt-6">
            <TableSearch
              value={inputValue}
              handleChange={(val) => setInputValue(val)}
              placeholder="Search for hospital name"
            />
          </div>
          <div className="mt-6 ">
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>
        <Link to="/analyst/create" className="mt-6 ">
          <FormButton text="Add Analyst" iconPlus={true} />
        </Link>
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
                  {column.render("Header")}
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
                      className="px-4 pt-5 pb-12 border-b border-fontColor-darkGray text-sm text-fontColor font-thin last:border-b-0"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between pt-7">
        <p className="text-sm text-fontColor text-semibold">
          Results:{" "}
          <span className="text-sm text-fontColor pl-1">{page?.length}</span>{" "}
        </p>
        <div className="flex">
          <div className="pr-2">
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

export default Analyst;
