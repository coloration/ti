import React, { SFC } from 'react'
import { Row, Col } from 'antd'
import { RowProps } from 'antd/lib/row'
import { ColProps } from 'antd/lib/col'



export interface IFlexibleColLayoutProps extends ColProps {
  rowProps?: RowProps,
  asideContent?: any
}

export const FlexibleColLayout: SFC<IFlexibleColLayoutProps> = ({
  rowProps,
  children,
  asideContent,
  ...otherProps
}) => {
  return (
    <Row>
      <Col
          xs={24} sm={24} md={16} lg={14} xl={12} xxl={10}
          className={asideContent && 'mb-4'}
          {...otherProps}
        >
          {children}
      </Col>
      { asideContent && (
        <Col
          xs={24} 
          sm={24} 
          md={16} 
          lg={14} 
          xl={{ span: 11, offset: 1 }}
          xxl={{ span: 12, offset: 2 }}
          className="pb-4">
          {asideContent}
        </Col>
      )}
    </Row>
  )
}