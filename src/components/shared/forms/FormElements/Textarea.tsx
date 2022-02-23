import React from 'react'
import styled from 'styled-components'

type TexteareaType = {
  // string for placeholder
  placeholder: string
  value?: string
  //string for label
  label?: string
  name?: string
  //string for id
  id: string

  // style
  solid?: boolean
  light?: boolean
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  error?: string | undefined
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const Textarea: React.FC<TexteareaType> = ({
  placeholder = 'write here',
  value = '',
  solid,
  light,
  id = '',
  label = '',
  name = '',
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="input-wrapper">
      <label className="text-primary-dark mb-2 block" htmlFor={id}>
        {label}
      </label>
      <TextareaStyled
        defaultValue={value}
        id={id}
        light={light}
        name={name}
        placeholder={placeholder}
        solid={solid}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <small className="text-error">{error}</small>}
    </div>
  )
}

const TextareaStyled = styled.textarea.attrs((props) => ({
  className: 'input placeholder-gray-300 text-sm leading-2 font-medium w-full h-80',
  maxLength: props.maxLength,
}))<TexteareaType>`
  color: ${(props) => (props.solid ? 'var(--color-primary-dark)' : 'var(--color-primary)')};
  background-color: ${(props) => (props.solid ? 'white' : 'transparent')};
  border: ${(props) =>
    props.solid ? 'none' : props.light ? 'solid 1px #BBBBBB' : 'solid 1px var(--color-primary)'};
  padding: 0.875rem 1.1875rem;
  border-radius: 0.25rem;
  &:focus {
    outline-color: var(--color-primary-light);
  }
`
