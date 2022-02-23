import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

// Store
import { useStore } from '../../store/models'
import { ProSearch } from '../ProSearch'
import Background from '../../assets/img/goodowl_header.png'

type heroType = {
  pageContent?: any
}

const HeroStyled = styled.div.attrs({
  className: 'w-full mx-auto flex py-8 md:py-12 md:items-center bg-cover',
})`
  background-image: url(${Background});
  background-position: -315px center;

  @media (min-width: 1024px) {
    background-position: center center;
  }
`

const Hero: FC<heroType> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  const [searchState, searchActions] = useStore('Search')
  const [SearchData, setSearchData] = useState([] as any)
  const [Coordinates, setCoordinates] = useState([] as any)

  const history = useHistory()

  //Search pro
  React.useEffect(() => {
    if (SearchData.length !== 0) {
      searchActions.searchPro({
        langId: localeState.language,
        coordinates: Coordinates,
        searchListInput: {
          city: SearchData.city,
          country: SearchData.country,
          region: SearchData.region,
          lawId: SearchData.lawId,
          sectId: SearchData.sectId,
          servId: SearchData.servId,
          priceLow: 0,
          priceHigh: 0,
          priceOrder: 'asc',
          rating: 0,
          dateFrom: '',
          dateTo: '',
          expLow: 0,
          expHigh: 0,
          locKm: 0,
          locPostalCode: '',
          languages: '',
          Professionals: '',
          licence: '',
        },
      })
    }
  }, [SearchData])

  React.useEffect(() => {
    if (SearchData.length !== 0) {
      history.push('/find-lawyer')
    }
  }, [searchState])

  const handleSetSearchData = (e) => {
    e.preventDefault()

    setSearchData({
      city: e.target.elements.location.value.split(',')[0],
      country: e.target.elements.location.value.split(', ')[2],
      region: e.target.elements.location.value.split(', ')[1],
      lawId: e.target.elements.law.value,
      sectId: e.target.elements.sector.value,
      servId: e.target.elements.service.value,
    })
  }

  return (
    <HeroStyled>
      <div className="container">
        <div className="flex flex-wrap justify-between md:py-12 md:-mx-12">
          <div className="w-full lg:w-1/2 xxl:w-2/5 md:px-12 pb-9 lg:pb-0">
            <h1 className="mb-4 text-primary-dark text-4xl md:text-7xl leading-4">
              {pageContent?.hero?.title}
            </h1>
            <p className="text-primary-dark text-xl md:text-5xl leading-3">
              {pageContent?.hero?.subtitle}
            </p>
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/3 md:px-12">
            <SearchWrapper>
              <ProSearch
                coordinates={(e) => setCoordinates(e)}
                pageContent={pageContent}
                dark
                onSubmit={(e) => handleSetSearchData(e)}
              />
            </SearchWrapper>
          </div>
        </div>
      </div>
    </HeroStyled>
  )
}

const SearchWrapper = styled.div`
  @media (min-width: 1660px) {
    max-width: 360px;
    margin-left: auto;
  }
`
export default Hero
