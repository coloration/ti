import React, { useState, FC } from 'react'
import { Tooltip, Spin } from 'antd'
import { QuestionCircleOutlined, ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons'

export type PanelCardProps = {
  title: string,
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
      'cm-panel flex flex-col',
      expanding ? 'fullscreen' : '',
      className || ''
    ].join(' ')} {...otherProps}>
      <div className="cm-panel-header select-none">
        <div className="title">
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
        <div className="flex-1">
          { headerContent || '' }
        </div>
        
        { expand && <div className="ml-2 cursor-pointer" onClick={() => setExpanding(!expanding)}>
          { expanding ? <ShrinkOutlined /> : <ArrowsAltOutlined /> }
        </div>}
      </div>
      <Spin spinning={!!loading}>
        <div className={
          ['body flex-1', bodyCenter ? 'flex items-center justify-center' : undefined].join(' ')
        } style={bodyStyle}>
          { children }
        </div>
        <div className="footer">
          { footer }
        </div>
      </Spin>
    </div>
  )
}