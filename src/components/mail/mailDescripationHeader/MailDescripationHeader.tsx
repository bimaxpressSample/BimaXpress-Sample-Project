import React from "react";
import corner_up_left_alt from "../../../assets/icon/corner-up-left-alt.svg";
import corner_up_right_alt from "../../../assets/icon/corner_up_right_alt.svg";
import deleteIcon from "../../../assets/icon/delete_icon.svg";
import { RiSpamLine } from "react-icons/ri";

const MailDescripationHeader = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center">
        <p className="text-xs text-fontColor opacity-80 mx-2">
          10 November 2021
        </p>
        <img src={deleteIcon} alt="icon" className="px-2" />
        <img src={corner_up_right_alt} alt="icon" className="px-2" />
        <img src={corner_up_left_alt} alt="icon" className="px-2" />
        <RiSpamLine className="mx-2 text-fontColor text-2xl" />
      </div>
    </div>
  );
};

export default MailDescripationHeader;
