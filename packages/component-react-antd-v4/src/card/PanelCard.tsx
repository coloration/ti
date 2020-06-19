import React, { useState, FC, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { Tooltip, Spin } from 'antd'
import { QuestionCircleOutlined, ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons'

export interface PanelCardProps {
  title: ReactNode,
  intro: string,
  headerContent: any,
  footer: any,
  expand: boolean,
  bodyStyle: any,
  loading: boolean,
  bodyCenter: boolean,
  [key: string]: any
}

export const PanelCard: FC<Partial<PanelCardProps>> = ({
  title, 
  intro, 
  headerContent, 
  footer,
  expand, 
  loading,
  bodyStyle, 
  children, 
  bodyCenter,
  className, 
  ...otherProps
}) => {
  const [expanding, setExpanding] = useState(false)
  const defaultTitle = title || ''

  return (
    <div className={[
      'cra-panel-card',
      expanding ? 'cra-panel-card__fullscreen' : '',
      className || ''
    ].join(' ')} {...otherProps}>
      <div className="cra-panel-card_header">
        <div className="cra-panel-card_title">
          {
            intro ? (
              <Tooltip title={intro} className="flex items-center" placement="right">
                <span>
                  { defaultTitle }
                  <QuestionCircleOutlined />
                </span>
              </Tooltip>
            ) : defaultTitle
          }
        </div>
        <div className="cra-panel-card_header-content">
          { headerContent || '' }
        </div>
        
        { expand && <div className="cra-panel-card_expand" onClick={() => setExpanding(!expanding)}>
          { expanding ? <ShrinkOutlined /> : <ArrowsAltOutlined /> }
        </div>}
      </div>
      <Spin spinning={!!loading}>
        <div className={
          ['cra-panel-card_body', bodyCenter ? 'cra-panel-card_body__center' : ''].join(' ')
        } style={bodyStyle}>
          { children }
        </div>
        <div className="cra-panel-card_footer">
          { footer }
        </div>
      </Spin>
    </div>
  )
}