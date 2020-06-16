import React, { SFC, ReactNode } from 'react'
import { Tooltip, Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { TooltipProps } from 'antd/lib/tooltip'


export interface IOperationButton extends ButtonProps {
  icon?: ReactNode,
  tooltipProps?: TooltipProps,
}

export const OperationButton: SFC<IOperationButton> = ({
  icon,
  children,
  tooltipProps,
  ...otherProps
}) => {

  tooltipProps = tooltipProps || {} as any

  return (
    <Tooltip title={children} placement="top" {...tooltipProps}>
      <Button 
        type="link" 
        style={{ padding: 0, fontSize: icon ? '1.2em' : '1em', lineHeight: 0 }} 
        {...otherProps}>
        { icon || children }
      </Button>
    </Tooltip>
  )
}
