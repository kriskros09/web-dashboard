import React from 'react'

import Background from '../../assets/img/bandeau_goodowl_find_law.jpg'


type HeroType = {
  title?: string
  className?: string
}
export const SimpleHero: React.FC<HeroType> = ({title = 'page title', className =''}) => {
  return (
    <section
      className={`w-full mx-auto flex py-8 md:py-20 md:items-center bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="container md:px-12">
    <h1 className="text-white text-4xl md:text-6xl text-center">{title}</h1>
      </div>
    </section>
  )
}
