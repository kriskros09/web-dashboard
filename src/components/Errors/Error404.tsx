import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { Logo } from '../../components/shared/Icons'
import Background from '../../assets/img/img-goodowl-fond-hibou2.jpg'

const Error404Page: React.FC = (): ReactElement<'div'> | null => {
  const { t } = useTranslation()

  return (
    <Container center>
      <Layout>
        <ImgBgContainer>
          <div className="container h-screen flex flex-col justify-center">
            <div className="w-full lg:w-9/12 mx-auto p-10 lg:p-20">
              <div className="text-center">
                <Link to="/">
                  <Logo />
                </Link>

                <p className="text-7xl text-white font-extrabold uppercase mb-4">404</p>
                <p className="text-7xl text-white font-extrabold uppercase">
                  {t('translation:pageError:notFound.title')}
                </p>
                <p className="text-4xl text-white font-bold">
                  {t('translation:pageError:notFound.text')}
                </p>
                <Link className="btn text-primary bg-white inline-block mt-8" to="/">
                  {t('translation:pageError:notFound.button')}
                </Link>
              </div>
            </div>
          </div>
        </ImgBgContainer>
      </Layout>
    </Container>
  )
}

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
export default Error404Page
