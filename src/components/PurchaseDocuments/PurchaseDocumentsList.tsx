// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Store
import { getState } from '../../store/models'
import { Download } from '../../components/shared/Icons'

type DocumentsList = {
  purchase: any
  pageContent?: any
  index: number
}

export const PurchaseDocumentsList: React.FC<DocumentsList> = ({
  purchase,
  index = undefined,
  pageContent,
}) => {
  const [documentListVisibility, setDocumentListVibility] = useState<number>()
  const userId = getState('User').userId
  const el = useRef<HTMLDivElement>(null)
  // const btnElHandleClick = (e: MouseEvent) => {
  //   // if ((el.current as any).contains(e.target)) {
  //   //   return
  //   // }
  //   // outside click

  //   setDocumentListVibility(undefined)
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', btnElHandleClick)

  //   return () => {
  //     document.removeEventListener('mousedown', btnElHandleClick)
  //   }
  // }, [])

  return (
    <div className="absolute right-0 bottom-0 m-4 md:relative md:m-0">
      <div
        ref={el}
        className="btn p-1 inline-block bg-gray-300 relative z-0 cursor-pointer"
        onClick={() =>
          setDocumentListVibility(documentListVisibility === index ? undefined : index)
        }
      >
        <Download fillColour="white" size={24} />
      </div>
      <div
        className={`absolute right-0 mt-6 z-10 ${
          documentListVisibility === index ? 'block' : 'hidden'
        }`}
      >
        <StyledDropdown>
          <p className="font-bold mb-4">
            {pageContent?.table?.doc_text} {purchase.mandId}
          </p>
          <ul className="font-light text-sm italic underline">
            {purchase.purchaseOrders
              ? purchase.purchaseOrders.map((order) => (
                  <li key={order.poId}>
                    <Link
                      rel="noopener"
                      target="_blank"
                      to={`/generate-pdf?pdfType=purchase-order&docId=${order.poId}&userId=${userId}`}
                    >
                      - {pageContent?.table?.doc_text_po} {order.poId}
                    </Link>
                  </li>
                ))
              : null}
            {purchase.receipts
              ? purchase.receipts.map((receipt) => (
                  <li key={receipt.depId}>
                    <Link
                      rel="noopener"
                      target="_blank"
                      to={`/generate-pdf?pdfType=receipt&docId=${receipt.depId}&userId=${userId}`}
                    >
                      - {pageContent?.table?.doc_text_receipt} {receipt.depId}
                    </Link>
                  </li>
                ))
              : null}
            {purchase.invoice
              ? purchase.invoice.map((inv) => (
                  <li key={inv.invId}>
                    <Link
                      rel="noopener"
                      target="_blank"
                      to={`/generate-pdf?pdfType=invoice&docId=${inv.invId}&userId=${userId}`}
                    >
                      - {pageContent?.table?.doc_text_invoice} {inv.invId}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </StyledDropdown>
      </div>
    </div>
  )
}

const StyledDropdown = styled.div.attrs(() => ({
  className: 'bg-white shadow-sm p-8 text-left border border-gray-100 relative z-10',
}))`
  min-width: 275px;

  &:before {
    content: '';
    width: 23px;
    height: 23px;
    background-color: white;
    border-top: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    transform: rotate(45deg);
    position: absolute;
    top: -11px;
    right: 60px;
  }
`
