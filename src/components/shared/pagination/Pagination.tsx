import React from 'react'

import { Button } from '../Button'

type PaginationParams = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  ShowPage: (e: number) => void
}

export const Pagination: React.FC<PaginationParams> = (props) => {
  const { totalItems, itemsPerPage, currentPage, ShowPage } = props

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  //if currentPage > totalPages
  if (currentPage > totalPages) {
    ShowPage(totalPages)
  }

  const pageButtons: React.ReactNode[] = []

  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <li
        key={`page-${i}`}
        className={`items-center mx-1 ${
          i <= currentPage + 1 && i >= currentPage - 2 ? 'flex' : 'hidden'
        }`}
      >
        <Button
          className={`btn-xs hover:border border-primary hover:text-white hover:bg-primary py-2 px-3 ${
            currentPage === i + 1 ? 'bg-primary text-white' : 'text-primary'
          }`}
          label={`${i + 1}`}
          onClick={() => ShowPage(i + 1)}
        />
      </li>,
    )
  }

  return (
    <div className="flex justify-center mt-12">
      {totalPages > 0 ? (
        <Button
          className="border border-primary text-primary hover:bg-primary hover:text-white btn-xs btn-icon mr-5"
          iconBefore="back"
          label="back"
          onClick={() => ShowPage(currentPage > 1 ? currentPage - 1 : currentPage)}
        />
      ) : null}
      <ul className="hidden md:flex">{pageButtons}</ul>
      {totalPages > 0 ? (
        <Button
          className="border border-primary text-primary hover:bg-primary hover:text-white btn-xs btn-icon ml-5"
          iconAfter="next"
          label="next"
          onClick={() => ShowPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
        />
      ) : null}
    </div>
  )
}
