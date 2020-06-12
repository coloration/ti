import React, { FC, DetailedHTMLProps, HTMLAttributes, useLayoutEffect, useRef } from 'react'
import { getOffsetFromBody } from '@code/kit'

interface IStretchLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bottom?: number
}

export const StretchLayout: FC<IStretchLayoutProps> = ({
  bottom,
  className,
  ...otherProps
}) => {
  const container = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (container.current === null) return

    const dom = container.current
    const { top } = getOffsetFromBody(dom)
    dom.style.minHeight = window.innerHeight - top - (bottom || 0) + 'px'

  }, [container.current])

  return (
    <div 
      ref={container}
      className={`flex-1 flex flex-col ${className}`} 
      {...otherProps}>
    </div>
  )
}