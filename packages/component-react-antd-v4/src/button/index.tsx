import React, { SFC } from 'react'
import { Button as AButton } from 'antd'
import { ButtonProps } from 'antd/lib/button'

export const Button: SFC<ButtonProps> = (props) => {
  return <AButton {...props}></AButton>
}
