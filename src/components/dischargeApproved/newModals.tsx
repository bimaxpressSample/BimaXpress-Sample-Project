import React, { useState, useEffect,Component } from 'react';
import scrollbar from '../../scrollbar.module.css';import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../theme/reactTable/ReactTable';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';

import filter from '../../assets/icon/filter.svg';

// import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';

import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setDACaseData } from '../../redux/slices/newModalsSlice';
import notification from '../theme/utility/notification';
import Button from '@mui/material/Button';
import EsOfferDetailsModal from '../drafts/esModals/esOfferDetailsModal';
import { useNavigate, useParams } from 'react-router-dom';
import { setShipmentData } from '../../redux/slices/shipmentSlice';
import { useLocation } from "react-router-dom";

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

const NewModals = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { DACaseData } = useAppSelector((state) => state?.newModals);
  const [ESCaseData, setESCaseData] = useState({});
  const { user } = useAppSelector((state) => state?.user);
  const { bookOrderData } = useAppSelector((state) => state?.bookOrderData);
  const { shipmentData } = useAppSelector((state) => state?.shipmentData);

  const param = useParams();
  const location = useLocation();

  // console.log("fharshdiwan",DACaseData);

  const navigate = useNavigate();

  console.log("Redux shipment data", shipmentData);
  

  const [openEsOfferDetailsModal, setopenEsOfferDetailsModal] =
    useState<boolean>(false);
  const toggleEsOfferDetailsModal = () => {
    setopenEsOfferDetailsModal((pre) => !pre);
  };

  
  // console.log("parmass" , param.company , "     " , param.weight);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

    const {data} =  await axiosConfig.post(postUrl);
    const header = data.data.token ;

    const URL = `/checkserviceability?email=${user}&insurancecompany=${param.company}&weight=${param.weight}&token=${header}`;

    // const awb = `/awbnumber?shipment_id=${user}&courier_company_id=${param.company}&token=${header}`;
    
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setDACaseData(data?.data));
      console.log(data?.data)
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
  
  // console.log("book order" , bookOrderData);
  console.log("grdg",DACaseData);


  const showESOfferDetails = (value: string) => {
    navigate('/order');
    };




  // In case of dischage approved an additional btn is mapped else not
  //Choose object name same as accessor of header
  useEffect(() => {
    const res = Object.entries(DACaseData)?.map(
      ([
          available_courier_companies,
          {
            rate,
            courier_company_id,
            courier_name,
          }
      ]) => ({
        // case: key,
        name: courier_name,
        claimNumber: courier_company_id,
        // approveAmount: Approvedamount,
        rate: `${Number(rate).toFixed(2)}`,
        earlySettlement: (
          <Button

            variant='contained'
            size='small'
            style={{
              marginLeft: '27px',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '600',
            }}
            // onClick={() => navigate('/order')}
            
            onClick={() =>handleBookOrder(courier_company_id,rate)}
          >
            Book
             
          </Button>
        ),
      })
    );
    setTableRow(res);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DACaseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  let columns = React.useMemo(
    () => [
      {
        Header: 'Courier ID',
        accessor: 'claimNumber', // accessor is the "key" in the data
      },
      {
        Header: 'Courier Name',
        accessor: 'name',
      },
      {
        Header: 'Courier Rate',
        accessor: 'rate',
      },
      // {
      //   Header: 'Courier ',
      //   accessor: 'insuranceTPA',
      // },
      {
        Header: '',
        accessor: 'earlySettlement',
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
    selectedFlatRows,
    // @ts-ignore
    state: {selectedRowIds},
    
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

  const [userData,setuserData] = useState({});

 
  // selectedFlatRows.map(
  //   (d:any) =>  setuserData(d.original)
  // )

  // console.log(selectedFlatRows.map( (d:any) => d.original));
  const casesArr = selectedFlatRows.map( (d:any) => d.original.case);
  console.log("arr",casesArr);

  const TPA = selectedFlatRows.map( (d:any) => d.original.insuranceTPA.replace(/&/,'%26'));
  
  console.log("TPA ", TPA);
  console.log("is equal",TPA.every((val:any) => val === TPA[0]));
    console.log("State",userData);


  const deductAmountFromWallet = async(rate:any) =>{
      
    const orderformData = new FormData();
      orderformData?.append("amount",`${Number(Number(rate).toFixed(2)) * 100}`);
      orderformData?.append("currency","INR");

      const transferData = new FormData();
      transferData.append("method",'wallet');
      transferData.append("wallet",'openwallet');
      transferData.append("customer_id",'cust_J5HP8WMDYXO6D9');
      // transferData.append("order_id",'');
      transferData.append("amount",`${Number(Number(rate).toFixed(2)) * 100}`);
      transferData.append("currency",'INR');
      transferData.append("contact",'9198765432');
      transferData.append("email",user);
      transferData.append("description",`Courier Charge`);

      const createOrder = await axiosConfig.post('/createOrder',orderformData);
      const orderId = createOrder.data.data.id ;

      transferData.append("order_id",orderId);
        
      const response = await axiosConfig.post('/createPaymentCapture',transferData);
  }



  const handleBookOrder = async(claimNumber:any,rate:any)=>{

    console.log(location.state.length)
    console.log(location.state.breadth)
    console.log(location.state.height)
    console.log(location.state.weight)
    console.log(location.state.units)
    console.log(location.state.company)
    console.log(location.state.key)

    dispatch(setLoading(true));
   
    const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;
    const {data} =  await axiosConfig.post(postUrl);
    const header = data.data.token ;
  //  console.log("idddddd",DACaseData.courier_company_id);

    // const ship = data.data.shipment_id;

    const userFormData = new FormData() ;
        
    
    userFormData?.append("length", location.state.length);
    userFormData?.append("breadth",location.state.breadth);
    userFormData?.append("height",location.state.height);
    userFormData?.append("weight", location.state.weight);
    userFormData?.append("units", location.state.units);
    dispatch(setLoading(true));

    
    const URL = `/bookorder?email=${user}&insurancecompany=${location.state.company}&id=${location.state.key}&token=${header}`;
    
    console.log(URL);
    var ship;

    try {

      const wallet_balance = await axiosConfig.get(`/walletBalance?customerId=cust_J5HP8WMDYXO6D9`);
      let currentBalance = wallet_balance.data.data.balance / 100 ;
      console.log(currentBalance);
      if(currentBalance < rate.toFixed(2)){
        notification('error',"Insufficient Wallet Balance");
        dispatch(setLoading(false));
        return ;
      }
      
      const {data} = await axiosConfig.post(URL,userFormData);
      console.log("shipped data = ",data);
      ship = data.data.shipment_id;
      dispatch(setShipmentData(data.data));

      // Function to Deduct Courier Charges from wallet
      deductAmountFromWallet(rate);

    
      // dispatch(setorderDetails(data?.data));
      // @ts-ignore
      // dispatch(setbookOrderData(data?.data));
      

      // dispatch(setDACaseData(data?.data));
       // onClick={() => navigate('/order')}
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }

    

  const awb = `/awbnumber?shipment_id=${ship}&courier_id=${claimNumber}&token=${header}`;
    console.log(URL);
    try {
      const { data } = await axiosConfig.post(awb);
      dispatch(setLoading(false));

      // dispatch(setDACaseData(data?.data));
       // onClick={() => navigate('/order')}
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }


    const pickupapi = `/pickuprequest?shipment_id=${ship}&token=${header}`;
    try {
      const { data } = await axiosConfig.post(pickupapi);
      dispatch(setLoading(false));
      // dispatch(setDACaseData(data?.data));
       // onClick={() => navigate('/order')}
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
    navigate('/order')
  }


  


  
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

      

      <EsOfferDetailsModal
        closeModal={toggleEsOfferDetailsModal}
        isOpen={openEsOfferDetailsModal}
        caseData={ESCaseData}
      />

      
    </div>
    
  );
};

export default NewModals;
