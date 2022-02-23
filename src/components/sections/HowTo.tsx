import React, { FC } from 'react'

import { SectionIntroduction } from '../shared/SectionIntroduction'
import { ProcessSteps } from '../ProcessSteps/ProcessSteps'

type howToTypes = {
  pageContent?: any
}

export const HowTo: FC<howToTypes> = ({ pageContent }) => {
  return (
    <section className="pt-12 pb-16 md:pt-24 md:pb-32">
      <SectionIntroduction
        intro={pageContent?.how_it_works?.intro}
        title={pageContent?.how_it_works?.title}
      />
      <ProcessSteps steps={pageContent?.how_it_works} />
    </section>
  )
}
