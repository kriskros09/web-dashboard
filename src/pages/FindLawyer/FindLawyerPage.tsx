import React, { useState, useEffect, ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
import UseCheckScreen from '../../hooks/ResponsiveDetection'
// Store
import { useStore } from '../../store/models'
//Utils
import Utils from '../../utils'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { ProSearch } from '../../components/ProSearch'
import { Wrapper } from '../../components/core/Wrapper'
import { SearchFilter } from '../../components/SearchFilter'
import { MobileSearchFilter } from '../../components/MobileSearchFilter'
import { MobileFilterToggle } from '../../components/shared/filters/MobileFilterToggle'
import { ProProfileMobile } from '../../components/ProProfile/ProProfileMobile'
import { Grid } from '../../components/ProCards'
import { Modal } from '../../components/shared/Modal'
import { ProProfile } from '../../components/ProProfile'
import { Footer } from '../../components/shared/Footer'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'
import MapContainer from '../../components/Map/Map'

const GLOBAL = 'global'
const FIND_LAWYER = 'find_a_lawyer'
const PAGE_NAMES = [GLOBAL, FIND_LAWYER]

const FindLawyerPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const Screen = UseCheckScreen()

  const [localeState] = useStore('Locale')
  const [searchState, searchActions] = useStore('Search')

  const [MapToggle, setMapToggle] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [show, setModal] = useState<boolean>(false)
  const [SearchData, setSearchData] = useState([] as any)
  const [Coordinates, setCoordinates] = useState([] as any)

  const [filterData, setFilterData] = useState<{
    priceLow: number
    priceHigh: number
    priceOrder: string
    rating: number
    dateFrom: any
    dateTo: any
    expLow: number
    expHigh: number
    locPostalCode: string
    locKm: number
    languages: string
    Professionals: string
    licence: string
  }>({
    priceLow: 0,
    priceHigh: 0,
    priceOrder: '',
    rating: 0,
    dateFrom: '',
    dateTo: '',
    expLow: 0,
    expHigh: 0,
    locPostalCode: '',
    locKm: 0,
    languages: '',
    Professionals: '',
    licence: '',
  })

  //Search pro
  React.useEffect(() => {
    if (SearchData.length !== 0) {
      searchActions.searchPro({
        langId: localeState.language || Utils.Language.detectBrowserLanguage(),
        coordinates: Coordinates,
        searchListInput: {
          city: SearchData.city,
          country: SearchData.country,
          region: SearchData.region,
          lawId: SearchData.lawId,
          sectId: SearchData.sectId,
          servId: SearchData.servId,
          priceLow: filterData.priceLow,
          priceHigh: filterData.priceHigh,
          priceOrder: filterData.priceOrder,
          rating: filterData.rating,
          dateFrom: filterData.dateFrom,
          dateTo: filterData.dateTo,
          expLow: filterData.expLow,
          expHigh: filterData.expHigh,
          locKm: filterData.locKm,
          locPostalCode: filterData.locPostalCode,
          languages: filterData.languages,
          Professionals: filterData.Professionals,
          licence: filterData.licence,
        },
      })
    }
  }, [SearchData, filterData])

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

  const handleSetFilterData = (key1, val1, key2?, val2?, key3?, val3?) => {
    if (key3) {
      setFilterData({ ...filterData, [key1]: val1, [key2]: val2, [key3]: val3 })
    } else if (key2) {
      setFilterData({ ...filterData, [key1]: val1, [key2]: val2 })
    } else {
      setFilterData({ ...filterData, [key1]: val1 })
    }
  }

  console.log('FILTER ==========>', filterData)

  // show tabs component
  const [showTabs, setShowTabs] = useState<boolean>(false)
  const handleNextComponent = () => {
    setShowTabs(!showTabs)
  }

  const MapvisibilityClass = MapToggle ? 'h-1/4vh lg:translate-x-0' : 'h-0 lg:translate-x-full'

  useEffect(() => {
    open ? (document.body.className = 'fixed w-full') : (document.body.className = '')

    // Cleanup function
    return () => {
      document.body.className = ''
    }
  })

  //Reponsive display settings
  useEffect(() => {
    if (Screen !== 'tablet' && Screen !== 'desktop' && Screen !== 'desktop-xl') {
      setModal(false)
    } else if (Screen !== 'mobile') {
      setShowTabs(false)
    }
  }, [Screen])

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

        <SimpleHero className="lg:hidden" title="find a lawyer" />
        <ProSearch
          coordinates={(e) => setCoordinates(e)}
          pageContent={content.page[FIND_LAWYER]}
          inline
          onSubmit={(e) => handleSetSearchData(e)}
        />
        <Wrapper relative>
          {Screen !== 'tablet' || Screen !== 'mobile' ? (
            <SearchFilter
              DateFilter={(e) => handleSetFilterData('dateFrom', e['from'], 'dateTo', e['to'])}
              ExpFilter={(e) => handleSetFilterData('expLow', e[0], 'expHigh', e[1])}
              LocationFilter={(e) =>
                handleSetFilterData(
                  'locPostalCode',
                  e.currentTarget.zipCode.value,
                  'locKm',
                  parseInt(e.currentTarget.km.value),
                )
              }
              OtherFilter={(e) =>
                handleSetFilterData(
                  'languages',
                  e['lang'],
                  'Professionals',
                  e['profession'],
                  'licence',
                  e['licence'],
                )
              }
              PriceFilter={(e) =>
                handleSetFilterData(
                  'priceLow',
                  e['low'],
                  'priceHigh',
                  e['high'],
                  'priceOrder',
                  e['order'],
                )
              }
              RatingFilter={(e) => handleSetFilterData('rating', e)}
              handleToggleMap={() => setMapToggle(!MapToggle)}
              pageContent={content.page[FIND_LAWYER]}
            />
          ) : null}

          {Screen === 'tablet' || Screen === 'mobile' ? (
            <MobileFilterToggle
              className="lg:hidden"
              filterOpen={() => setOpen(!open)}
              toggleMap={() => setMapToggle(!MapToggle)}
            />
          ) : null}

          <div className="relative min-h-1/2vh">
            <div
              className={`lg:absolute top-0 right-0 lg:h-full w-full lg:w-3/12 transform transition-height lg:transition-translate ease-in-out duration-500 lg:origin-right overflow-hidden ${MapvisibilityClass}`}
              id="G-MAP"
            >
              <MapContainer modalOpen={() => setModal(!show)} />
            </div>

            {showTabs ? (
              <ProProfileMobile
                pageContent={content.page[FIND_LAWYER]?.professional}
                showPreviousComponent={() => setShowTabs(!showTabs)}
              />
            ) : (
              <Grid
                handleModal={() => setModal(!show)}
                maptoggle={MapToggle}
                pageContent={content.page[FIND_LAWYER]}
                searchResults={searchState}
                showNextComponent={() => handleNextComponent()}
              />
            )}
          </div>
        </Wrapper>

        <Modal modalClose={() => setModal(!show)} modalOpen={show}>
          <ProProfile pageContent={content.page[FIND_LAWYER]?.professional} />
        </Modal>

        {Screen === 'tablet' || Screen === 'mobile' ? (
          <MobileSearchFilter
            FilterData={(e) =>
              setFilterData({
                priceLow: e['priceLow'],
                priceHigh: e['priceHigh'],
                priceOrder: e['priceOrder'],
                expLow: e['expLow'],
                expHigh: e['expHigh'],
                rating: e['rating'],
                dateFrom: e['from'],
                dateTo: e['to'],
                locPostalCode: e['locationZip'],
                locKm: e['locationKm'],
                languages: e['lang'],
                Professionals: e['pro'],
                licence: e['licence'],
              })
            }
            closeFilter={() => setOpen(!open)}
            open={open}
            pageContent={content.page[FIND_LAWYER]}
          />
        ) : null}
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default FindLawyerPage
