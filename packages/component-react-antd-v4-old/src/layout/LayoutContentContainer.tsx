import React from 'react'

export function LayoutContentContainer ({ children, ...rest }) {
  return <div className="flex-1 pt-3 px-3 flex flex-col" {...rest}>
  {children}
</div>
}