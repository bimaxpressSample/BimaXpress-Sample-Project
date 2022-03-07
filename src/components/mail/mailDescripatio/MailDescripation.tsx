import React from 'react';
// import MailDescripationHeader from "../mailDescripationHeader/MailDescripationHeader";
import corner_up_left_alt from '../../../assets/icon/corner-up-left-alt.svg';
import corner_up_right_alt from '../../../assets/icon/corner_up_right_alt.svg';
// import styles from "./MailDescripation.module.css";
// import downArrow from "../../../assets/icon/downArrow.svg";
import { useAppDispatch } from '../../../redux/hooks';
import { setComposeMailStatus } from '../../../redux/slices/mailSlice';
import { RiSpamLine } from 'react-icons/ri';
import deleteIcon from '../../../assets/icon/delete_icon.svg';
import ReactHtmlParser from 'react-html-parser';
// import parse from "html-react-parser";
// import { useState, useEffect } from 'react';

type MailDescripationProps = {
  openApproveModal: boolean;
  handleOpenApproveModal: () => void;
  openModal: () => void;
  selectedMail: object;
};
const MailDescripation = ({
  openApproveModal = false,
  handleOpenApproveModal = () => {},
  openModal,
  selectedMail,
}: MailDescripationProps) => {
  const dispatch = useAppDispatch();
  console.log(selectedMail);

  const handleReplyMail = () => {
    dispatch(setComposeMailStatus('reply'));
    openModal();
  };
  const handleForwardMail = () => {
    dispatch(setComposeMailStatus('forward'));
    openModal();
  };
  return (
    <div>
      <div className='flex justify-between items-start'>
        <div>
          {/* @ts-ignore */}
          <p className='text-lg text-fontColor'>{selectedMail?.name}</p>
          <p className='text-xs text-fontColor-darkGray'>
            {/* @ts-ignore */}
            to: {selectedMail?.to}
          </p>
        </div>
        <div className='flex items-center justify-end'>
          <div className='flex items-center'>
            <p className='text-xs text-fontColor opacity-80 mx-2'>
              {/* @ts-ignore */}
              {selectedMail?.date}
            </p>
            <img src={deleteIcon} alt='icon' className='px-2' />
            <img src={corner_up_right_alt} alt='icon' className='px-2' />
            <img src={corner_up_left_alt} alt='icon' className='px-2' />
            <RiSpamLine className='mx-2 text-fontColor text-2xl' />
          </div>
        </div>
      </div>
      <div className='my-6' style={{ height: '100vh', overflow: 'scroll' }}>
        <h2 className='text-2xl text-fontColor font-semibold'>
          {/* @ts-ignore */}
          {selectedMail?.subject}
        </h2>
        {/* <p className="mt-4 text-lg text-fontColor-gray font-thin">Hey</p> */}
        <p
          className='mt-6 text-lg text-fontColor-gray font-thin tracking-wide'
          /* @ts-ignore */
          // dangerouslySetInnerHTML={{ __html: selectedMail?.message }}
        >
          {/* @ts-ignore */}
          {ReactHtmlParser(selectedMail?.message)}
        </p>
        {/* <p className="mt-6 text-lg text-fontColor-gray font-thin tracking-wide">
          We all know that Internet / Technologies / Automation is present and
          future.
        </p>
        <p className="mt-6 text-lg text-fontColor-gray font-thin tracking-wide">
          You need to decide, you just wanna user of these in normal life or
          while using & playing with this, want to change your financial life?
          Here is one more example, You can see how this guy is changing his
          financial life,
        </p>
        <p className="mt-8 text-lg text-fontColor-gray font-thin tracking-wide">
          Here is more example
        </p>
        <p className="mt-6 text-lg text-fontColor-gray font-thin tracking-wide">
          You can see how this guy is changing his financial life,
        </p>
        <p className="mt-6 text-lg text-fontColor-gray font-thin tracking-wide">
          while learning and working with DigitalMentorWorld.
        </p> */}
        <div className='mt-8 flex items-center justify-between'>
          <div className='flex justify-around w-full'>
            <div className='flex'>
              <button
                className=' outline-none px-4 py-2 border-2 border-fontColor flex justify-center items-center rounded-xl mr-4'
                onClick={handleReplyMail}
              >
                <img src={corner_up_left_alt} alt='icon' />
                <p className='text-lg text-fontColor ml-2 font-semibold tracking-wide'>
                  Reply
                </p>
              </button>
              <button
                className=' outline-none px-4 py-2 border-2 border-fontColor flex justify-center items-center rounded-xl mr-2'
                onClick={handleForwardMail}
              >
                <img src={corner_up_right_alt} alt='icon' />
                <p className='text-lg text-fontColor ml-2 font-semibold tracking-wide'>
                  Forward
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailDescripation;
