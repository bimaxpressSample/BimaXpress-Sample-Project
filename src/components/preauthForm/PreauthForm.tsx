import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import HtmlParser from 'react-html-parser';
import { setUserPlanData } from '../../redux/slices/userSlice';
import { useParams } from 'react-router-dom';
const PreauthForm = () => {
  const param = useParams();
  const [data, setData] = useState<any>('');
  const { user } = useAppSelector((state) => state?.user);
  const { newCaseNum } = useAppSelector((state) => state?.case);
  // const { newCaseNum } = useAppSelector((state) => state?.case);
  const dispatch = useAppDispatch();

  const getPreauthForm = async () => {
    dispatch(setLoading(true));
    const URL = `/preauthform?email=${param?.user}&casenumber=${param?.case}`;

    const planDetailsURL = `/plandetails?email=${param?.user}`;

    try {
      const { data } = await axiosConfig.get(URL);

      dispatch(setLoading(false));
      setData(data);
      // const elem = document.getElementById('printable');
      // //@ts-ignore
      // elem.innerHTML = data;
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
      console.log(error);
    }
    try {
      const { data } = await axiosConfig.get(planDetailsURL);
      console.log('plan data ', data.data);
      dispatch(setUserPlanData(data?.data[0]));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  const printForm = () => {
    window.print();
  };

  useEffect(() => {
    getPreauthForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <button
			onClick={printForm}
			style={{
				textTransform: "uppercase",
				backgroundColor: "#535353",
				padding: "6px 15px",
				color: "#fff",
				borderRadius: "2px",
				marginBottom: "10px",
				fontSize: "18px",
				position:"absolute",
				marginLeft:"10px",
			}}
		>
			Print
		</button> */}
      <div
        className='printable'
        style={{ textAlign: 'center', marginTop: '10px' }}
      >
        {/* <button
			onClick={printForm}
			style={{
				textTransform: "uppercase",
				backgroundColor: "#535353",
				padding: "6px 15px",
				color: "#fff",
				borderRadius: "2px",
				marginBottom: "10px",
				fontSize: "18px",
				marginLeft: "10px",
			}}
		>
			Back
		</button> */}
        <div onClick={printForm} style={{ position: 'relative' }}>
          {HtmlParser(data)}
        </div>
      </div>
    </>
  );
};

export default PreauthForm;
