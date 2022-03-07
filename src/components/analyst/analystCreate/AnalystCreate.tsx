import React, { useState } from "react";
import styles from "./AnalystCreate.module.css";
// import { RiDeleteBinLine } from "react-icons/ri";
import Input from "../../theme/input/Input";
import FormButton from "../../theme/button/FormButton";
import { Link, useNavigate } from "react-router-dom";
import left_arrow from "../../../assets/icon/left_arrow.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setAnalystList } from "../../../redux/slices/analystSlice";

const AnalystCreate = () => {
  const [analystInfo, setAnalystInfo] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    password: "",
  });

  const { user, role } = useAppSelector((state) => state?.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addAnalyst = async () => {
    const POST_URL = `/analyst?hospitalemail=${user}`;
    const GET_URL = `/analyst?email=${user}`;

    const formData = new FormData();
    formData?.append("name", analystInfo?.name);
    formData?.append("email", analystInfo?.email);
    formData?.append("employeeId", analystInfo?.employeeId);
    formData?.append("phone", analystInfo?.phone);
    formData?.append("role", role);
    formData?.append("password", analystInfo?.password);
    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);
      const { data } = await axiosConfig.get(GET_URL);

      dispatch(setLoading(false));
      notification("info", "Create successfully");
      dispatch(setAnalystList(data?.data));
      navigate(`/analyst/${analystInfo?.email}`);
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
            <Link to="/analyst">
              <img src={left_arrow} alt="icon" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
            <div className="col-span-2  pb-6 flex justify-end">
              <FormButton text={"Create"} handleClick={() => addAnalyst()} />
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
                name="employeeId"
                value={analystInfo?.employeeId}
                label="Employee ID"
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
                label="Change Password"
                isEdit={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystCreate;
