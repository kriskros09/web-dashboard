import React, { FC } from 'react'
import styled from 'styled-components'

const LayoutStyled = styled.div.attrs({
  className: 'react relative',
})``

const Layout: FC = (props) => <LayoutStyled>{props.children}</LayoutStyled>

export default Layout
