import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './CreateCompany.module.css';
import Input from '../../theme/input/Input';
import FormButton from '../../theme/button/FormButton';
import { Link, useNavigate } from 'react-router-dom';
// import InputDate from "../../theme/inputDate/InputDate";
import left_arrow from '../../../assets/icon/left_arrow.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import {
  setAllCompaniesList,
  setEmpanelledCompaniesMain,
} from '../../../redux/slices/empanelledCompaniesSlice';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import { IoClose } from 'react-icons/io5';
import { FiPaperclip } from 'react-icons/fi';

const CreateCompany = () => {
  const [insuranceCompany, setInsuranceCompany] = useState<any>([]);
  const [analystInfo, setAnalystInfo] = useState({
    name: '',
    expiryDate: '',
    discount: '',
    exclusion: '',
    Ratelist: [],
  });
  const { allCompaniesList } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  // const { newCaseNum } = useAppSelector((state) => state?.case);
  const navigate = useNavigate();

  // const imageUpload = async () => {
  //   const IMAGEUPLOAD = `/imageupload?email=${user}&casenumber=${
  //     newCaseNum ? newCaseNum : "case0"
  //   }`;
  //   const imageFormData = new FormData();
  //   let name: string | Blob | any[] = [];

  //   analystInfo?.Ratelist?.forEach((img) => {
  //     //@ts-ignore
  //     name.push(img?.name);

  //     imageFormData.append("image", img);
  //   });
  //   //@ts-ignore
  //   imageFormData?.append("imagename", name);
  //   imageFormData?.append("arrayname", "Ratelist");

  //   const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
  //   return data?.data;
  // };

  const addAnalyst = async () => {
    const URL = `/empanelcompany?email=${user}`;
    if (analystInfo?.Ratelist?.length === 1) {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData?.append('companyname', analystInfo?.name);
      formData?.append('discount', analystInfo?.discount);
      formData?.append('exclusion', analystInfo?.exclusion);
      analystInfo?.Ratelist?.forEach((img) => {
        formData.append('Ratelist', img);
      });

      try {
        await axiosConfig.post(URL, formData);
        const { data } = await axiosConfig.get(URL);
        dispatch(setLoading(false));
        notification('info', 'Create successfully');
        dispatch(setEmpanelledCompaniesMain(data?.data));
        navigate(`/empanelledCompanies/${analystInfo?.name}`);
      } catch (error) {
        dispatch(setLoading(false));
        navigate(`/empanelledCompanies/${analystInfo?.name}`);
        //@ts-ignore
        notification('info', 'Already Present in List');
      }
    } else {
      notification('info', 'Only One File Can Be Uploded in Ratelist');
    }
  };

  const fetchEmpanelledCompanies = async () => {
    const URLALLCOMPANY = `/allcompany`;
    dispatch(setLoading(true));
    try {
      const { data: allCompanyData } = await axiosConfig.get(URLALLCOMPANY);
      dispatch(setLoading(false));
      dispatch(setAllCompaniesList(allCompanyData?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
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
    if (!Object.entries(allCompaniesList)?.length) {
      fetchEmpanelledCompanies();
    } else {
      // const email = JSON.parse(companyInfo?.replace(/'/g, '"'))?.email;
      //@ts-ignore
      const res = Object.entries(allCompaniesList)?.map(
        (
          //@ts-ignore
          [key, value]
        ) => ({
          label: key,
          value: key,
        })
      );

      setInsuranceCompany(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCompaniesList]);

  // const inputRef = useRef<any>(null);

  // useEffect(() => {
  //   inputRef?.current?.focus();
  // }, []);

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

  return (
    <div className='pb-10'>
      <div className={styles.imageContainer}></div>
      <div className='flex justify-center'>
        <div className={`w-full h-full mx-4  z-10  ${styles.inputContainer}`}>
          <div className='flex items-center justify-between'>
            <div className='w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-secondary-light opacity-95 cursor-pointer '>
              {' '}
              <Link to='/empanelledCompanies'>
                <img src={left_arrow} alt='icon' />
              </Link>
            </div>
            {/* <div className={styles.uploadLogo}>Upload Logo</div> */}
            <div></div>
          </div>

          <div className='grid grid-cols-2 gap-x-8  mb-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95'>
            {/* <div className="col-span-2 lg:col-span-1 pb-6">
              <Input
                handleChange={updateAnalytstInfo}
                name="heading"
                value={analystInfo?.heading}
                inputRef={inputRef}
                placeHolder="Type name hear"
                style={{
                  border: "none",
                  borderRadius: 0,
                  borderBottom: "2px solid #707070",
                  fontSize: "40px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  fontWeight: 400,
                }}
              />
            </div> */}

            <div className='col-span-2  pb-6 flex justify-end'>
              <FormButton text={'Create'} handleClick={addAnalyst} />
            </div>

            <div className='col-span-2 lg:col-span-1 pb-6'>
              <NewCaseSelect
                options={insuranceCompany}
                name='name'
                handleChange={updateAnalytstInfo}
                defaultOption='Select empanelled Company'
                label='Empanelled Company'
                value={analystInfo?.name || ''}
              />
            </div>
            <div className='col-span-2 lg:col-span-1 pb-6'>
              <div className='flex justify-center flex-col'>
                <div
                  className={`flex items-center flex-wrap ${
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
                <div
                  className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
                  style={{ minWidth: '150px' }}
                >
                  <FiPaperclip className='mr-2 text-fontColor-darkGray' />
                  <p className='text-fborder-fontColor-darkGray-gray font-normal text-fontColor-darkGray'>
                    Upload Rate list documents
                  </p>
                  <input
                    type='file'
                    className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                    onChange={updateAnalytstInfo}
                  />
                </div>
              </div>
              {/* <InputDate
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
              /> */}
            </div>
            <div className='col-span-2 lg:col-span-1 pb-6'>
              <Input
                handleChange={updateAnalytstInfo}
                name='discount'
                value={analystInfo?.discount}
                label='Discount'
                isEdit={true}
                type='number'
              />
            </div>
            <div className='col-span-2 lg:col-span-1 pb-6'>
              <Input
                handleChange={updateAnalytstInfo}
                name='exclusion'
                value={analystInfo?.exclusion}
                label='Exclusion'
                isEdit={true}
                type='text'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
