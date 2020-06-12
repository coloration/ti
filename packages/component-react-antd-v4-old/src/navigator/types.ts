import React from 'react'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

export interface INavMenuItem {
  value: string,
  name: string,
  link?: string,
  path?: string,
  icon?: React.ForwardRefExoticComponent<AntdIconProps & React.RefAttributes<HTMLSpanElement>>
  disabled?: boolean
  children?: INavMenuItem[]
}
