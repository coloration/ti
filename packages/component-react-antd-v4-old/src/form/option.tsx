import React, { ReactNode } from 'react'
import { PlainObject, isPrimitive } from '@code/kit'
import { Select } from 'antd'

export interface IPlainOption<T = any> {
  name: string,
  value: T,
  disabled?: boolean
}

export interface IPlainRepeatFormComponentProps {
  options: any[]
  nameField?: string,
  valueField?: string,
  component?: ReactNode,
  locale?: PlainObject<string>
}

export function renderRepeatFormOptions (props: IPlainRepeatFormComponentProps) {
  const { 
    options, 
    nameField = 'name', 
    valueField = 'value', 
    locale
  } = props

  const OptElement: any = props.component || Select.Option

  return options.map((opt, i) => {
    const name = isPrimitive(opt) ? opt : opt[nameField]
      return (
        <OptElement key={String(i)} value={opt[valueField]} disabled={opt.disabled}>
          { locale ? locale[name] : name }
        </OptElement>
      )
    })
}

export function renderReportFormOptions (props: IPlainRepeatFormComponentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('renderReportFormOptions 这个方法即将废弃, 请使用 renderRepeatFormOptions 代替')
  }
  return renderRepeatFormOptions(props)
}

export function filterOptionWithNameAndValue(inputValue: string, option) {
  return `${option.props.children}${option.props.value}`.includes(inputValue)
}