import React, { ReactNode } from 'react'
import { PlainObject, isPrimitive } from '@code/kit'
import { Select } from 'antd'

export interface IPlainOption<T = any> {
  name: string,
  value: T,
  disabled?: boolean
}

export type FormComponentRepeatOption = {
  nameField: string,
  valueField: string,
  component: ReactNode,
  locale: PlainObject<string>
}

export function formComponentRepeatRender<T = IPlainOption> (data: T[], option?: Partial<FormComponentRepeatOption>) {

  const opt = Object.assign({
    nameField: 'name',
    valueField: 'value',
    component: Select.Option,
  }, option)

  const OptElement: any = opt.component

  return data.map((d: any, i: number) => {
    const name = isPrimitive(d) ? d : d[opt.nameField]
      return (
        <OptElement key={String(i)} value={d[opt.valueField]} disabled={d.disabled}>
          { opt.locale ? opt.locale[name] : name }
        </OptElement>
      )
    })
}
