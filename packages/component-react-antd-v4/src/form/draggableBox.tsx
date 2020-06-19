import React, { SFC, useState, useMemo, useRef, useLayoutEffect, useCallback, MouseEvent, useEffect, ReactNode } from 'react'
import { Tag } from 'antd' 
import { getOffset, HTMLElementPosition, PlainObject, isPrimitive } from '@code/kit'
import { componentRepeatRender } from './formRender'
import { throttle } from 'lodash'

const Span = (props) => <span {...props}></span>

export interface IDraggableBoxProps<T, K> {
  data: T[]
  pairs?: PlainObject<string>
  value?: K[]
  onChange?: (value: K[]) => void,
  component?: ReactNode
}
export function DraggableBox<T = any, K = any> ({
  data,
  pairs,
  value,
  onChange,
  component

}: IDraggableBoxProps<T, K>) {

  const [ inValue, setInValue ] = useState<K[]>([])
  const [ inPairs, setInPairs ] = useState<PlainObject<string>>({
    children: 'name',
    value: 'value'
  })
  

  const root = useRef<HTMLDivElement>(null)
  
  

  const contnet = useMemo(() => {
    

  }, [inValue, inPairs, data, component])

  /* 处理拖拽 */
  useLayoutEffect(() => {
    if (root.current === null) return
    console.log(2, inValue)

    const children: Element[] = Array.from(root.current.children)
    const positions = children.map((node: HTMLElement) => getOffset(document.documentElement, node))
    const start = { x: 0, y: 0 }
    const animateSpace = 50
    let index = -1, originIndex = -1
    let moveStart = false

    
    function mousedown (e: MouseEvent) {
      originIndex = index = children.indexOf(e.target as any)
      start.x = e.pageX
      start.y = e.pageY

    }

    const mousemove = throttle((e: MouseEvent) => {
      if (index < 0) return
      const x = e.pageX
      const y = e.pageY

      // dragStart
      if (!moveStart && (Math.abs(x - start.x) > 20 || Math.abs(y - start.y) > 20)) {
        moveStart = true
        dragStart()
      } 

      if (moveStart) {
        start.x = x
        start.y = y
        dragMove()
      }
    }, animateSpace)

    function mouseup (e: MouseEvent) {
      if (moveStart) {
        dragEnd()
      }
      
      originIndex = index = -1
      
      start.x = 0
      start.y = 0
      
      setTimeout(() => {
        moveStart = false
      }, 10)
    }

    // -----------------------

    let dragEl: any = null
    let originEl: any = null

    function dragStart () {
      originEl = children[index]
      dragEl = originEl.cloneNode(true)

      originEl.style.opacity = 0.5

      dragEl.style.position = 'fixed'
      dragEl.style.left = '0px'
      dragEl.style.top = '0px'
      // 防止影响位移
      dragEl.style.transition = 'none'

      document.body.appendChild(dragEl)
      
      console.log(`drag start[${start.x}, ${start.y}]`, dragEl)
    }

    function dragMove () {
      dragEl.style.transform = `translate(${start.x}px, ${start.y}px)`

      
      positions.forEach((pos, i) => {
        if (i === index) return
        const originPos = positions[index]
        // 水平向左
        if (i - index === -1 && pos.left < originPos.left) {
          const leftDistance = pos.left - start.x
          if (leftDistance > 0) {
            tagMoveStart(i)
          }
          return
        }

        // 水平向右
        if (i - index === 1 && pos.left > originPos.left) {
          const rightDistance = pos.left + (children[i] as HTMLElement).offsetWidth - start.x

          if (rightDistance < 0) {
            tagMoveStart(i)
          }
        }
      
      })



      // console.log(
      //   // `${start.x}-${start.y}`, 
      //   positions.map(p => `${p.left}-${p.top}`)
      // )

    }

    function dragEnd () {
      document.body.removeChild(dragEl)
      originEl.style.opacity = 1

      const val = inValue[originIndex]
      const newValue = inValue.slice()
      newValue.splice(originIndex, 1)
      newValue.splice(index, 0, val)
      
      setTimeout(() => {
        if (onChange) {
          onChange(newValue)
        }
        else {
          setInValue(newValue)
        }
      }, 1000)
    }

    /* 移动 dom */
    let tagMoving = false
    function tagMoveStart (newIndex: number) {
      if (tagMoving) return
      tagMoving = true

      children.splice(index, 1)
      children.splice(newIndex, 0, originEl)
      root.current.innerHTML = ''
      children.map(child => root.current.appendChild(child))
      
      index = newIndex



      tagMoving = false
    }


    children.forEach(child => {
      child.addEventListener('mousedown', mousedown as any)
    })

    document.documentElement.addEventListener('mousemove', mousemove as any)
    document.documentElement.addEventListener('mouseup', mouseup as any)


    return () => {
      children.forEach(child => {
        child.removeEventListener('mousedown', mousedown as any)
      })
      
      document.documentElement.removeEventListener('mousemove', mousemove as any)
      document.documentElement.removeEventListener('mouseup', mouseup as any)
    }


  }, [inValue])


  /* 初始化 */
  useEffect(() => {
    if (value) {
      setInValue(value)
    }
    else {
      pairs = Object.assign({
        children: 'name',
        value: 'value'
      }, pairs)

      const inValue = data.map(d => isPrimitive(d) ? d : d[pairs.value])
      
      setInPairs(pairs)
      setInValue(inValue)
    }
  }, [data, value])

  const Component: any = component || Span
  // const handleMouseMove = useCallback(() => {})
  return (
    <div className="cra-drag-tags" ref={root}>
      {inValue.map((v, i) => {
        const children = (data.find(d => d[inPairs.value] === v) || {})[inPairs.children] || ''
        console.log(v)
        return <Component key={String(i)}>{children}{v}</Component>
      })}
    </div>
  )
}
