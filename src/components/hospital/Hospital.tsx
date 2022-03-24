import React, { useState, useEffect } from "react";
import FormButton from "../theme/button/FormButton";
import Input from "../theme/input/Input";
import Select from "../theme/select/Select";
import styles from "./Hospital.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import axiosConfig from "../../config/axiosConfig";
import { setHospitalData } from "../../redux/slices/hospitalSlice";
import notification from "../theme/utility/notification";

// type HospitalState = {
//   name: string;
//   address: string;
//   plan: string;
//   state: string;
//   phone: string | number ;
//   country: string;
//   website: string;
//   pinCode: string | number;
// };

const Hospital = () => {
  const [hospitalInfo, setHospitalInfo] = useState<any>({
    name: "",
    address: "",
    plan: "",
    state: "",
    phone: "",
    city: "",
    rohini: "",
    pinCode: "",
  });


  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { hospitalData } = useAppSelector((state) => state?.hospital);
  const { user } = useAppSelector((state) => state?.user);

  const fetchHospitalInfo = async () => {
    dispatch(setLoading(true));
    const URL = `/hospitaldetails?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);

      dispatch(setLoading(false));
      dispatch(setHospitalData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (!hospitalData?.name) {
      fetchHospitalInfo();
    } else {
      //@ts-ignore
      const { state, plan, phone, pinCode, name, address, city, rohini } =
        hospitalData;
      setHospitalInfo((pre: any) => ({
        ...pre,
        name: name || "",
        address: address || "",
        plan: plan || "",
        state: state || "",
        phone: phone || "",
        city: city || "",
        rohini: rohini || "",
        pinCode: pinCode || "",
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalData]);

  const updateHospitalInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e?.target;
    setHospitalInfo((pre: any) => ({ ...pre, [name]: value }));
  };


  const handleUpdateHospitalInfo = async () => {
    dispatch(setLoading(true));
    const POSTURL = `/hospitaldetails?email=${user}`;
    const GETURL = `/hospitaldetails?email=${user}`;
    try {
      const formData = new FormData();
      formData?.append("name", hospitalInfo?.name);
      formData?.append("address", hospitalInfo?.address);
      formData?.append("plan", hospitalInfo?.plan);
      formData?.append("state", hospitalInfo?.state);
      formData?.append("phone", hospitalInfo?.phone);
      formData?.append("city", hospitalInfo?.city);
      formData?.append("rohini", hospitalInfo?.rohini);
      formData?.append("pincode", hospitalInfo?.pinCode);
      await axiosConfig.post(POSTURL, formData);
      const { data } = await axiosConfig.get(GETURL);
      dispatch(setLoading(false));
      notification("info", "Updated successfully");
      dispatch(setHospitalData(data?.data));
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
        <div
          className={`w-full h-full mx-4  z-10  ${styles.inputContainer} ${
            isEdit ? " " : styles.adjustMargin
          }`}
        >
          {isEdit ? (
            <div
              className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-primary-lighter opacity-95 cursor-pointer "
              onClick={() => setIsEdit(false)}
            >
              {" "}
              <BiLeftArrowAlt className="text-2xl text-fontColor-light " />
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95">
            <div className="col-span-2  pb-6 flex justify-end">
              <FormButton
                iconEdit={isEdit ? false : true}
                text={isEdit ? "Save" : "Update"}
                handleClick={() =>
                  isEdit ? handleUpdateHospitalInfo() : setIsEdit(true)
                }
              />
            </div>

            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="name"
                value={hospitalInfo?.name}
                label="Hospital name"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="address"
                value={hospitalInfo?.address}
                label="Street address"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Select
                options={[
                  { label: "Malti-Speciality", value: "maltiSpeciality" },
                  {
                    label: "Preemium",
                    value:
                      hospitalInfo?.plan === "freemium"
                        ? "freemium"
                        : "premium",
                  },
                ]}
                handleChange={updateHospitalInfo}
                name="plan"
                value={hospitalInfo?.plan}
                label="Type"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="state"
                value={hospitalInfo?.state}
                label="State"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="phone"
                value={hospitalInfo?.phone}
                label="Mobile"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="city"
                value={hospitalInfo?.city}
                label="City"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="rohini"
                value={hospitalInfo?.rohini}
                label="Rohini Id"
                isEdit={isEdit}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateHospitalInfo}
                name="pinCode"
                value={hospitalInfo?.pinCode}
                label="Pincode"
                isEdit={isEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
