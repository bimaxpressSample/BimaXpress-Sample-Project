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
Modal.setAppElement("#root");


type UploadModalProps = {
    key?: any;
    isOpen?: boolean;
    closeModal?: () => void;
    modalData?: any;
};

const UploadModal = ({
    key,
    isOpen = false,
    closeModal = () => {},
    modalData,
}: UploadModalProps) => {

    const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

    const toggleUploadModal = () => {
		// setmodalData(companyname);
        setOpenUploadModal((pre) => !pre);
    };

    const [data, setData] = useState<any>({
        file1: [],
        file2: [],
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state?.user);

    console.log("modal data", modalData);
    console.log("modal input data", data);

    const imageUpload = async (files: any) => {

        const IMAGEUPLOAD = `/EmpanelUpload?email=${user}`;
        const FileFormData = new FormData();
        const imageFormData = new FormData();
        let file1name: string | Blob | any[] = [];
        let file2name: string | Blob | any[] = [];

        if (files?.file1?.length || files?.file1?.length) {
            files?.file1.forEach((img: any) => {
                //@ts-ignore
                file1name.push(img?.name)
                FileFormData.append("File1", img);
            });
            files?.file1.forEach((img: any) => {
                //@ts-ignore
                file2name.push(img?.name)
                FileFormData.append("File2", img);
            });
            //@ts-ignore
            FileFormData?.append("imagename1", file1name);
            //@ts-ignore
            FileFormData?.append("imagename2", file2name);
            FileFormData?.append("arrayname", "Files");
            FileFormData?.append("companyname", modalData);
            const { data } = await axiosConfig.post(IMAGEUPLOAD, FileFormData);
            console.log("document upload", data.data);
        }
    }

    const uploadFile = async () => {
        dispatch(setLoading(true));

        try {

            const image = await imageUpload(data);

            dispatch(setLoading(false));
            notification("info", `Document Uploaded successfully`);
            toggleUploadModal();

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
        <button onClick={() => toggleUploadModal()} className="px-4 py-2 inline-flex text-sm leading-5 font-semibold bg-green-400 text-green-900 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Upload
        </button>
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
                    onClick={toggleUploadModal}
                />

                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload your documents here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.file1?.length
                            ? data?.file1?.map(
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
                                            <IoClose onClick={() => removeImage(file?.name, 'file1')} />
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
                                name="file1"
                                onChange={handleChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center mt-8">
                    <p className="text-sm text-fontColor-gray pt-4">
                        Upload your documents here
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        {data?.file2?.length
                            ? data?.file2?.map(
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
                                            <IoClose onClick={() => removeImage(file?.name, 'file2')} />
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
                                name="file2"
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
