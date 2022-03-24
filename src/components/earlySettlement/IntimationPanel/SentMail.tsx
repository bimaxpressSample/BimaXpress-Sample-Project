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
const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  AccountDetails: any;
  total?: number;
  companyDetail?: any;
  fetchEmpanelCompany?: () => void ;
};

const SentMail = ({
  isOpen = false,
  closeModal = () => {},
  AccountDetails,
  total = 0,
  companyDetail,
  fetchEmpanelCompany = () => {}
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
    file: [];
  }>({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    file: [],
  });

  const navigate = useNavigate();

  const { user, userName } = useAppSelector((state) => state?.user);
  const { allCompaniesList } = useAppSelector(
    (state) => state?.empanelledCompanies
  );
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const dispatch = useAppDispatch();

  const bodyRef = useRef(null);

  const uploadFile = async () => {
    //@ts-ignore
    console.log('case data', AccountDetails);

    // const email = JSON.parse(companyInfo?.replace(/'/g, '"'))?.email;
    // Replace This WIth company mail ID
    const email = 'shaylamustafapimr1820@gmail.com';
    console.log('email in sent mail', email);

    dispatch(setLoading(true));

    const URL = `/SendEmail?email=${user}&companyname=${companyDetail.companyName}`;

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
    formData?.append('files', '');
    try {
      await axiosConfig.post(URL, formData);

      dispatch(setLoading(false));
      notification('info', `Email sent successfully`);
      fetchEmpanelCompany();
      closeModal();
      navigate('/IntimationPanel');
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
      sub: `Intimation regarding a change in bank account details`,
      file: [],
      toList: [],
      // body: `<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dear Concern,</div><br><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This is to inform you that our bank account has been changed. For processing the claim  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; amount, please refer to the new account details.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; New Account Number - ${newCaseData?.accountNumber} </div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; New Bank Name- ${newCaseData?.bankName}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; New IFSC Code- ${newCaseData?.ifscCode}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Holder Name- ${newCaseData?.accountHolderName}</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Thanks and Regards <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; XYZ Hospital </div>`,
      body: `<div>Dear Concern,</div><br><div>This is to inform you that our bank account has been changed. For processing the claim amount, please refer to the new account details.</div><div></div><div>New Account Number - ${AccountDetails?.accountNumber} </div><div>New Bank Name- ${AccountDetails?.bankName}</div><div>New IFSC Code- ${AccountDetails?.ifscCode}</div><div>Account Holder Name- ${AccountDetails?.accountHolderName}</div><div><br></div><div>Thanks and Regards <br>${userName} Hospital</div>`,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AccountDetails]);

  return (
    <Modal
      isOpen={isOpen}
      className={`${styles.approveModalContainer} y-scroll`}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
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

      <div className=' flex items-center py-8 p px-4'>
        <button
          className='w-28 h-10 bg-primary-dark text-sm text-fontColor border-none outline-none rounded mr-3'
          onClick={uploadFile}
        >
          Send
        </button>
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
  );
};

export default SentMail;
