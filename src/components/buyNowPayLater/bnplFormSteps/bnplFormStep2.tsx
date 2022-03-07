import '../bnplForm.css';
import Select from '../../theme/select/newCaseSelect/NewCaseSelect';
import Input from '../../theme/input/Input';
import InputContained from '../../theme/inputContained/InputContained';
import InputDate from '../../theme/inputDate/InputDate';
import InputRadio from '../../theme/inputRadio/InputRadio';
import NextButton from '../../theme/nextButton/NextButton';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { relative } from 'path';

type bnplFormStep2Props = {
  nextStep: () => void;
  prevStep: () => void;
  CaseData: any;
  handleChange: (e: any) => void;
  viewDocuments: () => void;
};

const bnplFormStep2 = ({
  CaseData,
  handleChange,
  nextStep,
  prevStep,
  viewDocuments,
}: bnplFormStep2Props) => {
  return (
    <>
      <div>
        <div className='relative ml-6 m-4'>
          <span className='headingText'>Detailed Address : </span>
          <div className={`grid gap-4 sm:grid-cols-2 p-4`}>
            <div className='col-span-1 mt-2'>
              <div className='mx-2'>
                <p className='pb-4 text-sm text-fontColor-light'>
                  Type of Residence :
                </p>
                <div className='flex flex-col lg:flex-row'>
                  <div className='mr-8 '>
                    <InputRadio
                      handleChange={handleChange}
                      name='type_of_residence'
                      value='rented'
                      radioLabel='Rented'
                      fieldName={CaseData?.type_of_residence || ''}
                    />
                  </div>
                  <div className='mr-8 my-3 lg:my-0'>
                    <InputRadio
                      handleChange={handleChange}
                      name='type_of_residence'
                      value='owned'
                      radioLabel='Owned'
                      fieldName={CaseData?.type_of_residence || ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='sum_of_monthly_rent_you_pay'
                value={CaseData.sum_of_monthly_rent_you_pay || ''}
                label='Sum of Monthly Rent You Pay'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='number'
              />
            </div>

            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='building_locality_street'
                value={CaseData.building_locality_street || ''}
                label='Building/Locality/Street'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='landmark'
                value={CaseData.landmark || ''}
                label='Landmark'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='current_city'
                value={CaseData.current_city || ''}
                label='Current City'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='pincode'
                value={CaseData.pincode || ''}
                label='Pincode'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='number'
              />
            </div>
          </div>
        </div>
        <div className='ml-6 m-4'>
          <span className='headingText'>Occupation Details : </span>
          <div className={`grid gap-4 sm:grid-cols-2 p-4`}>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='occupation_job_Type'
                value={CaseData.occupation_job_Type || ''}
                label='Job Type'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>

            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='salary_as_per_bank_statment'
                value={CaseData.salary_as_per_bank_statment || ''}
                label='Salary As Per Bank Statment'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>

            <div className='col-span-1 mt-2'>
              <div>
                <p className='pb-4 text-sm text-fontColor-light'>
                  Any Ongoing Loan
                </p>
                <div className='flex items-center'>
                  <div className='mr-8'>
                    <InputRadio
                      handleChange={handleChange}
                      name='any_ongoing_loan'
                      value='yes'
                      radioLabel='Yes'
                      fieldName={CaseData?.any_ongoing_loan || ''}
                    />
                  </div>
                  <div className='mr-8'>
                    <InputRadio
                      handleChange={handleChange}
                      name='any_ongoing_loan'
                      value='no'
                      radioLabel='No'
                      fieldName={CaseData?.any_ongoing_loan || ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            {CaseData?.any_ongoing_loan === 'yes' ? (
              <>
                <div className='col-span-1 mt-2'>
                  <Input
                    handleChange={handleChange}
                    name='sum_of_monthly_EMI'
                    value={CaseData.sum_of_monthly_EMI || ''}
                    label='Please Mention The Sum Of Monthly EMI'
                    labelStyle={{ paddingBottom: '6px' }}
                    style={{ height: '35px' }}
                    type='number'
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className='p-8 pt-0 flex items-center justify-between'>
          <NextButton iconLeft={true} text='Back' handleClick={prevStep} />
          <div
            className='hidden lg:flex'
            style={{ position: 'relative', top: '10px' }}
          >
            <NextButton
              text='View Documents'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={viewDocuments}
            />
          </div>
          <NextButton iconRight={true} handleClick={nextStep} />
        </div>
      </div>
    </>
  );
};

export default bnplFormStep2;
