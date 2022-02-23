import React, { ReactElement } from 'react'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'

import { useStore } from '../../../store/models'
import { Radio } from '../../../components/shared/forms/FormElements/Radio'
import { formatAddress } from '../../../utils/forms'

const SelectFirm: React.FC<any> = (props): ReactElement => {
  const { onChange, errors, setShouldSearchFirms, values, pageContent } = props
  const [globalState] = useStore('Global')
  console.log(setShouldSearchFirms)

  return (
    <div className="block">
      <p className="text-md mb-4">{ReactHtmlParser(pageContent?.step_3_pro?.title_1)}</p>
      <RadioFormRow>
        {globalState.firmsByEmail.map((firm) => (
          <Radio
            key={firm.firmId}
            checked={values['firm-id'] === firm.firmId}
            label={`${firm.name} - ${formatAddress(firm.addresses)}`}
            name="firm-id"
            value={firm.firmId}
            light
            onChange={(e) => {
              onChange(e)
              setShouldSearchFirms(false)
            }}
          />
        ))}
        <Radio
          checked={values['firm-id'] === 'other'}
          label={pageContent?.step_3_pro?.input_1}
          name="firm-id"
          value="other"
          light
          onChange={(e) => {
            onChange(e)
            setShouldSearchFirms(true)
          }}
        />
      </RadioFormRow>
      {errors['firm-id'] && <small>{errors['firm-id']}</small>}
    </div>
  )
}

export default SelectFirm

const RadioFormRow = styled.div.attrs({
  className: '',
})`
  margin-top: 1.5rem;
  & .input-group {
    margin-top: 0.75rem;
  }
`
