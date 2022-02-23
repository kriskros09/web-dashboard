import React, { FC } from 'react'
import moment from 'moment'

import { ProfilePicture } from '../shared/proprofile/meta/ProfilePicture'
import { Name } from '../shared/proprofile/meta/Name'
import { Title } from '../shared/proprofile/meta/Title'

export const OrderSummary: FC<{ pageContent?: any; orderSummary: any }> = ({
  pageContent,
  orderSummary,
}) => {
  return (
    <div>
      <h4 className="text-primary uppercase mb-6">{pageContent?.title}</h4>
      <div className="orderSummary-profile md:mb-5 hidden lg:block">
        <ProfilePicture photo={orderSummary?.photo} />
      </div>

      <Name
        className="text-primary-dark font-bold text-sm md:text-xl md:leading-3 lg:mb-2"
        label={orderSummary?.firstName}
      />
      <Title className="text-sm lg:text-base text-primary-dark" label={orderSummary?.professions} />

      <div className="text-sm lg:text-base text-primary-dark font-medium border-t md:border-t-0 border-primary py-5 mt-5">
        <div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_1} :</span>
            <span className="w-6/12">
              {orderSummary?.selectedLaw} - {orderSummary?.selectedSector}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_2} :</span>
            <span className="w-6/12">{orderSummary?.selectedService}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_2} :</span>
            <span className="w-6/12">Phone Call(60 min)</span>
          </div> */}
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_3} :</span>
            <span className="w-6/12">{moment(orderSummary?.date).format('DD-MMM-YYYY')}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_4} :</span>
            <span className="w-6/12">{orderSummary?.time}</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="font-bold">
            <span className="w-6/12 md:text-right">{pageContent?.text_5}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_6} :</span>
            <span className="w-6/12 md:text-right">$ {orderSummary?.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_7} :</span>
            <span className="w-6/12 md:text-right">$ {orderSummary?.custFeePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_8} :</span>
            <span className="w-6/12 md:text-right">$ {orderSummary?.custSubTotal.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_9} :</span>
            <span className="w-6/12">{' '}</span>
          </div> */}
          {orderSummary?.taxes.map((taxe) => (
            <div key={taxe.name} className="flex justify-between">
              <span className="w-6/12">$ {taxe.name} :</span>
              <span className="w-6/12 md:text-right">$ {taxe.custAmount.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-b border-primary py-2 mt-4 font-bold">
          <div className="flex justify-between">
            <span className="w-6/12">{pageContent?.text_10} :</span>
            <span className="w-6/12 md:text-right">$ {orderSummary?.custTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
