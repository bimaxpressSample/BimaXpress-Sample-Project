import '../bnplForm.css';
import Select from '../../theme/select/newCaseSelect/NewCaseSelect';
import Input from '../../theme/input/Input';
import InputContained from '../../theme/inputContained/InputContained';
import InputDate from '../../theme/inputDate/InputDate';
import InputRadio from '../../theme/inputRadio/InputRadio';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';
import NextButton from '../../theme/nextButton/NextButton';

const employmentYearList = [
  { label: '<= 2 Years', value: '1' },
  { label: '2 to 5 Years', value: '2' },
  { label: '> 5 Years', value: '5' },
];

type bnplFormStep3Props = {
  nextStep: () => void;
  prevStep: () => void;
  CaseData: any;
  handleChange: (e: any) => void;
  viewDocuments: () => void;
  markComplete: () => void;
};

const bnplFormStep3 = ({
  CaseData,
  handleChange,
  nextStep,
  prevStep,
  viewDocuments,
  markComplete,
}: bnplFormStep3Props) => {
  return (
    <>
      <div>
        <div className='ml-6 m-4'>
          <span className='headingText'>Employer Details : </span>
          <div className={`grid gap-4 sm:grid-cols-2 p-4`}>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='employer_name'
                value={CaseData.employer_name || ''}
                label='Employer Name'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>

            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='official_email_address'
                value={CaseData.official_email_address || ''}
                label='Official Email Address'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='email'
              />
            </div>

            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='registerd_office_address'
                value={CaseData.registerd_office_address || ''}
                label='Registerd Office Address'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='email'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='employer_building_locality_street'
                value={CaseData.employer_building_locality_street || ''}
                label='Building/Locality/Street'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='employer_landmark'
                value={CaseData.employer_landmark || ''}
                label='Landmark'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='text'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='employer_pincode'
                value={CaseData.employer_pincode || ''}
                label='Pincode'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
                type='number'
              />
            </div>
            <div className='col-span-1 mt-2'>
              <NewCaseSelect
                options={employmentYearList}
                name='number_of_year_in_current_employment'
                handleChange={handleChange}
                defaultOption='Select Year'
                label='Number Of Year In Current Employment'
                value={CaseData?.number_of_year_in_current_employment || ''}
              />
            </div>

            {/* <div className='col-span-1 mt-2'>
              <Input
                handleChange={handleChange}
                name='application_id'
                value={CaseData.application_id || ''}
                label='Enter Application ID'
                labelStyle={{ paddingBottom: '6px' }}
                placeHolder='Enter Application ID'
                style={{ height: '35px' }}
                type='text'
              />
            </div> */}
          </div>
        </div>

        <div
          className='p-8 pt-0 flex items-center justify-between'
          style={{ marginTop: '60px' }}
        >
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
          <NextButton text='Mark Complete' handleClick={markComplete} />
        </div>
      </div>
    </>
  );
};

export default bnplFormStep3;
