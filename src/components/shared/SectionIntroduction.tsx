import React from 'react'

type sectionIntroduction = {
  title?: string
  intro?: string
}

export const SectionIntroduction: React.FC<sectionIntroduction> = ({
  title = 'title',
  intro = 'intro',
}) => {
  return (
    <div className="container w-full md:w-7/12 text-center mb-6 md:mb-16">
      <h2 className="text-primary mb-6">{title}</h2>
      <p className="text-primary-dark text-sm md:text-lg">{intro}</p>
    </div>
  )
}
