import React, { FC } from 'react'
import { IColumnDirectionLayoutProps, ColumnDirectionLayout } from './columnDirectionLayout'
import { useRemainWindowMinHeightRef } from '../shared'


interface IStretchLayoutProps extends IColumnDirectionLayoutProps {
  bottom?: number
}

export const StretchLayout: FC<IStretchLayoutProps> = ({
  bottom,
  ...otherProps
}) => {
  const ref = useRemainWindowMinHeightRef<HTMLDivElement>(null)

  return (
    <ColumnDirectionLayout ref={ref} {...otherProps} />
  )
}