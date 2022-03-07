import React, { useState } from "react";
import styles from "./DoctorCreate.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";
// import { RiDeleteBinLine } from "react-icons/ri";
import Input from "../../theme/input/Input";
import FormButton from "../../theme/button/FormButton";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setDoctorList } from "../../../redux/slices/doctorSlice";

const DoctorCreate = () => {
  const [analystInfo, setAnalystInfo] = useState({
    name: "",
    speciality: "",
    qualification: "",
    email: "",
    registrationNo: "",
    phone: "",
    password: "",
  });

  const { user } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addDoctor = async () => {
    const POST_URL = `/doctor?hospitalemail=${user}`;
    const GET_URL = `/doctor?email=${user}`;

    const formData = new FormData();
    formData?.append("name", analystInfo?.name);
    formData?.append("speciality", analystInfo?.speciality);
    formData?.append("qualification", analystInfo?.qualification);
    formData?.append("email", analystInfo?.email);
    formData?.append("docregno", analystInfo?.registrationNo);
    formData?.append("phone", analystInfo?.phone);
    formData?.append("password", analystInfo?.password);
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);
      const { data } = await axiosConfig.get(GET_URL);

      dispatch(setLoading(false));
      notification("info", "Create successfully");
      dispatch(setDoctorList(data?.data));
      navigate(`/doctor/${analystInfo?.email}`);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  const updateAnalytstInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e?.target;
    setAnalystInfo((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className="pb-10">
      <div className={styles.imageContainer}></div>
      <div className="flex justify-center">
        <div className={`w-full h-full mx-4  z-10  ${styles.inputContainer}`}>
          <div className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-primary-lighter opacity-95 cursor-pointer ">
            {" "}
            <Link to="/doctor">
              <BiLeftArrowAlt className="text-2xl text-fontColor-light " />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
            <div className="col-span-2 pb-6 flex justify-end">
              <FormButton text={"Create"} handleClick={() => addDoctor()} />
            </div>

            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="name"
                value={analystInfo?.name}
                label="Name"
                isEdit={true}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="speciality"
                value={analystInfo?.speciality}
                label="Speciality"
                isEdit={true}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="qualification"
                value={analystInfo?.qualification}
                label="Qualification"
                isEdit={true}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="email"
                value={analystInfo?.email}
                label="Email Address"
                isEdit={true}
                type="email"
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="registrationNo"
                value={analystInfo?.registrationNo}
                label="Registration Number"
                isEdit={true}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="phone"
                value={analystInfo?.phone}
                label="Phone"
                isEdit={true}
              />
            </div>

            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="password"
                value={analystInfo?.password}
                label="Create Password"
                isEdit={true}
                isPassword={true}
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCreate;
