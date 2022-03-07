import React, { useState } from 'react';
import Input from '../../theme/input/Input';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { useAppSelector } from '../../../redux/hooks';
import NextButton from '../../theme/nextButton/NextButton';

type DetailsProps = {
  fetchData?: () => void;
  summeryData: object;
  setSummeryData?: any;
};

const Details = ({ summeryData, setSummeryData, fetchData }: DetailsProps) => {
  const { user } = useAppSelector((state) => state?.user);

  //@ts-ignore
  const { patient_details, caseNumber, hospital_details, status, claimno } =
    summeryData;
  console.log('summery data :-', summeryData);
  const [localSummaryData, setlocalSummaryData] = useState<any>(
    summeryData ? summeryData : {}
  );

  console.log('formstatus data :- ', localSummaryData?.formstatus);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ) => {
    const { name, value } = e.target;
    setlocalSummaryData((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };

  const saveDataToDb = async () => {
    const POST_URL = `/claimno?email=${user}&casenumber=${caseNumber}`;

    if (!localSummaryData?.claimno) {
      notification('info', 'Please fill claim number');
      return;
    }

    const formData = new FormData();

    localSummaryData?.claimno &&
      formData?.append('claimno', localSummaryData?.claimno);

    try {
      await axiosConfig.post(POST_URL, formData);
      //@ts-ignore
      fetchData();

      console.log('SummeryData on details page', summeryData);
      setSummeryData({ ...summeryData, claimno: localSummaryData?.claimno });
      notification('info', 'Save successfully');
    } catch (error) {
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  return (
    <div className='grid grid-cols-2 gap-x-8 gap-y-4 mt-6'>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Name</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Name}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Case ID</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {caseNumber}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Phone</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray`}
        >
          {patient_details?.Phone}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>City</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.city}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Admission Date</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {hospital_details?.Date_of_Admission}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Diagnosis</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Provision_Diagnosis}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        {localSummaryData?.formstatus === 'Unprocessed' ? (
          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='claimno'
              value={localSummaryData?.claimno || ''}
              label='Claim number *'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
        ) : (
          <div className='sm:col-span-1 col-span-2 '>
            <p className='pb-4 text-sm text-fontColor font-thin'>
              Claim Number
            </p>

            <p
              className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
            >
              {localSummaryData?.claimno}
            </p>
          </div>
        )}
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>
          IPD Patient number
        </p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.ipd_patient_number}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Doctor Incharge</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {hospital_details?.Treating_Doctor_Name}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>
          Insurance company
        </p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Insurance_Company}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>TPA company</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Tpa_Company}
        </p>
      </div>
      <div className='sm:col-span-1 col-span-2 '>
        <p className='pb-4 text-sm text-fontColor font-thin'>Status</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {localSummaryData?.formstatus}
        </p>
      </div>

      {localSummaryData?.formstatus === 'Unprocessed' ? (
        <NextButton
          iconRight={false}
          handleClick={saveDataToDb}
          text='Save'
          style={{ marginBottom: '16px', width: '70px' }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Details;
