import React, { ReactNode } from 'react'
import { PlainObject, isPrimitive, isDefind } from '@code/kit'
import { Select } from 'antd'
import { IPlainOption } from '../shared'


export type FormComponentRepeatOption = {
  pairs: PlainObject<string>
  locale: PlainObject<string>,
  component: ReactNode
}

export function componentRepeatRender<T = IPlainOption> (
  data: T[], 
  option?: Partial<FormComponentRepeatOption>) {
  
  option = option || {}

  const pairs: PlainObject<string> = Object.assign({
    'children': 'name',
    'value': 'value',
    'disabled': 'disabled'
  }, option.pairs)

  const ComponentElement: any = option.component || Select.Option

  return data.map((d: any, i: number) => {
    const props: any = {}

    if (isPrimitive(d)) {
      props.children = d
    }
    else {
      Object.keys(pairs).forEach(k => {
        props[k] = d[pairs[k]]
      })
    }

    // i18n
    if (isPrimitive(props.children) && isDefind(option.locale)) {
      props.children = option.locale[props.children]
    }

    return (
      <ComponentElement key={String(i)} {...props} />
    )
  })
}
