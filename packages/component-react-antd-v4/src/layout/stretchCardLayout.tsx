import React, { FC } from 'react'
import { IColumnDirectionLayoutProps, ColumnDirectionLayout } from './columnDirectionLayout'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { useRemainWindowMinHeightRef } from '../shared'


interface IStretchCardLayoutProps extends IColumnDirectionLayoutProps {
  bottom?: number,
  cardProps?: CardProps,
  contentProps?: IColumnDirectionLayoutProps
}

export const StretchCardLayout: FC<IStretchCardLayoutProps> = ({
  bottom,
  cardProps,
  contentProps,
  children,
  ...otherProps
}) => {

  cardProps = cardProps || {}
  contentProps = contentProps || {}

  const ref = useRemainWindowMinHeightRef<HTMLDivElement>(null)

  return (
    <ColumnDirectionLayout {...otherProps}>
      <Card bodyStyle={{ padding: 0 }} {...cardProps}>
        <div style={{ padding: 24, boxSizing: 'border-box' }} ref={ref} {...contentProps}>
          { children }
        </div>
      </Card>
    </ColumnDirectionLayout>    
  )
}