import React, { FC, ReactNode } from 'react'
import { Header, HeaderTab } from './Header'
import { Footer } from './Footer'
import { EmptyLayout } from './EmptyLayout'
import { LayoutContentContainer } from './LayoutContentContainer'

export interface INormalLayoutProps {
  title?: string,
  tabs?: HeaderTab[],
  activeTabKey?: string,
  onTabChange?: (tabKey: string) => void,
  headerContent?: ReactNode
  footerContent?: ReactNode
}
export const NormalLayout: FC<INormalLayoutProps> = ({
  title, tabs, activeTabKey, onTabChange, headerContent,
  footerContent,
  children,
  ...otherProps
}) => {

  return (
    <EmptyLayout {...otherProps}>
      <Header
        title={title}
        tabs={tabs}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}>
        {headerContent}
      </Header>
      <LayoutContentContainer>
        {children}
      </LayoutContentContainer>
      <Footer>{footerContent}</Footer>
    </EmptyLayout>
  )
}