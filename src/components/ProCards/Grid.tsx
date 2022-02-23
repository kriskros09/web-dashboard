import React from 'react'
import styled from 'styled-components'

// import { Pagination } from '../../components/shared/pagination/Pagination'

import Card from './Card'

type GridType = {
  maptoggle?: boolean

  showNextComponent?: (e: React.MouseEvent<HTMLButtonElement>) => void

  handleModal?: (e: React.MouseEvent<HTMLButtonElement>) => void

  searchResults?: any

  pageContent?: any
}

export const Grid: React.FC<GridType> = ({
  maptoggle,
  handleModal,
  showNextComponent,
  searchResults,
  pageContent,
}) => {
  return (
    <div className="container">
      <StyledGridWrapper maptoggle={maptoggle}>
        <div className="text-lg text-primary-dark font-semibold mb-8">
          {searchResults?.search.length === 0 ? (
            <span>{pageContent?.results.no_results}</span>
          ) : (
            <span>
              {searchResults?.search.length} {pageContent?.results.results_found}{' '}
            </span>
          )}
        </div>
        <div className="flex flex-wrap md:-mx-4">
          {searchResults?.search.map((pro) => (
            <div
              key={pro.proId}
              className={`w-full md:w-6/12 ${maptoggle ? 'lg:w-1/3' : 'lg:w-1/4'} md:px-4 md:mb-8`}
            >
              <Card
                buttonLabel={pageContent?.results.tile_btn}
                handleNextComponent={showNextComponent}
                id={pro.proId}
                image={pro.photo}
                modalOpen={handleModal}
                name={pro.firstName}
                pageContent={pageContent?.professional}
                pricing={pro.price}
                profession={pro.professions}
                rating={pro.reviews}
                reviews={pro.reviewsNumber}
              />
            </div>
          ))}
        </div>
        {/* <Pagination /> */}
      </StyledGridWrapper>
    </div>
  )
}

const StyledGridWrapper = styled.div.attrs<GridType>((props) => ({
  className: props.maptoggle ? 'lg:w-9/12' : 'w-full',
}))<GridType>`
  & {
    background-color: white;
    padding-top: 2rem;
    padding-bottom: 5rem;
    @media (min-width: 1024px) {
      transition: width cubic-bezier(0.4, 0, 0.2, 1) 0.5s, padding cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
      transform-origin: left;
      padding-right: ${(props) => (props.maptoggle ? '100px' : '0')};
    }
  }
`

export default Grid
