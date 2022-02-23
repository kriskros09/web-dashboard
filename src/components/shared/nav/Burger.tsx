import React, { useEffect } from 'react'
import styled from 'styled-components'

export type Props = {
  open: boolean
  setOpen: (v: boolean) => void
}

export const Styledburger = styled.button<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;

  :focus {
    outline: none;
  }

  div {
    position: relative;
    width: 2rem;
    height: 3px;
    border-radius: 0;
    transition: all 0.3s linear;
    transform-origin: 1px;
    background-color: #999999;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

const Burger: React.FC<Props> = ({ open, setOpen }) => {
  useEffect(() => {
    open ? (document.body.className = 'overflow-hidden fixed') : (document.body.className = '')

    // Cleanup function
    return () => {
      document.body.className = ''
    }
  })

  return (
    <Styledburger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </Styledburger>
  )
}

export default Burger
