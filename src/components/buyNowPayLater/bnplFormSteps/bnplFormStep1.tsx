import '../bnplForm.css';
import Select from '../../theme/select/newCaseSelect/NewCaseSelect';
import Input from '../../theme/input/Input';
import InputContained from '../../theme/inputContained/InputContained';
import InputDate from '../../theme/inputDate/InputDate';
import InputRadio from '../../theme/inputRadio/InputRadio';
import NextButton from '../../theme/nextButton/NextButton';

type bnplFormStep1Props = {
  nextStep: () => void;
  CaseData: any;
  handleChange: (e: any) => void;
  viewDocuments: () => void;
};

const bnplFormStep1 = ({
  CaseData,
  handleChange,
  nextStep,
  viewDocuments,
}: bnplFormStep1Props) => {
  return (
    <>
      <div>
        <div className='relative ml-6 m-4 min-h-calc-5'>
          <span className='headingText'>Hospital Details: </span>
          <div className={`grid gap-8 sm:grid-cols-2 p-4`}>
            <div className='col-span-1 '>
              <Select
                options={[]}
                name='selectHospital'
                handleChange={handleChange}
                defaultOption='Select Hospital'
                label='Select Hospital'
                value={CaseData?.selectHospital || ''}
              />
            </div>
          </div>

          <span className='headingText'>General Details: </span>
          <div className={`grid gap-4 sm:grid-cols-2 p-4`}>
            <div className='col-span-1 '>
              <Input
                handleChange={handleChange}
                name='name_of_the_Applicant'
                value={CaseData.name_of_the_Applicant || ''}
                label='Name of the Applicant'
                labelStyle={{ paddingBottom: '6px' }}
                style={{ height: '35px' }}
              />
            </div>
            <div className='col-span-1 '>
              <Input
                handleChange={handleChange}
                name='mobile_Number'
                value={CaseData.mobile_Number || ''}
                label='Mobile Number'
                labelStyle={{ paddingBottom: '6px' }}
                type='number'
                style={{ height: '35px' }}
              />
            </div>

            <div className='col-span-1 '>
              <Input
                handleChange={handleChange}
                name='personal_email'
                value={CaseData.personal_email || ''}
                label='Personal Email Address'
                labelStyle={{ paddingBottom: '6px' }}
                type='email'
                style={{ height: '35px' }}
              />
            </div>

            <div className='col-span-1 '>
              <div className='mx-2'>
                <p className='pb-4 text-sm text-fontColor-light'>Gender</p>
                <div className='flex flex-col lg:flex-row'>
                  <div className='mr-8 '>
                    <InputRadio
                      handleChange={handleChange}
                      name='gender'
                      value='male'
                      radioLabel='Male'
                      fieldName={CaseData?.gender || ''}
                    />
                  </div>
                  <div className='mr-8 my-3 lg:my-0'>
                    <InputRadio
                      handleChange={handleChange}
                      name='gender'
                      value='female'
                      radioLabel='Female'
                      fieldName={CaseData?.gender || ''}
                    />
                  </div>
                  <div className='mr-8 '>
                    <InputRadio
                      handleChange={handleChange}
                      name='gender'
                      value='transgender'
                      radioLabel='Transgender'
                      fieldName={CaseData?.gender || ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-1 '>
              <InputDate
                handleChange={handleChange}
                name='DOB'
                value={CaseData?.date_of_birth || ''}
                label='Date of Birth'
                style={{ maxWidth: '220px' }}
              />
            </div>

            <div className='col-span-1 '>
              <Input
                handleChange={handleChange}
                name='loan_Type'
                value={CaseData.loan_Type || ''}
                label='Loan Type'
                labelStyle={{ paddingBottom: '6px' }}
                type='email'
                style={{ height: '35px' }}
              />
            </div>

            <div className='col-span-1 '>
              <Input
                handleChange={handleChange}
                name='general_job_Type'
                value={CaseData.general_job_Type || ''}
                label='Job Type'
                labelStyle={{ paddingBottom: '6px' }}
                type='email'
                style={{ height: '35px' }}
              />
            </div>
          </div>
        </div>
        <div className='p-8 pt-0 flex items-center justify-between'>
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

export default bnplFormStep1;
