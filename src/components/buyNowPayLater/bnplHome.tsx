import React, { useEffect, useState } from 'react';
import HomeCard from '../theme/card/HomeCard';
import complete_applications from '../../assets/icon/approved.svg';
import approvedApplication from '../../assets/icon/dischargedApproved.svg';
import draft from '../../assets/icon/draft.svg';
import active from '../../assets/icon/enhance.svg';
import settled from '../../assets/icon/fci.svg';
import query from '../../assets/icon/noun_query_3407971.svg';
import reject from '../../assets/icon/reject.svg';
import complete_application from '../../assets/icon/process.svg';
import { To, useNavigate } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import {
  setBnplCounter,
  setBnplCurrentBucket,
} from '../../redux/slices/bnplSlice';
const BnplHome = () => {
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { bnplHomeCounter } = useAppSelector((state) => state?.bnpl);
  const { user } = useAppSelector((state) => state?.user);
  const navigate = useNavigate();

  //   const fetchCounter = async () => {
  //     dispatch(setLoading(true));
  //     const URL = `/counter?email=${user}`;

  //     try {
  //       const {
  //         data: { data },
  //       } = await axiosConfig.get(URL);
  //       dispatch(setLoading(false));
  //       dispatch(setCounter(data));
  //     } catch (error) {
  //       dispatch(setLoading(false));
  //       //@ts-ignore
  //       notification('error', error?.message);
  //     }
  //   };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      //   fetchCounter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GoDraftPage = (pageLink: string | To, value: string) => {
    dispatch(setBnplCurrentBucket(value));
    navigate(pageLink);
  };

  useEffect(() => {
    // if (counter !== null && counter !== undefined) {
    //   if (Object.entries(counter)?.length) {
    if (!menuList?.length) {
      setMenuList([
        {
          name: 'New Application',
          value: 'new_application',
          icon: draft,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/new_application',
        },
        {
          name: 'Complete Applications',
          value: 'complete_applications',
          icon: complete_applications,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/complete_applications',
        },
        {
          name: 'Query Applications',
          value: 'query_applications',
          icon: query,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/query_applications',
        },
        {
          name: 'Rejected Applications',
          value: 'rejected_applications',
          icon: reject,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/rejected_applications',
        },
        {
          name: 'Approved Applications',
          value: 'approved_applications',
          icon: approvedApplication,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/approved_applications',
        },
        {
          name: 'Active Applications',
          value: 'active_applications',
          icon: active,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/active_applications',
        },
        {
          name: 'Settled Applications',
          value: 'settled_applications',
          icon: settled,
          //@ts-ignore
          amount: '',
          pageLink: '/bnplTable/settled_applications',
        },
      ]);
    }
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bnplHomeCounter]);

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

export default BnplHome;
