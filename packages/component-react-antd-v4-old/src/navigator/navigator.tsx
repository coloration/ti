import React, { FC, ReactNode, useState, useCallback, useEffect } from 'react'
import { Menu, Dropdown } from 'antd'
import { PoweroffOutlined, UserOutlined, TranslationOutlined } from '@ant-design/icons'
import { PlainObject } from '@code/kit'
import { ClickParam } from 'antd/lib/menu'
import { useI18nLang, I18nLanguages, useI18nLocale } from '@code/use-react'

import { INavMenuItem } from './types'

function renderMenu(menu?: INavMenuItem[], locale?: PlainObject) {
  if (menu) {
    return menu.map((item) => {
          
      if (item.children) {
        return (
          <Menu.SubMenu key={item.value} title={locale ? locale[item.name] : item.name}>
            { renderMenu(item.children, locale) }
          </Menu.SubMenu>
        )
      }

      return (
        <Menu.Item key={item.value}>
          
            { item.icon && <item.icon /> }
            {locale ? locale[item.name] : item.name}
          
        </Menu.Item>
      )
    })
  }

  return null
}

export function menuFlat (menu: INavMenuItem[]): INavMenuItem[] {
  // return menu
  return menu.reduce<INavMenuItem[]>((acc, curr) => {
    acc.push(curr)
    if (Array.isArray(curr.children)) acc = acc.concat(menuFlat(curr.children))
    return acc
  }, [])
}

export const Navigator: FC<{
  head?: ReactNode,
  selectedKey?: string,
  menu: INavMenuItem[],
  accountMenu?: INavMenuItem[],
  onMenuClick?: (menuItem: INavMenuItem, params: ClickParam) => void,
  onAccountMenuClick?: (params: ClickParam) => void
  onLogout?: () => void,
  locale?: PlainObject
  [key: string]: any,
}> = ({
  head,
  menu,
  accountMenu,
  onMenuClick,
  onAccountMenuClick,
  selectedKey,
  className,
  onLogout,
  locale,
  ...otherProps
}) => {

    const [slt, setSlt] = useState([selectedKey])
    const [flatMenu, setFlatMenu] = useState(menuFlat(menu))
    const [lang, setLang] = useI18nLang()
    const [innerLocale] = useI18nLocale<PlainObject<string>>({
      [I18nLanguages.ZH_CN]: { logout: '退出' },
      [I18nLanguages.EN_US]: { logout: 'Logout' },
    })

    useEffect(() => {
      setFlatMenu(menuFlat(menu))
    }, [menu])

    useEffect(() => {
      setSlt([(selectedKey || '').split('-')[0]])
    }, [selectedKey])

    const handleLanguageChange = useCallback(() => {
      const language = lang === I18nLanguages.ZH_CN ? I18nLanguages.EN_US : I18nLanguages.ZH_CN
      setLang(language)
    }, [lang])

    const handleAccountMenuClick = useCallback((params: ClickParam) => {
      if (params.key === 'logout' && onLogout) {
        onLogout && onLogout()
      }
      else {
        onAccountMenuClick && onAccountMenuClick(params)
      }
    }, [])

    const handleMenuClick = useCallback((params: ClickParam) => {
      const menuData = flatMenu.find(item => item.value === params.key)
      onMenuClick && onMenuClick(menuData, params)
    }, [])

    return (
      <header
        className="_portal-nav flex justify-between items-stretch border-b border-gray-300"
        {...otherProps}>
        <div className="flex-1">{head}</div>
        <Menu
          selectedKeys={slt}
          mode="horizontal"
          style={{ borderBottom: 0, backgroundColor: 'transparent' }}
          onClick={handleMenuClick}
        >
          {renderMenu(menu, locale)}
        </Menu>

        <div 
          className="flex items-center px-2 pointer" 
          onClick={handleLanguageChange}>
          <TranslationOutlined />
        </div>
        <Dropdown placement="bottomRight" overlay={
          <Menu onClick={handleAccountMenuClick}>
            {renderMenu(accountMenu, locale)}
            { accountMenu && <Menu.Divider /> }
            <Menu.Item key="logout">
              <PoweroffOutlined className="mr-2" />
              { innerLocale.logout }
            </Menu.Item>
          </Menu>
        }>
          <div className="flex items-center px-2">
            <UserOutlined />
          </div>

        </Dropdown>
      </header>
    )
  }