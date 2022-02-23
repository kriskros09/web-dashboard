import React from 'react'

import { SectionIntroduction } from '../shared/SectionIntroduction'
import { Banner } from '../Banner'
import LawCards from '../LawCards'
import Background from '../../assets/img/concrete_wall_2.png'

type FindLawTypes = {
  pageContent?: any
}
export const FindLaw: React.FC<FindLawTypes> = ({ pageContent }) => {
  return (
    <section
      className="pt-12 pb-16 md:pt-24 md:pb-32 bg-repeat bg-auto"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <SectionIntroduction intro={pageContent?.laws?.intro} title={pageContent?.laws?.title} />
      <LawCards />
      <Banner
        bannerTitle={pageContent?.laws?.text}
        btnTitle={pageContent?.laws?.btn_text}
        link="/contact"
        light
      />
    </section>
  )
}
