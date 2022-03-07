import React, { useState, useRef, useEffect } from "react";
import styles from "./DoctorUpdateContainer.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import Input from "../../theme/input/Input";
import FormButton from "../../theme/button/FormButton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Link } from "react-router-dom";
import left_arrow from "../../../assets/icon/left_arrow.svg";
import notification from "../../theme/utility/notification";
import axiosConfig from "../../../config/axiosConfig";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setDoctorList } from "../../../redux/slices/doctorSlice";


const DoctorUpdateContainer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const { doctorList } = useAppSelector((state) => state?.doctor);
  const { user } = useAppSelector((state) => state?.user);

  //@ts-ignore
  const obj = doctorList[key] || {};
  console.log("doctorInfo", obj);

  const [doctorInfo, setDoctorInfo] = useState<any>({
    name:obj.name,
    email:obj.email,
    speciality:obj.speciality,
    qualification: obj.qualification,
    doctorRegistrationNo: obj.doctorRegistrationNo,
    phone:obj.phone,
  });

  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isEdit]);

 

  const updateDoctorInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e?.target;
    setDoctorInfo((pre: any) => ({ ...pre, [name]: value }));
  };


  const handleUpdateDoctorInfo = async () => {
    dispatch(setLoading(true));
    const POSTURL = `/updatedoctor?email=${doctorInfo.email}`;
    const GETURL = `/doctor?email=${user}`;
    try {
      const formData = new FormData();
      formData?.append("name", doctorInfo?.name);
      formData?.append("phone", doctorInfo?.phone);
      formData?.append("docregno", doctorInfo.doctorRegistrationNo);
      formData?.append("qualification", doctorInfo?.qualification);
      formData?.append("speciality", doctorInfo?.speciality);
      await axiosConfig.post(POSTURL, formData);
      const { data } = await axiosConfig.get(GETURL);

      dispatch(setLoading(false));
      notification("info", "Updated successfully");
      dispatch(setDoctorList(data?.data));
      setIsEdit(false);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  return (
    <div className="pb-10">
      <div className={styles.imageContainer}></div>
      <div className="flex justify-center">
        <div className={`w-full h-full mx-4  z-10  ${styles.inputContainer}`}>
          <div className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-primary-lighter opacity-95 cursor-pointer ">
            {isEdit ? (
              <img
                src={left_arrow}
                alt="icon"
                onClick={() => setIsEdit(!isEdit)}
              />
            ) : (
              <Link to="/doctor">
                <img src={left_arrow} alt="icon" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
            <div className="col-span-2  pb-6 flex justify-end">
              <FormButton
                iconEdit={isEdit ? false : true}
                text={isEdit ? "Save" : "Update"}
                handleClick={() => isEdit ? handleUpdateDoctorInfo() : setIsEdit(true)}
              />
            </div>

            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="name"
                value={doctorInfo?.name}
                label="Name"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="speciality"
                value={doctorInfo?.speciality}
                label="Speciality"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="qualification"
                value={doctorInfo?.qualification}
                label="Qualification"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="email"
                value={doctorInfo?.email}
                label="Email Address"
                isEdit={isEdit}
                type="email"
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="doctorRegistrationNo"
                value={doctorInfo?.doctorRegistrationNo}
                label="Registration Number"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateDoctorInfo}
                name="phone"
                value={doctorInfo?.phone}
                label="Phone"
                isEdit={isEdit}
              />
            </div>
            {isEdit ? (
              <div className="col-span-2 lg:col-span-1 pb-6">
                <Input
                  handleChange={updateDoctorInfo}
                  name="createPassword"
                  value={doctorInfo?.createPassword}
                  label="Change Password"
                  isEdit={isEdit}
                />
              </div>
            ) : null}
          </div>
          {isEdit ? null : (
            <div className="mt-8">
              <div className=" flex">
                <h4 className="text-lg text-fontColor-light pb-1 border-b border-fontColor-light  font-semibold">
                  Delete
                </h4>
              </div>

              <p className="text-sm text-fontColor-light mt-2">
                Deleting your account will erase everything with this hospital.
                Please make sure before clicking the delete button
              </p>

              <div className="mt-6 flex items-center">
                <RiDeleteBinLine className="text-lg text-fontColor-light mr-2" />
                <p className="text-sm text-fontColor-light font-semibold">
                  Delete Account
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorUpdateContainer;
