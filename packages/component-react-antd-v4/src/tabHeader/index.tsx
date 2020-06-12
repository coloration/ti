import React, { FC, ReactNode } from 'react'
import { Tabs, Typography } from 'antd'

export type HeaderTab = {
  name: string,
  key: string,
  disabled?: boolean
}

export interface ITabHeaderProps {
  title?: ReactNode,
  tabs?: HeaderTab[],
  tabValue?: string,
  onTabChange?: (tabKey: string) => void
}

export const TabHeader: FC<ITabHeaderProps> = ({
  title,
  tabs,
  tabValue,
  onTabChange,
  children
}) => {

    return (
      <div className="pt-3 px-8 border-0 border-b border-gray-300 bg-white">
        <div className="flex mb-1">
          <div className="flex-1">
            <Typography.Title level={4}>{title}</Typography.Title>
          </div>
          <div>
            {children}
          </div>
        </div>
        <div>
          {tabs && (
            <Tabs
              tabBarStyle={{ border: 'none', marginBottom: 0 }}
              onChange={key => onTabChange && onTabChange(key)}
              activeKey={tabValue}
            >
              {tabs.map((tab) => (
                <Tabs.TabPane
                  tab={tab.name}
                  key={String(tab.key)}
                  disabled={tab.disabled}
                >
                </Tabs.TabPane>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    )
  }