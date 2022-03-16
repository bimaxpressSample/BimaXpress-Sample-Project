import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './SentMail.module.scss';
import { IoClose } from 'react-icons/io5';
import bold from '../../../assets/icon/bold.svg';
import italic from '../../../assets/icon/italic.svg';
import underline from '../../../assets/icon/underline.svg';
import align_center_alt from '../../../assets/icon/align-center-alt.svg';
import align_left from '../../../assets/icon/align_left.svg';
import align_right from '../../../assets/icon/align_right.svg';
import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { setLoading } from '../../../redux/slices/utilitySlice';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
// import paperclip from "../../../assets/icon/paperclip.svg";
import { FiPaperclip } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from '../../theme/utility/NewLoader/Loaderformail';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  newCaseData: any;
  total?: number;
};

const SentMail = ({
  isOpen = false,
  closeModal = () => {},
  newCaseData,
  total = 0,
}: ComposeModalProps) => {
  const [mail, setMail] = useState<{
    to: string;
    cc: string;
    bcc: string;
    toList: string[];
    ccList: string[];
    bccList: string[];
    sub: string;
    body: any;
    // file: [];
    UrluploadPatientsHealthIDCard: [];
    Urlidproof: [];
    UrluploadConsultation: [];
    UrluploadSignedPreAuth: [];
    UrlotherDocuments: [];
  }>({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    // file: [],
    UrluploadPatientsHealthIDCard: [],
    Urlidproof: [],
    UrluploadConsultation: [],
    UrluploadSignedPreAuth: [],
    UrlotherDocuments: [],
  });

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state?.user);
  const { allCompaniesList } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const dispatch = useAppDispatch();

  const companyInfo =
    //@ts-ignore
    allCompaniesList[
      newCaseData?.detailsOfTPA?.TPA && newCaseData?.detailsOfTPA?.TPA !== 'NA'
        ? newCaseData?.detailsOfTPA?.TPA
        : newCaseData?.detailsOfTPA?.insuranceCompany
    ];

  const bodyRef = useRef(null);

  const imageUpload = async () => {
    const IMAGEUPLOAD = `/imageupload?email=${user}&casenumber=${newCaseNum}`;

    let name: string | Blob | any[] = [];
    let imageArray: string | Blob | any[] = [];
    let imageArrayALL: string | Blob | any[] = [];
    if (mail?.Urlidproof?.length) {
      name = [];
      imageArray = [];
      const imageFormData = new FormData();

      mail?.Urlidproof.forEach((img) => {
        //@ts-ignore
        name.push(img?.name);

        imageFormData.append('image', img);
      });
      //@ts-ignore
      imageFormData?.append('imagename', name);
      imageFormData?.append('arrayname', 'Urlidproof');

      const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
      imageArrayALL = [...imageArray, ...data?.data];
    }

    if (mail?.UrlotherDocuments?.length) {
      name = [];
      imageArray = [];
      const imageFormData = new FormData();
      mail?.UrlotherDocuments.forEach((img) => {
        //@ts-ignore
        name.push(img?.name);

        imageFormData.append('image', img);
      });
      //@ts-ignore
      imageFormData?.append('imagename', name);
      imageFormData?.append('arrayname', 'UrlotherDocuments');

      const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
      imageArrayALL = [...imageArray, ...data?.data];
    }

    if (mail?.UrluploadConsultation?.length) {
      name = [];
      imageArray = [];
      const imageFormData = new FormData();
      mail?.UrluploadConsultation.forEach((img) => {
        //@ts-ignore
        name.push(img?.name);

        imageFormData.append('image', img);
      });
      //@ts-ignore
      imageFormData?.append('imagename', name);
      imageFormData?.append('arrayname', 'UrluploadConsultation');

      const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
      imageArrayALL = [...imageArray, ...data?.data];
    }

    if (mail?.UrluploadPatientsHealthIDCard?.length) {
      name = [];
      imageArray = [];
      const imageFormData = new FormData();
      mail?.UrluploadPatientsHealthIDCard.forEach((img) => {
        //@ts-ignore
        name.push(img?.name);

        imageFormData.append('image', img);
      });
      //@ts-ignore
      imageFormData?.append('imagename', name);
      imageFormData?.append('arrayname', 'UrluploadPatientsHealthIDCard');

      const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
      imageArrayALL = [...imageArray, ...data?.data];
    }

    if (mail?.UrluploadSignedPreAuth?.length) {
      name = [];
      imageArray = [];
      const imageFormData = new FormData();
      mail?.UrluploadSignedPreAuth.forEach((img) => {
        //@ts-ignore
        name.push(img?.name);

        imageFormData.append('image', img);
      });
      //@ts-ignore
      imageFormData?.append('imagename', name);
      imageFormData?.append('arrayname', 'UrluploadSignedPreAuth');

      const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
      imageArrayALL = [...imageArray, ...data?.data];
    }

    return imageArrayALL;
  };

  const [mailLoader, setmailLoader] = useState(false);

  const removeImage = (name: string, listName: string) => {
    console.log(name, listName);

    setMail((pre: any) => ({
      ...pre,
      //@ts-ignore
      [listName]: [...pre[listName]]?.filter(
        (files: { name: string }) => files?.name !== name
      ),
    }));
  };

  const uploadFile = async () => {
    //@ts-ignore
    const email = JSON.parse(companyInfo?.replace(/'/g, '"'))?.email;

    console.log(email);

    // dispatch(setLoading(true));
    setmailLoader(true);
    console.log('trueeee');

    const URL = `/sendEmail?email=${user}`;

    const URLINCEMENT = `/incrementcounter?email=${user}`;
    const URLCHANGESTATUS = `/changeformstatus?email=${user}&casenumber=${newCaseNum}`;
    const URLFORMCREATIONAUDITTRIAL = `/formcreationaudittrail?email=${user}&casenumber=${newCaseNum}`;
    const formCreationAuditForm = new FormData();
    //@ts-ignore
    formCreationAuditForm?.append('amount', total);
    formCreationAuditForm?.append('date', new Date()?.toISOString() || '');

    const formStatus = new FormData();
    formStatus?.append(
      'companyname',
      newCaseData?.detailsOfTPA?.insuranceCompany
    );
    formStatus?.append('lastformstatus', 'draft');
    formStatus?.append('newformstatus', 'Unprocessed');
    const formNewStatus = new FormData();
    formNewStatus?.append('newformstatus', 'Unprocessed');

    const formData = new FormData();
    formData?.append('reciever', email ? email : '');
    mail?.ccList?.length
      ? mail?.ccList?.forEach((mail) => {
          formData.append('Cc', mail);
        })
      : formData.append('Cc', '');
    mail?.bccList.length
      ? mail?.bccList?.forEach((mail) => {
          formData.append('Bcc', mail);
        })
      : formData.append('Bcc', '');
    formData?.append('sub', mail?.sub);
    //@ts-ignore
    formData?.append('sender_msg', bodyRef?.current?.innerText);
    try {
      if (
        mail?.Urlidproof?.length ||
        mail?.UrlotherDocuments?.length ||
        mail?.UrluploadConsultation?.length ||
        mail?.UrluploadPatientsHealthIDCard?.length ||
        mail?.UrluploadSignedPreAuth?.length
      ) {
        const images: any = await imageUpload();
        console.log(images);

        //@ts-ignore
        images?.forEach((img) => {
          formData.append('imgurl', img);
        });

        formCreationAuditForm?.append('imgurl', images);
        let imageArray = [
          ...mail?.Urlidproof,
          ...mail?.UrlotherDocuments,
          ...mail?.UrluploadConsultation,
          ...mail?.UrluploadPatientsHealthIDCard,
          ...mail?.UrluploadSignedPreAuth,
        ];
        imageArray?.forEach((img) => {
          formData.append('files', img);
        });
        await axiosConfig.post(URL, formData);
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      } else {
        formData.append('files', '');
        formCreationAuditForm?.append('imgurl', '#');
        await axiosConfig.post(URL, formData);
        await axiosConfig.post(URLINCEMENT, formStatus);
        await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
        await axiosConfig.post(
          URLFORMCREATIONAUDITTRIAL,
          formCreationAuditForm
        );
      }
      setmailLoader(false);
      console.log('false');
      // dispatch(setLoading(false));
      notification('info', `Email sent successfully`);
      closeModal();
      setMail({
        to: '',
        cc: '',
        bcc: '',
        toList: [],
        ccList: [],
        bccList: [],
        sub: '',
        body: '',
        // file: [],
        UrluploadPatientsHealthIDCard: [],
        Urlidproof: [],
        UrluploadConsultation: [],
        UrluploadSignedPreAuth: [],
        UrlotherDocuments: [],
      });
      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const runCommand = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e?.target;
    console.log(type);

    if (value !== ',') {
      if (type === 'file') {
        //@ts-ignore
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [name]: [...pre[name], ...e?.target?.files],
        }));
      } else {
        setMail((pre) => ({ ...pre, [name]: value }));
      }
    }
  };

  useEffect(() => {
    //@ts-ignore
    console.log(mail);
  }, [mail]);

  const handleKeypress = (
    e: React.KeyboardEvent,
    name: string,
    listName: string
  ) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      //@ts-ignore
      if (mail[name]) {
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [listName]: [...pre[listName], pre[name]],
          [name]: '',
        }));
      }
    }
  };

  const removeEmail = (val: string, listName: string) => {
    setMail((pre) => ({
      ...pre,
      //@ts-ignore
      [listName]: [...pre[listName]]?.filter((mail) => mail !== val),
    }));
  };

  const checkValidEmail = (val: string) => {
    return emailRegex?.test(val);
  };

  useEffect(() => {
    setMail((pre) => ({
      ...pre,
      to: '',
      cc: '',
      bcc: '',
      ccList: [],
      bccList: [],
      sub: `Pre-authorization request for ${newCaseData?.patientDetails?.patientName}  ${newCaseData?.patientDetails?.insuredCardNumber}/ ${newCaseData?.patientDetails?.policyNumber}`,
      file: [],
      toList: [],
      body: ` <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dear Sir/Ma'am,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find pre auth request for ${newCaseData?.patientDetails?.patientName} admitted on ${newCaseData?.admissionDetails?.Date_of_Admission}.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Also find details of patient below:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Patient name: ${newCaseData?.patientDetails?.patientName}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date of admission : ${newCaseData?.admissionDetails?.Date_of_Admission}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Health-id card no : ${newCaseData?.patientDetails?.policyNumber}</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find the attached preauth documents below.</div>`,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCaseData]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={`${styles.approveModalContainer} y-scroll`}
        overlayClassName={styles.overlayContainer}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        {mailLoader && (
          <div
            id='LoaderDiv'
            style={{
              zIndex: '1050',

              width: '100%',
              minHeight: '120%',
              backgroundColor: 'rgb(206 206 206 / 84%)',
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          >
            <AnimatedProgressProvider
              valueStart={0}
              //@ts-ignore
              valueEnd={100}
              duration={7.4}
              easingFunction={easeQuadInOut}
            >
              {(value: any) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                    styles={buildStyles({
                      pathTransition: 'none',
                      textColor: 'orange',
                      pathColor: 'orange',
                      backgroundColor: 'white',
                    })}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
        )}
        <div
          className={`flex items-center justify-between h-10 w-full bg-primary px-4 border-none outline-none ${styles.composeModalHeader}`}
        >
          <div></div>
          <p className='text-base text-fontColor tracking-wide capitalize'>
            Sent Mail
          </p>
          <IoClose
            className=' text-2xl text-fontColor cursor-pointer'
            onClick={closeModal}
          />
        </div>
        {/* <p className="px-4 py-2 text-sm text-primary font-medium">
        bhimxpress2000@outlook.in
      </p> */}

        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap'>
          <p className='mr-2 mb-1'>Cc</p>
          {mail?.ccList?.map((item, index) => {
            return (
              <div
                className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                  checkValidEmail(item)
                    ? 'font-medium text-primary'
                    : 'border-none bg-red-600 text-fontColor'
                }`}
                key={index}
              >
                <p>{item}</p>
                <MdOutlineClose
                  className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                    checkValidEmail(item) ? '' : 'text-fontColor'
                  }`}
                  onClick={() => removeEmail(item, 'ccList')}
                />
              </div>
            );
          })}

          <input
            className='border-none outline-none flex-auto'
            value={mail?.cc}
            name='cc'
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeypress(e, 'cc', 'ccList')}
          />
        </div>
        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex'>
          <input
            className='border-none outline-none text-primary font-medium flex-auto'
            value={mail?.sub}
            name='sub'
            onChange={(e) => handleChange(e)}
            placeholder='Subject'
          />
        </div>

        <div
          className='px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none'
          style={{ minHeight: '250px' }}
          contentEditable={true}
          ref={bodyRef}
          suppressContentEditableWarning={true}
        >
          {ReactHtmlParser(mail?.body)}
        </div>

        {/* <div className="flex items-center flex-wrap">
        {mail?.file?.length
          ? mail?.file?.map((file, index) => {
              return (
                <div
                  className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden "
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
                   
                    {file?.name}
                  </p>
                  
                  <IoClose onClick={() => removeImage(file?.name, "file")} />
                </div>
              );
            })
          : null}
      </div> */}

        <div className='grid grid-cols-2 gap-x-4 gap-y-6 m-4'>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadSignedPreAuth?.length
                ? mail?.UrluploadSignedPreAuth?.map((file, index) => {
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
                          onClick={() =>
                            //@ts-ignore
                            removeImage(file?.name, 'UrluploadSignedPreAuth')
                          }
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
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Auth Form
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadSignedPreAuth'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadConsultation?.length
                ? mail?.UrluploadConsultation?.map((file, index) => {
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
                        {/* @ts-ignore */}
                        <IoClose
                          onClick={() =>
                            //@ts-ignore
                            removeImage(file?.name, 'UrluploadConsultation')
                          }
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
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Consultation Papers
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadConsultation'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadPatientsHealthIDCard?.length
                ? mail?.UrluploadPatientsHealthIDCard?.map((file, index) => {
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
                        {/* @ts-ignore */}
                        <IoClose
                          onClick={() =>
                            removeImage(
                              //@ts-ignore
                              file?.name,
                              'UrluploadPatientsHealthIDCard'
                            )
                          }
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
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Health Id Card
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadPatientsHealthIDCard'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.Urlidproof?.length
                ? mail?.Urlidproof?.map((file, index) => {
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
                          onClick={() => removeImage(file?.name, 'Urlidproof')}
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
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                ID Proof
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='Urlidproof'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrlotherDocuments?.length
                ? mail?.UrlotherDocuments?.map((file, index) => {
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
                          onClick={() =>
                            //@ts-ignore
                            removeImage(file?.name, 'UrlotherDocuments')
                          }
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
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Other Documents
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrlotherDocuments'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
        </div>
        <div className=' flex items-center py-8 p px-4'>
          <button
            className='w-28 h-10 bg-primary-dark text-sm text-fontColor border-none outline-none rounded mr-3'
            onClick={uploadFile}
          >
            Send
          </button>
          {/* <div className="relative w-8 h-8 cursor-pointer">
          <img
            src={paperclip_black}
            alt="icon"
            className="absolute mr-3 top-2 cursor-pointer"
          />
          <input
            type="file"
            className="absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 "
            name="file"
            onChange={handleChange}
            multiple
          />
        </div> */}
          <div
            className='flex items-center p-3 rounded'
            style={{ backgroundColor: '#EEEEEE' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={bold}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('bold')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={italic}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('italic')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={underline}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('underline')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={align_right}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyLeft')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_center_alt}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyCenter')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_left}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyRight')}
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SentMail;
