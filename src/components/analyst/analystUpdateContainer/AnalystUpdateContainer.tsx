import React, { useState, useRef, useEffect } from "react";
import styles from "./AnalystUpdateContainer.module.css";
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
import { setAnalystList } from "../../../redux/slices/analystSlice";


const AnalystUpdateContainer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { key } = useParams();
  const { analystList } = useAppSelector((state) => state?.analyst);
  const { user } = useAppSelector((state) => state?.user);
  //@ts-ignore
  const obj = analystList[key] || {};

  console.log("myobj", obj);

  // const [analystInfo, setAnalystInfo] = useState(obj);

  const [analystInfo, setAnalystInfo] = useState<any>({
    name:obj.name,
    email:obj.email,
    employeeId:obj.employeeId,
    phone:obj.phone,
    city:obj.city,
  });

  console.log("analystInfo:", analystInfo);


  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isEdit]);

  

  const updateAnalytstInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e?.target;
    setAnalystInfo((pre: any) => ({ ...pre, [name]: value }));
  };


  const handleUpdateAnalystInfo = async () => {
    dispatch(setLoading(true));
    const POSTURL = `/updateanalystdetails?email=${analystInfo.email}`;
    const GETURL = `/analyst?email=${user}`;
    try {
      const formData = new FormData();
      formData?.append("name", analystInfo?.name);
      formData?.append("phone", analystInfo?.phone);
      formData?.append("city", analystInfo.city);
      formData?.append("employeeId", analystInfo?.employeeId);
      await axiosConfig.post(POSTURL, formData);
      const { data } = await axiosConfig.get(GETURL);

      dispatch(setLoading(false));
      notification("info", "Updated successfully");
      dispatch(setAnalystList(data?.data));
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
              <Link to="/analyst">
                <img src={left_arrow} alt="icon" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
            <div className="col-span-2  pb-6 flex justify-end">
              <FormButton
                iconEdit={isEdit ? false : true}
                text={isEdit ? "Save" : "Update"}
                handleClick={() => isEdit ? handleUpdateAnalystInfo() : setIsEdit(true)}
              />
            </div>

            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="name"
                value={analystInfo?.name}
                label="Name"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="email"
                value={analystInfo?.email}
                label="Email Address"
                isEdit={isEdit}
                type="email"
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="employeeId"
                value={analystInfo?.employeeId}
                label="Employee ID"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="phone"
                value={analystInfo?.phone}
                label="Phone"
                isEdit={isEdit}
              />
            </div>
            {isEdit ? (
              <div className="col-span-2 lg:col-span-1 pb-6">
                <Input
                  handleChange={updateAnalytstInfo}
                  name="password"
                  value={analystInfo?.password}
                  label="Change Password"
                  isEdit={isEdit}
                  isPassword={true}
                  type="password"
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

export default AnalystUpdateContainer;
