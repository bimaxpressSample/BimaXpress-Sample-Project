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
import WarningModal from './WarningModal';
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
  // if (userPlanData) {
  //   if (
  //     // @ts-ignore
  //     userPlanData.claimsleft <= 0.15 * userPlanData.total_claims &&
  //     showWarning
  //   ) {
  //     // settoggleCounter(false);
  //     dispatch(setshowWarning(false));
  //     // toggleWarningModal();
  //     setTimeout(toggleWarningModal, 3000);
  //   }
  // }

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
              name: 'Draft',
              value: 'draft',
              icon: draft,
              //@ts-ignore
              // amount: counter?.draft,
              amount: '',
              pageLink: '/caseData/draftcases',
            },
            {
              name: 'Unprocessed',
              value: 'Unprocessed',
              icon: process,
              //@ts-ignore
              amount: counter?.Unprocessed,
              pageLink: '/caseData/unprocessedcases',
            },
            {
              name: 'Queries',
              value: 'query',
              icon: query,
              //@ts-ignore
              amount: counter?.query,
              pageLink: '/caseData/querycases',
            },
            {
              name: 'Approved',
              value: 'Approved',
              icon: approved,
              //@ts-ignore
              amount: counter?.Approved,
              pageLink: '/caseData/approvedcases',
            },
            {
              name: 'Rejected',
              value: 'Reject',
              icon: reject,
              //@ts-ignore
              amount: counter?.Reject,
              pageLink: '/caseData/rejectcases',
            },
            {
              name: 'Enhance',
              value: 'Enhance',
              icon: enhance,
              //@ts-ignore
              amount: counter?.Enhance,
              pageLink: '/caseData/enhancedcases',
            },
            {
              name: 'FCI',
              value: 'fci',
              icon: fci,
              //@ts-ignore
              amount: counter?.fci,
              pageLink: '/caseData/fcicases',
            },
            {
              name: 'Discharge Approved',
              value: 'Discharge_Approved',
              icon: dischargedApproved,
              //@ts-ignore
              amount: counter?.Discharge_Approved,
              pageLink: '/discharge_approved',
            },
            {
              name: 'Settle',
              value: 'Settled',
              icon: approved,
              //@ts-ignore
              amount: counter?.Settled,
              pageLink: '/caseData/settledcases',
            },
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

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
      <WarningModal
        closeModal={toggleWarningModal}
        isOpen={openWarningModal}
        planDetails={userPlanData}
      />
    </div>
  );
};

export default Home;
