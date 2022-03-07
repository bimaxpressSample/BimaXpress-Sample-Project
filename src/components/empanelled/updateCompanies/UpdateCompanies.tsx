import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './UpdateCompanies.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import Input from '../../theme/input/Input';
import FormButton from '../../theme/button/FormButton';
// import InputDate from "../../theme/inputDate/InputDate";
import left_arrow from '../../../assets/icon/left_arrow.svg';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setEmpanelledCompaniesMain } from '../../../redux/slices/empanelledCompaniesSlice';
import axiosConfig from '../../../config/axiosConfig';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { IoClose } from 'react-icons/io5';
import notification from '../../theme/utility/notification';
const UpdateCompanies = () => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { key } = useParams();
  const { EmpanelledCompaniesMain } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const { user } = useAppSelector((state) => state?.user);

  const updateEmpanelcompany = async () => {
    const URL = analystInfo?.Ratelist?.length
      ? `/empanelcompany?email=${user}`
      : `/updateEmpanel?email=${user}`;
    const formData = new FormData();
    formData?.append('companyname', analystInfo?.name);
    formData?.append('discount', analystInfo?.discount);
    formData?.append('exclusion', analystInfo?.exclusion);
    if (analystInfo?.Ratelist?.length) {
      dispatch(setLoading(true));
      analystInfo?.Ratelist?.forEach((img) => {
        formData.append('Ratelist', img);
      });
    }
    try {
      await axiosConfig.post(URL, formData);
      const { data } = await axiosConfig.get(`/empanelcompany?email=${user}`);
      dispatch(setLoading(false));
      notification('info', 'Updated successfully');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error.message);
    }
  };

  const fetchDoctor = async () => {
    const URL = `/EmpanelCompany?email=${user}`;
    dispatch(setLoading(true));
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setEmpanelledCompaniesMain(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  //@ts-ignore
  const obj = EmpanelledCompaniesMain[key] || {};
  console.log(key, obj.Logo);
  const [analystInfo, setAnalystInfo] = useState({
    name: key || '',
    expiryDate: obj?.expiryDate || '',
    discount: obj?.Discount || '',
    exclusion: obj?.Exclusion || '',
    Ratelist: [],
  });

  const updateAnalytstInfo = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDataElement | any>
  ) => {
    const { name, value, type } = e?.target;
    if (type === 'file') {
      if (analystInfo.Ratelist.length >= 1) {
        notification('info', 'You Can Only Upload One File');
      } else {
        //@ts-ignore
        setAnalystInfo((pre) => ({
          ...pre,
          //@ts-ignore
          Ratelist: [...pre?.Ratelist, ...e?.target?.files],
        }));
      }
    } else {
      setAnalystInfo((pre) => ({ ...pre, [name]: value }));
    }
  };

  const removeImage = (name: string) => {
    setAnalystInfo((pre: any) => ({
      ...pre,
      //@ts-ignore
      Ratelist: pre?.Ratelist?.filter((files) => files?.name !== name),
    }));
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <div className='pb-10'>
      <div className={styles.imageContainer}>
        <div className={styles.innerImageContainer}>
          <img
            src={obj?.Logo}
            alt='img'
            className={styles.companyLogo}
            style={{ backgroundColor: 'white' }}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className={`w-full h-full mx-4  z-10  ${styles.inputContainer} `}>
          {isEdit ? (
            <div className='flex items-center justify-between'>
              <div
                className='w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-secondary-light  opacity-95 cursor-pointer '
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                {' '}
                <img src={left_arrow} alt='icon' />
              </div>

              <div
                className={`absolute flex right-0 mr-60 ${
                  analystInfo?.Ratelist?.length ? '' : 'pb-8'
                } `}
              >
                {analystInfo?.Ratelist?.length
                  ? analystInfo?.Ratelist?.map((file, index) => {
                      return (
                        <div
                          className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
                          style={{ width: '100%', maxWidth: '145px' }}
                          key={index}
                        >
                          <p
                            style={{
                              width: '100%',
                              maxWidth: '125px',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {/* @ts-ignore */}
                            {file?.name}
                          </p>

                          <IoClose
                            //@ts-ignore
                            onClick={() => removeImage(file?.name)}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className={styles.uploadLogo}>
                Upload Rate List
                <input
                  type='file'
                  className='absolute border-none outline-none opacity-0 cursor-pointer cursor-pointer right-0 mr-15'
                  onChange={updateAnalytstInfo}
                />
              </div>
            </div>
          ) : (
            <div className='w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-secondary-light opacity-95 cursor-pointer '>
              {' '}
              <Link to='/empanelledCompanies'>
                <img src={left_arrow} alt='icon' />
              </Link>
            </div>
          )}

          <div className='grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95'>
            <div className='col-span-2  pb-6 flex justify-end'>
              <FormButton
                iconEdit={isEdit ? false : true}
                text={isEdit ? 'Save' : 'Update'}
                handleClick={() => {
                  setIsEdit(!isEdit);
                  if (isEdit) {
                    updateEmpanelcompany();
                  }
                }}
              />
            </div>

            <div className='col-span-2 lg:col-span-1 pb-6'>
              <Input
                handleChange={updateAnalytstInfo}
                name='name'
                value={analystInfo?.name}
                label='Name'
                isEdit={false}
              />
            </div>
            {/* <div className="col-span-2 lg:col-span-1 pb-6">
              {isEdit ? (
                <InputDate
                  handleChange={updateAnalytstInfo}
                  name={analystInfo?.expiryDate}
                  label="Expiry date"
                  style={{
                    background: "transparent",
                    border: "1px solid #ffffff",
                    outline: "none",
                    height: "34px",
                    marginTop: "4px",
                    maxWidth: "100%",
                  }}
                />
              ) : (
                <>
                  <p className="pb-4 text-sm text-fontColor-light font-thin">
                    Expiry date
                  </p>

                  <p
                    className=" border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light "
                    style={{
                      height: analystInfo?.expiryDate ? "inherit" : "34px",
                    }}
                  >
                    {analystInfo?.expiryDate}
                  </p>
                </>
              )}
            </div> */}
            <div className='col-span-2 lg:col-span-1 pb-6'>
              <Input
                handleChange={updateAnalytstInfo}
                name='discount'
                value={analystInfo?.discount}
                label='Discount'
                isEdit={isEdit}
              />
            </div>
            <div className='col-span-2 lg:col-span-1 pb-6'>
              <Input
                handleChange={updateAnalytstInfo}
                name='exclusion'
                value={analystInfo?.exclusion}
                label='Exclusion'
                isEdit={isEdit}
              />
            </div>
          </div>
          {isEdit ? null : (
            <div className='mt-8'>
              <div className=' flex'>
                <h4 className='text-lg text-fontColor-light pb-1 border-b border-fontColor-light  font-semibold'>
                  Delete
                </h4>
              </div>

              <p className='text-sm text-fontColor-light mt-2'>
                Deleting your account will erase everything with this hospital.
                Please make sure before clicking the delete button
              </p>

              <div className='mt-6 flex items-center'>
                <RiDeleteBinLine className='text-lg text-fontColor-light mr-2' />
                <p className='text-sm text-fontColor-light font-semibold'>
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

export default UpdateCompanies;
