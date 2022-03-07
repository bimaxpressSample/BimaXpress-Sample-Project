import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import styles from "./ComposeModal.module.css";
import { IoClose } from "react-icons/io5";
import paperclip_black from "../../../assets/icon/paperclip_black.svg";
import bold from "../../../assets/icon/bold.svg";
import italic from "../../../assets/icon/italic.svg";
import underline from "../../../assets/icon/underline.svg";
import align_center_alt from "../../../assets/icon/align-center-alt.svg";
import align_left from "../../../assets/icon/align_left.svg";
import align_right from "../../../assets/icon/align_right.svg";
import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setLoading } from "../../../redux/slices/utilitySlice";
import ReactHtmlParser from "react-html-parser";
const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  selectedMail: object;
};

const ComposeModal = ({
  isOpen = false,
  closeModal = () => {},
  selectedMail,
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
    file: string[];
  }>({
    to: "",
    cc: "",
    bcc: "",
    toList: [],
    ccList: [],
    bccList: [],
    sub: "",
    body: "",
    file: [],
  });
  const { user } = useAppSelector((state) => state?.user);
  const { composeMailStatus } = useAppSelector((state) => state?.mail);
  const dispatch = useAppDispatch();

  const bodyRef = useRef(null);

  const uploadFile = async () => {
    dispatch(setLoading(true));

    const URL = `/${
      composeMailStatus === "new"
        ? "sendEmail"
        : composeMailStatus === "reply"
        ? "replyMail"
        : "forwardMail"
    }?email=${user}`;
    const formData = new FormData();
    mail?.toList?.forEach((mail) => {
      formData.append("reciever", mail);
    });
    mail?.ccList?.forEach((mail) => {
      formData.append("Cc", mail);
    });
    mail?.bccList?.forEach((mail) => {
      formData.append("Bcc", mail);
    });
    formData?.append("sub", mail?.sub);
    //@ts-ignore
    formData?.append("sender_msg", bodyRef?.current?.innerText);
    try {
      if (mail?.file?.length) {
        mail?.file.forEach((img) => {
          formData.append("files", img);
        });
        await axiosConfig.post(URL, formData);
      } else {
        formData.append("files", "");
        await axiosConfig.post(URL, formData);
      }

      dispatch(setLoading(false));
      notification(
        "info",
        `Email ${
          composeMailStatus === "new"
            ? "sent"
            : composeMailStatus === "reply"
            ? "reply"
            : "forward"
        } successfully`
      );
      closeModal();
      setMail({
        to: "",
        cc: "",
        bcc: "",
        toList: [],
        ccList: [],
        bccList: [],
        sub: "",
        body: "",
        file: [],
      });
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  const runCommand = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    if (value !== ",") {
      if (name === "file") {
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

  const removeEmail = (val: string, listName: string) => {
    setMail((pre) => ({
      ...pre,
      //@ts-ignore
      [listName]: [...pre[listName]]?.filter((mail) => mail !== val),
    }));
  };

  const handleKeypress = (
    e: React.KeyboardEvent,
    name: string,
    listName: string
  ) => {
    if (e?.key === "Enter" || e?.key === ",") {
      //@ts-ignore
      if (mail[name]) {
        setMail((pre) => ({
          ...pre,
          //@ts-ignore
          [listName]: [...pre[listName], pre[name]],
          [name]: "",
        }));
      }
    }
  };

  const removeImage = (name: string) => {
    setMail((pre: any) => ({
      ...pre,
      //@ts-ignore
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const checkValidEmail = (val: string) => {
    return emailRegex?.test(val);
  };

  useEffect(() => {
    if (composeMailStatus === "reply") {
      setMail((pre) => ({
        ...pre,
        to: "",
        cc: "",
        bcc: "",
        ccList: [],
        bccList: [],
        //@ts-ignore
        sub: `Re : ${selectedMail?.subject}`,
        file: [],
        //@ts-ignore
        toList: [...pre?.toList, selectedMail?.from],
        //@ts-ignore
        body: selectedMail?.message,
      }));
    } else if (composeMailStatus === "forward") {
      setMail((pre) => ({
        ...pre,
        to: "",
        cc: "",
        bcc: "",
        ccList: [],
        bccList: [],
        //@ts-ignore
        sub: `Re : ${selectedMail?.subject}`,
        file: [],
        toList: [],
        //@ts-ignore
        body: selectedMail?.message,
      }));
    } else {
      setMail({
        to: "",
        cc: "",
        bcc: "",
        ccList: [],
        bccList: [],
        sub: "",
        file: [],
        toList: [],
        body: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composeMailStatus]);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.approveModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={`flex items-center justify-between h-10 w-full bg-primary px-4 border-none outline-none ${styles.composeModalHeader}`}
      >
        <div></div>
        <p className="text-base text-fontColor tracking-wide capitalize">
          {composeMailStatus} Mail
        </p>
        <IoClose
          className=" text-2xl text-fontColor cursor-pointer"
          onClick={closeModal}
        />
      </div>
      {/* <p className="px-4 py-2 text-sm text-primary font-medium">
        bhimxpress2000@outlook.in
      </p> */}
      <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
        <p className="mr-2 mb-1 ">To</p>
        {mail?.toList?.map((item, index) => {
          return (
            <div
              className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                checkValidEmail(item)
                  ? "font-medium text-primary"
                  : "border-none bg-red-600 text-fontColor"
              }`}
              key={index}
            >
              <p>{item}</p>
              <MdOutlineClose
                className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                  checkValidEmail(item) ? "" : "text-fontColor"
                }`}
                onClick={() => removeEmail(item, "toList")}
              />
            </div>
          );
        })}

        <input
          className="border-none outline-none flex-auto"
          value={mail?.to}
          name="to"
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeypress(e, "to", "toList")}
        />
      </div>
      {composeMailStatus === "reply" ? null : (
        <>
          <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
            <p className="mr-2 mb-1">Cc</p>
            {mail?.ccList?.map((item, index) => {
              return (
                <div
                  className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                    checkValidEmail(item)
                      ? "font-medium text-primary"
                      : "border-none bg-red-600 text-fontColor"
                  }`}
                  key={index}
                >
                  <p>{item}</p>
                  <MdOutlineClose
                    className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                      checkValidEmail(item) ? "" : "text-fontColor"
                    }`}
                    onClick={() => removeEmail(item, "ccList")}
                  />
                </div>
              );
            })}

            <input
              className="border-none outline-none flex-auto"
              value={mail?.cc}
              name="cc"
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => handleKeypress(e, "cc", "ccList")}
            />
          </div>
          <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
            <p className="mr-2 mb-1">Bcc</p>
            {mail?.bccList?.map((item, index) => {
              return (
                <div
                  className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1 ${
                    checkValidEmail(item)
                      ? "font-medium text-primary"
                      : "border-none bg-red-600 text-fontColor"
                  }`}
                  key={index}
                >
                  <p>{item}</p>
                  <MdOutlineClose
                    className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                      checkValidEmail(item) ? "" : "text-fontColor"
                    }`}
                    onClick={() => removeEmail(item, "bccList")}
                  />
                </div>
              );
            })}

            <input
              className="border-none outline-none flex-auto"
              value={mail?.bcc}
              name="bcc"
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => handleKeypress(e, "bcc", "bccList")}
            />
          </div>
        </>
      )}
      {composeMailStatus === "reply" ||
      composeMailStatus === "forward" ? null : (
        <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex">
          <input
            className="border-none outline-none text-primary font-medium flex-auto"
            value={mail?.sub}
            name="sub"
            onChange={(e) => handleChange(e)}
            placeholder="Subject"
          />
        </div>
      )}
      <div
        className="px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none"
        style={{ minHeight: "250px" }}
        contentEditable={true}
        ref={bodyRef}
      >
        {ReactHtmlParser(mail?.body)}
      </div>

      <div className="flex items-center flex-wrap">
        {mail?.file?.length
          ? mail?.file?.map((file, index) => {
              return (
                <div
                  className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
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
                    {/* @ts-ignore */}
                    {file?.name}
                  </p>
                  {/* @ts-ignore */}
                  <IoClose onClick={() => removeImage(file?.name)} />
                </div>
              );
            })
          : null}
      </div>
      <div className=" flex items-center py-8 p px-4">
        <button
          className="w-28 h-10 bg-primary-dark text-sm text-fontColor border-none outline-none rounded mr-3"
          onClick={uploadFile}
        >
          Send
        </button>
        <div className="relative w-8 h-8 cursor-pointer">
          <img
            src={paperclip_black}
            alt="icon"
            className="absolute mr-3 top-2 cursor-pointer"
          />
          <input
            type="file"
            multiple
            className="absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 "
            name="file"
            onChange={handleChange}
          />
        </div>
        <div
          className="flex items-center p-3 rounded"
          style={{ backgroundColor: "#EEEEEE" }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={bold}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("bold")}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={italic}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("italic")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={underline}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("underline")}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={align_right}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyLeft")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_center_alt}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyCenter")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_left}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyRight")}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ComposeModal;
