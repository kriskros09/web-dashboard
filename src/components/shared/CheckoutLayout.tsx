import React, { ReactNode, FC } from 'react';


type CheckoutLayoutType = {
    children: {
        
        content1: ReactNode
        content2: ReactNode
        content3?: ReactNode
    }

}

export const CheckoutLayout: FC<CheckoutLayoutType> = ({ children }) => {
    return (
    <div className="md:bg-gray-100 pt-16 pb-40">
    <div className="container">
      <div className="w-full xl:w-10/12 md:mx-auto">
        <div className="flex flex-col lg:flex-row justify-center -mx-4">
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white border-primary md:border-t-8 pt-8 md:p-10 md:shadow">
              {children.content1}
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-4 md:mt-10 lg:mt-0">
            <div className="bg-white border-primary md:border-t-8 pb-8 md:p-10 md:shadow">
                {children.content2}
            </div>
            {
            children.content3 ? 
              <div className="bg-white pb-8 md:p-10 md:shadow mt-9">
                  {children.content3}
              </div>
            : null
            }
        </div>
        </div>

      </div>
    </div>
  </div>

    )

};
