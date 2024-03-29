import React from 'react'

const useDeviceDetect: any = () => {
  const [isMobile, setMobile] = React.useState(false)

  React.useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
    )
    setMobile(mobile)
  }, [])

  return { isMobile }
}

export default useDeviceDetect
