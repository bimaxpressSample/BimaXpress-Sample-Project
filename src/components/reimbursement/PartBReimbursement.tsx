import { useEffect, useState } from 'react';
import './PartReimbursement.css';
import Collapse from '@mui/material/Collapse';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import InputDate from '../theme/inputDate/InputDate';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import Button from '../theme/nextButton/NextButton';
type PartBReimbursementProps = {
  months: any;
  yearList: any;
  currentSectionOpen: string;
  SetcurrentSectionOpen: (e: any) => void;
  formData: any;
  changeData: (e: any) => void;
  prevStep: () => void;
  partBbutton: (e: string) => void;
};
const PartBReimbursement = ({
  months,
  yearList,
  currentSectionOpen,
  SetcurrentSectionOpen,
  formData,
  changeData,
  prevStep,
  partBbutton,
}: PartBReimbursementProps) => {
  return (
    <>
      <h2 className='mainHeading'>CLAIM FORM - PART B</h2>
      <div className='mainDiv'>
        {/* 9 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'hospitalDetails'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('hospitalDetails');
            }}
          >
            {currentSectionOpen === 'hospitalDetails' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>9. Hospital Details</span>
          </div>
          {currentSectionOpen === 'hospitalDetails' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'hospitalDetails' ? true : false}
          >
            <div className='inputField'>
              <span className='inputFieldText'>Name of hospital *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DHNameofhospital}
                onChange={(e) => {
                  changeData({
                    DHNameofhospital: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Hospital ID</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.HDhospitalID}
                onChange={(e) => {
                  changeData({
                    HDhospitalID: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Type of Hospital</span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.HDtypeofHospital}
                onChange={(e) => {
                  changeData({
                    HDtypeofHospital: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Network'
                  control={<Radio className='BoxColor' />}
                  label='Network'
                />
                <FormControlLabel
                  value='Non Network'
                  control={<Radio className='BoxColor' />}
                  label='Non Network'
                />
              </RadioGroup>
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Name of treating doctor *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DHTreatingDoctor}
                onChange={(e) => {
                  changeData({
                    DHTreatingDoctor: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Qualification</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.HDqualification}
                onChange={(e) => {
                  changeData({
                    HDqualification: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>
                Registration No (with state code)
              </span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.HDregistrationNo}
                onChange={(e) => {
                  changeData({
                    HDregistrationNo: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Phone No</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.HDphoneNo}
                onChange={(e) => {
                  changeData({
                    HDphoneNo: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Rohini Code</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.HDrohiniCode}
                onChange={(e) => {
                  changeData({
                    HDrohiniCode: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>NABH Code</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.HDnABHCode}
                onChange={(e) => {
                  changeData({
                    HDnABHCode: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>State Level Certificate</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.HDstateLevelCertificate}
                onChange={(e) => {
                  changeData({
                    HDstateLevelCertificate: e.target.value,
                  });
                }}
              />
            </div>
          </Collapse>
        </div>
        {/* 9 Section End Here */}

        {/* 10 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'patientAdmitted'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('patientAdmitted');
            }}
          >
            {currentSectionOpen === 'patientAdmitted' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              10. Details of Patient Admitted
            </span>
          </div>
          {currentSectionOpen === 'patientAdmitted' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'patientAdmitted' ? true : false}
          >
            <div className='inputField'>
              <span className='inputFieldText'>Name of Patient *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DPHNameofpatient}
                onChange={(e) => {
                  changeData({
                    DPHNameofpatient: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>IPD Number*</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.IPDpatientNumber}
                onChange={(e) => {
                  changeData({
                    IPDpatientNumber: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Gender *</span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DPHGender}
                onChange={(e) => {
                  changeData({
                    DPHGender: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Male'
                  control={<Radio className='BoxColor' />}
                  label='Male'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio className='BoxColor' />}
                  label='Female'
                />
              </RadioGroup>
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Date of Birth *</span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                value={formData?.DPHDateofBirth}
                handleChange={(e) => {
                  changeData({
                    DPHDateofBirth: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Age(years) *</span>
              <br />
              <NewCaseSelect
                options={yearList}
                name='Age_Year'
                defaultOption='Select year'
                style={{ height: '38px' }}
                value={formData?.DPHAgeYears}
                handleChange={(e) => {
                  changeData({
                    DPHAgeYears: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Age (months) *</span>
              <br />
              <NewCaseSelect
                options={months}
                name='Age_months'
                defaultOption='Select year'
                style={{ height: '38px' }}
                value={formData?.DPHAgeMonths}
                handleChange={(e) => {
                  changeData({
                    DPHAgeMonths: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField' style={{ width: '23%' }}>
              <span className='inputFieldText'>Date of admission *</span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                value={formData?.DHDateAdmission}
                handleChange={(e) => {
                  changeData({
                    DHDateAdmission: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField' style={{ width: '24%' }}>
              <span className='inputFieldText'>Time of admission *</span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                type='time'
                value={formData?.DHTimeAdmission}
                handleChange={(e) => {
                  changeData({
                    DHTimeAdmission: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField' style={{ width: '23%' }}>
              <span className='inputFieldText'>Date of Discharge *</span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                value={formData?.DHDateDischarge}
                handleChange={(e) => {
                  changeData({
                    DHDateDischarge: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField' style={{ width: '24%' }}>
              <span className='inputFieldText'>Time of Discharge *</span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                type='time'
                value={formData?.DHTimeDischarge}
                handleChange={(e) => {
                  changeData({
                    DHTimeDischarge: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Type of Admission: *</span>

              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DPAtypeAdmission}
                onChange={(e) => {
                  changeData({
                    DPAtypeAdmission: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Emergecny'
                  control={<Radio className='BoxColor' />}
                  label='Emergecny'
                />
                <FormControlLabel
                  value='Planned'
                  control={<Radio className='BoxColor' />}
                  label='Planned'
                />
                <FormControlLabel
                  value='Day care'
                  control={<Radio className='BoxColor' />}
                  label='Day care'
                />
                <FormControlLabel
                  value='Maternity'
                  control={<Radio className='BoxColor' />}
                  label='Maternity'
                />
              </RadioGroup>
            </div>

            {formData?.DPAtypeAdmission === 'Maternity' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  If Maternity (Date of Delivery)
                </span>
                <br />
                <InputDate
                  name=''
                  style={{
                    maxWidth: '220px',
                    height: '35px',
                    marginTop: '8px',
                  }}
                  value={formData?.DPAifMaternityDateDelivery}
                  handleChange={(e) => {
                    changeData({
                      DPAifMaternityDateDelivery: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className='inputField'></div>
            )}
            <div className='inputField'>
              <span className='inputFieldText'>Gravida Status</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DPAgravidaStatus}
                onChange={(e) => {
                  changeData({
                    DPAgravidaStatus: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>
                Status at time of discharge:
              </span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DPAstatusDischarge}
                onChange={(e) => {
                  changeData({
                    DPAstatusDischarge: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Discharge to home'
                  control={<Radio className='BoxColor' />}
                  label='Discharge to home'
                />
                <FormControlLabel
                  value='Discharge to another hospital'
                  control={<Radio className='BoxColor' />}
                  label='Discharge to another hospital'
                />
                <FormControlLabel
                  value='Maternity'
                  control={<Radio className='BoxColor' />}
                  label='Deceased'
                />
              </RadioGroup>
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Total Claim Amount</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DPAtotalAmount}
                onChange={(e) => {
                  changeData({
                    DPAtotalAmount: e.target.value,
                  });
                }}
              />
            </div>
          </Collapse>
        </div>
        {/* 10 Section End Here */}

        {/* 11 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'ailmentDiagnosed'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('ailmentDiagnosed');
            }}
          >
            {currentSectionOpen === 'ailmentDiagnosed' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              11. Details of Ailment Diagnosed (Primary)
            </span>
          </div>
          {currentSectionOpen === 'ailmentDiagnosed' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            style={{ width: '1040px' }}
            in={currentSectionOpen === 'ailmentDiagnosed' ? true : false}
          >
            <div className='tableMain'>
              {/* Side 1 Start */}
              <div className='side1'>
                <div className='tableHeading'>
                  <span className='headingText tableLabel'>a)</span>
                  <span className='headingText tableICDCode'>ICD 10 Codes</span>
                  <span className='headingText tableDescription'>
                    Description
                  </span>
                </div>
                {/* First Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    I. Primary Diagnosis
                  </span>

                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10Codes1}
                      onChange={(e) => {
                        changeData({
                          DADICD10Codes1: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescriptionC1}
                      onChange={(e) => {
                        changeData({
                          DADDescriptionC1: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* First Row Ends*/}
                {/* 2 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    II. Additional Diagnosis
                  </span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10Codes2}
                      onChange={(e) => {
                        changeData({
                          DADICD10Codes2: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescriptionC2}
                      onChange={(e) => {
                        changeData({
                          DADDescriptionC2: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 2 Row Ends*/}
                {/* 3 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    III. Co-morbidities
                  </span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10Codes3}
                      onChange={(e) => {
                        changeData({
                          DADICD10Codes3: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescriptionC3}
                      onChange={(e) => {
                        changeData({
                          DADDescriptionC3: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 3 Row Ends*/}
                {/* 4 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    IV. Co-morbidities
                  </span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10Codes4}
                      onChange={(e) => {
                        changeData({
                          DADICD10Codes4: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescriptionC4}
                      onChange={(e) => {
                        changeData({
                          DADDescriptionC4: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 4 Row Ends*/}
              </div>
              {/* Side 1 ends */}

              {/* Side 2 Start */}
              <div className='side2'>
                <div className='tableHeading'>
                  <span className='headingText tableLabel'>b)</span>
                  <span className='headingText tableICDCode'>ICD 10 PCS</span>
                  <span className='headingText tableDescription'>
                    Description
                  </span>
                </div>
                {/* First Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>I. Procedure 1</span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10PCS1}
                      onChange={(e) => {
                        changeData({
                          DADICD10PCS1: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescription1}
                      onChange={(e) => {
                        changeData({
                          DADDescription1: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* First Row Ends*/}
                {/* 2 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    II. Procedure 2
                  </span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10PCS2}
                      onChange={(e) => {
                        changeData({
                          DADICD10PCS2: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescription2}
                      onChange={(e) => {
                        changeData({
                          DADDescription2: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 2 Row Ends*/}
                {/* 3 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    III. Procedure 3
                  </span>
                  <div className='tableICDCode'>
                    <input
                      type='number'
                      className='tableinputField '
                      value={formData?.DADICD10PCS3}
                      onChange={(e) => {
                        changeData({
                          DADICD10PCS3: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='tableDescription'>
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescription3}
                      onChange={(e) => {
                        changeData({
                          DADDescription3: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 3 Row Ends*/}
                {/* 4 Row */}
                <div className='tableRow'>
                  <span className='headingText tableLabel'>
                    IV. Details of Procedure
                  </span>
                  <div
                    className='tableICDCode'
                    style={{
                      width: '298px',
                      position: 'relative',
                      left: '-3px',
                    }}
                  >
                    <input
                      type='text'
                      className='tableinputField '
                      value={formData?.DADDescription4}
                      onChange={(e) => {
                        changeData({
                          DADDescription4: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* 4 Row Ends*/}
              </div>
              {/* Side 2 ends */}
            </div>
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>Pre-authorization obtained</span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DADpreAuthorizationRadio}
                onChange={(e) => {
                  changeData({
                    DADpreAuthorizationRadio: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio className='BoxColor' />}
                  label='Yes'
                />
                <FormControlLabel
                  value='No'
                  control={<Radio className='BoxColor' />}
                  label='No'
                />
              </RadioGroup>
            </div>

            {formData?.DADpreAuthorizationRadio === 'Yes' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  Pre-authorization Number:
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DADpreAuthorizationNum}
                  onChange={(e) => {
                    changeData({
                      DADpreAuthorizationNum: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className='inputField'></div>
            )}
            {formData?.DADpreAuthorizationRadio === 'No' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  If authorization by network hospital not obtained,
                  <br /> give reason:
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DADauthorizationNotReason}
                  onChange={(e) => {
                    changeData({
                      DADauthorizationNotReason: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className='inputField'></div>
            )}
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>
                Hospitalization due to injury
              </span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DHHospitalizationDueTo}
                onChange={(e) => {
                  changeData({
                    DHHospitalizationDueTo: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio className='BoxColor' />}
                  label='Yes'
                />
                <FormControlLabel
                  value='No'
                  control={<Radio className='BoxColor' />}
                  label='No'
                />
              </RadioGroup>
            </div>

            {formData?.DHHospitalizationDueTo === 'Yes' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  Hospitalization due to injury Cause:
                </span>
                <br />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={formData?.DHIfInjuryCause}
                  onChange={(e) => {
                    changeData({
                      DHIfInjuryCause: e.target.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value='Self inflicted'
                    control={<Radio className='BoxColor' />}
                    label='Self inflicted'
                  />
                  <FormControlLabel
                    value='Road Accident'
                    control={<Radio className='BoxColor' />}
                    label='Road Accident'
                  />
                  <FormControlLabel
                    value='Substance Abuse/Alcohol Consumption'
                    control={<Radio className='BoxColor' />}
                    label='Substance Abuse/Alcohol Consumption'
                  />
                </RadioGroup>
              </div>
            ) : (
              <div className='inputField'></div>
            )}
            {formData?.DHIfInjuryCause ===
              'Substance Abuse/Alcohol Consumption' &&
            formData?.DHHospitalizationDueTo === 'Yes' ? (
              <div className='inputField' style={{ verticalAlign: 'top' }}>
                <span className='inputFieldText'>
                  If injury due to substance abuse / alcohol consumption, Test
                  conducted to establish this:
                </span>
                <br />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={formData?.DHIAlcoholConsumptionTest}
                  onChange={(e) => {
                    changeData({
                      DHIAlcoholConsumptionTest: e.target.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value='Yes'
                    control={<Radio className='BoxColor' />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='No'
                    control={<Radio className='BoxColor' />}
                    label='No'
                  />
                </RadioGroup>
              </div>
            ) : (
              <div className='inputField'></div>
            )}
            <div className='inputField'>
              <span className='inputFieldText'>If Medico legal:</span>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DHMedicoLegal}
                onChange={(e) => {
                  changeData({
                    DHMedicoLegal: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio className='BoxColor' />}
                  label='Yes'
                />
                <FormControlLabel
                  value='No'
                  control={<Radio className='BoxColor' />}
                  label='No'
                />
              </RadioGroup>
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Reported to Police</span>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DHReportedToPolice}
                onChange={(e) => {
                  changeData({
                    DHReportedToPolice: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio className='BoxColor' />}
                  label='Yes'
                />
                <FormControlLabel
                  value='No'
                  control={<Radio className='BoxColor' />}
                  label='No'
                />
              </RadioGroup>
            </div>

            {formData.DHReportedToPolice === 'Yes' ? (
              <div className='inputField'>
                <span className='inputFieldText'>FIR No.</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DADfirNo}
                  onChange={(e) => {
                    changeData({
                      DADfirNo: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className='inputField'>
                <span className='inputFieldText'>
                  If not reported to police give reason
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DADifNotReportedReason}
                  onChange={(e) => {
                    changeData({
                      DADifNotReportedReason: e.target.value,
                    });
                  }}
                />
              </div>
            )}
          </Collapse>
        </div>
        {/* 11 Section End Here */}

        {/* 12 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'claimDocumentsSubmitted-1'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('claimDocumentsSubmitted-1');
            }}
          >
            {currentSectionOpen === 'claimDocumentsSubmitted-1' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              12. Claim Documents Submitted - Check List
            </span>
          </div>
          {currentSectionOpen === 'claimDocumentsSubmitted-1' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={
              currentSectionOpen === 'claimDocumentsSubmitted-1' ? true : false
            }
          >
            <div style={{ marginLeft: '20px' }}>
              <div className='checkBoxSide-1'>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL2claimFormDulySigned === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2claimFormDulySigned:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Claim Form duly signed'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL2originalPreAuth === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2originalPreAuth:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Original Pre-authorization request'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2copyofthePreAuth === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2copyofthePreAuth:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Copy of the Pre-authorization approval letter'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2photoIDCardPatientVerified === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2photoIDCardPatientVerified:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Copy of photo ID Card of patient verified by hospital'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2hospitalDischargeSummary === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2hospitalDischargeSummary:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital Discharge summary'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2operationTheatreNotes === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2operationTheatreNotes:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Operation Theatre Notes'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2hospitalMainBill === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2hospitalMainBill:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital main bill'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2hospitalBreakBill === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2hospitalBreakBill:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital break-up bill'
                />
              </div>

              <div className='checkBoxSide-1'>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2investigationReports === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2investigationReports:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Investigation reports'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2ctmrInvestigation === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2ctmrInvestigation:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='CT/MR/USG/HPE investigation reports'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2doctorReferenceSlip === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2doctorReferenceSlip:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Doctor’s reference slip for investigation'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={formData?.CL2ECG === 'true' ? true : false}
                      onChange={(e) => {
                        changeData({
                          CL2ECG: e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='ECG'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2PharmacyBills === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2PharmacyBills:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Pharmacy bills'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={formData?.CL2mlcReport === 'true' ? true : false}
                      onChange={(e) => {
                        changeData({
                          CL2mlcReport:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='MLC reports & Police FIR'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={
                        formData?.CL2originalDeathSummary === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL2originalDeathSummary:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Original death summary from hospital where applicable'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={}
                      checked={formData?.CL2AnyOther === 'true' ? true : false}
                      onChange={(e) => {
                        changeData({
                          CL2AnyOther:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Any Other (please specify)'
                />
                {formData?.CL2AnyOther === true ||
                formData?.CL2AnyOther === 'true' ? (
                  <div className='inputField'>
                    <input
                      type='text'
                      className='inputFieldbox'
                      // value={}
                      value={formData?.CL2OtherText}
                      onChange={(e) => {
                        changeData({
                          CL2OtherText: e.target.value,
                        });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Collapse>
        </div>
        {/* 12 Section End Here */}

        {/* 13 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'nonNetworkHospital'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('nonNetworkHospital');
            }}
          >
            {currentSectionOpen === 'nonNetworkHospital' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              13. Additional Details in Case of Non Network Hospital
            </span>
          </div>
          {currentSectionOpen === 'nonNetworkHospital' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'nonNetworkHospital' ? true : false}
          >
            {formData.HDtypeofHospital === 'Non Network' ? (
              <>
                <div style={{ marginLeft: '20px' }}>
                  <div className='inputField'>
                    <span className='inputFieldText'>
                      Address of Hospital *
                    </span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHaddressOfHospital}
                      onChange={(e) => {
                        changeData({
                          NNHaddressOfHospital: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>City *</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHcity}
                      onChange={(e) => {
                        changeData({
                          NNHcity: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>State *</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHstate}
                      onChange={(e) => {
                        changeData({
                          NNHstate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>PIN Code</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHpinCode}
                      onChange={(e) => {
                        changeData({
                          NNHpinCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>Phone No</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.HDphoneNo}
                      onChange={(e) => {
                        changeData({
                          HDphoneNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>
                      Registration No (with state code)
                    </span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.HDregistrationNo}
                      onChange={(e) => {
                        changeData({
                          HDregistrationNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>Hospital PAN *</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHhospitalPAN}
                      onChange={(e) => {
                        changeData({
                          NNHhospitalPAN: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>
                      Number of Impatient Beds
                    </span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHimpatientBeds}
                      onChange={(e) => {
                        changeData({
                          NNHimpatientBeds: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>
                      Facilities available in hospital
                    </span>
                    <br />
                    <span className='inputFieldText'>i. OT : </span>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                      value={formData?.NNHot}
                      onChange={(e) => {
                        changeData({
                          NNHot: e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value='Yes'
                        control={<Radio className='BoxColor' />}
                        label='Yes'
                      />
                      <FormControlLabel
                        value='No'
                        control={<Radio className='BoxColor' />}
                        label='No'
                      />
                    </RadioGroup>
                    <br />
                    <span className='inputFieldText'>ii. ICU :</span>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                      value={formData?.NNHicu}
                      onChange={(e) => {
                        changeData({
                          NNHicu: e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value='Yes'
                        control={<Radio className='BoxColor' />}
                        label='Yes'
                      />
                      <FormControlLabel
                        value='No'
                        control={<Radio className='BoxColor' />}
                        label='No'
                      />
                    </RadioGroup>
                  </div>

                  <div className='inputField'>
                    <span className='inputFieldText'>iii. Others</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.NNHothers}
                      onChange={(e) => {
                        changeData({
                          NNHothers: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
                <span>
                  You Need To Select 'Non Network' Hospital in Section 9 to fill
                  this Section
                </span>
              </div>
            )}
          </Collapse>
        </div>
        {/* 13 Section End Here */}
      </div>
      <div className='mt-18 flex items-center justify-between pl-8 p-6 pr-2'>
        <Button iconLeft={true} text='Back' handleClick={prevStep} />
        <div className='hidden lg:flex'>
          <Button
            text='Print Form'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              partBbutton('printForm');
            }}
          />

          <Button
            text='Send Mail'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              partBbutton('sendMail');
            }}
          />

          <Button
            text='Mark Printed'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              partBbutton('markPrint');
            }}
          />

          <Button
            text='Mark Completed'
            style={{ marginRight: '16px', marginBottom: '16px' }}
            handleClick={() => {
              partBbutton('MarkComplete');
            }}
          />
        </div>
      </div>
    </>
  );
};
export default PartBReimbursement;
