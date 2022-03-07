import React, { useEffect, useState } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import HomeCard from '../theme/card/HomeCard';
import { setLoading } from '../../redux/slices/utilitySlice';
import {
  setRemCounter,
  setRemCurrentBucket,
  setRemCaseData,
} from '../../redux/slices/reimbursementSlice';
import notification from '../theme/utility/notification';
//icons
import approved from '../../assets/icon/approved.svg';
import draft from '../../assets/icon/draft.svg';
import fci from '../../assets/icon/fci.svg';
import process from '../../assets/icon/process.svg';
const ReimbursementHome = () => {
  const [menuList, setMenuList] = useState<any>([]);
  const { user } = useAppSelector((state) => state?.user);
  const { remCounter, remCaseData, remCurrentBucket } = useAppSelector(
    (state) => state?.reimbursement
  );
  const [remCounterData, setRemCounterData] = useState({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchCounter = async () => {
    dispatch(setLoading(true));
    const URL = `/crcounter?email=${user}`;
    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setRemCounter(data));
      setRemCounterData(data);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const GoDraftPage = (pageLink: string | To, value: string) => {
    dispatch(setRemCurrentBucket(value));
    if (value === 'NewCase') {
      dispatch(setRemCaseData({ patient_details: {}, hospital_details: {} }));
    }
    navigate(pageLink);
  };

  useEffect(() => {
    fetchCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remCurrentBucket]);

  useEffect(() => {
    if (remCounter !== null && remCounter !== undefined) {
      if (Object.entries(remCounter)?.length) {
        if (!menuList?.length) {
          setMenuList([
            {
              name: 'File New Case',
              value: 'NewCase',
              icon: approved,
              //@ts-ignore
              amount: '',
              pageLink: '/reimbursementNewCase',
            },
            {
              name: 'Draft',
              value: 'Draft',
              icon: draft,
              //@ts-ignore
              // amount: remCounter?.draft,
              amount: '',
              pageLink: '/ReimbursementTableData/rmdraftcases',
            },
            {
              name: 'Completed',
              value: 'Completed',
              icon: process,
              //@ts-ignore
              // amount: remCounter?.completed,
              amount: '',
              pageLink: '/ReimbursementTableData/rmcompletecase',
            },

            {
              name: 'Printed',
              value: 'Printed',
              icon: fci,
              //@ts-ignore
              // amount: remCounter?.printed,
              amount: '',
              pageLink: '/ReimbursementTableData/printcase',
            },
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remCounter]);

  return (
    <div className='p-10 grid grid-cols-auto-fit gap-10'>
      {menuList?.map(
        (
          menu: {
            pageLink: To;
            name: string;
            icon: any;
            amount: number;
            value: string;
          },
          index: React.Key | null | undefined
        ) => {
          return (
            <div
              key={index + 'home'}
              className='grid justify-center'
              onClick={() => GoDraftPage(menu?.pageLink, menu?.value)}
            >
              <HomeCard
                name={menu?.name}
                icon={menu?.icon}
                amount={menu?.amount}
                key={index}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default ReimbursementHome;
