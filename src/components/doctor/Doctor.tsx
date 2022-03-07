import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { BsEye } from "react-icons/bs";
import FormButton from "../theme/button/FormButton";
import TableSearch from "../theme/table/tableSearchInput/TableSearchInput";
import TableSearchButton from "../theme/table/tableSearchButton/TableSearchButton";
import { Link } from "react-router-dom";
import ReactTable from "../theme/reactTable/ReactTable";
import axiosConfig from "../../config/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import notification from "../theme/utility/notification";
import { setDoctorList } from "../../redux/slices/doctorSlice";
import scrollbar from '../../scrollbar.module.css';
interface ColumnDetails {
  [key: string]: any;
}

const Doctor = () => {
  const { user } = useAppSelector((state) => state?.user);
  const { doctorList } = useAppSelector((state) => state?.doctor);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);

  const fetchDoctor = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosConfig.get(`/doctor?email=${user}`);

      dispatch(setLoading(false));
      dispatch(setDoctorList(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (!Object.entries(doctorList)?.length) {
      fetchDoctor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.entries(doctorList)?.length) {
      const res = Object.entries(doctorList)?.map(
        (
          //@ts-ignore
          [key, { name, phone, email, speciality, doctorRegistrationNo, qualification }]
        ) => ({
          name,
          mobile: phone,
          emailAddress: email,
          registeredNumber: doctorRegistrationNo,
          qualification: qualification,
          speciality:speciality,

          action: (
            <Link to={`/doctor/${key}`}>
              <BsEye className="text-lg" />
            </Link>
          ),
        })
      );
      setTableRow(res);
    }
  }, [doctorList]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Speciality",
        accessor: "speciality",
      },
      {
        Header: "Registration number",
        accessor: "registeredNumber",
      },
      {
        Header: "Qualification",
        accessor: "qualification",
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
        Find details about doctor and can update details
      </p>
      <div className="flex items-center justify-between  flex-wrap">
        <div className="flex items-center flex-wrap">
          <div className="mr-4 mt-6">
            <TableSearch
              value={inputValue}
              handleChange={(val) => setInputValue(val)}
              placeholder="Search for doctor name"
            />
          </div>
          <div className="mt-6 ">
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>
        <Link to="/doctor/create" className="mt-6 ">
          <FormButton text="Add Doctor" iconPlus={true} />
        </Link>
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

export default Doctor;
