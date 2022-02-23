import React, { FC } from 'react'

import { Checkbox } from './FormElements/Checkbox'
import { Textarea } from './FormElements/Textarea'

export const RequestDescription: FC<any> = (props) => {
  const { onChange, onBlur, errors, pageContent } = props

  return (
    <div>
      <Textarea
        error={errors['description'] as string}
        id="description"
        label={pageContent?.input_1}
        name="description"
        placeholder="Write here"
        onBlur={onBlur}
        onChange={onChange}
      />
      <Checkbox
        error={errors['userAgreement'] as string}
        id="user-agreement"
        label={pageContent?.check_text}
        name="userAgreement"
        onChange={onChange}
      />
    </div>
  )
}
