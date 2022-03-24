import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setLoading } from "../../../redux/slices/utilitySlice";

export default function AccountDetails() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state?.user);
    const [data, setData] = useState<any>({ 
        accountNumber:"",
        ifscCode:"",
        accountHolderName:""
    });

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>) => {
        const { name, value } = e?.target;
        setData((pre: any) => ({ ...pre, [name] : value }));
    }

    const fetchAccDetail = async() =>{

        dispatch(setLoading(true));
        try{
            const AccData = await axiosConfig.get(`/AccountDeta?email=${user}`);
            dispatch(setLoading(false));
            console.log("Document Data", AccData?.data?.data);
            console.log("length", !Object.keys(AccData?.data?.data).length);
            if(Object.keys(AccData?.data?.data).length){
                navigate('/IntimationPanel');
            }
        }
        catch(error){
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    }

    useEffect(() => {
        fetchAccDetail();
    }, [])
    
    const sendData = async() =>{
        const sendURL = `/AccountDetails?email=${user}`;
        const userFormData = new FormData() ;
        
        if(!data?.accountNumber?.length || !data?.accountHolderName?.length || !data?.ifscCode?.length){
            notification("error","Please Fill All The Details");
            return ;
        }
        
        userFormData?.append("AccountNumber", data?.accountNumber);
        userFormData?.append("AccountHolderName", data.accountHolderName);
        userFormData?.append("IFSC_CODE", data?.ifscCode);
        userFormData?.append("arrayname","HospitalAccount");

        dispatch(setLoading(true));
        try{
            const { data } = await axiosConfig.post(sendURL,userFormData);
            console.log(data);                                   //---------------------------------------------------
            dispatch(setLoading(false));
            notification("info", `Document Uploaded successfully`);
            navigate("/IntimationPanel");
        }catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    }

    return (
        <>
            <p className='text-lg text-fontColor text-center mt-5'>Enter the Account Details</p>
            <div className='flex justify-center'>
                <div className="grid grid-cols-1 gap-x-8 mx-8 my-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
                    <div className="flex items-center gap-x-4 justify-between my-4">
                        <label className='text-white' htmlFor="Name">Account Number :</label>
                        <input
                            type="text"
                            name="accountNumber"
                            className=" w-96 px-4 py-2 bg-primary-lighter text-white border border-gray-300 outline-none focus:border-gray-400 rounded-xl"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-x-4 justify-between my-4">
                        <label className='text-white' htmlFor="Name">IFSC Code :</label>
                        <input
                            type="text"
                            name="ifscCode"
                            className=" w-96 px-4 py-2 bg-primary-lighter text-white border border-gray-300 outline-none focus:border-gray-400 rounded-xl"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-x-4 justify-between my-4">
                        <label className='text-white' htmlFor="Name">Account Holder Name :</label>
                        <input
                            type="text"
                            name="accountHolderName"
                            className=" w-96 px-4 py-2 bg-primary-lighter text-white border border-gray-300 outline-none focus:border-gray-400 rounded-xl"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="flex justify-end mt-14 pr-10">
                <button onClick={sendData} type="submit" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
                    Continue
                </button>
            </div>
        </>
    )
}
