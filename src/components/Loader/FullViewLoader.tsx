import React, { ReactElement } from 'react'
import styled from 'styled-components'

export type FullViewLoaderParamsType = {
  showLoader: boolean
}

export const FullViewLoader: React.FC<FullViewLoaderParamsType> = (
  props: FullViewLoaderParamsType,
): ReactElement<'div'> => <StyledFullViewLoader className="LOADER" showLoader={props.showLoader} />

const StyledFullViewLoader = styled.div<{ showLoader: boolean }>`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  display: ${({ showLoader }) => (showLoader ? 'block' : 'none')};

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 48%;
    top: 40%;
    width: 40px;
    height: 40px;
    border-style: solid;
    border-color: #4298b5;
    border-top-color: transparent;
    border-width: 4px;
    border-radius: 50%;
    -webkit-animation: spin 0.8s linear infinite;
    animation: spin 0.8s linear infinite;
  }
`
