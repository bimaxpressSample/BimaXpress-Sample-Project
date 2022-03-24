import React, { useEffect, useState } from 'react';
import styles from "./Wallet.module.css";
import rupi from "../../assets/icon/rupi.svg";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    useRowSelect,
} from 'react-table';
import ReactTable from '../theme/reactTable/ReactTable';
import AddToWalletModal from './AddToWalletModal';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axiosConfig from "../../config/axiosConfig";
import { setLoading } from "../../redux/slices/utilitySlice";
import notification from '../theme/utility/notification';
import {setwalletBalance , setwalletStatement} from '../../redux/slices/walletSlice';
import download from "../../assets/icon/download.svg";

interface ColumnDetails {
    [key: string]: any;
}

export default function Wallet() {
    
    const { walletBalance , walletStatement , customerWalletDetails } = useAppSelector((state) => state?.wallet);
    const { user } = useAppSelector((state) => state?.user);

    const [openwalletModal, setOpenwalletModal] = useState<boolean>(false);
    const togglewalletModal = () => {
        setOpenwalletModal((pre) => !pre);
    };
    const dispatch = useAppDispatch();

    const [amount , setAmount] = useState("");

    const handleAmount = (e : any) =>{
        const { value } = e.target;
        setAmount(value);
    }

    console.log("wallet details ", customerWalletDetails);

    const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);

    

    const fetchBalance = async () => {
        dispatch(setLoading(true));
        //@ts-ignore
        const URL = `/walletBalance?customerId=${customerWalletDetails?.walletdetails}`;
        try {
            const { data } = await axiosConfig.get(URL);
            console.log("wallet balance", data.data.balance / 100);
            dispatch(setwalletBalance(data.data.balance / 100));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    };
    
    const fetchStatements = async () => {
        dispatch(setLoading(true));
        //@ts-ignore
        const URL = `walletStatement?customerId=${customerWalletDetails?.walletdetails}`;
        try {
            const { data } = await axiosConfig.get(URL);
            console.log("wallet statement", data.data.items);
            dispatch(setwalletStatement(data.data.items))
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    };

    useEffect(() => {
      fetchBalance();
      fetchStatements();
    }, [])
    

    useEffect(() => {
        console.log('Entire case data', walletStatement);
        const res = Object.entries(walletStatement)?.map(
          ([
              key,
            {
                amount,
                id,
                status,
                description,
                credit,
                created_at,
            },
        ]:any) => {
            const date = new Date(created_at*1000);
            const localDate = date.toLocaleDateString(['ban','id']) ;

            return(
            {
                invoice: (
                    <img src={download} alt="download" />
                ),
                summary: description === 'NA' ? "Wallet Recharge": description ,
                transaction: credit === 0 ? "Debit" : "Credit",
                amount: '₹ '+amount / 100,
                date: localDate ,
                referenceid: id,
                status: status,
                
            })}
        );
        setTableRow(res);
        console.log("table row",tableRow);

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [walletStatement]);

    const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

    let columns = React.useMemo(
        () => [
            // {
            //     Header: 'Invoice',
            //     accessor: 'invoice',
            // },
            {
                Header: 'Summary',
                accessor: 'summary',
            },
            {
                Header: 'Transaction Type',
                accessor: 'transaction', // accessor is the "key" in the data
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Reference ID',
                accessor: 'referenceid',
            },
            {
                Header: 'Status',
                accessor: 'status',
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
                // {
                //   id: 'selection',
                //   // @ts-ignore
                //   Header: ({ getToggleAllRowsSelectedProps }) => (
                //     <div>
                //       <TableCheckbox {...getToggleAllRowsSelectedProps()} />
                //     </div>
                //   ),

                //   Cell: ({ row }) => (
                //     <div>
                //       {/* @ts-ignore */}
                //       <TableCheckbox {...row.getToggleRowSelectedProps()} />
                //     </div>
                //   ),
                // },
                ...columns,
            ]);
        }
    );

    useEffect(() => {
        setPageSize(5);
    }, [setPageSize]);

    function loadScript(src : any) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        dispatch(setLoading(true));
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
            );
        dispatch(setLoading(false));
            
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const formData = new FormData();
        formData?.append("amount",`${Number(amount) * 100}`);
        formData?.append("currency","INR");

        let orderId : any ;

        try{
            const createOrder = await axiosConfig.post('/createOrder',formData);
            orderId = createOrder.data.data.id
            console.log("create order ",createOrder.data.data.id);
        }
        catch(error){
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }

        const options = {
            key: "rzp_test_3zmrZd79YMuTbA", // Enter the Key ID generated from the Dashboard
            amount: Number(amount) * 100 ,
            currency: "INR",
            //@ts-ignore
            name: customerWalletDetails?.hospital_name ,
            description: "Wallet Recharge",

            
            order_id: orderId,                               // WE need Order ID Generated at server through API 
            handler: async function (response : any) {
                const data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                console.log({
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                });

                const formData = new FormData();
                formData?.append("amount",`${Number(amount) * 100}`);
                formData?.append("currency","INR");
                //@ts-ignore
                formData?.append("customerid",customerWalletDetails?.walletdetails);

                dispatch(setLoading(true));
                const result = await axiosConfig.post(`/captureTransferPayment?paymentId=${data.razorpayPaymentId}`,formData);
                togglewalletModal();
                fetchBalance();
                fetchStatements();
                dispatch(setLoading(false));
                notification("success","Wallet Recharge Successful");
                // alert(result.data.msg);
            },
            prefill: {
                //@ts-ignore
                name: customerWalletDetails?.hospital_name,
                email: user ,
                //@ts-ignore
                contact: customerWalletDetails?.contact,
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
        //@ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}

    return (
        <div>
            <div className='grid grid-cols-2 p-10'>
                <div className='flex justify-center items-center'>
                    <form>

                        <button onClick={togglewalletModal} type="button" className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                            </svg>
                            <span className='mx-4 my-2' >Add To Wallet</span>
                        </button>
                        
                        {/* <button onClick={displayRazorpay} type="button" className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                            </svg>
                            <span className='mx-4 my-2' >Add To Wallet</span>
                        </button>

                        <button id="rzp-button1">Pay</button> */}
                    
                    </form>
                </div>
                <div className='flex justify-end'>
                    <div className={`${styles.walletContainer} flex justify-center items-center`}>
                        <div className="flex flex-row items-center">
                            <img src={rupi} alt="rupi icon" className="w-12" />
                            {/* <p className="text-8xl text-fontColor-gray -mt-20">₹</p> */}
                            <span className="text-5xl text-fontColor-gray font-thin ml-3">
                                {walletBalance}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-10 pb-10'>
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
            <AddToWalletModal
                closeModal={togglewalletModal}
                isOpen={openwalletModal}
                handleChange={handleAmount}
                amount={amount}
            // planDetails={userPlanData}
                addAmount={displayRazorpay}
            />
        </div>
    )
}