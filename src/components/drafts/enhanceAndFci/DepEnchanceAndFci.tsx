import React, { useState } from 'react';
import InputRadio from '../../theme/inputRadio/InputRadio';
import styles from './EnhanceAndFic.module.css';
import Modal from 'react-modal';
import Request from './request/Request';
import ApproveAndRejected from './approveAndRejected/ApproveAndRejected';
import { IoClose } from 'react-icons/io5';
import DepRequest from './DepRequest';
import PlanSelectButton from '../../theme/button/PlanSelectButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useNavigate } from 'react-router-dom';
import paperclip from '../../../assets/icon/paperclip.svg';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import Input from './Input';
import './EnhanceAndFic.module.css';

type EnchanceAndFciProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData?: any;
  action?: string;
};

const DepEnchanceAndFci = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  action = '',
}: EnchanceAndFciProps) => {
  const [status, setStatus] = useState('request');
  const [data, setData] = useState<any>({ file: [], amount: '', date: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state?.user);
  const { currentBucket } = useAppSelector((state) => state?.home);

  const imageUpload = async (files: any[]) => {
    const IMAGEUPLOAD = `/imageupload?email=${newCaseData?.hospital_email}&casenumber=${newCaseData?.caseNumber}`;
    const imageFormData = new FormData();
    let name: string | Blob | any[] = [];

    files?.forEach((img) => {
      //@ts-ignore
      name.push(img?.name);

      imageFormData.append('image', img);
    });
    //@ts-ignore
    imageFormData?.append('imagename', name);
    imageFormData?.append('arrayname', 'urlid');

    const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
    return data?.data;
  };

  const uploadFile = async () => {
    dispatch(setLoading(true));

    const URLINCEMENT = `/incrementcounter?email=${newCaseData?.hospital_email}`;
    const URLCHANGESTATUS = `/changeformstatus?email=${newCaseData?.hospital_email}&casenumber=${newCaseData?.caseNumber}`;

    const URLFORMCREATIONAUDITTRIAL = `/finalclaimrejectedaudittrail?email=${newCaseData?.hospital_email}&casenumber=${newCaseData?.caseNumber}`;

    const formCreationAuditForm = new FormData();
    formCreationAuditForm?.append('amount', data?.amount || 0);
    formCreationAuditForm?.append(
      'date',
      data?.date || new Date()?.toISOString()
    );

    const formStatus = new FormData();
    formStatus?.append(
      'companyname',
      newCaseData?.patient_details?.Insurance_Company
    );
    formStatus?.append('lastformstatus', currentBucket);
    //@ts-ignore
    formStatus?.append('newformstatus', action);
    const formNewStatus = new FormData();
    //@ts-ignore
    formNewStatus?.append('newformstatus', action);

    try {
      if (data?.file?.length) {
        const image = await imageUpload(data?.file);
        formCreationAuditForm?.append('imgurl', image || 'N/A');
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      } else {
        formCreationAuditForm?.append('imgurl', 'N/A');
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      }

      dispatch(setLoading(false));
      notification('info', `Case Moved Successfully`);

      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLDataElement | any>
  ) => {
    const { name, value } = e?.target;
    if (name === 'file') {
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

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className='flex items-center justify-end py-4'>
        <IoClose
          className='mr-6 text-2xl text-fontColor cursor-pointer'
          onClick={closeModal}
        />
      </div>
      <div
        className='px-10 py-8 relative'
        style={{ height: '70vh', overflow: 'auto' }}
      >
        <div className='px-10 py-8 relative'>
          {/* <IoClose
          className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        /> */}

          <div className='w-full h-auto border-2 border-fontColor rounded-lg text-center'>
            <p className='text-sm text-fontColor-gray pt-4'>
              Upload your documents here
            </p>
            <div className='flex items-center justify-center mt-4'>
              {data?.file?.length
                ? data?.file?.map(
                    (
                      file: { name: {} | null | undefined },
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <div
                          className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
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
                          {/* @ts-ignore */}
                          <IoClose onClick={() => removeImage(file?.name)} />
                        </div>
                      );
                    }
                  )
                : null}
            </div>
            <div className='flex justify-center mt-8 mb-4 '>
              <div className='relative flex items-center justify-center border-2 border-fontColor rounded-lg w-44 h-10'>
                <img src={paperclip} alt='icon' className='mr-2' />
                <p className='text-fontColor-gray font-normal '>Attach file</p>
                <input
                  type='file'
                  className='absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10'
                  name='file'
                  onChange={handleChange}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {status === 'approved' ? (
              <>
                <div className='col-span-1'>
                  <Input
                    value={data?.amount}
                    name='amount'
                    handleChange={handleChange}
                    label='Amount'
                    labelStyle={{ color: '#c8c8c8' }}
                    type='number'
                    style={{
                      height: '40px',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: '#FFFFFF17',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
        <DepRequest newCaseData={newCaseData} action={action} />
        <div className='flex justify-center mt-8'>
          <PlanSelectButton
            text='Submit'
            style={{ maxWidth: '180px' }}
            handleClick={uploadFile}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DepEnchanceAndFci;
