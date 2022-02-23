// import React from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom'

// import { AddIcon } from '../shared/Icons'
// import { Button } from '../shared/Button'
// import { Tooltip } from '../shared/Tooltip'
// import { SelectComponent } from '../shared/forms/FormElements/Select'
// import { InputComponent } from '../shared/forms/FormElements/Input'
// import { Radio } from '../shared/forms/FormElements/Radio'
// import { Checkbox } from '../shared/forms/FormElements/Checkbox'
// import StepsCounter from '../shared/forms/FormElements/StepsCounter'
// import { LawyersSignUp } from '../shared/forms/LawyersSignUp'
// // Store
// import { useStore } from '../../store/models'
// // Utils
// import {dropdownMapper, formatAddress} from '../../utils/forms'
// import {SignUpType} from '../../store/models/User/types'

// const PROFESSIONAL_STEPS = 4
// const FIRM_STEPS = 3

// const LawyerSignUp: React.FC = () => {
//   const [globalState, globalActions] = useStore('Global')
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [_userState, userActions] = useStore('User')
//   const [activeStep, setActiveStep] = React.useState<number>(1)
//   const [stepsCount, setStepsCount] = React.useState<number>(0)
//   const [maxSteps, setMaxSteps] = React.useState<number>(0)
//   const [signupType, setSignupType] = React.useState<SignUpType>('')
//   const [isSignUpDone, setIsSignUpDone] = React.useState<boolean>(false)
//   const formRef = React.useRef<HTMLFormElement>(null)

//   const emailsInputs = {
//     input0: 'admin',
//     input1: 'employee',
//   }

//   const handleSignUpTypeSelection = (e) => {
//     setSignupType(e.target.value)
//     const count = e.target.value === 'firm' ? FIRM_STEPS : PROFESSIONAL_STEPS
//     setMaxSteps(count)
//     setStepsCount(count)
//   }

//   const handleStepChangeAndValidate = (e, nextStep) => {
//     e.persist()
//     e.preventDefault()
//     /**
//      * TODO: validate before next step
//      */
//     Array.from(e.currentTarget).map((element) => console.log('E', element))
//     const elements = formRef?.current?.elements
//     let stepCount = nextStep

//     /**
//      * Map all elements
//      */
//     // if (elements) {

//     const formValues = Object.values(elements || {})
//       .filter(
//         (element) =>
//           element['name'] !== '' &&
//           element['name'] !== 'lawyers_type' &&
//           element['type'] !== 'button',
//       )
//       .map((el) => ({
//         name: el['name'],
//         type: el['type'],
//         value: el['value'],
//       }))
//     // }

//     if (stepCount > maxSteps && formValues) {
//       setIsSignUpDone(true)
//       userActions.signUp({ data: formValues, type: signupType })
//     } else {
//       console.log('activeStep', activeStep, 'signupType', signupType)

//       /**
//        * get suggested firms based on email
//        */
//       if (activeStep === 1 && signupType === 'professional' && formValues) {
//         const email = formValues.find((element) => element?.name.includes('email'))

//         if (email?.value) {
//           globalActions.getFirmsByEmail({ email: email.value })
//         }
//       }

//       /**
//        * If we have no recommended firms we skip a step
//        */
//       if(activeStep === 2 && signupType === 'professional' && !globalState?.firmsByEmail?.length) {
//         stepCount = stepCount+1
//       }

//       setActiveStep(stepCount)
//     }
//   }

//   return (
//     <form
//       ref={formRef}
//       className="flex flex-col justify-start"
//       onSubmit={(e) => e.preventDefault()}
//     >
//       {/* Bubble with sign up steps counter */}
//       <div className="flex mb-5 xl:mb-0 xl:absolute xl:right-0 xl:mr-10">
//         <StepsCounter activeStep={activeStep} count={stepsCount} isLastStep={isSignUpDone} />
//       </div>
//       {/* STEP 1 FOR ALL */}
//       <div className={activeStep === 1 ? 'block' : 'hidden'}>
//         <h2 className="normal-case text-primary mb-5">Personal Details</h2>
//         <LawyersSignUp signupType={signupType} onChange={(e) => handleSignUpTypeSelection(e)} />
//       </div>

//       {/* PROFESSIONAL STEP 2 */}
//       <div className={signupType === 'professional' && activeStep === 2 ? 'block' : 'hidden'}>
//         <h2 className="normal-case text-primary mb-5">Professional Details</h2>
//         <p className="font-bold text-md mb-4">Professional Details</p>
//         <InputFormRow>
//           <SelectComponent
//             name="professional.2.professions"
//             options={dropdownMapper(
//               { value: 'profId', label: 'texts.name' },
//               globalState.professions,
//             )}
//             placeholder="Select your profession"
//             dropdown
//             outline
//           />
//           <SelectComponent
//             name="professional.2.languages"
//             options={dropdownMapper(
//               { value: 'languageId', label: 'texts.name' },
//               globalState.languages,
//             )}
//             placeholder="Spoken languages"
//             dropdown
//             outline
//           />
//         </InputFormRow>
//         <p className="font-bold text-md mt-8 mb-4">Lawyer Licence</p>
//         <InputFormRow>
//           <SelectComponent
//             name="professional.2.region"
//             options={dropdownMapper(
//               { value: 'regIso', label: 'texts.name' },
//               globalState.regions,
//             )}
//             placeholder="Province/State of license"
//             dropdown
//             outline
//           />
//           <InputComponent
//             label="Year of diplomation"
//             name="professional.2.diplomation_year"
//             placeholder="Year of diplomation"
//             type="text"
//             light
//           />
//         </InputFormRow>
//       </div>
//       {/* PROFESSIONAL STEP 3 */}
//       <div
//         className={
//           signupType === 'professional' && activeStep === 3 && globalState?.firmsByEmail?.length
//             ? 'block'
//             : 'hidden'
//         }
//       >
//         <h2 className="normal-case text-primary mb-5">Select your firm</h2>
//         <p className="text-md mb-4">
//           <span className="font-bold ">We have detected these firms for you.</span> Please select
//           your firm
//         </p>
//         {/* TODO: when fetching data we need to map this */}
//         <RadioFormRow>
//           {globalState.firmsByEmail.map((firm) => (
//             <Radio key={firm.firmId} id={firm.firmId} label={`${firm.name} - ${formatAddress(firm.addresses)}`} name="firm" light />
//           ))}
//           <Radio id="other" label="Other" name="firm" light />
//         </RadioFormRow>
//       </div>
//       {/* PROFESSIONAL STEP 4 */}
//       <div
//         className={
//           signupType === 'professional' && activeStep === 4 && !isSignUpDone ? 'block' : 'hidden'
//         }
//       >
//         <h2 className="normal-case text-primary mb-5">Select your firm</h2>
//         <p className="text-md font-bold mb-4">Enter your firm's name</p>
//         <SelectComponent
//           icon="search"
//           name="professional.3.firm"
//           options={dropdownMapper(
//             { value: 'firmId', label: 'name' },
//             globalState.firms,
//           )}
//           placeholder="Select a firm"
//           dropdown
//           outline
//         />

//         <p className="text-md my-6 italic">Or</p>
//         <p className="text-md font-bold mb-4">Invite your administrator</p>
//         <InputFormRow>
//           <InputComponent
//             label="Administrator email"
//             name="professional.3.administrator_email"
//             placeholder="Administrator email"
//             type="email"
//             light
//           />
//         </InputFormRow>
//         <p className="text-gray-300 text-sm font-semibold mt-5 italic">
//           Your professional profile will be activated once your firm administrator has received your
//           invitation and Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut vero sed
//           possimus corrupti, maxime est ab aut corporis eaque unde dolorem earum pariatur ipsum enim
//           laudantium aspernatur, voluptatibus, nisi similique!
//         </p>
//       </div>

//       {/* FIRM STEP 2 */}
//       <div className={signupType === 'firm' && activeStep === 2 ? 'block' : 'hidden'}>
//         <h2 className="normal-case text-primary mb-5">Firm Details</h2>
//         <p className="font-bold text-md mb-4">Contact information</p>
//         {/* <form action=""> */}
//         <InputFormRow>
//           <InputComponent
//             label="Firm Name"
//             name="firm.2.first_name"
//             placeholder="Firm Name"
//             type="text"
//             light
//           />
//           <InputComponent
//             label="Street No"
//             name="firm.2.street_number"
//             placeholder="Street No"
//             type="text"
//             light
//           />
//         </InputFormRow>
//         <InputFormRow>
//           <InputComponent
//             label="Street Name"
//             name="firm.2.street_name"
//             placeholder="Street Name"
//             type="text"
//             light
//           />
//           <InputComponent
//             label="Suite/App"
//             name="firm.2.suite_app"
//             placeholder="Suite/App"
//             type="text"
//             light
//           />
//         </InputFormRow>
//         <InputFormRow>
//           <SelectComponent
//             name="firm.2.country"
//             options={dropdownMapper(
//               { value: 'countIso', label: 'texts.name' },
//               globalState.countries,
//             )}
//             placeholder="Country"
//             dropdown
//             outline
//           />
//           <SelectComponent
//             name="firm.2.region"
//             options={dropdownMapper(
//               { value: 'regIso', label: 'texts.name' },
//               globalState.regions,
//             )}
//             placeholder="Province/State"
//             dropdown
//             outline
//           />
//         </InputFormRow>
//         <InputFormRow>
//           <InputComponent label="City" name="firm.2.city" placeholder="City" type="text" light />
//           <InputComponent
//             label="Postal Code"
//             name="firm.2.postal_code"
//             placeholder="Postal Code"
//             type="text"
//             light
//           />
//         </InputFormRow>
//         <InputFormRow>
//           <InputComponent
//             label="Professional Phone"
//             name="firm.2.phone"
//             placeholder="Professional Phone"
//             type="text"
//             light
//           />
//           <InputComponent
//             label="Fax (Optional)"
//             name="firm.2.fax"
//             placeholder="Fax (Optional)"
//             type="text"
//             light
//           />
//         </InputFormRow>
//         <p className="font-bold text-md mt-8 mb-4">Payment information</p>
//         <InputFormRow>
//           <InputComponent
//             label="Email"
//             name="firm.2.email"
//             placeholder="Email"
//             type="email"
//             light
//           />
//           <Tooltip />
//         </InputFormRow>
//         <p className="font-bold text-md mt-8 mb-4">Tax Number</p>
//         <InputFormRow>
//           <InputComponent label="TPS" name="firm.2.tps" placeholder="TPS" type="text" light />
//           <InputComponent label="TVQ" name="firm.2.tvq" placeholder="TVQ" type="text" light />
//         </InputFormRow>
//         <p className="italic">Or</p>
//         <Checkbox
//           id="taxes"
//           label="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut vero sed possimus corrupti, maxime est ab aut corporis eaque unde dolorem earum pariatur ipsum enim laudantium aspernatur, voluptatibus, nisi similique"
//           name="adfirmmin.2.taxes"
//           light
//         />
//         {/* </form> */}
//       </div>
//       {/* FIRM STEP 3 */}
//       <div
//         className={signupType === 'firm' && activeStep === 3 && !isSignUpDone ? 'block' : 'hidden'}
//       >
//         <h2 className="normal-case text-primary mb-5">Invite Eployees</h2>
//         <p className="font-medium text-primary-dark mb-4">
//           Invite emlpoyee to join Goodowl platform etc ...
//         </p>
//         {/* <form action=""> */}
//         {Object.keys(emailsInputs).map((key, index) => (
//           <InputFormRow key={key}>
//             <InputComponent
//               id={`email-${index}`}
//               label="Email"
//               name={`firm.3.email-${index}s`}
//               placeholder="Email"
//               type="email"
//               light
//             />
//           </InputFormRow>
//         ))}
//         <StyledAddFieldInput
//         // onClick={() => console.log('add')}
//         >
//           <p className="flex items-center text-primary font-semibold text-sm">
//             {' '}
//             <span className="block bg-primary w-6 h-6 rounded-full">
//               <AddIcon fillColour="white" size={20} />
//             </span>{' '}
//             Add New Employees
//           </p>
//         </StyledAddFieldInput>
//         {/* </form> */}
//       </div>
//       {isSignUpDone ? (
//         <div className="flex flex-col">
//           <h2 className="normal-case text-primary mb-6">Almost register...</h2>
//           <p className="text-primary-dark font-medium mb-4">
//             In order to confirm your registration <strong>click on the link</strong> we sent you by
//             email
//           </p>
//           <p className="text-primary-dark font-medium">
//             Thank you for trusting <strong>GoodOwl</strong>
//           </p>
//           <Link className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0" to="/">
//             Close
//           </Link>
//         </div>
//       ) : (
//         <div className="mt-32 flex flex-col items-start md:flex-row md:justify-between md-align-center">
//           <Button
//             className="text-gray-300 border border-gray-300 btn-icon"
//             iconBefore="back"
//             label="Back"
//             onClick={(e) => handleStepChangeAndValidate(e, activeStep - 1)}
//           />
//           <Button
//             className="text-white bg-primary mt-8 md:mt-0 md:self-end btn-icon"
//             disabled={!signupType}
//             iconAfter="next"
//             label="Next"
//             onClick={(e) => handleStepChangeAndValidate(e, activeStep + 1)}
//           />
//         </div>
//       )}
//     </form>
//   )
// }

// const RadioFormRow = styled.div.attrs({
//   className: '',
// })`
//   margin-top: 1.5rem;
//   & .input-group {
//     margin-top: 0.75rem;
//   }
// `
// const InputFormRow = styled.div.attrs({
//   className: 'lg:flex',
// })`
//   margin-top: 1rem;
//   & .select-wrapper + .select-wrapper {
//     margin-top: 0.5rem;
//   }
//   @media (min-width: 992px) {
//     margin: 0.5rem -0.5rem;
//     & .select-wrapper,
//     & .input-wrapper {
//       width: 50%;
//       padding: 0 0.375rem;
//       & + .select-wrapper,
//       & + .input-wrapper {
//         margin-top: 0;
//       }
//     }
//   }
// `

// const StyledAddFieldInput = styled.div`
//   margin-top: 25px;
//   cursor: pointer;
//   & span {
//     padding: 2px;
//     margin-right: 15px;
//   }
// `

// export default LawyerSignUp
import React from 'react'

export const LawyerSignUp: React.FC = () => {
  return <span>LawyerSignUp: unused</span>
}

export default LawyerSignUp
