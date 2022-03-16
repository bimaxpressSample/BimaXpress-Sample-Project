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
// import { To, useNavigate } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import { setCounter, setCurrentBucket } from '../../redux/slices/homeSlice';
import { To, useNavigate, useParams } from 'react-router-dom';
// import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setCaseData } from '../../redux/slices/homeSlice';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setUndSelectedHospital } from '../../redux/slices/userSlice';

const Discharge = () => {

  const param = useParams();
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const { UndSelectedHospital } = useAppSelector((state) => state?.user);

  const [hospitalList, sethospitalList] = useState<any>([true]);


  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    // console.log(param?.case);                        // -------------------------------
    try {
      const listOfHospital = await axiosConfig.get(`/listofhospitals?email=${user}`);
      let tempList:any = []
      Object.entries(listOfHospital.data.data).forEach(([key, value]) => {
        tempList.push({ label: value, value: key });
      });
      sethospitalList(tempList);
      dispatch(setLoading(false));
      // alert("got"+hospitalList)
      console.log(hospitalList);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };




  // useEffect(() => {
    
  // }, [hospitalList]);


//  const [options, setOptions] = useState({
//     hospitalList: '',
//     insuranceTPA: '',
//     dateRange: '',
//   });

const [selectedOptions, setselectedOptions] = useState({
  hospitalList: 'abc',
});



  const handleHospitalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    dispatch(setUndSelectedHospital({name:value}));
    setselectedOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // debugger;
    console.log("under select",UndSelectedHospital);
    // fetchSelectedHospital(value);
  };




// const fetchSelectedHospital = async (selectedHospital: any) => {
//     dispatch(setLoading(true));
//     // const URL = `/${param?.case}`;
//     let URL = `/${param?.case}?email=${selectedHospital}`;
//     try {
//       if (selectedHospital === '') {
//         URL = `/all${param?.case}`;
//       }
//       const { data } = await axiosConfig.get(URL);
//       console.log('After select URL - ', URL);
//       console.log(data); // -------------------------------
//       dispatch(setLoading(false));
//       dispatch(setCaseData(data?.data));
//     } catch (error) {
//       dispatch(setLoading(false));
//       //@ts-ignore
//       notification('error', error?.message);
//     }
//   };

//   const handleHospitalChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
//     >
//   ) => {
//     const { name, value } = e.target;
//     setOptions((pre: any) => ({
//       ...pre,
//       [name]: value,
//     }));
//     fetchSelectedHospital(value);
//   };

  const fetchCounter = async () => {
    dispatch(setLoading(true));
    const URL = `/counter?email=abnew@gmail.com`;
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
    //@ts-ignore
    if(selectedOptions.hospitalList === 'abc'){
      notification("error","Please Select Any One Hospital");
      return ;
    }
    dispatch(setCurrentBucket(value));
    navigate(pageLink);
  };

  useEffect(() => {
    fetchAnalyst();
    if (!user) {
      navigate('/login');
    } else {
      if (!Object.entries(counter).length) {
         fetchCounter();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log('selected',selectedOptions)
  useEffect(() => {
    if (Object.entries(counter).length) {
       
        setMenuList([
          
          {
            name: 'Disscharge Approved Cases',
            value: 'query',
            icon: query,
            //@ts-ignore
           
            pageLink: `/dischargeBucket/${selectedOptions.hospitalList}`,
          },
          {
            name: 'Early Settlement Enabled',
            value: 'Approved',
            icon: approved,
            //@ts-ignore
           
            pageLink: `/patientEnabledCase/${selectedOptions.hospitalList}`,

          },
          {
            name: 'EARLY SETTLEMENT AVAILED',
            value: 'Reject',
            icon: reject,
            //@ts-ignore
           
            pageLink: `/patientAvailedCase/${selectedOptions.hospitalList}`,
          },
          {
            name: 'EARLY SETTLEMENT REJECTED',
            value: 'Enhance',
            icon: enhance,
            //@ts-ignore
           
            pageLink: `/patientRejectCase/${selectedOptions.hospitalList}`,
          },
          {
            name: 'EARLY SETTLEMENT SETTLED',
            value: 'fci',
            icon: fci,
            //@ts-ignore
            
            pageLink: `/patientSettledCase/${selectedOptions.hospitalList}`,
          },
          
        ]);
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, selectedOptions.hospitalList]);


  return (
    
    <>
        <div className='flex items-center justify-between mt-6 p-6'>
          <div className='flex items-center'>
            <div className='mr-2'>
              {/* <img src={filter} alt='icon' /> */}
            </div>
            <div className='mr-2'>
              <NewCaseSelect
                options={hospitalList}
                // options={listOfHospitals}
                name='hospitalList'
                handleChange={handleHospitalChange}
                // defaultOption='CHL Appolo'
                value={selectedOptions?.hospitalList || ''}
                style={{
                  minWidth: '125px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }} />
            </div>
            
          </div>

    </div>
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
                key={index + 'homse'}
                className='grid justify-center'
                onClick={() => GoDraftPage(menu?.pageLink, menu?.value)}
              >
                <HomeCard
                  name={menu?.name}
                  icon={menu?.icon}
                  amount={menu?.amount}
                  key={index} />
              </div>

            );

          }
        )}
      </div>
      </>
  );
};

export default Discharge;