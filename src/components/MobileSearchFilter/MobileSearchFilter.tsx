import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { ClearIcon } from '../shared/Icons'
import { Filter } from '../shared/filters/Filter'
// import { SelectComponent } from '../shared/forms/FormElements/Select'
// import { Button } from '../shared/Button'
// import { InputComponent } from '../shared/forms/FormElements/Input'
import { InputSubmit } from '../shared/forms/FormElements/Submit'

type MobileSearchType = {
  open: boolean

  closeFilter?: (e: React.MouseEvent<HTMLButtonElement>) => void

  pageContent?: any

  FilterData: (e: React.FormEvent<HTMLFormElement>) => void | any
}

//Keep it in case need prosearch to be also in the filter
// const StyledProSearch = styled.div`
//   & .input-wrapper,
//   .select-wrapper {
//     margin-bottom: 0.5rem;
//   }
// `
const StyledSearchContainer = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  width: 90vw;
`

export const MobileSearchFilter: FC<MobileSearchType> = ({
  open,
  closeFilter,
  pageContent,
  FilterData,
}) => {
  const [Data, setData] = useState<any>({
    rating: 0,
    from: undefined,
    to: undefined,
    locationKm: 0,
    locationZip: '',
    lang: '',
    pro: '',
    licence: '',
  })

  React.useEffect(() => {
    FilterData(Data)
  }, [Data])

  const onSubmit = (e) => {
    e.preventDefault()

    setData({
      rating: parseInt(e.currentTarget.elements.rating.value),
      priceLow: e.currentTarget.elements.priceLow.innerHTML,
      priceHigh: e.currentTarget.elements.priceHigh.innerHTML,
      priceOrder: e.currentTarget.elements.sort.value,
      expLow: parseInt(e.currentTarget.elements.expLow.innerHTML),
      expHigh: parseInt(e.currentTarget.elements.expHigh.innerHTML),
      from: e.currentTarget.elements.from.value,
      to: e.currentTarget.elements.to.value,
      locationKm: parseInt(e.currentTarget.elements.km.value),
      locationZip: e.currentTarget.elements.zipCode.value,
      lang: e.currentTarget.elements.lang.value,
      pro: e.currentTarget.elements.professions.value,
      licence: e.currentTarget.elements.licence.value,
    })
  }

  return (
    <StyledSearchContainer className="lg:hidden" open={open}>
      <button
        className="absolute top-0 right-0 focus:outline-none m-3"
        title="close"
        onClick={closeFilter}
      >
        <ClearIcon fillColour="primary-light" size={24} />
      </button>
      <div className="p-6 bg-primary-dark">
        <h2 className="text-primary capitalize mb-2">Filter</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mt-8">
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.price_title}
              type="price"
              light
            />
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.rating_title}
              type="rating"
              light
            />
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.appointment_title}
              type="date"
              light
            />
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.years_title}
              type="experience"
              light
            />
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.location_title}
              type="location"
              light
            />
            <Filter
              content={pageContent?.filters}
              label={pageContent?.filters.other_title}
              type="other"
              light
            />
          </div>
          <div className="mt-12 flex flex-col">
            <InputSubmit className="text-white bg-primary" value="search" />
          </div>
        </form>
      </div>
    </StyledSearchContainer>
  )
}

export default MobileSearchFilter
