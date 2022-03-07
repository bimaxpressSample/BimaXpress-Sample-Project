import { useEffect, useState } from 'react';
import './PartReimbursement.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import { setLoading } from '../../redux/slices/utilitySlice';
import axiosConfig from '../../config/axiosConfig';
import {
  setInsuranceTPAlist,
  setInsuranceCompanyList,
} from '../../redux/slices/reimbursementSlice';
import notification from '../theme/utility/notification';
import Input from '../theme/input/Input';
import NextButton from '../theme/nextButton/NextButton';

type RemhospitalProps = {
  nextStep: () => void;
  formData: any;
  changeData: (value: any) => void;
  preferTPA_Company: string;
};
const RemhospitalSelect = ({
  formData,
  changeData,
  nextStep,
  preferTPA_Company,
}: RemhospitalProps) => {
  const { user } = useAppSelector((state) => state?.user);
  const [insuranceCompany, setInsuranceCompany] = useState<any>([]);
  const [insuranceTPA, setInsuranceTPA] = useState<any>([]);
  const { remInsuranceTPAList, insuranceCompanyList } = useAppSelector(
    (state) => state?.reimbursement
  );
  const dispatch = useAppDispatch();
  const fetchEmpanelledCompanies = async () => {
    // TPA
    const URLTPA = `/tpacompany?email=${user}`;
    // Company
    const URLALLCOMPANY = `/allcompany`;

    dispatch(setLoading(true));
    try {
      const dataTpa = await axiosConfig.get(URLTPA);
      const { data: allCompanyData } = await axiosConfig.get(URLALLCOMPANY);
      dispatch(setLoading(false));
      dispatch(setInsuranceTPAlist(dataTpa.data.data));
      dispatch(setInsuranceCompanyList(allCompanyData?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    if (
      !Object.entries(remInsuranceTPAList)?.length &&
      !Object.entries(remInsuranceTPAList)?.length
    ) {
      fetchEmpanelledCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Object.entries(remInsuranceTPAList)?.length) {
      const res = Object.entries(remInsuranceTPAList)?.map(
        (
          //@ts-ignore
          [key, value]
        ) => ({
          label: key,
          value: key,
        })
      );
      setInsuranceTPA(res);
    }
    if (Object.entries(insuranceCompanyList)?.length) {
      const res = Object.entries(insuranceCompanyList)?.map(
        (
          //@ts-ignore
          [key, value]
        ) => ({
          label: key,
          value: key,
        })
      );
      setInsuranceCompany(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insuranceCompanyList]);
  return (
    <>
      <h2 className='mainHeading'>TPA Insurance Company</h2>

      <div className=' relative m-8 min-h-calc-5'>
        <div className={`grid gap-8 sm:grid-cols-2`}>
          <div>
            <Input
              name='PatientName'
              label='Patient Name *'
              labelStyle={{ paddingBottom: '12px' }}
              style={{ height: '40px' }}
              value={formData?.DPHNameofpatient}
              handleChange={(e) => {
                changeData({
                  DPHNameofpatient: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Input
              name='IPD Number'
              label='IPD Number *'
              labelStyle={{ paddingBottom: '12px' }}
              style={{ height: '40px' }}
              value={formData?.IPDpatientNumber}
              handleChange={(e) => {
                changeData({ IPDpatientNumber: e.currentTarget.value });
              }}
            />
          </div>
          {preferTPA_Company === 'both' || preferTPA_Company === 'Company' ? (
            <div className='col-span-1 '>
              <NewCaseSelect
                options={insuranceCompany}
                name='insuranceCompany'
                defaultOption='Select Insurance Company'
                label='Insurance Company *'
                value={formData?.InsurancecompanySelect}
                handleChange={(e) => {
                  changeData({ InsurancecompanySelect: e.currentTarget.value });
                }}
              />
            </div>
          ) : null}
          {preferTPA_Company === 'both' || preferTPA_Company === 'TPA' ? (
            <div className='col-span-1 '>
              <NewCaseSelect
                options={insuranceTPA}
                name='insuranceCompany'
                defaultOption='Select Third Party Administrator (TPA)'
                label='Third Party Administrator (TPA) *'
                value={formData?.Tpa_CompanySelect}
                handleChange={(e) => {
                  changeData({ Tpa_CompanySelect: e.currentTarget.value });
                }}
              />
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: 'absolute',
            width: '80px',
            bottom: '30px',
            right: '10px',
          }}
        >
          <NextButton
            iconRight={true}
            handleClick={() => {
              nextStep();
            }}
            style={{ marginBottom: '16px' }}
          />
        </div>
      </div>
    </>
  );
};
export default RemhospitalSelect;
