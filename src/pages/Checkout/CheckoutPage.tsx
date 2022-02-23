import React, { FC, useState, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { CheckoutHero } from '../../components/shared/CheckoutHero'
import { CheckoutLayout } from '../../components/shared/CheckoutLayout'
import { Modal } from '../../components/shared/Modal'
import { ImageText } from '../../components/shared/modalcontent/ImageText'
import { OrderSummary } from '../../components/shared/OrderSummary'
import { Footer } from '../../components/shared/Footer'
import { CheckoutStep1 } from '../../components/CheckoutSteps/'
import { CheckoutStep2 } from '../../components/CheckoutSteps/'
import { CheckoutStep3 } from '../../components/CheckoutSteps/'
import { CheckoutStep4 } from '../../components/CheckoutSteps/'
import { CheckoutStep5 } from '../../components/CheckoutSteps/'
import { PaymentDetails } from '../../components/CheckoutSteps/'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const ORDER = 'order'
const PAGE_NAMES = [GLOBAL, ORDER]

const CheckoutPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

  const [orderState] = useStore('Order')
  const [NextStep, setNextStep] = useState<number>(0)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const history = useHistory()
  let currentOrderData

  // Set the right step depending on state information
  React.useEffect(() => {
    if (orderState.order_details !== null && orderState.mandId !== '' && orderState.taskId !== '') {
      setNextStep(2)
    }
  }, [orderState.order_details, orderState.mandId])

  React.useEffect(() => {
    if (orderState.paymentStatus === 3 && NextStep === 3) {
      setNextStep(4)
    }
  }, [orderState.paymentStatus])

  const handleClick = () => {
    setModalShow(!modalShow)
  }

  // Redirect user if necessary or set currentOrderData
  if (orderState.order_details === null && NextStep < 2) {
    history.push('/find-lawyer')
  } else {
    currentOrderData = orderState.order_details
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
        <TopNavigation pageContent={content.page[GLOBAL]} />
        <Header pageContent={content.page[GLOBAL]} />
        <CheckoutHero currentStep={NextStep} pageContent={content.page[ORDER].process} />

        <CheckoutLayout>
          {{
            content1: (
              <OrderSummary
                orderSummary={currentOrderData}
                pageContent={content.page[ORDER].summary}
              />
            ),
            content2:
              NextStep === 0 ? (
                <CheckoutStep1
                  nextStep={() => setNextStep(NextStep + 1)}
                  pageContent={content.page[ORDER].step_1}
                  showModal={() => handleClick()}
                />
              ) : NextStep === 1 ? (
                <CheckoutStep2
                  nextStep={() => setNextStep(NextStep + 1)}
                  pageContent={content.page[ORDER]}
                />
              ) : NextStep === 2 ? (
                <CheckoutStep3
                  nextStep={() => setNextStep(NextStep + 1)}
                  pageContent={content.page[ORDER].step_3}
                />
              ) : NextStep === 3 ? (
                <CheckoutStep4
                  pageContent={content.page[ORDER].step_4}
                  previouStep={() => setNextStep(NextStep - 1)}
                />
              ) : NextStep === 4 ? (
                <CheckoutStep5
                  nextStep={() => setNextStep(NextStep + 1)}
                  pageContent={content.page[ORDER].step_5}
                />
              ) : null,

            content3:
              NextStep === 3 ? (
                <PaymentDetails
                  nextStep={() => setNextStep(NextStep + 1)}
                  pageContent={content.page[ORDER].step_4}
                />
              ) : null,
          }}
        </CheckoutLayout>
        <Modal
          modalClose={() => setModalShow(!modalShow)}
          modalOpen={modalShow}
          width="lg:w-2/4"
          light
        >
          <ImageText pageContent={content.page[ORDER].step_1} />
        </Modal>
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default CheckoutPage
