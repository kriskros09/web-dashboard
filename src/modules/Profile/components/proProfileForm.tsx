/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'

// Store
import { useStore } from '../../../store/models'
// Utils
import Utils from '../../../utils'
import { Button } from '../../../components/shared/Button'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { ImageUpload } from '../../../components/shared/forms/FormElements/ImageUpload'
import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'
import { SelectMultiComponent } from '../../../components/shared/forms/FormElements/SelectMulti'
import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'
import { Textarea } from '../../../components/shared/forms/FormElements/Textarea'
import { AddIcon } from '../../../components/shared/Icons'
import { yearsDropdownMapper } from '../../../utils/forms'

export const ProProfileForm: FC<any> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileState, profileActions] = useStore('Profiles')

  const { onChange, onBlur, errors, pageContent, initialValues, values, setFieldValue } = props

  const getEntryindex = (array, key, value) => {
    const index = array.findIndex((lic) => lic[key] === value)

    return index
  }

  return (
    <>
      <div className="">
        {/* <FormRow>
        <InputComponent
          label={pageContent?.professional.input_1}
          placeholder={pageContent?.professional.input_1}
          type="text"
          light
        />
        <InputComponent
          label={pageContent?.professional.input_2}
          placeholder={pageContent?.professional.input_2}
          type="text"
          light
        />
      </FormRow> */}
        <FormRow>
          <InputComponent
            error={errors['proEmail']}
            id="pro-email"
            label={pageContent?.professional.input_3}
            name="proEmail"
            placeholder={pageContent?.professional.input_3}
            type="email"
            value={values.proEmail}
            light
            onBlur={onBlur}
            onChange={onChange}
          />
          <InputComponent
            error={errors['phone']}
            id="pro-phone"
            label={pageContent?.professional.input_4}
            name="phone"
            placeholder={pageContent?.professional.input_4}
            type="phone"
            value={values.phone}
            light
            onBlur={onBlur}
            onChange={onChange}
          />
        </FormRow>
        <FormRow>
          {globalState.languages.length !== 0 ? (
            <SelectMultiComponent
              error={errors['languages']}
              name="languages"
              options={Utils.Form.dropdownMapper(
                { value: 'languageId', label: 'texts.name' },
                globalState.languages,
              )}
              placeholder={pageContent?.professional.input_5}
              searchable={false}
              value={values['languages']}
              outline
              onChange={(e) => setFieldValue('languages', e)}
            />
          ) : null}
        </FormRow>
      </div>

      <div className="mt-10">
        <h5 className="text-sm text-black font-semibold">{pageContent?.professional.title_2}</h5>
      </div>

      {/* profs */}
      <FieldArray
        name="professions"
        render={(arrayHelpers) => (
          <>
            <FormRow>
              {globalState.professions.map((profession) => (
                <Checkbox
                  key={profession.profId}
                  checked={
                    values.professions.filter((prof) => prof.value === profession.profId).length !==
                    0
                      ? true
                      : false
                  }
                  disabled={
                    values.professions.filter((prof) => prof.value === profession.profId).length !==
                    0
                  }
                  id={profession.profId}
                  label={profession.texts[0].name}
                  name={profession.texts[0].name}
                  solid
                  onChange={(e) => {
                    if (!values.professions.find((prof) => prof.value === profession.profId)) {
                      arrayHelpers.push({
                        value: profession.profId,
                        label: profession.texts[0].name,
                      })
                    } else {
                      arrayHelpers.remove(
                        values.professions.findIndex((prof) => prof.value === profession.profId),
                      )
                    }
                  }}
                />
              ))}
            </FormRow>
          </>
        )}
      />

      {values['professions'].map((profession, index) => (
        <div key={profession.value} className="mt-10">
          <h5 className="text-sm text-black mb-6 font-semibold">
            {pageContent?.professional.title_3} {profession.label}
          </h5>
          {/* Licences */}
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
                        <FormRow>
                          <InputComponent
                            error={errors?.licences?.[licenceIndex]?.licence}
                            id={`licenceNumber-${index}-${licence.licId}`}
                            label={pageContent?.professional.input_6}
                            // name={`licence.${index}`}
                            placeholder={pageContent?.professional.input_6}
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
                            error={errors?.licences?.[licenceIndex]?.region}
                            // name={`licences.${index}`}
                            options={Utils.Form.dropdownMapper(
                              { value: 'regIso', label: 'texts.name' },
                              globalState.regions,
                            )}
                            placeholder={pageContent?.professional.input_7}
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
                        </FormRow>
                        <FormRow>
                          <SelectComponent
                            error={errors?.licences?.[licenceIndex]?.year}
                            // name={`licenceYear.${index}`}
                            options={yearsDropdownMapper()}
                            placeholder={pageContent?.professional.input_8}
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
                            error={errors?.licences?.[licenceIndex]?.country}
                            // name={`licenceCountry.${index}`}
                            options={Utils.Form.dropdownMapper(
                              { value: 'countIso', label: 'texts.name' },
                              globalState.countries,
                            )}
                            placeholder="Country"
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
                        </FormRow>
                      </div>
                    )
                  })}

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
                    {pageContent?.professional.add_link}
                  </p>
                </StyledAddFieldInput>
              </>
            )}
          />
        </div>
      ))}

      <div className="mt-10">
        <h5 className="text-sm text-black mb-6 font-semibold">
          {pageContent?.professional.title_4}
        </h5>
        <div className="lg:flex justify-center -mx-5 ">
          <div className="w-full lg:w-2/3 lg:px-5">
            <Textarea
              error={errors['description'] as string}
              id="description_pro"
              name="description"
              placeholder={pageContent?.professional.input_9}
              value={values.description}
              light
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-1/3 lg:px-5">
            <ImageUpload
              Inputname="photo"
              id="pro-photo"
              setFieldValue={setFieldValue}
              src={values.photo}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        {profileState.pro.addresses.map((address, index) => (
          <div key={index}>
            <h5 className="text-lg text-primary mb-2 font-medium">
              {address.type === 1 ? pageContent?.professional.title_5 : 'Firm Billing address'}
            </h5>
            <p className="text-gray-400 text-sm">
              {address.streetNumber} {address.street}
              <br />
              {address.city} ({address.region}) {address.country}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

const FormRow = styled.div.attrs({
  className: 'lg:flex justify-between',
})`
  margin-top: 1rem;
  & .select-wrapper + .select-wrapper {
    margin-top: 1rem;
  }
  @media (min-width: 1024px) {
    margin: 1rem -0.5rem;
    & .input-wrapper,
    & .select-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
      & + .select-wrapper {
        margin-top: 0;
      }
    }

    & .input-group {
      padding: 0 0.375rem;
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
