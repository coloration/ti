import React, { SFC, ReactNode } from 'react'
import { Tooltip, Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'


export interface ITableOptButton extends ButtonProps {
  icon?: ReactNode,
  disabled?: boolean
}

export const TableOptButton: SFC<ITableOptButton> = ({
  icon,
  children,
  ...otherProps
}) => {
  return (
    <Tooltip title={children} placement="top">
      <Button 
        type="link" 
        style={{ padding: 0, fontSize: icon ? '1.2em' : '1em', lineHeight: 0 }} 
        {...otherProps}>
        { icon || children }
      </Button>
    </Tooltip>
  )
}
