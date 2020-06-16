import React, { FC, forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IColumnDirectionLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export const ColumnDirectionLayout: FC<IColumnDirectionLayoutProps> = forwardRef(({
  className,
  ...otherProps
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`cra-column-direction-layout ${className || ''}`} 
      {...otherProps}>
    </div>
  )
})