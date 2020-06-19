import React, { SFC, ReactNode, useState, useRef, useLayoutEffect, useMemo, Props, DetailedHTMLProps, HTMLAttributes } from 'react'
import { Tag, Button, Dropdown, Menu } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { TooltipProps } from 'antd/lib/tooltip'
import { IPlainOption } from '../shared'
import { SelectProps } from 'antd/lib/select'
import { componentRepeatRender } from '../form'


export interface IDraggableSelect<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  options: IPlainOption<T>[],
  bordered?: boolean
}

export function DraggableSelect <T> ({
  children,
  bordered,
  options,
  ...otherProps
}: IDraggableSelect<T>) {
  
  const [inValue, setInValue] = useState<T[]>([400000] as any)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  bordered = bordered === undefined || !!bordered

  useLayoutEffect(() => {
    if (!inputRef.current) return 
    const fName = focused ? 'focus' : 'blur'
    inputRef.current[fName]()
  }, [focused])

  useLayoutEffect(() => {

    function focus (e: MouseEvent) {
      e.stopPropagation()
      setFocused(true)
    }

    function blur () {
      console.log('ffffff')
      setFocused(false)
    }

    ref.current && ref.current.addEventListener('click', focus)
    document.addEventListener('click', blur)

    return () => {
      ref.current && ref.current.removeEventListener('click', focus)
      document.removeEventListener('click', blur)
    }
  }, [ref.current])


  const tagList = useMemo(() => {
    const opts = options.filter(opt => inValue.includes(opt.value))

    return componentRepeatRender(opts, {
      specNameField: 'children',
      component: Tag
    })

  }, [inValue, options])

  const dropList = useMemo(() => {
    let opts = options.filter(opt => `${opt.name}${opt.value}`.indexOf(search) >= 0)
    const keys = inValue.map(String)
    return <Menu 
      multiple 
      selectedKeys={keys}
      onSelect={(e) => { console.log(e) }}  
    >
      { opts.map(opt => {
        return <Menu.Item 
          
          key={String(opt.value)}>{opt.name}</Menu.Item>
      })}
      {/* { componentRepeatRender(opts, {
        specNameField: 'children',
        specValueField: 'key',
        component: Menu.Item
      }) } */}
    </Menu>
  }, [options, search, inValue])

  return (
    <div   onClick={(e) => {
      e.nativeEvent.stopImmediatePropagation()
      console.log('sssss')
    }}>
    
    <Dropdown overlay={dropList} visible={focused}>
      <div ref={ref} className={[
        'cra-drg-slt', 
        bordered ? 'cra-drg-slt__bordered' : '',
        focused ? 'cra-drg-slt__focused' : '',
      ].join(' ')}>
        <div className="cra-drg-slt_content">
          { tagList }
          <div>
            <input
              onChange={e => setSearch(e.target.value)} 
              ref={inputRef} 
              className="cra-drg-slt_search" 
              type="text" />
          </div>
        </div>
      </div>
    </Dropdown>
    </div>
  )
}
