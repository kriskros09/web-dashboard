import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { Logo } from '../../components/shared/Icons'
import Background from '../../assets/img/img-goodowl-fond-hibou2.jpg'
import { Clients, Lawyers } from '../../components/shared/Icons'
import { InputSubmit } from '../../components/shared/forms/FormElements/Submit'
import SignUp from '../../modules/SignUp'
import { SignUpType } from '../../store/models/User/types'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const SIGNUP = 'signup'
const PAGE_NAMES = [GLOBAL, SIGNUP]

type State = {
  isSignUpTypeSet: boolean
  signUpType: SignUpType | string
}

const SignUpPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [state, setState] = React.useState<State>({ isSignUpTypeSet: false, signUpType: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, isSignUpTypeSet: true })
  }

  const { isSignUpTypeSet, signUpType } = state

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <div className="w-full bg-gray-100 h-full relative min-h-screen">
          <ImgCol50 />
          <div className="container relative h-full py-24 flex flex-col">
            <div className="flex flex-row justify-between content-center">
              <Link to="/">
                <Logo />
              </Link>
              <p className="self-center text-right z-10 text-white text-sm font-medium w-full">
                {content.page[SIGNUP].global.login_text}
                <Link className="font-semibold text-sm block md:inline md:pl-2" to="/login">
                  {content.page[SIGNUP].global.login_link}
                </Link>
              </p>
            </div>
            <div className="md:w-full lg:w-8/12 bg-white mt-12 mb-8 p-10 rounded-lg shadow-md relative">
              {isSignUpTypeSet ? (
                <SignUp pageContent={content.page[SIGNUP]} type={signUpType} />
              ) : (
                <div className="text-center">
                  <h2 className="normal-case text-primary md:w-8/12 mx-auto mb-10">
                    {content.page[SIGNUP].selection.main_title}
                  </h2>
                  <form className="w-4/5 mx-auto" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col md:flex-row -mx-8 mb-8">
                      <div className="input-group flex items-center mb-1 md:w-2/4 bg-gray-100 mx-4">
                        <CustomRadio
                          id="client"
                          name="register"
                          type="radio"
                          value="client"
                          onChange={(e) =>
                            setState({
                              ...state,
                              signUpType: e.target.value,
                            })
                          }
                        />
                        <label
                          className="text-gray-400 font-medium w-full h-full p-8 rounded"
                          htmlFor="client"
                        >
                          <div className="icon-wrapper w-24 h-24 bg-white rounded-full p-2 mb-5 mx-auto">
                            <Clients fillColour="primary" size={88} />
                          </div>
                          <h5 className="text-lg leading-3 uppercase text-primary font-bold antialiased mb-2">
                            {content.page[SIGNUP].selection.title_2}
                          </h5>
                          {content.page[SIGNUP].selection.text_2}
                        </label>
                      </div>
                      <div className="input-group flex items-center mb-1 md:w-2/4 bg-gray-100 rounded-sm mx-4">
                        <CustomRadio
                          id="lawyers"
                          name="register"
                          type="radio"
                          value="lawyer"
                          onChange={(e) =>
                            setState({
                              ...state,
                              signUpType: e.target.value,
                            })
                          }
                        />
                        <label
                          className="text-gray-400 font-medium w-full h-full p-8 rounded"
                          htmlFor="lawyers"
                        >
                          <div className="icon-wrapper w-24 h-24 bg-white rounded-full p-2 mb-5 mx-auto">
                            <Lawyers fillColour="primary" size={88} />
                          </div>
                          <h5 className="text-lg leading-3 uppercase text-primary font-bold antialiased mb-2">
                            {content.page[SIGNUP].selection.title_1}
                          </h5>
                          {content.page[SIGNUP].selection.text_1}
                        </label>
                      </div>
                    </div>
                    <InputSubmit
                      className="bg-primary text-white md:self-start"
                      disabled={!isSignUpTypeSet && !signUpType}
                      value={content.page[SIGNUP].selection.btn_text}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  )
}

export default SignUpPage

const ImgCol50 = styled.div.attrs({
  className: 'w-1/2 h-full absolute bg-no-repeat right-0',
})`
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
`
const CustomRadio = styled.input`
  appearance: none;
  position: absolute;
  cursor: pointer;

  & + label {
    border: 1px #eeeeee solid;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:checked {
    & + label {
      border: 1px var(--color-primary) solid;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
  }
`
