import React, { FC } from 'react'
import cx from 'classnames'

type FilterLabelType = {
    label: string
    light?: boolean
}
export const FilterLabel: FC<FilterLabelType> = ({label = 'filter name', light}) => {

    const labelClass = cx('text-sm leading-2 lg:text-md font-bold mb-2', {
        'text-primary': light,
        'text-gray-500 ': !light,
    })

    return (
            <p className={labelClass}>{label}</p>
          
    )
}