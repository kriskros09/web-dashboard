import React, { FC, useState } from 'react'

// Store
import { useStore } from '../../../../store/models'
// Utils
import Utils from '../../../../utils'
//Components
import { SelectComponent } from '../../forms/FormElements/Select'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

export const Other: FC<FilterType> = ({ light, content, getFilterData, resetFilter }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')

  const [OtherFilter, setOtherFilter] = useState([] as any)

  return (
    <div>
      <div className="mb-8">
        <FilterLabel label={content?.language_title} light={light} />
        <SelectComponent
          name="lang"
          options={Utils.Form.dropdownMapper(
            { value: 'languageId', label: 'texts.name' },
            globalState.languages,
          )}
          placeholder={content?.language_input}
          dropdown
          outline
          onChange={(e) => setOtherFilter({ ...OtherFilter, lang: e.value })}
        />
      </div>
      <div className="mb-8">
        <FilterLabel label={content?.profession_title} light={light} />
        <SelectComponent
          name="professions"
          options={Utils.Form.dropdownMapper(
            { value: 'profId', label: 'texts.name' },
            globalState.professions,
          )}
          placeholder={content?.profession_input}
          dropdown
          outline
          onChange={(e) => setOtherFilter({ ...OtherFilter, profession: e.value })}
        />
      </div>
      <div className="mb-8">
        <FilterLabel label={content?.licence_title} light={light} />
        <SelectComponent
          name="licence"
          options={Utils.Form.dropdownMapper(
            { value: 'regIso', label: 'texts.name' },
            globalState.regions,
          )}
          placeholder={content?.licence_input}
          dropdown
          outline
          onChange={(e) => setOtherFilter({ ...OtherFilter, licence: e.value })}
        />
      </div>
      <FilterButtons
        label={content}
        onCancel={(e) => resetFilter(e)}
        onSubmit={() => getFilterData(OtherFilter)}
      />
    </div>
  )
}
