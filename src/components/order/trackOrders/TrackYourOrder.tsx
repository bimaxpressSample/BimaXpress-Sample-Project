import React, { useEffect } from "react";
import "./TrackYourOrder.css";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { useAppDispatch } from "../../../redux/hooks";
import axiosConfig from "../../../config/axiosConfig";
import { setCaseData } from "../../../redux/slices/homeSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import notification from "../../theme/utility/notification";
import TrackOrder from "./TrackOrder";
import { setShipmentData } from "../../../redux/slices/shipmentsSlice";

export default function TrackYourOrder() {
	const params = useParams();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state?.user);
	const { caseData } = useAppSelector((state) => state?.home);
	const { newShipmentData } = useAppSelector((state) => state?.shipmentsData);
	console.log(params);

	var a;

	const tracking = async () => {
		const postUrl = `/Authentication?email=palashshrivastava244@gmail.com&password=Palash@7067`;

		const { data } = await axiosConfig.post(postUrl);
		const header = data.data.token;

		dispatch(setLoading(true));
		const viewURL = `/trackorder?shipment_id=${params.key}&token=${header}`;

		try {
			await axiosConfig.get(viewURL).then((response) => {
				
				a = response.data.data.tracking_data.shipment_track_activities;

				console.log("Api data", response.data.data);
				dispatch(setShipmentData(a));

				// for(let i=0; i < a.length; i++){
				//   openWindow(a[i]);
				// }
			});
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		tracking();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log("Redux se shipment ka Data", newShipmentData);
	}, [newShipmentData]);

	// console.log("console--------------------", newShipmentData);

	// newShipmentData.map((index: any, value: any) => {
	// 	console.log(index, "-----", value);
	// });

	return (
		<>
			<div className="flex justify-center rounded-2xl mt-10">
				<section className="root rounded-3xl bg-primary-lighter text-gray-300">
					<figure>
						<img
							src="https://cdn-icons-png.flaticon.com/512/1559/1559859.png"
							alt=""
						/>
						<figcaption>
							<h4>Tracking Details</h4>
							<h6>Order Number</h6>
							<h2>{params.key}</h2>
						</figcaption>
					</figure>

					{newShipmentData.map((value: any, index: any) => {
						console.log(index, "-----", value);
						return (
							<div className="order-track">
								<div className="order-track-step">
									<div className="order-track-status">
										<span className="order-track-status-dot"></span>
										<span className="order-track-status-line1"></span>
									</div>
									<div className="order-track-text">
										<p className="order-track-text-stat">{value.activity}</p>
										<span className="order-track-text-sub">
											{value.location}
										</span>
									</div>
									<span className="order-track-text-sub">{value.date}</span>
								</div>
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
}
