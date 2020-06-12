import React, { FC, DetailedHTMLProps, HTMLAttributes, useLayoutEffect, useRef } from 'react'
import { getOffsetFromBody } from '@code/kit'

interface IEmptyLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const EmptyLayout: FC<IEmptyLayoutProps> = ({
  children,
  className,
  ...otherProps
}) => {
  const container = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (container === null) return

    const timer = setTimeout(() => {
      const dom = container.current
      const { top } = getOffsetFromBody(dom)
      dom.style.minHeight = window.innerHeight - top + 'px'
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      ref={container}
      className={`flex-1 flex flex-col bg-gray-200 ${className}`} 
      {...otherProps}>
      {children}
    </div>
  )
}