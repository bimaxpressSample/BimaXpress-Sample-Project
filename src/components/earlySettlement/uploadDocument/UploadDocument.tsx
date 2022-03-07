import React from 'react';
import { useState } from 'react';
import paperclip from "../../../assets/icon/paperclip.svg";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";


export default function UploadDocument() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state?.user);
    const [data, setData] = useState<any>({
        AadharCard: [],
        BankStatement: [],
        AuditedBalanceSheet: [],
        PanCard: [],
    });

    const imageUpload = async (files: any) => {


        const IMAGEUPLOAD = `/DocumentUpload?email=${user}`;
        const aadharFormData = new FormData();
        const bankFormData = new FormData();
        const balancesheetFormData = new FormData();
        const panFormData = new FormData();
        let aadharname: string | Blob | any[] = [];
        let bankname: string | Blob | any[] = [];
        let balancesheetname: string | Blob | any[] = [];
        let panname: string | Blob | any[] = [];

        console.log("files" ,files);

        let imageArray: string | Blob | any[] = [];

        if (files?.AadharCard?.length) {
            files?.AadharCard.forEach((img: any) => {
                //@ts-ignore
                aadharname.push(img?.name);

                aadharFormData.append("image", img);
            });
            //@ts-ignore
            aadharFormData?.append("imagename", aadharname);
            aadharFormData?.append("arrayname", "Aadhar");
            const { data } = await axiosConfig.post(IMAGEUPLOAD, aadharFormData);
            console.log("aadhar" , data.data);
            imageArray = [...imageArray, ...data?.data];
        }
        if (files?.BankStatement?.length) {
            
            files?.BankStatement.forEach((img: any) => {
                //@ts-ignore
                bankname.push(img?.name);

                bankFormData.append("image", img);
            });
            //@ts-ignore
            bankFormData?.append("imagename", bankname);
            bankFormData?.append("arrayname", "Bankstatement");
            const { data } = await axiosConfig.post(IMAGEUPLOAD, bankFormData);
            console.log("bank" , data.data);
            imageArray = [...imageArray, ...data?.data];
        }
        if (files?.AuditedBalanceSheet?.length) {
            
            files?.AuditedBalanceSheet.forEach((img: any) => {
                //@ts-ignore
                balancesheetname.push(img?.name);

                balancesheetFormData.append("image", img);
            });
            //@ts-ignore
            balancesheetFormData?.append("imagename", balancesheetname);
            balancesheetFormData?.append("arrayname", "Balancesheet");
            const { data } = await axiosConfig.post(IMAGEUPLOAD, balancesheetFormData);
            console.log("balance" , data.data);
            imageArray = [...imageArray, ...data?.data];
        }
        if (files?.PanCard?.length) {
            
            files?.PanCard.forEach((img: any) => {
                //@ts-ignore
                panname.push(img?.name);

                panFormData.append("image", img);
            });
            //@ts-ignore
            panFormData?.append("imagename", panname);
            panFormData?.append("arrayname", "pan");
            const { data } = await axiosConfig.post(IMAGEUPLOAD, panFormData);
            console.log("pan" , data.data);
            imageArray = [...imageArray, ...data?.data];
        }
        console.log("image array " ,imageArray);
        return imageArray;
    };


    const uploadFile = async () => {
        if(!data?.AadharCard?.length || !data?.BankStatement?.length || !data?.AuditedBalanceSheet?.length || !data?.PanCard?.length){
            notification("error","Please Attach All Required Documents");
            return ;
        }
        dispatch(setLoading(true));
        try {
            const image = await imageUpload(data);
            dispatch(setLoading(false));
            notification("info", `Document Uploaded successfully`);
            navigate('/InsurerData');

        } catch (error) {
            dispatch(setLoading(false));
            //@ts-ignore
            notification("error", error?.message);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
    ) => {
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
        setData((pre: any) => ({
            ...pre,
            //@ts-ignore
            [name]: [...pre[name], ...e?.target?.files],
        }));
    };


    // const handleChange1 = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
    // ) => {
    //     const { name, value } = e?.target;
    //     if (name === "BankStatement") {
    //         setData((pre: any) => ({
    //             ...pre,
    //             //@ts-ignore
    //             [name]: [...pre[name], ...e?.target?.files],
    //         }));
    //     } else {
    //         setData((pre: any) => ({ ...pre, [name]: value }));
    //     }
    // };

    const removeImage = (name: string, Document: string) => {
        setData((pre: any) => ({
            ...pre,
            //@ts-ignore
            [Document]: [...pre?.[Document]]?.filter((files) => files?.name !== name),
        }));
    };



    return (
        <>
            <div className="grid grid-cols-2 gap-10 p-10">
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload Aadhar Card here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.AadharCard?.length
                            ? data?.AadharCard?.map(
                                (
                                    file: { name: {} | null | undefined },
                                    index: React.Key | null | undefined
                                ) => {
                                    return (
                                        <div
                                            className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                                            style={{ width: "100%", maxWidth: "145px" }}
                                            key={index}
                                        >
                                            <p
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "125px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {file?.name}
                                            </p>
                                            {/* @ts-ignore */}
                                            <IoClose onClick={() => removeImage(file?.name, 'AadharCard')} />
                                        </div>
                                    );
                                }
                            )
                            : null}
                    </div>
                    <div className="flex justify-center mt-8 mb-4 ">
                        <div className="relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10">
                            <img src={paperclip} alt="icon" className="mr-2" />
                            <p className="text-fontColor-gray font-normal ">Attach file</p>
                            <input
                                type="file"
                                className="absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10"
                                name="AadharCard"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload Bank Statements here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.BankStatement?.length
                            ? data?.BankStatement?.map(
                                (
                                    file: { name: {} | null | undefined },
                                    index: React.Key | null | undefined
                                ) => {
                                    return (
                                        <div
                                            className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                                            style={{ width: "100%", maxWidth: "145px" }}
                                            key={index}
                                        >
                                            <p
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "125px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {file?.name}
                                            </p>
                                            {/* @ts-ignore */}
                                            <IoClose onClick={() => removeImage(file?.name, 'BankStatement')} />
                                        </div>
                                    );
                                }
                            )
                            : null}
                    </div>
                    <div className="flex justify-center mt-8 mb-4 ">
                        <div className="relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10">
                            <img src={paperclip} alt="icon" className="mr-2" />
                            <p className="text-fontColor-gray font-normal ">Attach file</p>
                            <input
                                type="file"
                                className="absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10"
                                name="BankStatement"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload Audited Balancesheet here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.AuditedBalanceSheet?.length
                            ? data?.AuditedBalanceSheet?.map(
                                (
                                    file: { name: {} | null | undefined },
                                    index: React.Key | null | undefined
                                ) => {
                                    return (
                                        <div
                                            className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                                            style={{ width: "100%", maxWidth: "145px" }}
                                            key={index}
                                        >
                                            <p
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "125px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {file?.name}
                                            </p>
                                            {/* @ts-ignore */}
                                            <IoClose onClick={() => removeImage(file?.name, 'AuditedBalanceSheet')} />
                                        </div>
                                    );
                                }
                            )
                            : null}
                    </div>
                    <div className="flex justify-center mt-8 mb-4 ">
                        <div className="relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10">
                            <img src={paperclip} alt="icon" className="mr-2" />
                            <p className="text-fontColor-gray font-normal ">Attach file</p>
                            <input
                                type="file"
                                className="absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10"
                                name="AuditedBalanceSheet"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload Pan Card here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.PanCard?.length
                            ? data?.PanCard?.map(
                                (
                                    file: { name: {} | null | undefined },
                                    index: React.Key | null | undefined
                                ) => {
                                    return (
                                        <div
                                            className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                                            style={{ width: "100%", maxWidth: "145px" }}
                                            key={index}
                                        >
                                            <p
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "125px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {file?.name}
                                            </p>
                                            {/* @ts-ignore */}
                                            <IoClose onClick={() => removeImage(file?.name, 'PanCard')} />
                                        </div>
                                    );
                                }
                            )
                            : null}
                    </div>
                    <div className="flex justify-center mt-8 mb-4 ">
                        <div className="relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10">
                            <img src={paperclip} alt="icon" className="mr-2" />
                            <p className="text-fontColor-gray font-normal ">Attach file</p>
                            <input
                                type="file"
                                className="absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10"
                                name="PanCard"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-10 px-20">
                <button onClick={uploadFile} type="submit" className="mr-4 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs">
                    Proceed For Insurer Data
                </button>
            </div>

        </>
    )
}
