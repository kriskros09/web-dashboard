import React from 'react'

const UseCheckScreen: any = () => {
  const [width, setWidth] = React.useState(window.innerWidth)
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return width <= 768
    ? 'mobile'
    : width <= 1024
    ? 'tablet'
    : width <= 1280
    ? 'desktop'
    : 'desktop-xl'
}

export default UseCheckScreen
