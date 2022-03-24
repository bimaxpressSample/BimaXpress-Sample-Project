import React, { useEffect, useState } from 'react';
import HomeCard from '../theme/card/HomeCard';
import approved from '../../assets/icon/approved.svg';
import dischargedApproved from '../../assets/icon/dischargedApproved.svg';
// import document from "../../assets/icon/document-info.svg";
import draft from '../../assets/icon/draft.svg';
import enhance from '../../assets/icon/enhance.svg';
import fci from '../../assets/icon/fci.svg';
import query from '../../assets/icon/noun_query_3407971.svg';
import process from '../../assets/icon/process.svg';
import reject from '../../assets/icon/reject.svg';
import { To, useNavigate } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import { setCounter, setCurrentBucket } from '../../redux/slices/homeSlice';


import { setshowWarning } from '../../redux/slices/userSlice';

const Home = () => {
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user, userPlanData, showWarning } = useAppSelector(
    (state) => state?.user
  );
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();

  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);
  const toggleWarningModal = () => {
    setOpenWarningModal((pre) => !pre);
  };
  // const [toggleCounter , settoggleCounter] = useState(true) ;
  if (userPlanData) {
    if (
      // @ts-ignore
      (userPlanData[0]?.claimsleft + userPlanData[0]?.addonClaims)  <= 0.15 * userPlanData[0]?.total_claims &&
      showWarning
    ) {
      // settoggleCounter(false);
      dispatch(setshowWarning(false));
      // toggleWarningModal();
      setTimeout(toggleWarningModal, 3000);
    }
  }

  console.log('user plan', userPlanData);

  const fetchCounter = async () => {
    dispatch(setLoading(true));
    const URL = `/counter?email=${user}`;

    try {
      const {
        data: { data },
      } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCounter(data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const GoDraftPage = (pageLink: string | To, value: string) => {
    dispatch(setCurrentBucket(value));
    navigate(pageLink);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    fetchCounter();
  }, []);

  useEffect(() => {
    // window.location.reload();
    if (counter !== null && counter !== undefined) {
      if (Object.entries(counter)?.length) {
        if (!menuList?.length) {
          setMenuList([
            {
              name: 'Buyer Details',
              value: 'draft',
              icon: draft,
              //@ts-ignore

              pageLink: '/Buyerdetails',
            },
            {
              name: 'Order Details',
              value: 'Unprocessed',
              icon: process,
              //@ts-ignore

              pageLink: '/caseData/unprocessedcases',
            },
            {
              name: 'Pickup Details',
              value: 'query',
              icon: query,
              //@ts-ignore

              pageLink: '/caseData/querycases',
            },
            {
              name: 'Package Weight',
              value: 'Approved',
              icon: approved,
              //@ts-ignore

              pageLink: '/caseData/approvedcases',
            },
            {
              name: 'Other Details',
              value: 'Reject',
              icon: reject,
              //@ts-ignore

              pageLink: '/caseData/rejectcases',
            },

          ]);

        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  let navigates = useNavigate(); 
  const routeChange = () =>{ 
    let path = `newPath`; 
    navigates('/AllDetails');
  }

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
              // onClick={() => GoDraftPage(menu?.pageLink, menu?.value)}
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
      
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
        onClick={routeChange}
         >
          Add Order</button>
        
      </div>
    </div>
  );
};

export default Home;
