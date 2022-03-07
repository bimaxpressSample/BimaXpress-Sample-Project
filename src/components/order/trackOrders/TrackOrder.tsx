import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import TableSearch from "../../theme/table/tableSearchInput/TableSearchInput";
import TableSearchButton from "../../theme/table/tableSearchButton/TableSearchButton";
// import { Link } from "react-router-dom";
import ReactTable from "../../theme/reactTable/ReactTable";
import external_link from "../../../assets/icon/external_link.svg";
import filter from "../../../assets/icon/filter.svg";
import NewCaseSelect from "../../theme/select/newCaseSelect/NewCaseSelect";
import InputDate from "../../theme/inputDate/InputDate";
import scrollbar from "../../../scrollbar.module.css";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useAppDispatch } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import { setCaseData } from "../../../redux/slices/homeSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import notification from "../../theme/utility/notification";
import { Link } from "react-router-dom";

const statusList = [
	{ label: "Active", value: "active" },
	{ label: "Pending", value: "pending" },
	{ label: "Completed", value: "completed" },
];

interface ColumnDetails {
	[key: string]: any;
}

const TrackOrder = () => {
	const navigate = useNavigate();

	const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
	const param = useParams();

	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state?.user);
	const { caseData } = useAppSelector((state) => state?.home);

	const [hospitalList, sethospitalList] = useState<any>([]);

	const fetchAnalyst = async () => {
		dispatch(setLoading(true));

		const listOfHospital = await axiosConfig.get(
			`/empanelcompany?email=${user}`
		);

		Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
			hospitalList.push({ label: key.replaceAll("_", " "), value: key });
		});

		sethospitalList(hospitalList);

		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;

		const URL = `/allorders?email=${user}&token=${header}`;
		try {
			// const {Authdata } :any = {} ;
			const { authData }: any = await axiosConfig.post(postUrl);
			const { data } = await axiosConfig.get(URL);

			console.log("Data ", data);

			dispatch(setLoading(false));
			dispatch(setCaseData(data?.data));
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification("error", error?.message);
		}
	};

	console.log("list of hospital ", hospitalList);

	useEffect(() => {
		fetchAnalyst();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [inputValue, setInputValue] = useState("");

	const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

	const columns = React.useMemo(
		() => [
			{
				Header: "Order ID",
				accessor: "orderId", // accessor is the "key" in the data
			},
			{
				Header: "Patient name",
				accessor: "patientName",
			},
			{
				Header: "Delivery Address",
				accessor: "deliveryAddress",
			},
			{
				Header: "Ordered date",
				accessor: "OrderedDate",
			},
			{
				Header: "Insurance TPA",
				accessor: "insuranceTPA",
			},
			{
				Header: "Track",
				accessor: "track",
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

	const downloadInvoice = async (order_id: string) => {
		dispatch(setLoading(true));
		// const URL = `/${param?.case}`;
		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;
		let URL = `/trackorder?shipment_id=${order_id}&token=${header}`;
		try {
			await axiosConfig.get(URL).then((response) => {});
			dispatch(setLoading(false));
			/* console.log(data.data.invoice_url); */
			// return data.data.invoice_url ;
			/* return <a href={`${data.data.invoice_url}`} target="_blank" rel="noreferrer" download ></a> */
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification("error", error?.message);
		}
	};

	useEffect(() => {
		console.log("case data ", caseData);
		const res = Object.entries(caseData)?.map(
			(
				//@ts-ignore
				[
					key,
					{
						order_id: orderId,
						shipment_id: shipmentId,
						names: patientName,
						delivery_address: deliveryAddress,
						order_date: orderDate,
						insuranceCompany: insuranceCompany,
					},
				]
			) => ({
				orderId: orderId,
				patientName: patientName && patientName.join(" , "),
				deliveryAddress: deliveryAddress,
				OrderedDate: orderDate,
				insuranceTPA: insuranceCompany,
				track: (
					<Link to={`/trackYourOrder/${shipmentId}/${orderId}`}>
						<img
							src={external_link}
							alt="icon"
							onClick={() => downloadInvoice(shipmentId)}
						/>
					</Link>
				),
			})
		);
		setTableRow(res);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [caseData]);

	const [options, setOptions] = useState({
		insuranceTPA: "",
		date: "",
	});

	const fetchSelectedHospital = async (selectedHospital: any) => {
		dispatch(setLoading(true));
		// const URL = `/${param?.case}`;
		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;
		let URL = `/insurancefilter?email=${user}&insurance_company=${selectedHospital}&token=${header}`;

		try {
			if (selectedHospital === "") {
				URL = `/allorders?email=${user}&token=${header}`;
			}
			const { data } = await axiosConfig.get(URL);
			console.log("After select URL - ", URL);
			console.log(data); // -------------------------------
			dispatch(setLoading(false));
			dispatch(setCaseData(data?.data));
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification("error", error?.message);
		}
	};

	const fetchSelectedDate = async (selectedDate: any) => {
		dispatch(setLoading(true));
		// const URL = `/${param?.case}`;
		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;
		const arrayDate = selectedDate.split("-");
		const year = arrayDate[0];
		const month = arrayDate[1];
		const date = arrayDate[2];

		const finalDate = date + "/" + month + "/" + year;

		let URL = `/datefilter?email=${user}&date=${finalDate}&token=${header}`;

		try {
			if (selectedDate === "") {
				URL = `/allorders?email=${user}&token=${header}`;
			}
			const { data } = await axiosConfig.get(URL);
			console.log("After select URL - ", URL);
			console.log(data); // -------------------------------
			dispatch(setLoading(false));
			dispatch(setCaseData(data?.data));
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification("error", error?.message);
		}
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
		fetchSelectedHospital(value);
		fetchSelectedDate(value);
	};

	useEffect(() => {
		setPageSize(5);
	}, [setPageSize]);

	return (
		<div
			className={`py-6 px-10 w-full flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}
		>
			<p className="text-base text-fontColor-gray ">
				Find details about doctor and can update details
			</p>
			<div className={`flex items-center justify-between  flex-wrap `}>
				<div className="flex items-center mt-6">
					<div className="mr-4 ">
						<TableSearch
							value={inputValue}
							handleChange={(val: React.SetStateAction<string>) =>
								setInputValue(val)
							}
							placeholder="Search for Name, claim number"
						/>
					</div>
					<div className=" ">
						<TableSearchButton
							handleClick={() => setGlobalFilter(inputValue)}
						/>
					</div>
				</div>

				<div className="flex items-center mt-6">
					<div className="mr-2">
						<img src={filter} alt="icon" />
					</div>
					<div className="mr-2">
						<NewCaseSelect
							options={hospitalList}
							name="insuranceTPA"
							handleChange={handleChange}
							defaultOption="Insurance TPA"
							value={options?.insuranceTPA || ""}
							style={{
								maxWidth: "170px",
								height: "30px",
								backgroundColor: "#FFFFFF17",
								padding: "0px",
								borderRadius: "3px",
								fontSize: "12px",
							}}
						/>
					</div>
					<div>
						<InputDate
							name={options?.date}
							handleChange={handleChange}
							style={{
								height: "30px",
								backgroundColor: "#FFFFFF17",
								borderRadius: "3px",
								maxWidth: "125px",
								fontSize: "12px",
							}}
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
		</div>
	);
};

export default TrackOrder;
