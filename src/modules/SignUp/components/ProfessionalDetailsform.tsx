import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'

import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'
import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
import { SelectMultiComponent } from '../../../components/shared/forms/FormElements/SelectMulti'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { dropdownMapper } from '../../../utils/forms'
import { useStore } from '../../../store/models'
import { yearsDropdownMapper } from '../../../utils/forms'
import { AddIcon } from '../../../components/shared/Icons'
import Utils from '../../../utils'

export const ProfessionalDetailsForm: React.FC<any> = (props): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onBlur, setFieldValue, errors, values, onChange, pageContent, setErrors } = props
  const [globalState] = useStore('Global')
  const getEntryindex = (array, key, value) => {
    const index = array.findIndex((lic) => lic[key] === value)

    return index
  }
  console.log(' errors ======>', errors)

  return (
    <div className="block">
      <p className="font-bold text-md mb-4">{pageContent?.step_2?.title_1}</p>

      <InputFormRow>
        <FieldArray
          name="professions"
          render={(arrayHelpers) => (
            <div className="input-wrapper ">
              <div className="flex flex-col md:flex-row justify-between">
                {globalState.professions.map((profession) => (
                  <Checkbox
                    key={profession.profId}
                    checked={
                      values.professions.filter((prof) => prof.value === profession.profId)
                        .length !== 0
                        ? true
                        : false
                    }
                    id={profession.profId}
                    label={profession.texts[0].name}
                    name="professions"
                    solid
                    onChange={() => {
                      if (!values.professions.find((prof) => prof.value === profession.profId)) {
                        arrayHelpers.push({
                          value: profession.profId,
                          label: profession.texts[0].name,
                        })
                      } else {
                        const licIdx = values.licences.filter(
                          (lic) => lic.profId !== profession.profId,
                        )
                        arrayHelpers.remove(
                          values.professions.findIndex((prof) => prof.value === profession.profId),
                        )
                        setFieldValue('licences', licIdx)
                        setErrors(`licences[${licIdx}]`, {})
                      }
                    }}
                  />
                ))}
              </div>
              {errors['professions'] ? (
                <small className="text-error block">{errors['professions']}</small>
              ) : null}
            </div>
          )}
        />

        <SelectMultiComponent
          error={errors['languages']}
          name="languages"
          options={dropdownMapper(
            { value: 'languageId', label: 'texts.name' },
            globalState.languages,
          )}
          placeholder={pageContent?.step_2?.input_1_2}
          value={values['languages']}
          dropdown
          outline
          onChange={(e) => setFieldValue('languages', e)}
        />
      </InputFormRow>
      {/* licences / professions */}
      {values['professions']?.map((profession, index) => (
        <div key={profession.value}>
          <p className="font-bold text-md mt-8 mb-4">
            {pageContent?.step_2?.title_2} {profession.label}
          </p>
          <FieldArray
            name="licences"
            render={(arrayHelpersLicence) => (
              <>
                {values['licences']
                  .filter((lic) => lic.profId === profession.value)
                  .map((licence) => {
                    const licenceIndex = getEntryindex(values['licences'], 'licId', licence.licId)

                    return (
                      <div key={licence.licId} className="mb-8">
                        <InputFormRow>
                          <InputComponent
                            error={errors?.licences?.[index]?.licence}
                            id={`licenceNumber-${index}`}
                            label={pageContent?.step_2.input_2_1}
                            name="licence"
                            placeholder={pageContent?.step_2.input_2_1}
                            type="text"
                            value={licence.licence}
                            light
                            onBlur={onBlur}
                            onChange={(e) => {
                              setFieldValue(
                                `licences[${licenceIndex}].licence`,
                                e.currentTarget.value,
                              )
                            }}
                          />
                          <SelectComponent
                            error={errors?.licences?.[index]?.region}
                            name="region"
                            options={Utils.Form.dropdownMapper(
                              { value: 'regIso', label: 'texts.name' },
                              globalState.regions,
                            )}
                            placeholder={pageContent?.step_2.input_2_2}
                            value={Utils.Form.dropdownMapper(
                              { value: 'regIso', label: 'texts.name' },
                              globalState.regions,
                            ).find((options) => options.value === licence.region)}
                            dropdown
                            outline
                            onChange={(e) =>
                              setFieldValue(`licences[${licenceIndex}].region`, e.value)
                            }
                          />
                        </InputFormRow>
                        <InputFormRow>
                          <SelectComponent
                            error={errors?.licences?.[index]?.year}
                            name="year"
                            options={yearsDropdownMapper()}
                            placeholder={pageContent?.step_2.input_2_3}
                            value={yearsDropdownMapper().find(
                              (options) => options.value === licence.year,
                            )}
                            dropdown
                            outline
                            onChange={(e) =>
                              setFieldValue(`licences[${licenceIndex}].year`, Number(e.value))
                            }
                          />
                          <SelectComponent
                            error={errors?.licences?.[index]?.country}
                            name="country"
                            options={Utils.Form.dropdownMapper(
                              { value: 'countIso', label: 'texts.name' },
                              globalState.countries,
                            )}
                            placeholder={pageContent?.step_2.input_2_4}
                            value={Utils.Form.dropdownMapper(
                              { value: 'countIso', label: 'texts.name' },
                              globalState.countries,
                            ).find((options) => options.value === licence.country)}
                            dropdown
                            outline
                            onChange={(e) =>
                              setFieldValue(`licences[${licenceIndex}].country`, e.value)
                            }
                          />
                        </InputFormRow>
                      </div>
                    )
                  })}
                {getEntryindex(values['licences'], 'profId', profession.value) < 0 ? (
                  <StyledAddFieldInput
                    onClick={() => {
                      arrayHelpersLicence.push({
                        profId: profession.value,
                        licId: `TEMP-${Math.floor(Math.random() * 1000)}`,
                        country: '',
                        licence: '',
                        region: '',
                        year: '',
                      })
                    }}
                  >
                    <p className="flex items-center text-primary font-semibold text-sm">
                      {' '}
                      <span className="block bg-primary w-6 h-6 rounded-full">
                        <AddIcon fillColour="white" size={20} />
                      </span>{' '}
                      Ajouter une licence
                    </p>
                  </StyledAddFieldInput>
                ) : null}
              </>
            )}
          />
        </div>
      ))}
    </div>
  )
}

const InputFormRow = styled.div.attrs({
  className: 'xl:flex',
})`
  margin-top: 1rem;
  & .select-wrapper + .select-wrapper {
    margin-top: 1rem;
  }
  & .input-wrapper + .select-wrapper {
    margin-top: 1rem;
  }
  @media (min-width: 1280px) {
    margin: 0.5rem -0.5rem;
    & .select-wrapper,
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .select-wrapper,
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`

const StyledAddFieldInput = styled.div`
  margin-top: 25px;
  cursor: pointer;
  & span {
    padding: 2px;
    margin-right: 15px;
  }
`
