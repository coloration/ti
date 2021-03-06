import React, { SFC, ReactNode } from 'react'
import { Row, Col } from 'antd'
import { RowProps } from 'antd/lib/row'
import { ColProps } from 'antd/lib/col'



export interface IResponsiveLayoutProps extends ColProps {
  rowProps?: RowProps,
  asideContent?: ReactNode
}

export const ResponsiveLayout: SFC<IResponsiveLayoutProps> = ({
  rowProps,
  children,
  asideContent,
  ...otherProps
}) => {
  return (
    <Row>
      <Col
          xs={24} sm={24} md={16} lg={14} xl={12} xxl={10}
          className={asideContent ? 'cra-responsive-layout__content' : ''}
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
          className="cra-responsive-layout__aside">
          {asideContent}
        </Col>
      )}
    </Row>
  )
}