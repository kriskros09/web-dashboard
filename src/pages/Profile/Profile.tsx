import React, { FC, useState, ReactElement } from 'react'

// Hooks
import { useContent, useLogin } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { FirmDetails } from '../../components/shared/forms/FirmDetails'
import { ProfessionalDetails } from '../../components/shared/forms/ProfessionalDetails'
import { ChangePassword } from '../../components/shared/forms/ChangePassword'
// import Profile from '../../containers/Profile'
import UseCheckScreen from '../../hooks/ResponsiveDetection'
import { PersonalDetails } from '../../components/shared/forms/PersonalDetails'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const PROFILE = 'profile'
const PAGE_NAMES = [GLOBAL, PROFILE]

const ProfilePage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const Screen = UseCheckScreen()

  const { permissions } = useLogin()
  const isPro = permissions.includes('profProfile')
  const isFirm = permissions.includes('firmProfile')

  const [DetailsOpen, setDetailsOpen] = useState<number>(3)

  React.useEffect(() => {
    if (isFirm) {
      setDetailsOpen(1)
    } else if (isPro) {
      setDetailsOpen(2)
    } else {
      setDetailsOpen(3)
    }
  }, [permissions])

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading title={content.page[PROFILE].texts.main_title} />
          {Screen !== 'desktop' && Screen !== 'desktop-xl' ? (
            // MOBILE
            <div className="flex flex-col">
              {isFirm ? (
                <>
                  <Button
                    className={`flex justify-between text-white text-left mb-2 ${
                      DetailsOpen === 1 ? 'bg-primary shadow-md' : 'bg-gray-300'
                    }`}
                    iconAfter={`${DetailsOpen === 1 ? 'arrow-down' : 'arrow-right'}`}
                    label={content.page[PROFILE].texts.firm_btn}
                    onClick={() => setDetailsOpen(1)}
                  />
                  <div className={`bg-white p-6 mb-2  ${DetailsOpen === 1 ? 'block' : 'hidden'}`}>
                    <FirmDetails isViewed={DetailsOpen === 1} pageContent={content.page[PROFILE]} />
                  </div>
                </>
              ) : null}
              {isPro ? (
                <>
                  <Button
                    className={`flex justify-between text-white text-left mb-2 ${
                      DetailsOpen === 2 ? 'bg-primary shadow-md' : 'bg-gray-300'
                    }`}
                    iconAfter={`${DetailsOpen === 2 ? 'arrow-down' : 'arrow-right'}`}
                    label={content.page[PROFILE].texts.professional_btn}
                    onClick={() => setDetailsOpen(2)}
                  />
                  <div className={`bg-white p-6 mb-2 ${DetailsOpen === 2 ? 'block' : 'hidden'}`}>
                    <ProfessionalDetails
                      isViewed={DetailsOpen === 2}
                      pageContent={content.page[PROFILE]}
                    />
                  </div>
                </>
              ) : null}

              <Button
                className={`flex justify-between text-white text-left mb-2 ${
                  DetailsOpen === 3 ? 'bg-primary shadow-md' : 'bg-gray-300'
                }`}
                iconAfter={`${DetailsOpen === 3 ? 'arrow-down' : 'arrow-right'}`}
                label={content.page[PROFILE].texts.personal_btn}
                onClick={() => setDetailsOpen(3)}
              />
              <div className={`bg-white p-6 mb-2 ${DetailsOpen === 3 ? 'block' : 'hidden'}`}>
                <PersonalDetails isViewed={DetailsOpen === 3} pageContent={content.page[PROFILE]} />
              </div>
              <Button
                className={`flex justify-between text-white text-left mb-2  ${
                  DetailsOpen === 4 ? 'bg-primary shadow-md' : 'bg-gray-300'
                }`}
                iconAfter={`${DetailsOpen === 4 ? 'arrow-down' : 'arrow-right'}`}
                label={content.page[PROFILE].texts.password_btn}
                onClick={() => setDetailsOpen(4)}
              />
              <div className={`bg-white p-6 mb-2 ${DetailsOpen === 4 ? 'block' : 'hidden'}`}>
                <ChangePassword pageContent={content.page[PROFILE]} />
              </div>
            </div>
          ) : (
            // DESKTOP
            <div className="lg:flex">
              <div className="w-1/4 flex flex-col pr-10">
                <>
                  {isFirm ? (
                    <Button
                      className={`text-white text-left mb-2 ${
                        DetailsOpen === 1 ? 'bg-primary shadow-md' : 'bg-gray-300'
                      }`}
                      label={content.page[PROFILE].texts.firm_btn}
                      onClick={() => setDetailsOpen(1)}
                    />
                  ) : null}
                  {isPro ? (
                    <Button
                      className={`text-white text-left mb-2 ${
                        DetailsOpen === 2 ? 'bg-primary shadow-md' : 'bg-gray-300'
                      }`}
                      label={content.page[PROFILE].texts.professional_btn}
                      onClick={() => setDetailsOpen(2)}
                    />
                  ) : null}

                  <Button
                    className={`text-white text-left mb-2 ${
                      DetailsOpen === 3 ? 'bg-primary shadow-md' : 'bg-gray-300'
                    }`}
                    label={content.page[PROFILE].texts.personal_btn}
                    onClick={() => setDetailsOpen(3)}
                  />
                </>
                <Button
                  className={`text-white text-left ${
                    DetailsOpen === 4 ? 'bg-primary shadow-md' : 'bg-gray-300'
                  }`}
                  label={content.page[PROFILE].texts.password_btn}
                  onClick={() => setDetailsOpen(4)}
                />
              </div>
              <div className="w-3/4 bg-white py-10 px-20">
                {isFirm ? (
                  <div className={`${DetailsOpen === 1 ? 'block' : 'hidden'}`}>
                    <h4 className="text-xl text-primary mb-6 font-medium">
                      {content.page[PROFILE].firm.title_1}
                    </h4>
                    <FirmDetails isViewed={DetailsOpen === 1} pageContent={content.page[PROFILE]} />
                  </div>
                ) : null}

                {isPro ? (
                  <div className={`${DetailsOpen === 2 ? 'block' : 'hidden'}`}>
                    <h4 className="text-xl text-primary mb-6 font-medium">
                      {content.page[PROFILE].professional.title_1}
                    </h4>
                    <ProfessionalDetails
                      isViewed={DetailsOpen === 2}
                      pageContent={content.page[PROFILE]}
                    />
                  </div>
                ) : null}
                <div className={`${DetailsOpen === 3 ? 'block' : 'hidden'}`}>
                  <h4 className="text-xl text-primary mb-6 font-medium">
                    {content.page[PROFILE].personal.title_1}
                  </h4>
                  <PersonalDetails
                    isViewed={DetailsOpen === 3}
                    pageContent={content.page[PROFILE]}
                  />
                </div>

                <div className={`${DetailsOpen === 4 ? 'block' : 'hidden'}`}>
                  <h4 className="text-xl text-primary mb-6 font-medium">
                    {content.page[PROFILE].change_email.title}
                  </h4>
                  <ChangePassword pageContent={content.page[PROFILE]} />
                </div>
              </div>
            </div>
          )}
        </AccountLayout>
      </Layout>
    </Container>
  )
}

export default ProfilePage
