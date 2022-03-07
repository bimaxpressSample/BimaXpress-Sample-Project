/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./UploadModal.module.css";
import { IoClose } from "react-icons/io5";
import paperclip from "../../assets/icon/paperclip.svg";
import Input from "./../theme/input/Input";
import InputDate from "./../theme/inputDate/InputDate";
import PlanSelectButton from "./../theme/button/PlanSelectButton";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { setLoading } from "./../../redux/slices/utilitySlice";
import { useNavigate } from "react-router-dom";
import axiosConfig from "./../../config/axiosConfig";
import notification from "./../theme/utility/notification";
Modal.setAppElement("#root");

type UploadModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  action?: string;
};

const UploadModal = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  action,
}: UploadModalProps) => {
  const [data, setData] = useState<any>({ file: []});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);
  const { currentBucket } = useAppSelector((state) => state?.home);

  const imageUpload = async (files: any[]) => {
    const IMAGEUPLOAD = `/formUpload?email=${user}`;
    const imageFormData = new FormData();
    let name: string | Blob | any[] = [];

    files?.forEach((img) => {
      //@ts-ignore
      name.push(img?.name);

      imageFormData.append("image", img);
    });
    //@ts-ignore
    imageFormData?.append("imagename", name);
    imageFormData?.append("arrayname", "HospitalName");

    const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
    console.log(data);                            //-----------------------------------------------------------------
    navigate('/UploadDocument');
    return data?.data;
  };

  const uploadFile = async () => {
    dispatch(setLoading(true));

    try {
      
      const image = await imageUpload(data?.file);

      dispatch(setLoading(false));
      notification("info", `Document Uploaded successfully`);
      closeModal();
      navigate("/UploadDocument");

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
    if (name === "file") {
      setData((pre: any) => ({
        ...pre,
        //@ts-ignore
        [name]: [...pre[name], ...e?.target?.files],
      }));
    } else {
      setData((pre: any) => ({ ...pre, [name]: value }));
    }
  };

  const removeImage = (name: string) => {
    setData((pre: any) => ({
      ...pre,
      //@ts-ignore
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  useEffect(() => {
    setData((pre: any) => ({ ...pre, file: [], amount: "", date: "" }));
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="px-10 py-8 relative">
        <IoClose
          className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        />

        <div className="w-full h-auto border-2 border-fontColor rounded-lg text-center">
          <p className="text-sm text-fontColor-gray pt-4">
            Upload your documents here
          </p>
          <div className="flex items-center justify-center mt-4">
            {data?.file?.length
              ? data?.file?.map(
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
                        <IoClose onClick={() => removeImage(file?.name)} />
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
                name="file"
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
  );
};

export default UploadModal;
