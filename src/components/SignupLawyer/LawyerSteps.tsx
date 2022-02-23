import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { AddIcon, Check, ClearIcon } from '../shared/Icons'
import { Button } from '../shared/Button'
import { Tooltip } from '../shared/Tooltip'
import { SelectComponent } from '../shared/forms/FormElements/Select'
import { InputComponent } from '../shared/forms/FormElements/Input'
import { Radio } from '../shared/forms/FormElements/Radio'
import { Checkbox } from '../shared/forms/FormElements/Checkbox'
import { LawyersSignUp } from '../shared/forms/LawyersSignUp'

const LawyerSteps: FC = () => {
  const [employeeStep, setemployeeStep] = useState<number>(0)
  const [administratorStep, setadministratorStep] = useState<number>(0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selection, setSelection] = useState<string>('admin')

  // const formToDisplay = {
  //   isAdmin: 'admin',
  //   isEmployee: 'employee',
  // }

  const [inputList, setInputList] = useState([
    {
      label: 'Email',
      placeholder: 'Email',
      type: 'email',
      light: true,
      value: '',
    },
  ])

  const handleAddEmployees = () => {
    setInputList(
      inputList.concat([
        {
          label: 'Email',
          placeholder: 'Email',
          type: 'email',
          light: true,
          value: '',
        },
      ]),
    )
  }

  {
    /* TODO Check index */
  }

  const handleRemoveEmployees = (input, key) => {
    const idx = inputList.indexOf(input)
    console.log(key)
    console.log(idx)
    const currentList = inputList
    currentList.splice(idx, 1)
    setInputList([...currentList])
  }

  const hanldeChange = (e, input) => {
    console.log(e)
    console.log(input)
    input.value = e.target.value
  }

  return (
    <>
      {/* Bubble with sign up steps counter */}
      {selection === 'employee' ? (
        <div className="flex mb-5 xl:mb-0 xl:absolute xl:right-0 xl:mr-10">
          <div className="mx-2 bg-primary border-4 border-primary text-white font-bold text-md rounded-full p-4 w-8 h-8 relative">
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {employeeStep > 0 ? <Check fillColour="white" size={16} /> : '1'}
            </span>
          </div>
          <div
            className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
              employeeStep > 0
                ? 'border-primary bg-primary text-white'
                : 'border-primary-light text-primary-light'
            }`}
          >
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {employeeStep > 1 ? <Check fillColour="white" size={16} /> : '2'}
            </span>
          </div>
          <div
            className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
              employeeStep > 1
                ? 'border-primary bg-primary text-white'
                : 'border-primary-light text-primary-light'
            }`}
          >
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {employeeStep > 2 ? <Check fillColour="white" size={16} /> : '3'}
            </span>
          </div>
        </div>
      ) : selection === 'admin' ? (
        <div className="flex mb-5 xl:mb-0 xl:absolute xl:right-0 xl:mr-10">
          <div className="mx-2 bg-primary border-4 border-primary text-white font-bold text-md rounded-full p-4 w-8 h-8 relative">
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {administratorStep > 0 ? <Check fillColour="white" size={16} /> : '1'}
            </span>
          </div>
          <div
            className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
              administratorStep > 0
                ? 'border-primary bg-primary text-white'
                : 'border-primary-light text-primary-light'
            }`}
          >
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {administratorStep > 1 ? <Check fillColour="white" size={16} /> : '2'}
            </span>
          </div>
          <div
            className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
              administratorStep > 1
                ? 'border-primary bg-primary text-white'
                : 'border-primary-light text-primary-light'
            }`}
          >
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {administratorStep > 2 ? <Check fillColour="white" size={16} /> : '3'}
            </span>
          </div>
          <div
            className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
              administratorStep > 2
                ? 'border-primary bg-primary text-white'
                : 'border-primary-light text-primary-light'
            }`}
          >
            <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
              {administratorStep > 3 ? <Check fillColour="white" size={16} /> : '4'}
            </span>
          </div>
        </div>
      ) : null}
      <div className={employeeStep === 0 && administratorStep === 0 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Personal Details</h2>
        <LawyersSignUp signupType="admin" />
      </div>

      {/* EMPLOYEE STEP 2 */}
      <div className={employeeStep === 1 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Professional Details</h2>
        <p className="font-bold text-md mb-4">Professional Details</p>
        <InputFormRow>
          <SelectComponent placeholder="Select your profession" dropdown outline />
          <SelectComponent placeholder="Spoken languages" dropdown outline />
        </InputFormRow>
        <p className="font-bold text-md mt-8 mb-4">Lawyer Licence</p>
        <InputFormRow>
          <SelectComponent placeholder="Province/State of license" dropdown outline />
          <InputComponent
            label="Year of diplomation"
            placeholder="Year of diplomation"
            type="text"
            light
          />
        </InputFormRow>
      </div>
      {/* EMPLOYEE STEP 3 */}
      <div className={employeeStep === 2 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Select your firm</h2>
        <p className="text-md mb-4">
          <span className="font-bold ">We have detected these firms for you.</span> Please select
          your firm
        </p>
        <RadioFormRow>
          <Radio
            id="compagnie1"
            label="Compagnie Montreal - 1234 Boul. Saint-Laurent"
            name="firm"
            light
          />
          <Radio
            id="compagnie2"
            label="Compagnie 2 Montreal - 1234 Boul. Saint-Laurent"
            name="firm"
            light
          />
          <Radio id="other" label="Other" name="firm" light />
        </RadioFormRow>
      </div>
      {/* EMPLOYEE STEP 3-BIS */}
      <div className={employeeStep === 3 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Select your firm</h2>
        <p className="text-md font-bold mb-4">Enter your firm's name</p>
        <SelectComponent icon="search" placeholder="Select your profession" dropdown outline />

        <p className="text-md my-6 italic">Or</p>
        <p className="text-md font-bold mb-4">Invite your administrator</p>
        <InputFormRow>
          <InputComponent
            label="Administrator email"
            placeholder="Administrator email"
            type="email"
            light
          />
        </InputFormRow>
        <p className="text-gray-300 text-sm font-semibold mt-5 italic">
          Your professional profile will be activated once your firm administrator has received your
          invitation and Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut vero sed
          possimus corrupti, maxime est ab aut corporis eaque unde dolorem earum pariatur ipsum enim
          laudantium aspernatur, voluptatibus, nisi similique!
        </p>
      </div>

      {/* FIRM ADMIN STEP 2 */}
      <div className={administratorStep === 1 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Professional Details</h2>
        <p className="font-bold text-md mb-4">Professional Details</p>
        <InputFormRow>
          <SelectComponent placeholder="Select your profession" dropdown outline />
          <SelectComponent placeholder="Spoken languages" dropdown outline />
        </InputFormRow>
        <p className="font-bold text-md mt-8 mb-4">Lawyer Licence</p>
        <InputFormRow>
          <InputComponent
            label="Professional License (12345-7)"
            placeholder="Professional License (12345-7)"
            type="text"
            light
          />
          <SelectComponent placeholder="Province/State of license" dropdown outline />
        </InputFormRow>
        <InputFormRow>
          <InputComponent
            label="Year of diplomation"
            placeholder="Year of diplomation"
            type="text"
            light
          />
        </InputFormRow>
      </div>
      {/* FIRM ADMIN STEP 3 */}
      <div className={administratorStep === 2 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Firm Details</h2>
        <p className="font-bold text-md mb-4">Contact information</p>
        <form action="">
          <InputFormRow>
            <InputComponent label="Firm Name" placeholder="Firm Name" type="text" light />
            <InputComponent label="Street No" placeholder="Street No" type="text" light />
          </InputFormRow>
          <InputFormRow>
            <InputComponent label="Street Name" placeholder="Street Name" type="text" light />
            <InputComponent label="Suite/App" placeholder="Suite/App" type="text" light />
          </InputFormRow>
          <InputFormRow>
            <SelectComponent placeholder="Country" dropdown outline />
            <SelectComponent placeholder="Province/State" dropdown outline />
          </InputFormRow>
          <InputFormRow>
            <InputComponent label="City" placeholder="City" type="text" light />
            <InputComponent label="Postal Code" placeholder="Postal Code" type="text" light />
          </InputFormRow>
          <InputFormRow>
            <InputComponent
              label="Professional Phone"
              placeholder="Professional Phone"
              type="text"
              light
            />
            <InputComponent label="Fax (Optional)" placeholder="Fax (Optional)" type="text" light />
          </InputFormRow>
          <p className="font-bold text-md mt-8 mb-4">Payment information</p>
          <InputFormRow>
            <InputComponent label="Email" placeholder="Email" type="email" light />
            <Tooltip />
          </InputFormRow>
          <p className="font-bold text-md mt-8 mb-4">Tax Number</p>
          <InputFormRow>
            <InputComponent label="TPS" placeholder="TPS" type="text" light />
            <InputComponent label="TVQ" placeholder="TVQ" type="text" light />
          </InputFormRow>
          <p className="italic">Or</p>
          <Checkbox
            id="taxes"
            label="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut vero sed possimus corrupti, maxime est ab aut corporis eaque unde dolorem earum pariatur ipsum enim laudantium aspernatur, voluptatibus, nisi similique"
            name="taxes"
            light
          />
        </form>
      </div>
      {/* FIRM ADMIN STEP 4 */}
      <div className={administratorStep === 3 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary mb-5">Invite Eployees</h2>
        <p className="font-medium text-primary-dark mb-4">
          Invite emlpoyee to join Goodowl platform etc ...
        </p>
        <form action="">
          <>
            {inputList.map((input, key) => (
              <InputFormRow key={key}>
                <InputComponent {...input} onChange={(e) => hanldeChange(e, input)} />
                <span onClick={() => handleRemoveEmployees(input, key)}>
                  <ClearIcon fillColour="grey-100" size={20} />
                </span>
              </InputFormRow>
            ))}

            <StyledAddFieldInput>
              <p className="flex items-center text-primary font-semibold text-sm">
                {' '}
                <span
                  className="block bg-primary w-6 h-6 rounded-full"
                  onClick={() => handleAddEmployees()}
                >
                  <AddIcon fillColour="white" size={20} />
                </span>{' '}
                Add New Employees
              </p>
            </StyledAddFieldInput>
          </>
        </form>
      </div>

      {employeeStep < 4 && employeeStep !== 0 ? (
        <div className="mt-32 flex flex-col items-start md:flex-row md:justify-between md-align-center">
          <Button
            className="text-gray-300 border border-gray-300 btn-icon"
            iconBefore="back"
            label="Back"
            onClick={() => setemployeeStep(employeeStep - 1)}
          />
          <Button
            className="text-white bg-primary mt-8 md:mt-0 md:self-end btn-icon"
            iconAfter="next"
            label="Next"
            onClick={() => setemployeeStep(employeeStep + 1)}
          />
        </div>
      ) : administratorStep < 4 && administratorStep !== 0 ? (
        <div className="mt-32 flex flex-col items-start md:flex-row md:justify-between md-align-center">
          <Button
            className="text-gray-300 border border-gray-300 btn-icon"
            iconBefore="back"
            label="Back"
            onClick={() => setadministratorStep(administratorStep - 1)}
          />
          <Button
            className="text-white bg-primary mt-8 md:mt-0 md:self-end btn-icon"
            iconAfter="next"
            label="Next"
            onClick={() => setadministratorStep(administratorStep + 1)}
          />
        </div>
      ) : null}
      <div className={employeeStep === 4 || administratorStep === 4 ? 'flex flex-col' : 'hidden'}>
        <h2 className="normal-case text-primary mb-6">Almost register...</h2>
        <p className="text-primary-dark font-medium mb-4">
          In order to confirm your registration <strong>click on the link</strong> we sent you by
          email
        </p>
        <p className="text-primary-dark font-medium">
          Thank you for trusting <strong>GoodOwl</strong>
        </p>
        <Link className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0" to="/">
          Close
        </Link>
      </div>
    </>
  )
}

const RadioFormRow = styled.div.attrs({
  className: '',
})`
  margin-top: 1.5rem;
  & .input-group {
    margin-top: 0.75rem;
  }
`
const InputFormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  & .select-wrapper + .select-wrapper {
    margin-top: 0.5rem;
  }

  span {
    cursor: pointer;
    svg {
      height: 100%;
    }
  }
  @media (min-width: 992px) {
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

export default LawyerSteps
