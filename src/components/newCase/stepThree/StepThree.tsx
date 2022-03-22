import React, { useEffect, useState } from 'react';
import Input from '../../theme/input/Input';
import InputCheckbox from '../../theme/inputCheckbox/InputCheckbox';
import InputContained from '../../theme/inputContained/InputContained';
import InputDate from '../../theme/inputDate/InputDate';
import InputRadio from '../../theme/inputRadio/InputRadio';
import NextButton from '../../theme/nextButton/NextButton';
import axiosConfig from '../../../config/axiosConfig';
import notification from '../../theme/utility/notification';
import { setLoading } from '../../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import NewCaseSelect from '../../theme/select/newCaseSelect/NewCaseSelect';

type StepThreeProps = {
  newCaseData: any;
  setNewCaseData: any;
  nextStep: () => void;
  prevStep: () => void;
  param: string | undefined;
  toggleModal?: () => void;
  reteList?: string;
  toggleDocumentsModal?: () => void;
  toggleViewDocumentsModal?: () => void;
  preAuth?: () => void;
  freezeFields: boolean;
  toggleUnfreezeModal?: () => void;
};

const StepThree = ({
  newCaseData,
  nextStep,
  prevStep,
  setNewCaseData,
  param,
  toggleModal,
  reteList,
  toggleDocumentsModal,
  toggleViewDocumentsModal,
  preAuth,
  freezeFields,
  toggleUnfreezeModal,
}: StepThreeProps) => {
  const { diagnosisDetails } = newCaseData;
  const [doctorList, setDoctorList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const navigate = useNavigate();

  const fetchDoctor = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosConfig.get(`/doctor?email=${user}`);

      dispatch(setLoading(false));
      let doctorsList = [];
      if (data.data) {
        for (var doctor in data.data) {
          doctorsList.push(data.data[doctor]);
        }
      }
      setDoctorList(doctorsList);
      console.log('doctor list', doctorsList);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    if (!doctorList?.length) {
      fetchDoctor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveDataToDb = async () => {
    const POST_URL = `/preauthdata?email=${user}&casenumber=${newCaseNum}`;

    if (
      !diagnosisDetails?.natureOfIllness ||
      !diagnosisDetails?.doctorsName ||
      (!diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment &&
        !diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment &&
        !diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care &&
        !diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation &&
        !diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment)
    ) {
      notification('info', 'Please fill mandatory details');
      return;
    }

    const formData = new FormData();

    diagnosisDetails?.expectedDeliveryDate &&
      formData?.append(
        'doctor_expectedDateOfDelivery',
        diagnosisDetails?.expectedDeliveryDate
      );
    diagnosisDetails?.maternityG &&
      formData?.append('doctor_inCaseMaternityG', diagnosisDetails?.maternityG);
    diagnosisDetails?.maternityP &&
      formData?.append('doctor_inCaseMaternityP', diagnosisDetails?.maternityP);
    diagnosisDetails?.maternityL &&
      formData?.append('doctor_inCaseMaternityL', diagnosisDetails?.maternityL);
    diagnosisDetails?.maternityA &&
      formData?.append('doctor_inCaseMaternityA', diagnosisDetails?.maternityA);
    diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment &&
      formData?.append(
        'doctor_proposedLineOfTreatment_Surgical_Managment',
        diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment
      );
    diagnosisDetails?.doctor_proposedLineOfTreatment_Medical_Managment &&
      formData?.append(
        'doctor_proposedLineOfTreatment_Medical_Managment',
        diagnosisDetails?.doctor_proposedLineOfTreatment_Medical_Managment
      );
    diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation &&
      formData?.append(
        'doctor_proposedLineOfTreatment_Investigation',
        diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation
      );
    diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care &&
      formData?.append(
        'doctor_proposedLineOfTreatment_Intensive_Care',
        diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care
      );
    diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment &&
      formData?.append(
        'doctor_proposedLineOfTreatment_Allopathic_Treatment',
        diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment
      );
    diagnosisDetails?.surgeryName &&
      formData?.append(
        'If_Surgical_Name_of_Surgery',
        diagnosisDetails?.surgeryName
      );
    diagnosisDetails?.contractNumber &&
      formData?.append('doctor_name_email', diagnosisDetails?.contractNumber);
    diagnosisDetails?.doctorsName &&
      formData?.append('doctor_name', diagnosisDetails?.doctorsName);
    diagnosisDetails?.ICD &&
      formData?.append('ICD_Code_10_PCS', diagnosisDetails?.ICD);
    diagnosisDetails?.proposedLineOfTreatmentInvestigationDetails &&
      formData?.append(
        'If_Investigation_Or_Medical_Management_Provide_Details',
        diagnosisDetails?.proposedLineOfTreatmentInvestigationDetails
      );
    diagnosisDetails?.routeOfDrag &&
      formData?.append(
        'Route_Of_Drug_Administration',
        diagnosisDetails?.routeOfDrag
      );
    diagnosisDetails?.natureOfIllness &&
      formData?.append(
        'doctor_natureOfLiness',
        diagnosisDetails?.natureOfIllness
      );
    diagnosisDetails?.durationOfPresentAilment &&
      formData?.append(
        'doctor_durationOfPresentAliment',
        diagnosisDetails?.durationOfPresentAilment
      );
    diagnosisDetails?.firstConsultation &&
      formData?.append(
        'doctor_dateOfFirstConsultation',
        diagnosisDetails?.firstConsultation
      );

    diagnosisDetails?.CauseofAilment &&
      formData?.append(
        'doctor_CauseofAilment',
        diagnosisDetails?.CauseofAilment
      );

    diagnosisDetails?.Ailment &&
      formData?.append('doctor_Ailment', diagnosisDetails?.Ailment);

    diagnosisDetails?.Provision_Diagnosis &&
      formData?.append(
        'doctor_provisionalDiagnosis',
        diagnosisDetails?.Provision_Diagnosis
      );

    // diagnosisDetails?.surgeryName && formData?.append("doctor_CauseofAilment", diagnosisDetails?.gender);
    diagnosisDetails?.Past_History_Of_Present_Ailments &&
      formData?.append(
        'doctor_PastHistoryOfPresentAlignment',
        diagnosisDetails?.Past_History_Of_Present_Ailments
      );
    // diagnosisDetails?.surgeryName && formData?.append("doctor_provisionalDiagnosis", diagnosisDetails?.gender);
    diagnosisDetails?.ICDCode &&
      formData?.append('doctor_icdCode', diagnosisDetails?.ICDCode);

    diagnosisDetails?.otherTreatments &&
      formData?.append(
        'doctor_ifOtherTratmentProvideDetails',
        diagnosisDetails?.otherTreatments
      );
    diagnosisDetails?.injuryCause &&
      formData?.append(
        'doctor_howDidInjuryOccure',
        diagnosisDetails?.injuryCause
      );
    diagnosisDetails?.dateOfInjury &&
      formData?.append('doctor_dateOfInjury', diagnosisDetails?.dateOfInjury);
    diagnosisDetails?.relevantClinicFindings &&
      formData?.append(
        'doctor_releventClinicFindings',
        diagnosisDetails?.relevantClinicFindings
      );
    diagnosisDetails?.repotedToPolice &&
      formData?.append(
        'doctor_reportedToPolice',
        diagnosisDetails?.repotedToPolice
      );

    diagnosisDetails?.testConductedOrNot &&
      formData?.append(
        'doctor_testAlcohol',
        diagnosisDetails?.testConductedOrNot
      );

    diagnosisDetails?.FIR_Number &&
      formData?.append('doctor_firNo', diagnosisDetails?.FIR_Number);

    diagnosisDetails?.Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_ &&
      formData?.append(
        'doctor_injuryorDiseaseCausedDueToSubstance',
        diagnosisDetails?.Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_
      );

    diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment
      ? formData?.append(
          'doctor_proposedLineOfTreatment_Medical_Managment',
          diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment
        )
      : formData?.append(
          'doctor_proposedLineOfTreatment_Medical_Managment',
          'No'
        );

    diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment
      ? formData?.append(
          'doctor_proposedLineOfTreatment_Surgical_Managment',
          diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment
        )
      : formData?.append(
          'doctor_proposedLineOfTreatment_Surgical_Managment',
          'No'
        );

    diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care
      ? formData?.append(
          'doctor_proposedLineOfTreatment_Intensive_Care',
          diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care
        )
      : formData?.append('doctor_proposedLineOfTreatment_Intensive_Care', 'No');

    diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation
      ? formData?.append(
          'doctor_proposedLineOfTreatment_Investigation',
          diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation
        )
      : formData?.append('doctor_proposedLineOfTreatment_Investigation', 'No');

    diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment
      ? formData?.append(
          'doctor_proposedLineOfTreatment_Allopathic_Treatment',
          diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment
        )
      : formData?.append(
          'doctor_proposedLineOfTreatment_Allopathic_Treatment',
          'No'
        );

    // !diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment &&
    // !diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment &&
    // !diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care &&
    // !diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation &&
    // !diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment

    // diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment ||
    //   (diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment ===
    //     '' &&
    //     formData?.append(
    //       'doctor_proposedLineOfTreatment_Medical_Managment',
    //       diagnosisDetails.doctor_proposedLineOfTreatment_Medical_Managment ===
    //         'Yes'
    //         ? 'Yes'
    //         : 'No'
    //     ));

    // diagnosisDetails?.proposedLineOfTreatment?.medicalManageemnt &&
    //   formData?.append(
    //     'doctor_proposedLineOfTreatment_Medical_Managment',
    //     '
    //       : 'No'diagnosisDetails?.proposedLineOfTreatment?.includes('medicalManageemnt')
    //       ? 'Yes
    //   );
    // diagnosisDetails?.proposedLineOfTreatment?.includes('surgicalManagement') &&
    //   formData?.append(
    //     'doctor_proposedLineOfTreatment_Surgical_Managment',
    //     diagnosisDetails?.proposedLineOfTreatment?.includes(
    //       'surgicalManagement'
    //     )
    //       ? 'Yes'
    //       : 'No'
    //   );
    // diagnosisDetails?.proposedLineOfTreatment?.includes('intensiveCare') &&
    //   formData?.append(
    //     'doctor_proposedLineOfTreatment_Intensive_Care',
    //     diagnosisDetails?.proposedLineOfTreatment?.includes('intensiveCare')
    //       ? 'Yes'
    //       : 'No'
    //   );
    // diagnosisDetails?.proposedLineOfTreatment?.includes('investigation') &&
    //   formData?.append(
    //     'doctor_proposedLineOfTreatment_Investigation',
    //     diagnosisDetails?.proposedLineOfTreatment?.includes('investigation')
    //       ? 'Yes'
    //       : 'No'
    //   );
    // diagnosisDetails?.proposedLineOfTreatment?.includes(
    //   'nonAllopaticTreatment'
    // ) &&
    //   formData?.append(
    //     'doctor_proposedLineOfTreatment_Allopathic_Treatment',
    //     diagnosisDetails?.proposedLineOfTreatment?.includes(
    //       'nonAllopaticTreatment'
    //     )
    //       ? 'Yes'
    //       : 'No'
    //   );

    diagnosisDetails?.accident &&
      formData?.append('doctor_inCaseOfAccident', diagnosisDetails?.accident);
    // diagnosisDetails?.surgeryName && formData?.append(
    //   "doctor_injuryorDiseaseCausedDueToSubstance",
    //   diagnosisDetails?.gender
    // );
    diagnosisDetails?.alcoholConsumer &&
      formData?.append('doctor_testAlcohol', diagnosisDetails?.alcoholConsumer);
    // diagnosisDetails?.surgeryName && formData?.append("doctor_firNo", diagnosisDetails?.gender);
    diagnosisDetails?.maternity?.includes('g') &&
      formData?.append(
        'doctor_inCaseMaternityG',
        diagnosisDetails?.maternity?.includes('g') ? 'Yes' : 'No'
      );
    diagnosisDetails?.maternity?.includes('p') &&
      formData?.append(
        'doctor_inCaseMaternityP',
        diagnosisDetails?.maternity?.includes('p') ? 'Yes' : 'No'
      );
    diagnosisDetails?.maternity?.includes('l') &&
      formData?.append(
        'doctor_inCaseMaternityL',
        diagnosisDetails?.maternity?.includes('l') ? 'Yes' : 'No'
      );
    diagnosisDetails?.maternity?.includes('a') &&
      formData?.append(
        'doctor_inCaseMaternityA',
        diagnosisDetails?.maternity?.includes('a') ? 'Yes' : 'No'
      );
    formData?.append('step', '4');

    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);

      dispatch(setLoading(false));
      notification('info', 'Save successfully');
      nextStep();
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setNewCaseData((pre: any) => ({
          ...pre,
          diagnosisDetails: { ...pre?.diagnosisDetails, [name]: value },
        }));
      } else {
        setNewCaseData((pre: any) => ({
          ...pre,
          diagnosisDetails: { ...pre?.diagnosisDetails, [name]: '' },
        }));
      }
    } else {
      setNewCaseData((pre: any) => ({
        ...pre,
        diagnosisDetails: { ...pre?.diagnosisDetails, [name]: value },
      }));
    }
  };

  useEffect(() => {
    console.log(newCaseData);
  }, [newCaseData]);
  console.log('stateeee', doctorList);
  return (
    <div className='mb-8'>
      <div className='flex flex-col lg:flex-row justify-between border-b border-fontColor-darkGray'>
        <div className=' lg:w-1/2 p-6 pb-12'>
          <div>
            {/* <Input
							handleChange={handleChange}
							name="doctorsName"
							value={diagnosisDetails?.doctorsName || ""}
							label="Name of The Treating Doctor"
							style={{ height: "40px" }}
							labelStyle={{ paddingBottom: "12px" }}
						/> */}
            <NewCaseSelect
              options={doctorList.map((doctor: any) => ({
                value: doctor.name,
                label: doctor.name,
              }))}
              name='doctorsName'
              handleChange={(e) => {
                let number: number;
                doctorList.map((d: any) => {
                  if (d.name === e.target.value) number = d.email;
                });
                setNewCaseData((pre: any) => ({
                  ...pre,
                  diagnosisDetails: {
                    ...pre?.diagnosisDetails,
                    contractNumber: number,
                  },
                }));
                handleChange(e);
              }}
              defaultOption='Select Treating Doctor'
              label='Name Of The Treating Doctor *'
              value={diagnosisDetails?.doctorsName || ''}
            />
          </div>

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='natureOfIllness'
              value={diagnosisDetails?.natureOfIllness || ''}
              label='Nature Of Illness / Disease With Presenting Complaints *'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>

          <div className='mt-6'>
            <InputContained
              handleChange={handleChange}
              name='durationOfPresentAilment'
              value={diagnosisDetails?.durationOfPresentAilment || ''}
              label='Duration Of Present Ailment (Days)'
              style={{ maxWidth: '80px' }}
            />
          </div>
          <div className='mt-6'>
            <InputDate
              handleChange={handleChange}
              name='firstConsultation'
              value={diagnosisDetails?.firstConsultation || ''}
              label='Date Of First Consultation'
            />
          </div>

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='Ailment'
              value={diagnosisDetails?.Ailment || ''}
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
              label='Ailment As Per User'
            />
          </div>

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='CauseofAilment'
              value={diagnosisDetails?.CauseofAilment || ''}
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
              label='Cause of Ailment'
            />
          </div>

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='Provision_Diagnosis'
              value={diagnosisDetails?.Provision_Diagnosis || ''}
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
              label='Provisional Diagnosis'
            />
          </div>

          {/* <div className="mt-6">
            <p className="pb-4 text-sm text-fontColor-light">
              Do you have past history of present ailment ?
            </p>
            <div className="flex items-center">
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="historyOfPresentAilment"
                  value="yes"
                  radioLabel="Yes"
                  fieldName={diagnosisDetails?.historyOfPresentAilment || ""}
                />
              </div>
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="historyOfPresentAilment"
                  value="no"
                  radioLabel="No"
                  fieldName={diagnosisDetails?.historyOfPresentAilment || ""}
                />
              </div>
            </div>

          </div> */}

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='Past_History_Of_Present_Ailments'
              value={diagnosisDetails?.Past_History_Of_Present_Ailments || ''}
              label='Past History Of Present Ailment , If Any'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
              placeHolder="Yes, I'm having the past history of present ailment"
            />
          </div>

          <div className='mt-6'>
            <InputContained
              handleChange={handleChange}
              name='ICD'
              value={diagnosisDetails?.ICD || ''}
              label='ICD Code'
              style={{ maxWidth: '100px' }}
            />
          </div>

          <div className='mt-6'>
            <p className='pb-4 text-sm text-fontColor-light'>
              Proposed Line Of Treatment ? *
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <InputCheckbox
                  handleChange={handleChange}
                  name='doctor_proposedLineOfTreatment_Medical_Managment'
                  value='yes'
                  checkboxLabel='Medical Manageemnt'
                  fieldName={
                    diagnosisDetails?.doctor_proposedLineOfTreatment_Medical_Managment ||
                    ''
                  }
                />
              </div>
              <div className='col-span-1'>
                <InputCheckbox
                  handleChange={handleChange}
                  name='doctor_proposedLineOfTreatment_Surgical_Managment'
                  value='yes'
                  checkboxLabel='Surgical management'
                  fieldName={
                    diagnosisDetails?.doctor_proposedLineOfTreatment_Surgical_Managment ||
                    ''
                  }
                />
              </div>
              <div className='col-span-1'>
                <InputCheckbox
                  handleChange={handleChange}
                  name='doctor_proposedLineOfTreatment_Intensive_Care'
                  value='yes'
                  checkboxLabel='Intensive care'
                  fieldName={
                    diagnosisDetails?.doctor_proposedLineOfTreatment_Intensive_Care ||
                    ''
                  }
                />
              </div>
              <div className='col-span-1'>
                <InputCheckbox
                  handleChange={handleChange}
                  name='doctor_proposedLineOfTreatment_Investigation'
                  value='yes'
                  checkboxLabel='Investigation'
                  fieldName={
                    diagnosisDetails?.doctor_proposedLineOfTreatment_Investigation ||
                    ''
                  }
                />
              </div>
              <div className='col-span-1'>
                <InputCheckbox
                  handleChange={handleChange}
                  name='doctor_proposedLineOfTreatment_Allopathic_Treatment'
                  value='yes'
                  checkboxLabel='Non allopatic treatment'
                  fieldName={
                    diagnosisDetails?.doctor_proposedLineOfTreatment_Allopathic_Treatment ||
                    ''
                  }
                />
              </div>
            </div>

            <div className='mt-6'>
              <Input
                handleChange={handleChange}
                name='proposedLineOfTreatmentInvestigationDetails'
                value={
                  diagnosisDetails?.proposedLineOfTreatmentInvestigationDetails ||
                  ''
                }
                label='If Investigation Or Medical Management Provide Details'
                style={{ height: '40px' }}
                labelStyle={{ paddingBottom: '12px' }}
                placeHolder='If investigation / medical management provide details'
              />
            </div>
          </div>
          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='routeOfDrag'
              value={diagnosisDetails?.routeOfDrag || ''}
              label='Route Of Drug Administration'
              style={{ maxWidth: '100px' }}
            />
          </div>
        </div>

        <div className='border-r border-fontColor-darkGray'></div>

        <div className=' lg:w-1/2 p-6 pb-0'>
          <div>
            <Input
              handleChange={handleChange}
              name='surgeryName'
              value={diagnosisDetails?.surgeryName || ''}
              label='If Surgical Name Of Surgery'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>

          <div className='mt-6'>
            <InputContained
              handleChange={handleChange}
              name='ICDCode'
              value={diagnosisDetails?.ICDCode || ''}
              label='ICD 10 PCS Code'
              style={{ maxWidth: '100px' }}
            />
          </div>
          <div className='mt-6'>
            <p className='pb-4 text-sm text-fontColor-light'>
              Relevant Clinic Findings
            </p>

            <div className='flex items-center'>
              <div className='mr-8'>
                <InputRadio
                  handleChange={handleChange}
                  name='RelevantClinicFindings'
                  value='maternity'
                  radioLabel='Maternity'
                  fieldName={diagnosisDetails?.RelevantClinicFindings || ''}
                />
              </div>
              <div className='mr-8'>
                <InputRadio
                  handleChange={handleChange}
                  name='RelevantClinicFindings'
                  value='injury'
                  radioLabel='Injury'
                  fieldName={diagnosisDetails?.RelevantClinicFindings || ''}
                />
              </div>
              <div className='mr-8'>
                <InputRadio
                  handleChange={handleChange}
                  name='RelevantClinicFindings'
                  value='accident'
                  radioLabel='Accident'
                  fieldName={diagnosisDetails?.RelevantClinicFindings || ''}
                />
              </div>
              <div className='mr-8'>
                <InputRadio
                  handleChange={handleChange}
                  name='RelevantClinicFindings'
                  value='other'
                  radioLabel='Other'
                  fieldName={diagnosisDetails?.RelevantClinicFindings || ''}
                />
              </div>
            </div>
            <div className='mt-4'>
              {diagnosisDetails?.RelevantClinicFindings === 'other' ? (
                <>
                  <Input
                    handleChange={handleChange}
                    name='relevantClinicFindings'
                    value={diagnosisDetails?.relevantClinicFindings || ''}
                    label='Other Details'
                    style={{ height: '40px' }}
                    labelStyle={{ paddingBottom: '12px' }}
                  />
                </>
              ) : diagnosisDetails?.RelevantClinicFindings === 'accident' ? (
                <>
                  <div className='mt-6'>
                    <p className='pb-4 text-sm text-fontColor-light'>
                      In Case Of Accident ?
                    </p>
                    <div className='flex items-center'>
                      <div className='mr-8'>
                        <InputRadio
                          handleChange={handleChange}
                          name='accident'
                          value='yes'
                          radioLabel='Yes'
                          fieldName={diagnosisDetails?.accident || ''}
                        />
                      </div>
                      <div className='mr-8'>
                        <InputRadio
                          handleChange={handleChange}
                          name='accident'
                          value='no'
                          radioLabel='No'
                          fieldName={diagnosisDetails?.accident || ''}
                        />
                      </div>
                    </div>

                    {diagnosisDetails?.accident === 'yes' ? (
                      <>
                        <div className='mt-6'>
                          <InputDate
                            handleChange={handleChange}
                            name='dateOfInjury'
                            value={diagnosisDetails?.dateOfInjury || ''}
                            label='Date of injury'
                          />
                        </div>

                        <div className='mt-6'>
                          <p className='pb-4 text-sm text-fontColor-light'>
                            Reported to police ?
                          </p>
                          <div className='flex items-center'>
                            <div className='mr-8'>
                              <InputRadio
                                handleChange={handleChange}
                                name='repotedToPolice'
                                value='yes'
                                radioLabel='Yes'
                                fieldName={
                                  diagnosisDetails?.repotedToPolice || ''
                                }
                              />
                            </div>
                            <div className='mr-8'>
                              <InputRadio
                                handleChange={handleChange}
                                name='repotedToPolice'
                                value='no'
                                radioLabel='No'
                                fieldName={
                                  diagnosisDetails?.repotedToPolice || ''
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {diagnosisDetails?.repotedToPolice === 'yes' ? (
                          <div className='mt-6'>
                            <Input
                              handleChange={handleChange}
                              name='FIR_Number'
                              value={diagnosisDetails?.FIR_Number || ''}
                              label='FIR Number'
                              style={{ height: '40px' }}
                              labelStyle={{ paddingBottom: '12px' }}
                            />
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    <div className='mt-6'>
                      <p className='pb-4 text-sm text-fontColor-light'>
                        Injury/Disease Caused Due To Substance Abuse / Alcohol
                        Consumption ?
                      </p>
                      <div className='flex items-center'>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_'
                            value='yes'
                            radioLabel='Yes'
                            fieldName={
                              diagnosisDetails?.Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_ ||
                              ''
                            }
                          />
                        </div>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_'
                            value='no'
                            radioLabel='No'
                            fieldName={
                              diagnosisDetails?.Injury_Disease_Caused_Due_To_Substance_Abuse_Alcohol_Consumption_ ||
                              ''
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-6'>
                      <p className='pb-4 text-sm text-fontColor-light'>
                        Test Conducted Or Not?
                      </p>
                      <div className='flex items-center'>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='testConductedOrNot'
                            value='yes'
                            radioLabel='Yes'
                            fieldName={
                              diagnosisDetails?.testConductedOrNot || ''
                            }
                          />
                        </div>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='testConductedOrNot'
                            value='no'
                            radioLabel='No'
                            fieldName={
                              diagnosisDetails?.testConductedOrNot || ''
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-6'>
                      <p className='pb-4 text-sm text-fontColor-light'>
                        Is It RTA?
                      </p>
                      <div className='flex items-center'>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='isItRTA'
                            value='yes'
                            radioLabel='Yes'
                            fieldName={diagnosisDetails?.isItRTA || ''}
                          />
                        </div>
                        <div className='mr-8'>
                          <InputRadio
                            handleChange={handleChange}
                            name='isItRTA'
                            value='no'
                            radioLabel='No'
                            fieldName={diagnosisDetails?.isItRTA || ''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : diagnosisDetails?.RelevantClinicFindings === 'injury' ? (
                <>
                  <div className='mt-6'>
                    <Input
                      handleChange={handleChange}
                      name='injuryCause'
                      value={diagnosisDetails?.injuryCause || ''}
                      label='How Did Injury Occur'
                      style={{ height: '40px' }}
                      labelStyle={{ paddingBottom: '12px' }}
                    />
                  </div>
                </>
              ) : diagnosisDetails?.RelevantClinicFindings === 'maternity' ? (
                <>
                  <div className='mt-6'>
                    <p className='pb-4 text-sm text-fontColor-light'>
                      Maternity
                    </p>
                    <div className='flex items-center'>
                      <div className='mr-8'>
                        <InputCheckbox
                          handleChange={handleChange}
                          name='maternityG'
                          value='yes'
                          checkboxLabel='G'
                          fieldName={diagnosisDetails?.maternityG || ''}
                        />
                      </div>
                      <div className='mr-8'>
                        <InputCheckbox
                          handleChange={handleChange}
                          name='maternityP'
                          value='yes'
                          checkboxLabel='P'
                          fieldName={diagnosisDetails?.maternityP || ''}
                        />
                      </div>
                      <div className='mr-8'>
                        <InputCheckbox
                          handleChange={handleChange}
                          name='maternityL'
                          value='yes'
                          checkboxLabel='L'
                          fieldName={diagnosisDetails?.maternityL || ''}
                        />
                      </div>
                      <div className='mr-8'>
                        <InputCheckbox
                          handleChange={handleChange}
                          name='maternityA'
                          value='yes'
                          checkboxLabel='A'
                          fieldName={diagnosisDetails?.maternityA || ''}
                        />
                      </div>
                    </div>
                    <div className='mt-6'>
                      <InputDate
                        handleChange={handleChange}
                        name='expectedDeliveryDate'
                        value={diagnosisDetails?.expectedDeliveryDate || ''}
                        label='Expected Delivery Date'
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className='mt-6'>
            <Input
              handleChange={handleChange}
              name='otherTreatments'
              value={diagnosisDetails?.otherTreatments || ''}
              label='If Other Treatments, Please Provide Details'
              style={{ height: '40px' }}
              labelStyle={{ paddingBottom: '12px' }}
            />
          </div>
        </div>
      </div>

      <div className='mt-18 flex items-center justify-between p-6'>
        <div className='hidden lg:flex'>
          <NextButton
            text='View Rate List'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={toggleDocumentsModal}
          />
          <NextButton
            text='View Documents'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={toggleViewDocumentsModal}
          />

          {freezeFields ? (
            <NextButton
              text='Unfreeze'
              style={{ marginRight: '16px', marginBottom: '16px' }}
              handleClick={toggleUnfreezeModal}
            />
          ) : null}
          {/* <NextButton
            text='Generate Pre Auth Form'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={preAuth}
          /> */}

          {/* <NextButton
            text='Send Mail'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              saveDataToDb();
              //@ts-ignore
              toggleModal();
            }}
          /> */}
        </div>
        <div className='flex'>
          <NextButton
            style={{ marginRight: '16px' }}
            iconLeft={true}
            text='Back'
            handleClick={prevStep}
          />
          <NextButton
            style={{ marginRight: '16px' }}
            iconRight={true}
            handleClick={saveDataToDb}
          />
        </div>
      </div>
      <div className='mt-18 flex items-center justify-between w-full p-6 lg:hidden'>
        <div className='flex ml-auto mr-auto w-72 sm:w-full justify-between flex-col sm:flex-row'>
          <NextButton
            text='View Rate List'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={toggleDocumentsModal}
          />
          <NextButton
            text='View Documents'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={toggleViewDocumentsModal}
          />

          {/* <NextButton
						text="Generate Pre Auth Form"
						style={{ marginRight: "16px", marginBottom: "16px" }}
						handleClick={preAuth}
					/> */}

          {/* <NextButton
            text='Send Mail'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              saveDataToDb();
              //@ts-ignore
              toggleModal();
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default StepThree;

// const handleCheck = (pre: any, val: any) => {
//   if (pre) {
//     return [...pre, val];
//   } else {
//     return [val];
//   }
// };

// if (type === "checkbox") {
//   if (checked) {
//     setNewCaseData((pre: any) => ({
//       ...pre,
//       diagnosisDetails: {
//         ...pre?.diagnosisDetails,
//         [name]: handleCheck(pre?.diagnosisDetails[name], value),
//       },
//     }));
//   } else {
//     setNewCaseData((pre: any) => ({
//       ...pre,
//       diagnosisDetails: {
//         ...pre?.diagnosisDetails,
//         [name]: [
//           ...pre?.diagnosisDetails[name]?.filter(
//             (item: any) => item !== value
//           ),
//         ],
//       },
//     }));
//   }
// }
