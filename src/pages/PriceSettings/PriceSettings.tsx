import React, { FC, useState, useRef, ReactElement } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

//Hook
import UseCheckScreen from '../../hooks/ResponsiveDetection'
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Checkbox } from '../../components/shared/forms/FormElements/Checkbox'
import { AddIcon, ArrowRight, RemoveIcon } from '../../components/shared/Icons'
import { InputComponentPrice } from '../../components/shared/forms/FormElements/Input'
import { Button } from '../../components/shared/Button'
import { Tooltip } from '../../components/shared/Tooltip'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const PRICING = 'price_settings'
const PAGE_NAMES = [GLOBAL, PRICING]

const PriceSettingsPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const Screen = UseCheckScreen()

  const [globalState] = useStore('Global')
  const [proState, proActions] = useStore('Professionals')
  const { proId, firmId } = getState('User')
  const { permissions } = userSessionMapper(getState('User')?.session)
  const isPro = permissions.includes('profPriceSettings')
  const isFirm = permissions.includes('firmPriceSettings')

  const { laws } = globalState
  const { professionals } = proState

  const [PrincingVisibilityList, setPricingVisibilityList] = useState([] as any)
  const [AccordeonVisibility, setAccordeonVisibility] = useState([] as any)
  const [DefaultChecked, setDefaultChecked] = useState<boolean>(true)
  const filterDiv = useRef<HTMLDivElement>(null)

  const [PriceError, setPriceError] = useState([] as any)
  const [AllPriceError, setAllPriceError] = useState([] as any)
  const [PricesList, setPricesList] = useState([] as any)

  React.useEffect(() => {
    ;(async () => {
      if (firmId && isFirm) {
        await proActions.FirmEmployees({
          firmId,
          status: 1,
        })
      } else if (proId && isPro) {
        proActions.getProprices({
          proId,
        })
      }
    })()
  }, [firmId, proState.updatePrice, proState.deletePrice])

  React.useEffect(() => {
    if (proState.professionals.length !== 0 && globalState.laws.length !== 0) {
      setPricesList(
        proState.professionals?.map((pro) => ({
          proId: pro.proId,
          firstName: pro.profile.firstName,
          lastName: pro.profile.lastName,
          color: pro.color,
          laws: laws.map((law) => ({
            lawId: law.lawId,
            name: law.texts[0].name,
            status: false,
            sectors: law.sectors.map((sector) => ({
              sectId: sector.sectId,
              name: sector.texts[0].name,
              value: pro.prices
                .filter((price) => price.sectId === sector.sectId)
                .map((proPrice) => proPrice.price)[0],
              status:
                pro.prices
                  .filter((price) => price.sectId === sector.sectId)
                  .map((proPrice) => proPrice.price)[0] > 0
                  ? Boolean(true)
                  : Boolean(false),
            })),
          })),
        })),
      )

      if (PrincingVisibilityList.length <= 0) {
        setPricingVisibilityList(proState.professionals?.map((pro) => pro.proId))
      }
    }
  }, [proState.professionals, globalState.laws])

  console.log('MAP=========', PricesList)

  const UpdatePrice = (proId, lawId, sectId, price) => {
    proActions.UpdatePrice({
      proId,
      sectId,
      lawId,
      priceInput: {
        price,
        modBy: proId,
      },
    })
  }

  const DeletePrice = (proId, sectId) => {
    proActions.DeletePrice({
      proId,
      sectId,
    })
    toast.success('Price deleted')
  }

  // Pro accordion visibility
  const handleListVisibilityChange = (id) => {
    if (PrincingVisibilityList.includes(id)) {
      const currentPrincingVisibilityList = [...PrincingVisibilityList]
      const index = currentPrincingVisibilityList.indexOf(id)
      setPricingVisibilityList(
        currentPrincingVisibilityList
          .slice(0, index)
          .concat(
            currentPrincingVisibilityList.slice(index + 1, currentPrincingVisibilityList.length),
          ),
      )
    } else {
      setPricingVisibilityList(PrincingVisibilityList.concat(id))
    }
  }

  // Pro accordion visibility fro left sidebar
  const handleListVisibilityAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArray = filterDiv.current?.querySelectorAll('input[name="pro"]') as NodeListOf<
      HTMLInputElement
    >
    const idArray: string[] = []

    if (e.target.defaultChecked) {
      setDefaultChecked(false)

      for (const input of inputArray) {
        input.defaultChecked = false
        input.checked = false

        idArray.length = 0
        PrincingVisibilityList.length = 0
        handleListVisibilityChange(idArray)
      }
      handleListVisibilityChange(idArray)
    } else {
      for (const input of inputArray) {
        input.checked = true
        setDefaultChecked(true)

        const index = input.getAttribute('id')

        if (index) {
          if (!PrincingVisibilityList.includes(index)) {
            idArray.push(index)
          }
        }
      }
      handleListVisibilityChange(idArray)
    }
  }

  // Accordion content visibility
  const handleClickAccordeon = (id) => {
    if (AccordeonVisibility.includes(id)) {
      const currentAccordeonVisibility = [...AccordeonVisibility]
      const index = currentAccordeonVisibility.indexOf(id)
      setAccordeonVisibility(
        currentAccordeonVisibility
          .slice(0, index)
          .concat(currentAccordeonVisibility.slice(index + 1, currentAccordeonVisibility.length)),
      )
    } else {
      setAccordeonVisibility(AccordeonVisibility.concat(id))
    }
  }

  const checkAllCheckbox = (value, proIdx: string, lawIdx: string) => {
    const newArray = [...PricesList]

    if (value === true) {
      const sectors = PricesList[proIdx].laws[lawIdx].sectors.map((sector) => ({
        ...sector,
        status: value,
      }))
      newArray[proIdx].laws[lawIdx] = { ...newArray[proIdx].laws[lawIdx], status: value, sectors }
      setPricesList(newArray)
    } else {
      const selectedSectorsArray = PricesList[proIdx].laws[lawIdx].sectors.map(
        (sector) => sector.sectId,
      )

      const joinArray = selectedSectorsArray.join()
      DeletePrice(PricesList[proIdx].proId, joinArray)

      const sectors = PricesList[proIdx].laws[lawIdx].sectors.map((sector) => ({
        ...sector,
        status: value,
        value: '',
      }))
      newArray[proIdx].laws[lawIdx] = { ...newArray[proIdx].laws[lawIdx], status: value, sectors }
      setPricesList(newArray)

      for (const sectId of selectedSectorsArray) {
        const inputValue = document.getElementById(
          `${PricesList[proIdx].proId}-${PricesList[proIdx].laws[lawIdx].lawId}-${sectId}`,
        ) as HTMLInputElement
        inputValue.value = ''
      }
    }
  }

  const handleSingleCheck = (value, proIdx, lawIdx, sectIdx) => {
    const newArray = [...PricesList]

    if (value === true) {
      newArray[proIdx].laws[lawIdx].sectors[sectIdx] = {
        ...newArray[proIdx].laws[lawIdx].sectors[sectIdx],
        status: value,
      }
      setPricesList(newArray)
    } else {
      DeletePrice(PricesList[proIdx].proId, PricesList[proIdx].laws[lawIdx].sectors[sectIdx].sectId)

      const inputValue = document.getElementById(
        `${PricesList[proIdx].proId}-${PricesList[proIdx].laws[lawIdx].lawId}-${PricesList[proIdx].laws[lawIdx].sectors[sectIdx].sectId}`,
      ) as HTMLInputElement
      inputValue.value = ''

      newArray[proIdx].laws[lawIdx].sectors[sectIdx] = {
        ...newArray[proIdx].laws[lawIdx].sectors[sectIdx],
        status: value,
        value: '',
      }
      setPricesList(newArray)
    }
  }

  const applyToSelected = (e, proId, lawId) => {
    e.preventDefault()

    const inputValue = (document.getElementById(`${proId}-${lawId}`) as HTMLInputElement)?.value
    const valueAsNumber = parseInt(inputValue)

    if (valueAsNumber && valueAsNumber >= 50) {
      const lawsArray = PricesList.filter((pro) => pro.proId === proId).map((pro) => pro.laws)
      const sectorsArray = lawsArray[0]
        .filter((law) => law.lawId === lawId)
        .map((law) => law.sectors)
      const selectedSectorsArray = sectorsArray[0]
        .filter((sector) => sector.status === true)
        .map((sector) => sector.sectId)

      const joinArray = selectedSectorsArray.join()
      UpdatePrice(proId, lawId, joinArray, valueAsNumber)

      setAllPriceError({ display: false, pro: proId, law: lawId })

      const { errors } = getState('Professionals')

      if (errors.length > 0) {
        toast.error('Error, please retry')
      } else {
        for (const sectId of selectedSectorsArray) {
          const inputsSublaw = document.querySelector(`input[name="${sectId}"]`) as HTMLInputElement
          inputsSublaw.value = inputValue
        }
        toast.success('Prices updated')
      }
    } else {
      setAllPriceError({ display: true, pro: proId, law: lawId })
    }
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
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading title={content.page[PRICING].texts.main_title} />
          <div className="flex xl:-mx-8">
            <div ref={filterDiv} className="w-1/5 px-4 hidden xl:block">
              <div className="mb-5">
                <p className="text-primary">{content.page[PRICING].texts.text}</p>
              </div>
              {isFirm && Screen === 'desktop-xl' ? (
                <>
                  <StyledCheckAll>
                    <Checkbox
                      defaultChecked={DefaultChecked}
                      id="all"
                      label={content.page[PRICING].texts.all_text}
                      name="check_all"
                      solid
                      onChange={(e) => handleListVisibilityAll(e)}
                    />
                  </StyledCheckAll>
                  {professionals?.map((pro) => (
                    <StyledCheck key={pro.proId} color={pro.color}>
                      <Checkbox
                        id={pro.proId}
                        label={`${pro.profile.firstName} ${pro.profile.lastName}`}
                        name="pro"
                        defaultChecked
                        solid
                        onChange={() => handleListVisibilityChange(pro.proId)}
                      />
                    </StyledCheck>
                  ))}
                </>
              ) : null}
            </div>

            <div className="w-full xl:w-4/5 px-4">
              {PricesList?.map((pro, proIdx) => (
                <div
                  key={pro.proId}
                  className={`block  ${
                    PrincingVisibilityList.includes(pro.proId) ? 'xl:block' : 'xl:hidden'
                  }`}
                >
                  <AccordionEl color={pro.color} onClick={() => handleClickAccordeon(pro.proId)}>
                    <p className="text-white uppercase font-bold">
                      {pro.firstName} {pro.lastName}
                    </p>
                    <div className="icons">
                      {AccordeonVisibility.includes(pro.proId) ? (
                        <RemoveIcon fillColour="white" size={16} />
                      ) : (
                        <AddIcon fillColour="white" size={24} />
                      )}
                    </div>
                  </AccordionEl>
                  {pro.laws.map((law, lawIdx) => (
                    <div
                      key={law.lawId}
                      className={AccordeonVisibility.includes(pro.proId) ? 'block' : 'hidden'}
                    >
                      <AccordionLaw
                        className={`flex flex-row-reverse justify-end py-2 px-4 relative cursor-pointer ici ${
                          law.sectors.filter((sect) => sect.value).length > 0
                            ? 'bg-gray-300'
                            : 'bg-gray-600'
                        }`}
                        onClick={() => handleClickAccordeon(`${pro.proId}-${law.lawId}`)}
                      >
                        <p className="text-white uppercase font-bold">{law.name}</p>
                        <div className="icons">
                          <ArrowRight fillColour="white" size={24} />
                        </div>
                      </AccordionLaw>
                      <SubLaws
                        className={`w-full ${
                          AccordeonVisibility.includes(`${pro.proId}-${law.lawId}`)
                            ? 'block'
                            : 'hidden'
                        }`}
                      >
                        <div className="header bg-gray-150 flex flex-wrap md:flex-no-wrap items-center py-3 px-5 md:px-10 text-primary-dark uppercase font-bold">
                          <div className="w-3/6 order-1">
                            <StyledCheckAllSublaws>
                              <Checkbox
                                checked={law.status}
                                id={`checkbox-${pro.proId}-${law.lawId}`}
                                label={content.page[PRICING].table.col_1}
                                name={`checkAll_${law.lawId}`}
                                solid
                                onChange={() => checkAllCheckbox(!law.status, proIdx, lawIdx)}
                              />
                            </StyledCheckAllSublaws>
                          </div>
                          <div className="hidden xl:block xl:w-1/6 md:order-2">AVG. $/HR</div>
                          <div className="w-full xl:w-1/6 flex items-center md:justify-end order-3 md:order-3">
                            <span className="block mr-3 text-xs md:text-base">
                              {content.page[PRICING].table.col_2}
                            </span>
                            <InputComponentPrice
                              id={`${pro.proId}-${law.lawId}`}
                              label={content.page[PRICING].table.col_2}
                              placeholder={content.page[PRICING].table.col_2}
                              type="number"
                              light
                              solid
                            />
                          </div>
                          <div className="w-3/6 xl:w-1/6 text-right order-2 md:order-4">
                            <Button
                              className="bg-primary text-white btn-xs ml-4"
                              label={content.page[PRICING].table.btn_text}
                              onClick={(e) => applyToSelected(e, pro.proId, law.lawId)}
                            />
                            {AllPriceError.display === true &&
                            AllPriceError.law === law.lawId &&
                            AllPriceError.pro === pro.proId ? (
                              <>
                                <small className="error text-error ml-5 mr-3">prix invalide</small>
                                <Tooltip color="bg-error">
                                  {content.page[PRICING].messages?.error_2}
                                </Tooltip>
                              </>
                            ) : null}
                          </div>
                        </div>

                        {law.sectors.map((sector, sectIdx) => (
                          <div
                            key={sector.sectId}
                            className="details bg-white flex items-center py-3 px-5 md:px-10 flex-wrap"
                          >
                            <div className="w-full xl:w-3/6 text-xs md:text-base mb-4 md:mb-0">
                              <Checkbox
                                checked={sector.status}
                                id={`checkbox-${pro.proId}-${law.lawId}-${sector.sectId}`}
                                label={sector.name}
                                name={`${pro.proId}-${law.lawId}`}
                                solid
                                onChange={() =>
                                  handleSingleCheck(!sector.status, proIdx, lawIdx, sectIdx)
                                }
                              />
                            </div>
                            <div className="w-4/6 xl:w-1/6 flex text-primary-dark uppercase font-medium">
                              <span className="block font-bold mr-3 xl:hidden">
                                {content.page[PRICING].table.col_2} :
                              </span>
                            </div>
                            <div className="w-2/6 xl:w-1/6 flex items-center justify-end">
                              <InputComponentPrice
                                id={`${pro.proId}-${law.lawId}-${sector.sectId}`}
                                label={content.page[PRICING].table.col_2}
                                name={`${sector.sectId}`}
                                placeholder={content.page[PRICING].table.col_2}
                                type="number"
                                value={sector.value}
                                light
                                onBlur={(e) => {
                                  e.persist()
                                  setTimeout(function () {
                                    if (Number(e.target.value) >= 50) {
                                      UpdatePrice(
                                        pro.proId,
                                        law.lawId,
                                        sector.sectId,
                                        parseInt(e.target.value.fixed()),
                                      )
                                      setPriceError({
                                        display: false,
                                        pro: pro.proId,
                                        law: law.lawId,
                                        sector: sector.sectId,
                                      })

                                      const { errors } = getState('Professionals')

                                      if (errors.length > 0) {
                                        toast.error('Error, please retry')
                                      } else {
                                        toast.success('Single price updated')
                                      }
                                    } else {
                                      setPriceError({
                                        display: true,
                                        pro: pro.proId,
                                        law: law.lawId,
                                        sector: sector.sectId,
                                      })
                                    }
                                  }, 1000)
                                }}
                              />
                            </div>
                            {PriceError.display === true &&
                            PriceError.law === law.lawId &&
                            PriceError.sector === sector.sectId ? (
                              <>
                                <small className="error text-error ml-5 mr-3">prix invalide</small>
                                <Tooltip color="bg-error">
                                  {content.page[PRICING].messages?.error_2}
                                </Tooltip>
                              </>
                            ) : null}
                          </div>
                        ))}
                      </SubLaws>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </AccountLayout>
        <FullViewLoader showLoader={isLoading} />
      </Layout>
    </Container>
  )
}

export default PriceSettingsPage

const StyledCheckAll = styled.div.attrs(() => ({
  className: 'bg-gray-300 p-3 pl-4 mb-1',
}))`
  .input-group {
    margin-top: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    label {
      color: white;
      font-weight: 700;
    }
    input {
      margin-right: 0;
    }
  }
`

const StyledCheckAllSublaws = styled.div`
  .input-group {
    label {
      font-weight: 700;
      @media (max-width: 767px) {
        font-size: 0.625rem;
      }
    }
  }
`
const StyledCheck = styled.div.attrs(() => ({
  className: 'text-xs bg-white p-3 pl-4 mb-1',
}))<{ color?: string }>`
position: relative;
  .input-group {
    margin-top: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    &:before {
      content:"";
      width 8px;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background-color: ${(props) => props.color};
    }
    label {
      color: #888888;
      font-weight: 500;
    }
    input {
      margin-right: 0;
    }
  }
`

const AccordionEl = styled.div.attrs(() => ({
  className: 'flex justify-between bg-primary py-2 px-4 relative  cursor-pointer',
}))<{ proVisibility?: string }>`
margin-bottom: 2px;
&:before{
  content:"";
  width 8px;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  background-color: ${(props) => props.color};
  border-right: 1px white solid;
}

 .icons {
  position: relative;
  width: 24px;
  height: 24px;
  svg {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
}
`
const AccordionLaw = styled.div`
  margin-bottom: 2px;

  .icons {
    position: relative;
    width: 24px;
    height: 24px;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
const SubLaws = styled.div.attrs(() => ({}))`
  .input-wrapper {
    .input {
      padding: 0.5625rem 1rem;
      max-width: 105px;
      min-width: 105px;
    }
  }

  .input-group {
    margin-top: 0;
  }
`
