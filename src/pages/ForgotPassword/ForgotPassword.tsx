import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'

// Hooks
import { useContent } from '../../hooks'
// Components
import { Button } from '../../components/shared/Button'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'
import { Layout } from '../../components/core/Layout'
import { Logo } from '../../components/shared/Icons'
import Background from '../../assets/img/img-goodowl-fond-hibou2.jpg'
import { InputComponent } from '../../components/shared/forms/FormElements/Input'
import { actions as modelActions, getState } from '../../store/models'
import { Container } from '../../components/core/Container'

const validationSchema = object().shape({
  email: string().required('Field is required').email('Email format is invalid'),
})
const FORGOT_PASSORD = 'forgot_password'
const SIGNUP = 'signup'
const PAGE_NAMES = [FORGOT_PASSORD, SIGNUP]

const ForgotPasswordPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [showConfirmation, setShowConfirmation] = React.useState(false)

  const handleSubmit = async (values, actions) => {
    await modelActions.User.requestPasswordReset({ email: values.email })
    const { errors } = getState('User')
    const passwordResetError = errors.find((error) => error.view === 'password-reset')

    if (passwordResetError) {
      actions.setFieldError('email', passwordResetError.message)
    } else {
      setShowConfirmation(true)
    }

    actions.setSubmitting(false)
  }

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <ImgBgContainer>
          <div className="container h-screen flex flex-col justify-center">
            <div className="w-full lg:w-6/12 xxl:w-2/5 bg-white p-10 lg:p-20 rounded shadow-md">
              <div className="text-center">
                <Link to="/">
                  <Logo />
                </Link>
                {showConfirmation ? (
                  <div className="flex flex-col">
                    <h2 className="normal-case text-primary mb-6">
                      {content.page[FORGOT_PASSORD].texts.title}
                    </h2>
                    <p className="text-primary-dark font-medium mb-4">
                      {content.page[FORGOT_PASSORD].texts.confirmation}
                    </p>
                    <Link
                      className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0"
                      to="/"
                    >
                      Close
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="normal-case text-primary mb-8 ">
                      {content.page[FORGOT_PASSORD].texts.title}
                    </h2>
                    <p className="text-primary-dark mb-8">
                      {content.page[FORGOT_PASSORD].texts.text}
                    </p>
                    <Formik
                      enableReinitialize={false}
                      initialValues={{ email: '' }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ handleChange, handleBlur, errors, isSubmitting }) => {
                        return (
                          <Form className="flex flex-col justify-start">
                            <InputComponent
                              error={errors['email']}
                              id="email"
                              label={content.page[FORGOT_PASSORD].texts.input}
                              name="email"
                              placeholder="Email"
                              type="text"
                              light
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <Button
                              className="bg-primary text-white md:self-start cursor-pointer"
                              disabled={isSubmitting}
                              label={content.page[FORGOT_PASSORD].texts.btn_send}
                              type="submit"
                            />
                            <p className="text-primary-dark font-medium mt-4 self-start">
                              <Link to="/login">Have an account? Login</Link>
                            </p>
                          </Form>
                        )
                      }}
                    </Formik>
                  </>
                )}
              </div>
            </div>
          </div>
        </ImgBgContainer>
      </Layout>
    </Container>
  )
}

export default ForgotPasswordPage

const ImgBgContainer = styled.div.attrs({
  className: 'h-screen w-full',
})`
  background-image: url(${Background});
  background-size: cover;
  background-position: center top;

  svg {
    display: initial;
    margin-bottom: 40px;
  }
`
