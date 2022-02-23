/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

// Store
import { FieldArray } from 'formik'

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

const colors = [
  '#003057',
  '#3B688D',
  '#4298B5',
  '#003050',
  '#49C8ED',
  '#9586AA',
  '#803B84',
  '#470053',
  '#AF7302',
  '#8D3B3B',
]

export const EmployeeProfileForm: FC<any> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protate, proActions] = useStore('Professionals')
  const [ProColor, setProColor] = useState<string>('')
  const [ColorPickerVisibility, setColorPickerVisibility] = useState<boolean>(false)

  const {
    onChange,
    onBlur,
    errors,
    pageContent,
    initialValues,
    values,
    setFieldValue,
    setValues,
    isSubmitting,
  } = props

  const handleColorPicker = (i) => {
    setProColor(colors[i])
    setFieldValue('color', colors[i])
    setColorPickerVisibility(false)
  }

  const proProfessionsId = initialValues.professions.map((p) => p.profId)

  return (
    <>
      <div className="w-full lg:w-2/6 lg:px-5 mb-5 lg:mt-0 ">
        <ImageUpload
          Inputname="photo"
          id="pro-photo"
          label={pageContent?.details.img_link}
          setFieldValue={setFieldValue}
          src={values.photo}
        />
      </div>
      <div className="w-full lg:w-4/6 lg:px-5">
        <p className="text-gray-600 font-bold text-left mb-4">
          {initialValues.profile.firstName} {initialValues.profile.lastName}
        </p>
        <div className="flex flex-col xl:flex-row xl:-mx-5">
          <div className="w-full xl:w-2/3 xl:px-5">
            {globalState.professions.length !== 0 ? (
              <CheckboxGroup className="md:bg-gray-150 md:shadow-sm flex flex-col md:flex-row justify-between md:items-center md:px-6 md:py-3">
                {globalState.professions.map((profession) => (
                  <Checkbox
                    key={profession.profId}
                    checked={
                      initialValues.professions.filter((prof) => prof.profId === profession.profId)
                        .length !== 0
                        ? true
                        : false
                    }
                    id={profession.profId}
                    label={profession.texts[0].name}
                    name={profession.texts[0].name}
                    value={profession.texts[0].name}
                    disabled
                    solid
                  />
                ))}
              </CheckboxGroup>
            ) : null}
            <FormRow>
              <InputComponent
                id="firstName"
                label={pageContent?.details.input_1}
                name="firstName"
                placeholder={pageContent?.details.input_1}
                type="text"
                value={values.profile.firstName}
                disabled
                light
              />
              <InputComponent
                id="lastName"
                label={pageContent?.details.input_2}
                name="lastName"
                placeholder={pageContent?.details.input_2}
                type="text"
                value={values.profile.lastName}
                disabled
                light
              />
            </FormRow>
            <FormRow>
              <InputComponent
                error={errors['proEmail']}
                id="proEmail"
                label={pageContent?.details.input_4}
                name="proEmail"
                placeholder={pageContent?.details.input_4}
                type="email"
                value={values.proEmail}
                light
                onBlur={onBlur}
                onChange={onChange}
              />
              <InputComponent
                error={errors['phone']}
                id="phone"
                label={pageContent?.details.input_3}
                name="phone"
                placeholder={pageContent?.details.input_3}
                type="phone"
                value={values.phone}
                light
                onBlur={onBlur}
                onChange={onChange}
              />
            </FormRow>
          </div>
          <div className="w-full xl:w-1/3 xl:px-5 mt-5 xl:mt-0">
            <div className="hidden">
              <InputComponent
                id="color"
                label={pageContent?.details.color_text}
                name="color"
                placeholder=""
                type="text"
                value={values.color}
                light
                onBlur={onBlur}
                onChange={onChange}
              />
            </div>
            <Colorpicked
              color={ProColor || initialValues.color}
              title={pageContent?.details.color_text}
              onClick={() => setColorPickerVisibility(!ColorPickerVisibility)}
            />
            <div
              className={`flex items-center flex-wrap bg-gray-150 border border-gray-200 shadow-xs rounded p-2 mt-2 ${
                ColorPickerVisibility ? 'block' : 'hidden'
              }`}
            >
              {colors.map((color, i) => (
                <Colorpicker
                  key={`color-${color}`}
                  color={color}
                  onClick={() => handleColorPicker(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          {globalState.professions
            .filter((prof) => proProfessionsId.includes(prof.profId))
            .map((profession) => (
              <div key={profession.profId}>
                <div className="bg-gray-150 text-gray-400 uppercase px-6 py-3 text-left text-sm font-medium">
                  LICENCE {profession.texts[0].name}
                </div>
                {initialValues.licences
                  .filter((licence) => licence.profId === profession.profId)
                  .map((lic) => (
                    <FormRow key={lic.licId}>
                      <InputComponent
                        id={lic.licence}
                        label="Professional Licence number*"
                        name="licence"
                        placeholder="Professional Licence number*"
                        type="text"
                        value={lic.licence}
                        disabled
                        light
                      />

                      <InputComponent
                        id={`${lic.region}-${lic.licence}`}
                        label="Year of diplomation*"
                        placeholder="Province/State of licence"
                        type="text"
                        value={lic.region}
                        disabled
                        light
                      />
                      <InputComponent
                        id={`${lic.year}-${lic.licence}`}
                        label="Year of diplomation*"
                        placeholder="Year of diplomation*"
                        type="text"
                        value={lic.year}
                        disabled
                        light
                      />
                    </FormRow>
                  ))}
              </div>
            ))}
        </div>
        <div className="flex">
          <Button
            className="bg-primary text-white mr-2"
            disabled={isSubmitting}
            label={pageContent?.details.save_btn}
            type="submit"
          />

          <Button
            className="bg-white border border-primary text-primary  ml-2"
            label={pageContent?.details.cancel_btn}
            type="reset"
          />
        </div>
      </div>
    </>
  )
}

const ColorSwatche = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 12px;
  height: 12px;
  border-radius: 12px;
  display: block;
  margin-left: 0.75rem;
`
const Colorpicked = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 48px;
  height: 48px;
  border-radius: 4px;
  display: block;
  cursor: pointer;
  border: #dedede 1px solid;
`
const Colorpicker = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: block;
  margin: 0.25rem;
  cursor: pointer;
`

const CheckboxGroup = styled.div`
  .input-group {
    @media (min-width: 768px) {
      margin-top: 0;
    }

    label {
      color: #888888;
      font-weight: 400;
      font-size: 0.875rem;
    }
  }
`

const FormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  .input-wrapper + .select-wrapper,
  .select-wrapper + .input-wrapper {
    margin-top: 1rem;
  }
  @media (min-width: 992px) {
    margin: 0.5rem -0.5rem;
    & .input-wrapper,
    & .select-wrapper {
      width: 100%;
      padding: 0 0.375rem;
      & + .input-wrapper,
      & + .select-wrapper {
        margin-top: 0;
      }
    }
  }
`
