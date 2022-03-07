/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./UploadModal.module.css";
import { IoClose } from "react-icons/io5";
// import paperclip from "../../assets/icon/paperclip.svg";
import paperclip from '../../../assets/icon/paperclip.svg'
import Input from "../../theme/input/Input";
import InputDate from "../../theme/inputDate/InputDate";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import Button from '@mui/material/Button';
Modal.setAppElement("#root");


type UploadModalProps = {
    casenum?: string;
    closeModal?: () => void;
    
};

const UploadModal = ({
    casenum,
    closeModal = () => {},
}: UploadModalProps) => {

    const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

    const toggleUploadModal = () => {
		// setmodalData(companyname);
        setOpenUploadModal((pre) => !pre);
    };

    const [data, setData] = useState<any>({ 
        ApprovalLetter: [],
        ConsultationPaper:[],
        AadharCard:[],
    
    });

    console.log("casenum: ", casenum);


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.user);

    console.log("modal input data", data);

    const imageUpload = async (files: any , caseno : any) => {

        const IMAGEUPLOAD = `/PatientDocsUploadES?email=${user}&casenumber=${casenum}`;
        const DocumentFormData = new FormData();
        let aadharname: string | Blob | any[] = [];
        let approvallettername: string | Blob | any[] = [];
        let consultationpapername: string | Blob | any[] = [];

        console.log("files" ,files);

        let imageArray: string | Blob | any[] = [];

        if (files?.AadharCard?.length) {
            files?.AadharCard.forEach((img: any) => {
                //@ts-ignore
                aadharname.push(img?.name);
                DocumentFormData?.append("aadharCard", img);
            });
            //@ts-ignore
            DocumentFormData?.append("doc_aadhar", "aadhaarCard");
        }
        if (files?.ApprovalLetter?.length) {
            
            files?.ApprovalLetter.forEach((img: any) => {
                //@ts-ignore
                approvallettername.push(img?.name);
                DocumentFormData?.append("approvalLetter", img);
            });
            //@ts-ignore
            DocumentFormData?.append("doc_approval", "approvalLetter");
        }
        if (files?.ConsultationPaper?.length) {
            
            files?.ConsultationPaper.forEach((img: any) => {
                //@ts-ignore
                consultationpapername.push(img?.name);
                DocumentFormData?.append("consultationPapers", img);
            });
            //@ts-ignore
            DocumentFormData?.append("doc_consult_papers", "consultationPapers");
        }
        const { data } = await axiosConfig.post(IMAGEUPLOAD, DocumentFormData);
        console.log("uplaod API" , data.data);
        console.log("image array " ,imageArray);
        return imageArray;
    };

    const uploadFile = async () => {
        dispatch(setLoading(true));
        if(!data?.AadharCard?.length || !data?.ConsultationPaper?.length || !data?.ApprovalLetter?.length){
            notification("error","Please Attach All Required Documents");
            return ;
        }
        dispatch(setLoading(true));
        try {
            const image = await imageUpload(data , casenum);
            dispatch(setLoading(false));
            notification("info", `Document Uploaded successfully`);
            closeModal()

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
        // if (name === "file") {
        //   setData((pre: any) => ({
        //     ...pre,
        //     //@ts-ignore
        //     [name]: [...pre[name], ...e?.target?.files],
        //   }));
        // } else {
        // setData((pre: any) => ({ ...pre, [name]: value }));
        setData((pre: any) => ({
            ...pre,
            //@ts-ignore
            [name]: [...pre[name], ...e?.target?.files],
        }));
    }


    const removeImage = (name: string, Document: string) => {
        setData((pre: any) => ({
            ...pre,
            //@ts-ignore
            [Document]: [...pre?.[Document]]?.filter((files) => files?.name !== name),
        }));
    };

    return (
        <>    
        <Button
            variant='contained'
            size='small'
            style={{
              marginLeft: '15%',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: '600',
            }}
            onClick={() => toggleUploadModal()}
          >
            Attach Files
          </Button>
       {/*  <button onClick={() => toggleUploadModal()} className="px-4 py-2 inline-flex text-sm leading-5 font-semibold bg-green-400 text-green-900 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Upload
        </button> */}
        <Modal
            isOpen={openUploadModal}
            className={styles.approveModalContainer}
            overlayClassName={styles.overlayContainer}
            onRequestClose={toggleUploadModal}
            shouldCloseOnOverlayClick={true}
        >
             <div className="px-10 py-8 relative">
                <IoClose
                    className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
                    onClick={closeModal}
                />

                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload your Approval Letter here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.ApprovalLetter?.length
                            ? data?.ApprovalLetter?.map(
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
                                            <IoClose onClick={() => removeImage(file?.name,'ApprovalLetter')} />
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
                                name="ApprovalLetter"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center mt-4">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload your Aadhar Card here
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
                                            <IoClose onClick={() => removeImage(file?.name,'AadharCard')} />
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
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center mt-4">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload your Consultation Paper here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.ConsultationPaper?.length
                            ? data?.ConsultationPaper?.map(
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
                                            <IoClose onClick={() => removeImage(file?.name,'ConsultationPaper')} />
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
                                name="ConsultationPaper"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center mt-8">
                    <PlanSelectButton
                        text="Submit"
                        style={{ maxWidth: "180px" }}
                        handleClick={uploadFile}
                    />
                </div>
            </div>
        </Modal>
        </>
    );
};

export default UploadModal;
