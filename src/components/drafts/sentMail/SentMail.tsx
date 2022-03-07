import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import styles from "./SentMail.module.scss";
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
import { useNavigate } from "react-router-dom";
const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

type ComposeModalProps = {
	isOpen?: boolean;
	closeModal?: () => void;
	newCaseData: any;
	action?: string;
};

const SentMail = ({
	isOpen = false,
	closeModal = () => {},
	newCaseData,
	action = "",
}: ComposeModalProps) => {
	const { currentBucket } = useAppSelector((state) => state?.home);

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
	const [reciverEmail, setReciverEmail] = useState("");

	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state?.user);
	const { allCompaniesList } = useAppSelector(
		(state) => state?.empanelledCompanies
	);

	const dispatch = useAppDispatch();

	const bodyRef = useRef(null);

	const imageUpload = async () => {
		const IMAGEUPLOAD = `/imageupload?email=${user}&casenumber=${newCaseData?.caseNumber}`;
		const imageFormData = new FormData();
		let name: string | Blob | any[] = [];

		mail?.file.forEach((img) => {
			//@ts-ignore
			name.push(img?.name);

			imageFormData.append("image", img);
		});
		//@ts-ignore
		imageFormData?.append("imagename", name);
		imageFormData?.append("arrayname", "urlid");

		const { data } = await axiosConfig.post(IMAGEUPLOAD, imageFormData);
		return data?.data;
	};

	const removeImage = (name: string) => {
		setMail((pre: any) => ({
			...pre,
			//@ts-ignore
			file: pre?.file?.filter((files) => files?.name !== name),
		}));
	};

	const uploadFile = async () => {
		dispatch(setLoading(true));

		const URL = `/sendEmail?email=${user}`;
		const URLINCEMENT = `/incrementcounter?email=${user}`;
		const URLCHANGESTATUS = `/changeformstatus?email=${user}&casenumber=${newCaseData?.caseNumber}`;
		const URLFORMCREATIONAUDITTRIAL = `/queryrespondedaudittrail?email=${user}&casenumber=${newCaseData?.caseNumber}`;

		const formCreationAuditForm = new FormData();
		formCreationAuditForm?.append(
			"amount",
			newCaseData?.hospital_details?.total || 0
		);
		formCreationAuditForm?.append("date", new Date()?.toISOString() || "");

		const formStatus = new FormData();
		formStatus?.append(
			"companyname",
			newCaseData?.patient_details?.Insurance_Company
		);
		formStatus?.append("lastformstatus", currentBucket);
		formStatus?.append("newformstatus", action);
		const formNewStatus = new FormData();
		formNewStatus?.append("newformstatus", action);

		const formData = new FormData();
		formData?.append("reciever", reciverEmail ? reciverEmail : "");
		mail?.ccList?.length
			? mail?.ccList?.forEach((mail) => {
					formData.append("Cc", mail);
			  })
			: formData.append("Cc", "");

		mail?.bccList.length
			? mail?.bccList?.forEach((mail) => {
					formData.append("Bcc", mail);
			  })
			: formData.append("Bcc", "");
		formData?.append("sub", mail?.sub);
		//@ts-ignore
		formData?.append("sender_msg", bodyRef?.current?.innerText);
		try {
			if (mail?.file?.length) {
				const image = await imageUpload();
				mail?.file.forEach((img) => {
					formData.append("files", img);
				});
				formCreationAuditForm?.append("imgurl", image || "N/A");
				await axiosConfig.post(URL, formData);
				await axiosConfig.post(URLINCEMENT, formStatus);
				await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
				await axiosConfig.post(
					URLFORMCREATIONAUDITTRIAL,
					formCreationAuditForm
				);
			} else {
				formData.append("files", "");
				formCreationAuditForm?.append("imgurl", "N/A");
				await axiosConfig.post(URL, formData);
				await axiosConfig.post(URLINCEMENT, formStatus);
				await axiosConfig.post(URLCHANGESTATUS, formNewStatus);
				await axiosConfig.post(
					URLFORMCREATIONAUDITTRIAL,
					formCreationAuditForm
				);
			}

			dispatch(setLoading(false));
			notification("info", `Case moved ${action} successfully`);
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
			navigate("/");
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
			to: "",
			cc: "",
			bcc: "",
			ccList: [],
			bccList: [],
			sub: `Query Reply for  ${newCaseData?.patient_details?.Name} claim no: ${newCaseData?.claimno}`,
			file: [],
			toList: [],
			body: ` <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dear Sir/Ma'am,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find query response for ${newCaseData?.patient_details?.Name} admitted on  ${newCaseData?.hospital_details?.Date_of_Admission}.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Also find details of patient below:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Patient name: ${newCaseData?.patient_details?.Name}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date of admission : ${newCaseData?.hospital_details?.Date_of_Admission}</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Policy Number : ${newCaseData?.patient_details?.Policy_Id}</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Please find the attached documents below following to the raised query.</div>`,
		}));

		const companyInfo =
			//@ts-ignore
			allCompaniesList[newCaseData?.patient_details?.Insurance_Company];
		if (companyInfo) {
			const email = JSON.parse(companyInfo?.replace(/'/g, '"'))?.email;
			setReciverEmail(email);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newCaseData]);

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
					Sent Mail
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
			<div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex">
				<input
					className="border-none outline-none text-primary font-medium flex-auto"
					value={mail?.sub}
					name="sub"
					onChange={(e) => handleChange(e)}
					placeholder="Subject"
				/>
			</div>

			<div
				className="px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none"
				style={{ minHeight: "250px" }}
				contentEditable={true}
				ref={bodyRef}
				suppressContentEditableWarning={true}
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
						className="absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 "
						name="file"
						onChange={handleChange}
						multiple
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

export default SentMail;
