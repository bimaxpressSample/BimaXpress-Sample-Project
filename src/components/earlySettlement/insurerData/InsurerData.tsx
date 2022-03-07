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
import UploadModal from './UploadModal' ;

interface ColumnDetails {
	[key: string]: any;
}

function InsurerData() {

	const navigate = useNavigate();

	const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
	const param = useParams();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state?.user);
	const { caseData } = useAppSelector((state) => state?.home);

	const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

	const [AllCompanies , setAllCompanies] = useState<any>([]);
	
	const [attachedData, setattachedData] = useState<any>({
		companyname : ["File"],
	});

	const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

	
	const [modalData , setmodalData] = useState<any>("");

    const toggleUploadModal = (companyname:any) => {
		setmodalData(companyname);
        setOpenUploadModal((pre) => !pre);
    };
    
	const closeUploadModal = () => {
        setOpenUploadModal((pre) => !pre);
    };

	const fetchEmpanelCompany = async () => {
		dispatch(setLoading(true));
		let URL = `/SendResponse?email=${user}`;
		try {
			let { data } = await axiosConfig.get(URL);

			console.log("data.data",data.data);
			setAllCompanies(data.data);
			// const entriesData = Object.entries(data.data).map((e) => (e : []));
			const keyData = Object.keys(data.data).map((e) => (e));
			const  valueData = Object.values(data.data).map((e) => ([]));

			// var result : any = {};
			// for (var i = 0; i < keyData.length; i++) {
			// 		result[keyData[i]+"1"] = valueData[i];
			// 		result[keyData[i]+"2"] = valueData[i];
			// }
			// setattachedData(result);
			
			console.log("key",keyData);
			console.log("value",valueData);

			dispatch(setLoading(false));
			// const alldata = [...data?.data, ...AllCompanies];
			dispatch(setCaseData(data.data));
		} catch (error) {
			dispatch(setLoading(false));
			//@ts-ignore
			notification('error', error?.message);
		}
	};

	

	useEffect(() => {
		if(!attachedData.length){
			fetchEmpanelCompany();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Insurance Company/TPA',
				accessor: 'name', // accessor is the "key" in the data
			},
			{
				Header: 'Document',
				accessor: 'document',
			},
			{
				Header: 'Status',
				accessor: 'status',
			},
			{
				Header: 'Download',
				accessor: 'download',
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
	
	const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
    ) => {
		e.preventDefault();
        const { name, value } = e?.target;
        // if (name === "AadharCard") {
        //     setData((pre: any) => ({
        //         ...pre,
        //         //@ts-ignore
        //         [name]: [...pre[name], ...e?.target?.files],
        //     }));
        // } else {
        //     setData((pre: any) => ({ ...pre, [name]: value }));
        // }
		console.log("value0 ",value)
        setattachedData((pre: any) => ({
            ...pre,
            //@ts-ignore
            [name]: [...e?.target?.files],
        }));
    };
	console.log("state " ,attachedData);

	console.log("case data  " , caseData);

	const imageUpload = async (files : any , companyName:any) => {
		const IMAGEUPLOAD = `/EmpanelUpload?email=${user}`;
		const imageFormData = new FormData();
		let name: string | Blob | any[] = [];
		let image: string | Blob | any[] = [];
		// const files = attachedData ;
		console.log("files ---" ,files);
		console.log("state inside function" , attachedData);
		console.log("Company name inside Function" ,companyName);

    };


    const uploadFile = ( companyName : any) => {

	dispatch(setLoading(true));
	try {
		console.log("file in upload" , attachedData);
	    const image = imageUpload(attachedData , companyName);
	    dispatch(setLoading(false));
	    notification("info", `Document Uploaded successfully`);

	} catch (error) {
	    dispatch(setLoading(false));
	    //@ts-ignore
	    notification("error", error?.message);
	}
    };

	const DownloadFile = async(companyname : any ) => {
		const FILEDOWNLOAD = `/ViewForm?email=${user}&companyname=${companyname}`;
		await axiosConfig.get(FILEDOWNLOAD).then((response) => {
			console.log("respone -- " ,response.data.data[0][0]);
			const url = window.URL.createObjectURL(new Blob([response.data.data[0][0]]));
			console.log("url --",url);
			const link = document.createElement('a');
			console.log(response.data[0]);
			console.log("link",link);                     
			link.href = response.data.data[0][0];
			link.href = url ;
			link.setAttribute('target', '_blank'); 
			link.setAttribute('download',""); 
			document.body.appendChild(link);
			link.click();
		});
	}
	

	// ----------------- used to send data t react table ----------------------------

	useEffect(() => {
		const res = Object.entries(caseData)?.map(
			(
				//@ts-ignore
				[
					companyname, value 
				]
			) => ({
				name: companyname,
				document: (
					value === "submitted" ? (
						<button disabled className="px-4 py-2 inline-flex text-sm leading-5 font-semibold bg-green-100 text-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
							Uploaded
						</button>
						):(
						<>
							<UploadModal
								// key={index}
								// closeModal={closeUploadModal}
								// isOpen={openUploadModal}
								modalData={companyname}
							/>
							{/* <button onClick={() => toggleUploadModal(companyname)} className="px-4 py-2 inline-flex text-sm leading-5 font-semibold bg-green-400 text-green-900 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
								Upload
							</button> */}
						</>
					)
				),
				status: (
					<span className="px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-300 text-gray-700">
					{
						value === "submitted" ? 'Submitted' :  "Not Submit"
					}	
					</span>
				),
				download: (
					<button onClick={() => DownloadFile(companyname)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-primary-lighter text-xs font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
						Click To Download
					</button>
				)
			})
		);
		setTableRow(res);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [caseData]);

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

			<div className='flex justify-end mt-10'>
				<button onClick={() => navigate('/AccountDetails')} type="button" className="mr-4 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
					Next
				</button>
			</div>
			{/* <UploadModal
				closeModal={closeUploadModal}
				isOpen={openUploadModal}
				modalData={modalData}
			/> */}
		</div>
	);
}

export default InsurerData ;
