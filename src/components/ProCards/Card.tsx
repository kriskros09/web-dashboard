import React, { FC, useState } from 'react'
import styled from 'styled-components'

// Store
import { useStore } from '../../store/models'
//Components
import { Button } from '../shared/Button'
import { Bio } from '../ProProfile/Bio'
import { Name } from '../shared/proprofile/meta/Name'
import { AddIcon, RemoveIcon } from '../shared/Icons'
import { ProfilePicture } from '../shared/proprofile/meta/ProfilePicture'
import { Title } from '../shared/proprofile/meta/Title'
import { Rating } from '../shared/proprofile/meta/Rating'

type CardType = {
  rating?: number

  reviews?: number

  name?: string

  profession?: string
  id?: string

  pricing?: number

  buttonLabel?: string

  pageContent?: any

  image?: string

  handleNextComponent?: (e: React.MouseEvent<HTMLButtonElement>) => void

  modalOpen?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Card: FC<CardType> = ({
  name = '',
  profession = '',
  buttonLabel = 'Choisir',
  rating = 0,
  reviews = 0,
  pricing = 0,
  id = '',
  image,
  pageContent,
  modalOpen,
  handleNextComponent,
}) => {
  const [searchState, searchActions] = useStore('Search')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')

  // Open card details
  const [showDetails, setShowDetails] = useState<boolean>(false)
  // const [showTabs, setShowTabs] = useState<boolean>(false)
  //   const HandleNextComponent = () => {
  //     setShowTabs(true)

  // show or hide details
  const cardDetailsState = showDetails === true ? 'visible' : 'hidden'

  // const el = useRef<HTMLButtonElement>(null)

  // const handleClick = (e: MouseEvent) => {
  //   if ((el.current as any).contains(e.target)) {
  //     // inside click
  //     return
  //   }
  //   // outside click
  //   openCardDetails(false)
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClick)

  //   return () => {
  //     document.removeEventListener('mousedown', handleClick)
  //   }
  // }, [])

  const seeProProfile = (value) => {
    searchActions.currentPro({
      langId: localeState.language,
      profTileInput: {
        proId: value,
        country: searchState.currentCountry,
        region: searchState.currentRegion,
        lawId: searchState.currentLawId,
        sectId: searchState.currentSectId,
        servId: searchState.currentServId,
      },
    })
  }

  const handleModalOpen = (id, e) => {
    if (id !== searchState?.currentPro) {
      seeProProfile(id)
    }

    setTimeout(() => {
      if (modalOpen) {
        modalOpen(e)
      }
    }, 250)
  }

  const handleSetShowDetails = (id) => {
    if (id !== searchState?.currentPro) {
      seeProProfile(id)
    }

    setTimeout(() => {
      setShowDetails(!showDetails)
    }, 250)
  }

  return (
    <div className="w-full">
      <div className="flex flex-row items-center md:flex-col bg-white border-b md:border border-solid border-gray-200 md:border-gray-300">
        <div>
          <ProfilePicture className="rounded-lg md:rounded-none" photo={image} />
        </div>
        <div className="flex flex-row justify-between w-full md:flex-col p-4 pr-0 md:p-5">
          <div className="">
            <Name className="text-primary-dark font-bold md:text-lg md:mb-1" label={name} />
            <Title
              className="text-xs md:text-xxs capitalize font-medium text-gray-500 md:uppercase md:font-bold md:text-primary-dark md:mb-4"
              label={profession}
            />

            <StyledRatingContainer>
              <Rating
                className="flex flex-row items-center md:items-stretch md:flex-col md:mb-2"
                rating={rating}
                reviews={reviews}
                reviewsMeta
              />
            </StyledRatingContainer>
          </div>
          <div className="flex flex-row justify-between">
            <Button
              className="hover:bg-primary border-solid border border-gray-300 hover:border-primary text-gray-300 hover:text-white btn-xs hidden md:block"
              label={buttonLabel}
              onClick={(e) => handleModalOpen(id, e)}
            />
            <div className="flex flex-col">
              <p className="text-primary-dark font-bold text-md">${pricing}</p>
              <p className="distance text-xxs leading-none text-gray-300 font-semibold mt-1 md:hidden">
                1.2 km
              </p>
            </div>
            <StyledMoreButton onClick={() => handleSetShowDetails(id)}>
              {showDetails === false ? (
                <AddIcon fillColour="primary-dark" size={20} />
              ) : (
                <RemoveIcon fillColour="white" size={12} />
              )}
            </StyledMoreButton>
          </div>
        </div>
      </div>
      <div className={`bg-primary-middle -mx-8 px-8 py-6 md:hidden ${cardDetailsState}`}>
        <Bio pageContent={pageContent} />
        <Button
          className="bg-primary-dark text-white w-full mt-10"
          label={buttonLabel}
          onClick={handleNextComponent}
        />
      </div>
    </div>
  )
}

export default Card

const StyledRatingContainer = styled.div.attrs(() => ({
  className: 'flex',
}))`
  @media (max-width: 767px) {
    svg {
      width: 8px;
      height: 8px;
    }

    .reviews {
      font-size: 0.4375rem;
      line-height: 1rem;
      margin-left: 0.5rem;
      font-weight: 500;
    }
  }
`

const StyledMoreButton = styled.button.attrs(() => ({
  type: 'button',
  className: 'md:hidden',
}))`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: #dddddd;
  box-shadow: 0px 1px 2px #0000001a;
  cursor: pointer;
  transition: 0.2s background-color ease-in-out;
  margin-left: 8px;

  & svg {
    margin: 0 auto;
    transition: 0.2s color ease-in-out;
    &.text-white {
      display: none;
      margin-top: 7px;
    }
  }
  &:hover {
    // background-color: var(--color-primary-dark);
    & .text-primary-dark {
      color: white;
    }
  }
  &:focus {
    outline: none;
  }
`
