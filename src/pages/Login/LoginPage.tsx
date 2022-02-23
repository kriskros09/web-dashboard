import React, { ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { Logo } from '../../components/shared/Icons'
import { Login } from '../../components/shared/forms/Login'
import Background from '../../assets/img/img-goodowl-fond-hibou2.jpg'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const LOGIN = 'login'
const PAGE_NAMES = [LOGIN]

type Types = {
  inline?: boolean

  dark?: boolean
}

const LoginPage: React.FC = (): ReactElement<'MainContainer' | 'FullViewLoader' | 'div'> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

  const [userState, userActions] = useStore('User')

  const history = useHistory()

  const handleLoginForm = async (e) => {
    e.preventDefault()
    const elements: HTMLFormElement[] = e?.currentTarget?.elements
    console.log('DATA LOGIN', typeof elements)

    if (elements) {
      // Not working on Firefox 83
      // const formValues = Object.entries(elements)
      //   .filter(([key]) => key === 'email' || key === 'password')
      //   .map(([_, element]) => ({
      //     [element.name]: element.value,
      //   }))

      const email = { email: elements['email'].value }
      const password = { password: elements['password'].value }

      const loginData = Object.assign({}, email, password)

      console.log('DATA LOGIN', loginData)
      await userActions.loginUser(loginData)

      const { isLoggedIn, roles } = userSessionMapper(getState('User')?.session)

      if (isLoggedIn) {
        if (roles.includes('user') && !roles.includes(['professional', 'firmManager'])) {
          history.push('/purchase')
        }

        if (roles.includes('firmManager') || roles.includes('professional')) {
          history.push('/dashboard')
        }
      }
    }
  }

  const error = userState?.errors.find((error) => error.view === 'login')

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
                <h2 className="normal-case text-primary mb-8 ">
                  {content.page[LOGIN].texts?.title}
                </h2>
              </div>
              <Login
                className="justify-start"
                pageContent={content.page[LOGIN].texts}
                onSubmit={handleLoginForm}
                onSubmitError={error}
              />

              <div className="text-left mt-9">
                <p className="text-gray-400 mb-3 font-semibold">
                  {content.page[LOGIN].texts?.text_3}
                </p>
                <Link to="/signup">
                  <p className="text-gray-400 font-bold">{content.page[LOGIN].texts?.text_4}</p>
                </Link>
              </div>
            </div>
          </div>
        </ImgBgContainer>
      </Layout>
    </Container>
  )
}

export default LoginPage

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
