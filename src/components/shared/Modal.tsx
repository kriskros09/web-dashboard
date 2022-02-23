import React, { FC } from 'react'
import styled from 'styled-components'

import { ClearIcon } from '../shared/Icons'

type ModalType = {
  width?: string
  modalOpen?: boolean
  modalClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  light?: boolean
}
export const Modal: FC<ModalType> = (props) => {
  const width = props.width ? props.width : 'w-full lg:w-3/4'
  const modalVisibility = props.modalOpen ? 'block' : 'hidden'

  // useEffect(() => {
  //   props.modalOpen ? document.body.classList.add('fixed') : document.body.classList.remove('fixed')

  //   //Cleanup function
  //   return () => {
  //     document.body.className = ''
  //   }
  // })

  return (
    // <div className={`absolute w-full h-full top-0 left-0 ${modalVisibility}`}>
    <StyledOverlay className={`absolute w-full top-0 left-0 z-50 pb-24 h-full ${modalVisibility}`}>
      <div className="relative container h-full flex justify-center items-start mt-24 mb-24 z-50">
        <div className={`mx-auto relative ${width}`}>
          <button
            className="absolute top-0 right-0 focus:outline-none m-3 z-10"
            title="close"
            onClick={props.modalClose}
          >
            <ClearIcon fillColour={props.light ? 'primary-dark' : 'primary-light'} size={24} />
          </button>
          {props.children}
        </div>
      </div>
    </StyledOverlay>
    //</div>
  )
}

const StyledOverlay = styled.div`
  background-color: rgba(0, 34, 62, 0.85);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: red; /* Optional: just make scrollbar invisible */
    scrollbar-width: none;
    display: none;
  }
`
