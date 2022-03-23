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
import styles from './ConfirmModal.module.css';
import { IoClose } from "react-icons/io5";
import axiosConfig from '../../config/axiosConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';
import { setCounter, setCurrentBucket } from '../../redux/slices/homeSlice';
import { To, useNavigate, useParams } from 'react-router-dom';
// import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setCaseData } from '../../redux/slices/homeSlice';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import Modal from "react-modal";
import { setUndSelectedHospital } from '../../redux/slices/userSlice';
import ConfirmModal from './ConfirmModal';
import { margin } from '@mui/system';
import Input from '../theme/input/Input';

const Hospitaldetails = () => {

  const param = useParams();
  const [menuList, setMenuList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { counter } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const { UndSelectedHospital } = useAppSelector((state) => state?.user);

  const [hospitalList, sethospitalList] = useState<any>([true]);

  const [openconfirm, setopenconfirm] = useState<boolean>(false);
  const toggleModal = () => {
    setopenconfirm((pre) => !pre);
  };

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    // console.log(param?.case);                        // -------------------------------
    try {
      const listOfHospital = await axiosConfig.get(`/listofhospitals?email=${user}`);
      let tempList: any = []
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




  const [selectedOptions, setselectedOptions] = useState({
    hospitalList: '',
  });






  const [details_und, setdetails_und] = useState({
    avg_discount_factor: '',
    average_settlement_tat: '',
    maxtat: '',
    mintat: '',
    Convenience_charges: '',
    Interest: '',
    OD_Limit: '',
    buyerName: '',
    Insurance_Company: '',
  });


  console.log("check", details_und);


  const handleHospitalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    dispatch(setUndSelectedHospital({ name: value }));
    setselectedOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // debugger;
    console.log("under select", UndSelectedHospital);
    // fetchSelectedHospital(value);
  };


  useEffect(() => {
    fetchAnalyst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('selected', selectedOptions)

  const [TPAList, setTPAList] = useState<any>([]);
  const Fetchdetails = async () => {
    dispatch(setLoading(true));

    try {
      const listOfTPA = await axiosConfig.get(
        `/empanelcompany?email=tcs@gmail.com`
      );

      Object.entries(listOfTPA.data.data).map(([key, value]) => {
        TPAList.push({
          label: key,
          value: key,
        });
      });
      setTPAList(TPAList);


      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };
  useEffect(() => {
    Fetchdetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [options, setOptions] = useState({
    insuranceTPA: '',
  });



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    setdetails_und((pre: any) => ({
      ...pre,
      [name]: value,
    }));
    // fetchSelectedTPA();
  };

  const apiund = async () => {
    const formDetails = new FormData();
    formDetails.append("Convenience_charges", details_und?.Convenience_charges);
    formDetails.append("Interest", details_und?.Interest);
    formDetails.append("OD_Limit", details_und?.OD_Limit);
    formDetails.append("average_settlement_tat", details_und?.average_settlement_tat);
    formDetails.append("avg_discount_factor", details_und?.avg_discount_factor);
    formDetails.append("buyerName", details_und?.buyerName);
    formDetails.append("maxtat", details_und?.maxtat);
    formDetails.append("mintat", details_und?.mintat);
    formDetails.append("Insurance_Company", details_und?.Insurance_Company);

    dispatch(setLoading(true));
    try {
      await axiosConfig.post(`/Hospital_savedata?email=${selectedOptions.hospitalList}`, formDetails);
      dispatch(setLoading(false));
      notification("success", "Successfully Submited");

    } catch (error) {
      dispatch(setLoading(false));

      //@ts-ignore
      notification('error', error);
    }
    toggleModal()
  }


  return (
    <>

      <div className='flex items-center justify-between mt-6 p-6'>

        <div className='flex items-center'>
          <NewCaseSelect
            options={TPAList}
            name='Insurance_Company'
            handleChange={handleChange}
            defaultOption='Insurance TPA'
            value={details_und?.Insurance_Company || ''}
            style={{
              minWidth: '170px',
              height: '30px',
              backgroundColor: '#FFFFFF17',
              padding: '0px 5px',
              borderRadius: '3px',
              fontSize: '12px',
            }}
          />
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
      <div className="grid grid-cols-6 gap-4 p-6">
        <div className="col-start-1 col-end-3 ..."></div>
        <div className="col-end-7 col-span-2 ..."></div>
        <br></br>

        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            HOSPITAL EMAIL
          </p>
          <Input
            handleChange={handleChange}
            name='hospitalList'
            value={selectedOptions?.hospitalList || ''}
            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            OD LIMIT
          </p>
          <Input
            handleChange={handleChange}
            name='OD_Limit'
            value={details_und?.OD_Limit || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>

        <br></br>

        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            INTEREST RATE
          </p>
          <Input
            handleChange={handleChange}
            name='Interest'
            value={details_und?.Interest || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>

        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            CONVENIENCE CHARGES
          </p>
          <Input
            handleChange={handleChange}
            name='Convenience_charges'
            value={details_und?.Convenience_charges || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            MIN TAT
          </p>
          <Input
            handleChange={handleChange}
            name='mintat'
            value={details_und?.mintat || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            MAX TAT
          </p>
          <Input
            handleChange={handleChange}
            name='maxtat'
            value={details_und?.maxtat || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>
        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            AVERAGE SETTLEMENT TAT
          </p>
          <Input
            handleChange={handleChange}
            name='average_settlement_tat'
            value={details_und?.average_settlement_tat || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
        <br></br>

        <div className='col-span-2 lg:col-span-1 pb-6 mt-8'>
          <p className='pb-4 text-sm text-white font-semibold'>
            AVERAGE DISCOUNTING PERCENTAGE

          </p>
          <Input
            handleChange={handleChange}
            name='avg_discount_factor'
            value={details_und?.avg_discount_factor || ''}

            style={{ height: '40px' }}
            labelStyle={{ paddingBottom: '12px' }}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <br></br>
      <div className='flex items-center justify-center'>
        <button

          className='h-8 w-auto border mx-4 rounded outline-none text-sm flex items-center px-4'
          style={{ color: 'white' }}
          onClick={toggleModal}
        >
          Submit
        </button>
      </div>

      <div>
        <Modal
          isOpen={openconfirm}
          className={styles.approveModalContainer}
          overlayClassName={styles.overlayContainer}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <div className="px-10 py-8 relative">
            <IoClose
              className="absolute top-2 right-2 text-2xl text-fontColor cursor-pointer"
              onClick={toggleModal}
            />

            <div className="w-full h-auto border-fontColor rounded-lg text-center">
              <p className="text-sm text-fontColor-gray pt-4">
                Are You Sure You Want To Submit The Case
              </p>
              <div className="flex items-center justify-center mt-4">

              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">

            </div>
            <div className="flex justify-center mt-8">
              {/* <PlanSelectButton
            text="Submit"
            style={{ maxWidth: "180px" }}
          /> */}
              <button onClick={apiund} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">Yes</button>
              <button onClick={toggleModal} className="h-8 w-auto border mx-4 text-fontColor-light rounded outline-none text-sm flex items-center px-6">No</button>
            </div>
          </div>
        </Modal>
      </div>


    </>
  );
};

export default Hospitaldetails;