import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'

// Store
import { useStore } from '../../store/models'
//Components
import { Button } from '../shared/Button'
import { Calendar } from '../shared/proprofile/Calendar'
import { Details } from '../shared/proprofile/Details'
import { Price } from '../shared/proprofile/Price'

export const Services: FC<{ pageContent?: any }> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, _] = useStore('Search')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localState, __] = useStore('Locale')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, ___] = useStore('User')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderState, orderActions] = useStore('Order')
  const [TimeSlot, setTimeSlot] = useState<any>(null)
  const [previousInfo, setpreviousInfo] = useState<string>('')
  const [ProceedToCheckout, setProceedToCheckout] = useState<boolean>(false)

  const addressId = userState.session?.decodedToken.billingAdress
  const history = useHistory()

  React.useEffect(() => {
    if (
      ProceedToCheckout &&
      searchState.currentPro &&
      searchState.currentLawId &&
      searchState.currentServId
    ) {
      history.push('/checkout')
    }
  }, [orderState.order_details])

  const setOrderDetails = (e, address) => {
    e.preventDefault()

    const date = TimeSlot.split('T')[0]
    const time = TimeSlot.split('T')[1]

    orderActions.getOrderDetails({
      langId: localState.language,
      profOrderInput: {
        proId: searchState.currentPro,
        addressId: address ? address : '',
        date,
        time,
        lawId: searchState.currentLawId,
        sectId: searchState.currentSectId,
        servId: searchState.currentServId,
      },
    })

    setProceedToCheckout(true)
  }

  if (TimeSlot && previousInfo !== searchState.currentPro) {
    setTimeSlot(null)
  }

  const handleTimeSelection = (value) => {
    setTimeSlot(value)
    setpreviousInfo(searchState.currentPro)
  }

  return (
    <div>
      <Calendar
        label={pageContent?.title_4}
        text={pageContent?.text}
        onClick={(e) => handleTimeSelection(e.currentTarget.value)}
      />
      <Details
        data={`- ${searchState?.professionalTile.selectedLaw}</br>- ${searchState?.professionalTile.selectedSector}</br>- ${searchState?.professionalTile.selectedService}`}
        label={pageContent?.title_5}
      />
      <Price data={searchState?.professionalTile.price} label={pageContent?.title_6} />

      <Button
        className="bg-primary-dark text-white mt-6"
        disabled={TimeSlot ? false : true}
        label={pageContent?.btn_text}
        onClick={(e) => setOrderDetails(e, addressId)}
      />
    </div>
  )
}
