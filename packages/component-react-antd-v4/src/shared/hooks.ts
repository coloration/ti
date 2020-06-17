import { useRef, useLayoutEffect } from 'react'
import { getOffsetFromBody } from '@code/kit'

export function useRemainWindowMinHeightRef<T extends HTMLElement> (initialValue: T | null, bottom?: number) {

  const ref = useRef<T>(initialValue)

  useLayoutEffect(() => {
    if (ref.current === null) return

    const dom = ref.current

    const { top } = getOffsetFromBody(dom)
    dom.style.minHeight = window.innerHeight - top - (bottom || 0) + 'px'
  }, [ref.current])

  return ref
} 