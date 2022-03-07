import './PartReimbursement.css';
import Collapse from '@mui/material/Collapse';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import InputDate from '../theme/inputDate/InputDate';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import NextButton from '../theme/nextButton/NextButton';

type PartAReimbursementProps = {
  months: any;
  yearList: any;
  currentSectionOpen: string;
  SetcurrentSectionOpen: (e: any) => void;
  formData: any;
  changeData: (e: any) => void;
  prevStep: () => void;
  nextStep: () => void;
};

const PartAReimbursement = ({
  months,
  yearList,
  currentSectionOpen,
  SetcurrentSectionOpen,
  changeData,
  formData,
  prevStep,
  nextStep,
}: PartAReimbursementProps) => {
  return (
    <>
      <h2 className='mainHeading'>CLAIM FORM - PART A</h2>
      <div className='mainDiv'>
        {/* First Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsOfPrimary'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsOfPrimary');
            }}
          >
            {currentSectionOpen === 'detailsOfPrimary' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              1. Details of Primary Insured
            </span>
          </div>
          {currentSectionOpen === 'detailsOfPrimary' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}
          <Collapse
            in={currentSectionOpen === 'detailsOfPrimary' ? true : false}
          >
            <div id='example-collapse-text'>
              <div className='inputField'>
                <span className='inputFieldText'>Policy No *</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIpolicyNumber}
                  onChange={(e) => {
                    changeData({
                      DPIpolicyNumber: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Si.No/ Certificate</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIsiCerticate}
                  onChange={(e) => {
                    changeData({
                      DPIsiCerticate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>
                  Company / TPA ID (MA ID) No
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIcompanyTPANO}
                  onChange={(e) => {
                    changeData({
                      DPIcompanyTPANO: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField' style={{ width: '99%' }}>
                <span className='inputFieldText'>Company Name *</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIcompanyName}
                  onChange={(e) => {
                    changeData({
                      DPIcompanyName: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='inputField'>
                <span className='inputFieldText'>Employee No</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIemployeeNo}
                  onChange={(e) => {
                    changeData({
                      DPIemployeeNo: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Name *</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIname}
                  onChange={(e) => {
                    changeData({
                      DPIname: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Address *</span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  value={formData?.DPIaddress}
                  onChange={(e) => {
                    changeData({
                      DPIaddress: e.target.value,
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
                  value={formData?.DPIcity}
                  onChange={(e) => {
                    changeData({
                      DPIcity: e.target.value,
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
                  value={formData?.DPIstate}
                  onChange={(e) => {
                    changeData({
                      DPIstate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Phone no</span>
                <br />
                <input
                  type='number'
                  className='inputFieldbox'
                  value={formData?.DPIphoneNo}
                  onChange={(e) => {
                    changeData({
                      DPIphoneNo: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Email ID</span>
                <br />
                <input
                  type='email'
                  className='inputFieldbox'
                  value={formData?.DPIemailID}
                  onChange={(e) => {
                    changeData({
                      DPIemailID: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='inputField'>
                <span className='inputFieldText'>Pincode</span>
                <br />
                <input
                  type='number'
                  className='inputFieldbox'
                  onInput={(e) => {
                    if (e.currentTarget.value.length >= 6) {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 6);
                    }
                  }}
                  min='0'
                  value={formData?.DPIpincode}
                  onChange={(e) => {
                    changeData({
                      DPIpincode: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </Collapse>
        </div>
        {/* First Section End Here */}

        {/* 2 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsofInsruance'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsofInsruance');
            }}
          >
            {currentSectionOpen === 'detailsofInsruance' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              2. Details of Insruance history
            </span>
          </div>
          {currentSectionOpen === 'detailsofInsruance' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'detailsofInsruance' ? true : false}
          >
            <div id='example-collapse-text'>
              <div className='inputField'>
                <span className='inputFieldText'>
                  Currently covered by any other Mediclaim / Health Insurance
                </span>
                <br />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={formData?.DIHCurrentlycoveredCheck}
                  onChange={(e) => {
                    changeData({
                      DIHCurrentlycoveredCheck: e.target.value,
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
                <span className='inputFieldText'>
                  Date of commencement of first Insurance without break
                </span>
                <br />
                <InputDate
                  name=''
                  style={{
                    maxWidth: '220px',
                    height: '35px',
                    marginTop: '8px',
                  }}
                  value={formData?.DIHDateofcommencement}
                  handleChange={(e) => {
                    changeData({
                      DIHDateofcommencement: e.target.value,
                    });
                  }}
                />
              </div>
              {formData?.DIHCurrentlycoveredCheck === 'Yes' ? (
                <>
                  <div className='inputField'>
                    <span className='inputFieldText'>If yes, company name</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.DIHcompanyName}
                      onChange={(e) => {
                        changeData({
                          DIHcompanyName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>Policy No</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.DIHPolicyNo}
                      onChange={(e) => {
                        changeData({
                          DIHPolicyNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='inputField'>
                    <span className='inputFieldText'>Sum insured</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.DIHSumInsured}
                      onChange={(e) => {
                        changeData({
                          DIHSumInsured: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              ) : null}

              <br />
              <div className='inputField'>
                <span className='inputFieldText'>
                  Have you been hospitalized in the last four years since
                  inception of the contract?
                </span>
                <br />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  style={{ display: 'inline' }}
                  value={formData?.DIHHaveyoubeenhospitalized}
                  onChange={(e) => {
                    changeData({
                      DIHHaveyoubeenhospitalized: e.target.value,
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

              {formData?.DIHHaveyoubeenhospitalized === 'Yes' ? (
                <>
                  <br />
                  <div className='inputField'>
                    <span className='inputFieldText'>
                      If yes date DD MM YYYY
                    </span>
                    <br />
                    <InputDate
                      name=''
                      style={{
                        maxWidth: '220px',
                        height: '35px',
                        marginTop: '6px',
                      }}
                      value={formData?.DIHIfYesdate}
                      handleChange={(e) => {
                        changeData({ DIHIfYesdate: e.target.value });
                      }}
                    />
                  </div>

                  <div className='inputField'>
                    <span className='inputFieldText'>Diagnosis</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.DIHDiagnosis}
                      onChange={(e) => {
                        changeData({ DIHDiagnosis: e.target.value });
                      }}
                    />
                  </div>
                </>
              ) : null}
              <br />
              <div className='inputField'>
                <span className='inputFieldText'>
                  Previously covered by any other Mediclaim /Health insurance
                </span>
                <br />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  style={{ display: 'inline' }}
                  value={formData?.DIHPreviouslycoveredby}
                  onChange={(e) => {
                    changeData({
                      DIHPreviouslycoveredby: e.target.value,
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

              {formData?.DIHPreviouslycoveredby === 'Yes' ? (
                <>
                  <div className='inputField'>
                    <span className='inputFieldText'>If yes, company name</span>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.DIHPreviouslyCoveredCompanyName}
                      onChange={(e) => {
                        changeData({
                          DIHPreviouslyCoveredCompanyName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </Collapse>
        </div>
        {/* 2 Section End Here */}

        {/* 3 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'insuredPersonHospitalized'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('insuredPersonHospitalized');
            }}
          >
            {currentSectionOpen === 'insuredPersonHospitalized' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              3. Details of insured person hospitalized
            </span>
          </div>
          {currentSectionOpen === 'insuredPersonHospitalized' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={
              currentSectionOpen === 'insuredPersonHospitalized' ? true : false
            }
          >
            <div className='inputField'>
              <span className='inputFieldText'>Name of patient *</span>
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
              <span className='inputFieldText'>Health ID Card No.</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DPHHealthID}
                onChange={(e) => {
                  changeData({
                    DPHHealthID: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>
                Relationship to Primary Insured *:
              </span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DPHRelpPriInsured}
                onChange={(e) => {
                  changeData({
                    DPHRelpPriInsured: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Spouse'
                  control={<Radio className='BoxColor' />}
                  label='Spouse'
                />
                <FormControlLabel
                  value='Child'
                  control={<Radio className='BoxColor' />}
                  label='Child'
                />
                <FormControlLabel
                  value='Father'
                  control={<Radio className='BoxColor' />}
                  label='Father'
                />
                <FormControlLabel
                  value='Mother'
                  control={<Radio className='BoxColor' />}
                  label='Mother'
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio className='BoxColor' />}
                  label='Other'
                />
              </RadioGroup>
            </div>

            {formData?.DPHRelpPriInsured === 'Other' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  Relationship to Primary Insured: (In Case Of Other)
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  style={{ marginTop: '8px' }}
                  value={formData?.DPHRelpOther}
                  onChange={(e) => {
                    changeData({
                      DPHRelpOther: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className='inputField'></div>
            )}

            <div className='inputField' style={{ width: '100%' }}>
              <span className='inputFieldText'>Occupation:</span>

              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DPHOccupation}
                onChange={(e) => {
                  changeData({
                    DPHOccupation: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Service'
                  control={<Radio className='BoxColor' />}
                  label='Service'
                />
                <FormControlLabel
                  value='Self Employed'
                  control={<Radio className='BoxColor' />}
                  label='Self Employed'
                />
                <FormControlLabel
                  value='Homemaker'
                  control={<Radio className='BoxColor' />}
                  label='Homemaker'
                />
                <FormControlLabel
                  value='Student'
                  control={<Radio className='BoxColor' />}
                  label='Student'
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio className='BoxColor' />}
                  label='Other'
                />
              </RadioGroup>
            </div>

            {formData?.DPHOccupation === 'Other' ? (
              <div className='inputField'>
                <span className='inputFieldText'>
                  Occupation: (In Case Of Other)
                </span>
                <br />
                <input
                  type='text'
                  className='inputFieldbox'
                  style={{ marginTop: '8px' }}
                  value={formData?.DPHOccupationOther}
                  onChange={(e) => {
                    changeData({
                      DPHOccupationOther: e.target.value,
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
                <FormControlLabel
                  control={
                    <Checkbox
                      className='BoxColor'
                      checked={
                        formData?.DPHAddressCheck === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          DPHAddressCheck:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Address(If diffrent from above)'
                />
              </span>
              <br />
            </div>

            {formData?.DPHAddressCheck === true ||
            formData?.DPHAddressCheck === 'true' ? (
              <>
                <div className='inputField'>
                  <span className='inputFieldText'>
                    Address(If diffrent from above)
                  </span>
                  <br />
                  <input
                    type='text'
                    className='inputFieldbox'
                    value={formData?.DPHAddress}
                    onChange={(e) => {
                      changeData({
                        DPHAddress: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className='inputField'>
                  <span className='inputFieldText'>City</span>
                  <br />
                  <input
                    type='text'
                    className='inputFieldbox'
                    value={formData?.DPHCity}
                    onChange={(e) => {
                      changeData({
                        DPHCity: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='inputField'>
                  <span className='inputFieldText'>State</span>
                  <br />
                  <input
                    type='text'
                    className='inputFieldbox'
                    value={formData?.DPHState}
                    onChange={(e) => {
                      changeData({
                        DPHState: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className='inputField'>
                  <span className='inputFieldText'>Pin Code</span>
                  <br />
                  <input
                    type='text'
                    className='inputFieldbox'
                    value={formData?.DPHPinCode}
                    onChange={(e) => {
                      changeData({
                        DPHPinCode: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className='inputField'>
                  <span className='inputFieldText'>Phone no</span>
                  <br />
                  <input
                    type='number'
                    className='inputFieldbox'
                    value={formData?.DPHPhoneNo}
                    onChange={(e) => {
                      changeData({
                        DPHPhoneNo: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='inputField'>
                  <span className='inputFieldText'>Email ID</span>
                  <br />
                  <input
                    type='email'
                    className='inputFieldbox'
                    value={formData?.DPHEmailID}
                    onChange={(e) => {
                      changeData({
                        DPHEmailID: e.target.value,
                      });
                    }}
                  />
                </div>
              </>
            ) : null}
          </Collapse>
        </div>
        {/* 3 Section End Here */}

        {/* 4 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsOfHospitalization'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsOfHospitalization');
            }}
          >
            {currentSectionOpen === 'detailsOfHospitalization' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              4. Details of Hospitalization
            </span>
          </div>
          {currentSectionOpen === 'detailsOfHospitalization' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}
          <Collapse
            in={
              currentSectionOpen === 'detailsOfHospitalization' ? true : false
            }
          >
            <div className='inputField'>
              <span className='inputFieldText'>Name of hospital *</span>
              <br />
              <input
                type='email'
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
              <span className='inputFieldText'>Room Category *</span>

              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DHRoomCategory}
                onChange={(e) => {
                  changeData({
                    DHRoomCategory: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Day Care'
                  control={<Radio className='BoxColor' />}
                  label='Day Care'
                />
                <FormControlLabel
                  value='Single occupancy'
                  control={<Radio className='BoxColor' />}
                  label='Single occupancy'
                />
                <FormControlLabel
                  value='Twin Sharing'
                  control={<Radio className='BoxColor' />}
                  label='Twin Sharing'
                />
                <FormControlLabel
                  value='3 or more beds per room'
                  control={<Radio className='BoxColor' />}
                  label='3 or more beds per room'
                />
              </RadioGroup>
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Hospitalization due to:</span>

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
                  value='Injury'
                  control={<Radio className='BoxColor' />}
                  label='Injury'
                />
                <FormControlLabel
                  value='Illness'
                  control={<Radio className='BoxColor' />}
                  label='Illness'
                />
                <FormControlLabel
                  value='Maternity'
                  control={<Radio className='BoxColor' />}
                  label='Maternity'
                />
              </RadioGroup>
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Name of Treating doctor *</span>
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
              <span className='inputFieldText'>Diagnosis *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DHDiagnosis}
                onChange={(e) => {
                  changeData({
                    DHDiagnosis: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>
                Date of injrury/date disease first detected/date of delivery
              </span>
              <br />
              <InputDate
                name=''
                style={{
                  maxWidth: '220px',
                  height: '35px',
                  marginTop: '8px',
                }}
                value={formData?.DHDateInjrury}
                handleChange={(e) => {
                  changeData({
                    DHDateInjrury: e.target.value,
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

            {formData.DHHospitalizationDueTo === 'Injury' ? (
              <>
                <div className='inputField'>
                  <span className='inputFieldText'>If injury give cause</span>

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
              </>
            ) : (
              <div className='inputField'></div>
            )}
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

            <br />
            <div className='inputField' style={{ width: '24%' }}>
              <span className='inputFieldText'>If medico legal</span>
              <br />
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
            <div className='inputField' style={{ width: '23%' }}>
              <span className='inputFieldText'>Reported to police</span>
              <br />
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

            <div className='inputField' style={{ width: '23%' }}>
              <span className='inputFieldText'>
                Mlc report and police fir attached
              </span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DHMlcReport}
                onChange={(e) => {
                  changeData({
                    DHMlcReport: e.target.value,
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
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>System of medicine</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DHMSystemofmedicine}
                onChange={(e) => {
                  changeData({
                    DHMSystemofmedicine: e.target.value,
                  });
                }}
              />
            </div>
          </Collapse>
        </div>
        {/* 4 Section End Here */}

        {/* 5 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsOfClaim'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsOfClaim');
            }}
          >
            {currentSectionOpen === 'detailsOfClaim' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>5. Details of Claim</span>
          </div>
          {currentSectionOpen === 'detailsOfClaim' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse in={currentSectionOpen === 'detailsOfClaim' ? true : false}>
            <span className='inputFieldText' style={{ marginLeft: '10px' }}>
              A. Details of the Treatment expenses claimed
            </span>
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>
                Pre-hospitalization expenses
              </span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCPrehospitalizationExpen}
                onChange={(e) => {
                  changeData({
                    DCPrehospitalizationExpen: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Hospitalization expenses</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCHospitalizationExpenses}
                onChange={(e) => {
                  changeData({
                    DCHospitalizationExpenses: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>
                Post-hospitalization expenses
              </span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCPostHospitalizationExpenses}
                onChange={(e) => {
                  changeData({
                    DCPostHospitalizationExpenses: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Health-Check up cost</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCHealthCheckUpCost}
                onChange={(e) => {
                  changeData({
                    DCHealthCheckUpCost: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Ambulance Charges</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCAmbulanceCharges}
                onChange={(e) => {
                  changeData({
                    DCAmbulanceCharges: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Others (code)</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCOthersCode1}
                onChange={(e) => {
                  changeData({
                    DCOthersCode1: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Others Amount</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCOtherAmount1}
                onChange={(e) => {
                  changeData({
                    DCOtherAmount1: e.target.value,
                  });
                }}
              />
            </div>
            <br />
            <div className='inputField'></div>
            <div className='inputField'>
              <span className='inputFieldText'>Total</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                disabled
                value={formData?.DCTotal1}
                // onChange={(e) => {
                //   changeData({
                //     DCTotal1: e.target.value,
                //   });
                // }}
              />
            </div>
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>
                Pre-hospitalization period(Days)
              </span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCPreHospitalizationPeriod}
                onChange={(e) => {
                  changeData({
                    DCPreHospitalizationPeriod: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>
                Post-hospitalization period(Days)
              </span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCPostHospitalizationPeriod}
                onChange={(e) => {
                  changeData({
                    DCPostHospitalizationPeriod: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>
                Claim for Domiciliary Hospitalization
              </span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DCClaimDomiciliary}
                onChange={(e) => {
                  changeData({
                    DCClaimDomiciliary: e.target.value,
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
            <br />
            <span className='inputFieldText' style={{ marginLeft: '10px' }}>
              C. Details of Lump sum / cash benefit claimed
            </span>
            <br />
            <div className='inputField'>
              <span className='inputFieldText'>Hospital Daily cash</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCHospitalDailyCash}
                onChange={(e) => {
                  changeData({
                    DCHospitalDailyCash: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Surgical Cash</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCSurgicalCash}
                onChange={(e) => {
                  changeData({
                    DCSurgicalCash: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Critical Illness benefit</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCCriticalIllnessBenefit}
                onChange={(e) => {
                  changeData({
                    DCCriticalIllnessBenefit: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Convalescence</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCConvalescence}
                onChange={(e) => {
                  changeData({
                    DCConvalescence: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>
                Pre/Post hospitalization Lump sum benefit
              </span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCPostLumpSumBenefit}
                onChange={(e) => {
                  changeData({
                    DCPostLumpSumBenefit: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Others(Code)</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCOthersCode2}
                onChange={(e) => {
                  changeData({
                    DCOthersCode2: e.target.value,
                  });
                }}
              />
            </div>
            <div className='inputField'>
              <span className='inputFieldText'>Others Amount</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DCOtherAmount2}
                onChange={(e) => {
                  changeData({
                    DCOtherAmount2: e.target.value,
                  });
                }}
              />
            </div>
            <br />
            <div className='inputField'></div>
            <div className='inputField'>
              <span className='inputFieldText'>Total</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                disabled
                value={formData?.DCTotal2}
                // onChange={(e) => {
                //   changeData({
                //     DCTotal2: e.target.value,
                //   });
                // }}
              />
            </div>
          </Collapse>
        </div>
        {/* 5 Section End Here */}

        {/* 6 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'claimDocumentsSubmitted'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('claimDocumentsSubmitted');
            }}
          >
            {currentSectionOpen === 'claimDocumentsSubmitted' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              6. Claim Documents Submitted Check List
            </span>
          </div>
          {currentSectionOpen === 'claimDocumentsSubmitted' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'claimDocumentsSubmitted' ? true : false}
          >
            <div style={{ marginLeft: '20px' }}>
              <div className='checkBoxSide-1'>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1ClaimFormDulySigned === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1ClaimFormDulySigned:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Claim Form Duly Signed'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1CopyIntimation === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1CopyIntimation:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Copy of the claim intimation, if any'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1HospitalMainBill === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1HospitalMainBill:
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
                      checked={
                        formData?.CL1HospitalBreak === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1HospitalBreak:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital Break-up Bill'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1HospitalBillPaymentReceipt === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1HospitalBillPaymentReceipt:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital Bill Payment Receipt'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1HospitalDischargeSummary === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1HospitalDischargeSummary:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Hospital Discharge Summary'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1PharmacyBill === 'true' ? true : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1PharmacyBill:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Pharmacy Bill'
                />
              </div>

              <div className='checkBoxSide-2'>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      checked={
                        formData?.CL1OperationTheatreNotes === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1OperationTheatreNotes:
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
                      checked={formData?.CL1ECG === 'true' ? true : false}
                      onChange={(e) => {
                        changeData({
                          CL1ECG: e.target.checked === true ? 'true' : 'false',
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
                      checked={
                        formData?.CL1DoctorRequestinves === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1DoctorRequestinves:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Doctor’s request for investigation'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      // value={formData?.CL1InvestigationReports}
                      checked={
                        formData?.CL1InvestigationReports === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1InvestigationReports:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Investigation Reports (Including CT/ MRI / USG / HPE)'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      value={formData?.CL1DoctorPrescriptions}
                      checked={
                        formData?.CL1DoctorPrescriptions === 'true'
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        changeData({
                          CL1DoctorPrescriptions:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Doctor’s Prescriptions'
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      className='BoxColor'
                      value={formData?.CL1Others}
                      checked={formData?.CL1Others === 'true' ? true : false}
                      onChange={(e) => {
                        changeData({
                          CL1Others:
                            e.target.checked === true ? 'true' : 'false',
                        });
                      }}
                    />
                  }
                  label='Others'
                />

                {formData?.CL1Others === true ||
                formData?.CL1Others === 'true' ? (
                  <div className='inputField'>
                    <br />
                    <input
                      type='text'
                      className='inputFieldbox'
                      value={formData?.CL1OtherText}
                      onChange={(e) => {
                        changeData({
                          CL1OtherText: e.target.value,
                        });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Collapse>
        </div>
        {/* 6 Section End Here */}

        {/* 7 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsOfBills'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsOfBills');
            }}
          >
            {currentSectionOpen === 'detailsOfBills' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              7. Details Of Bills Enclosed
            </span>
          </div>
          {currentSectionOpen === 'detailsOfBills' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'detailsOfBills' ? true : false}
            style={{
              width: '980px',
            }}
          >
            <div className='tableMain'>
              <div className='tableHeading'>
                <span className='headingText tableSNO'>S.No</span>
                <span className='headingText tableBillNo'>Bill No</span>
                <span className='headingText tableDate'>Date</span>
                <span className='headingText tableIssuedBy'>Issued by</span>
                <span className='headingText tableToward'>Towards</span>
                <span className='headingText tableAmount'>Amount (Rs)</span>
              </div>
              {/* First Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>1</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo1}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo1: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate1}
                    onChange={(e) => {
                      changeData({
                        DBEDate1: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued1}
                    onChange={(e) => {
                      changeData({
                        DBEIssued1: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    placeholder='Hospital main bill'
                    disabled
                    value={formData?.DBETowards1}
                    onChange={(e) => {
                      changeData({
                        DBETowards1: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField'
                    value={formData?.DBEAmount1}
                    onChange={(e) => {
                      changeData({
                        DBEAmount1: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* First Row Ends*/}
              {/* 2 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>2</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo2}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo2: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate2}
                    onChange={(e) => {
                      changeData({
                        DBEDate2: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued2}
                    onChange={(e) => {
                      changeData({
                        DBEIssued2: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    placeholder='Pre-hospitalization bills'
                    disabled
                    value={formData?.DBETowards2}
                    onChange={(e) => {
                      changeData({
                        DBETowards2: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount2}
                    onChange={(e) => {
                      changeData({
                        DBEAmount2: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 2 Row Ends*/}
              {/* 3 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>3</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo3}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo3: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate3}
                    onChange={(e) => {
                      changeData({
                        DBEDate3: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued3}
                    onChange={(e) => {
                      changeData({
                        DBEIssued3: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    placeholder='Post-hospitalization bills'
                    disabled
                    value={formData?.DBETowards3}
                    onChange={(e) => {
                      changeData({
                        DBETowards3: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount3}
                    onChange={(e) => {
                      changeData({
                        DBEAmount3: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 3 Row Ends*/}
              {/* 4 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>4</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField'
                    value={formData?.DBEBillNo4}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo4: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate4}
                    onChange={(e) => {
                      changeData({
                        DBEDate4: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued4}
                    onChange={(e) => {
                      changeData({
                        DBEIssued4: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    placeholder='Pharmacy bills'
                    disabled
                    value={formData?.DBETowards4}
                    onChange={(e) => {
                      changeData({
                        DBETowards4: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount4}
                    onChange={(e) => {
                      changeData({
                        DBEAmount4: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 4 Row Ends*/}
              {/* 5 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>5</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo5}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo5: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate5}
                    onChange={(e) => {
                      changeData({
                        DBEDate5: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued5}
                    onChange={(e) => {
                      changeData({
                        DBEIssued5: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards5}
                    onChange={(e) => {
                      changeData({
                        DBETowards5: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount5}
                    onChange={(e) => {
                      changeData({
                        DBEAmount5: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 5 Row Ends*/}
              {/* 6 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>6</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo6}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo6: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate6}
                    onChange={(e) => {
                      changeData({
                        DBEDate6: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued6}
                    onChange={(e) => {
                      changeData({
                        DBEIssued6: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards6}
                    onChange={(e) => {
                      changeData({
                        DBETowards6: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount6}
                    onChange={(e) => {
                      changeData({
                        DBEAmount6: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 6 Row Ends*/}
              {/* 7 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>7</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo7}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo7: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate7}
                    onChange={(e) => {
                      changeData({
                        DBEDate7: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued7}
                    onChange={(e) => {
                      changeData({
                        DBEIssued7: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards7}
                    onChange={(e) => {
                      changeData({
                        DBETowards7: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount7}
                    onChange={(e) => {
                      changeData({
                        DBEAmount7: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 7 Row Ends*/}

              {/* 8 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>8</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo8}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo8: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate8}
                    onChange={(e) => {
                      changeData({
                        DBEDate8: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued8}
                    onChange={(e) => {
                      changeData({
                        DBEIssued8: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards8}
                    onChange={(e) => {
                      changeData({
                        DBETowards8: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount8}
                    onChange={(e) => {
                      changeData({
                        DBEAmount8: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 8 Row Ends*/}

              {/* 9 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>9</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo9}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo9: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate9}
                    onChange={(e) => {
                      changeData({
                        DBEDate9: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued9}
                    onChange={(e) => {
                      changeData({
                        DBEIssued9: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards9}
                    onChange={(e) => {
                      changeData({
                        DBETowards9: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount9}
                    onChange={(e) => {
                      changeData({
                        DBEAmount9: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 9 Row Ends*/}
              {/* 10 Row */}
              <div className='tableRow'>
                <span className='headingText tableSNO'>10</span>
                <div className='tableBillNo'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEBillNo10}
                    onChange={(e) => {
                      changeData({
                        DBEBillNo10: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableDate'>
                  <input
                    type='date'
                    className='tableinputField'
                    value={formData?.DBEDate10}
                    onChange={(e) => {
                      changeData({
                        DBEDate10: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableIssuedBy'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBEIssued10}
                    onChange={(e) => {
                      changeData({
                        DBEIssued10: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableToward'>
                  <input
                    type='text'
                    className='tableinputField'
                    value={formData?.DBETowards10}
                    onChange={(e) => {
                      changeData({
                        DBETowards10: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='tableAmount'>
                  <input
                    type='number'
                    className='tableinputField '
                    value={formData?.DBEAmount10}
                    onChange={(e) => {
                      changeData({
                        DBEAmount10: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* 10 Row Ends*/}
            </div>
          </Collapse>
        </div>
        {/* 7 Section End Here */}

        {/* 8 Section Start Here */}
        <div className='ReimbursementSection'>
          <div
            className='SectionHeading'
            onClick={() => {
              currentSectionOpen === 'detailsOfPrimaryInsrued'
                ? SetcurrentSectionOpen('')
                : SetcurrentSectionOpen('detailsOfPrimaryInsrued');
            }}
          >
            {currentSectionOpen === 'detailsOfPrimaryInsrued' ? (
              <i className='fas fa-minus faISectionExpColl' />
            ) : (
              <i className='fas fa-plus faISectionExpColl' />
            )}

            <span className='SectionHeadingText'>
              8. Details of primary Insrued bank account
            </span>
          </div>
          {currentSectionOpen === 'detailsOfPrimaryInsrued' ? (
            <div style={{ marginTop: '15px' }} />
          ) : null}

          <Collapse
            in={currentSectionOpen === 'detailsOfPrimaryInsrued' ? true : false}
          >
            <div className='inputField'>
              <span className='inputFieldText'>
                Name of the Account Holder (As per Bank Account) *
              </span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBAnameAccountHolder}
                onChange={(e) => {
                  changeData({
                    DIBAnameAccountHolder: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Account Number *</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DIBAccountNumber}
                onChange={(e) => {
                  changeData({
                    DIBAccountNumber: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Bank Name *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBAbankName}
                onChange={(e) => {
                  changeData({
                    DIBAbankName: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Branch Name & Address</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBAbranchName}
                onChange={(e) => {
                  changeData({
                    DIBAbranchName: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Account Type</span>
              <br />
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={formData?.DIBAaccountType}
                onChange={(e) => {
                  changeData({
                    DIBAaccountType: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value='Saving'
                  control={<Radio className='BoxColor' />}
                  label='Saving'
                />
                <FormControlLabel
                  value='Current'
                  control={<Radio className='BoxColor' />}
                  label='Current'
                />
                <FormControlLabel
                  value='Cash Credit'
                  control={<Radio className='BoxColor' />}
                  label='Cash Credit'
                />
              </RadioGroup>
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>MICR No</span>
              <br />
              <input
                type='number'
                className='inputFieldbox'
                value={formData?.DIBAmicrNo}
                onChange={(e) => {
                  changeData({
                    DIBAmicrNo: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>IFSC CODE *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBAifscCODE}
                onChange={(e) => {
                  changeData({
                    DIBAifscCODE: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>PAN *</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBApan}
                onChange={(e) => {
                  changeData({
                    DIBApan: e.target.value,
                  });
                }}
              />
            </div>

            <div className='inputField'>
              <span className='inputFieldText'>Cheque DD/Payable Details</span>
              <br />
              <input
                type='text'
                className='inputFieldbox'
                value={formData?.DIBAchequeDD}
                onChange={(e) => {
                  changeData({
                    DIBAchequeDD: e.target.value,
                  });
                }}
              />
            </div>
          </Collapse>
        </div>
        {/* 8 Section End Here */}
      </div>
      <div className='mt-18 flex items-center justify-between pl-8 p-6'>
        <NextButton iconLeft={true} text='Back' handleClick={prevStep} />
        <div className='hidden lg:flex'></div>
        <NextButton iconRight={true} handleClick={nextStep} />
      </div>
    </>
  );
};
export default PartAReimbursement;
