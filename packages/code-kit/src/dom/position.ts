import { curry } from '../operator'

export type HTMLElementPosition = {
  left: number, top: number, width: number, height: number
}

export function getOffset (parentDom: HTMLElement, dom: HTMLElement): HTMLElementPosition {

  let left = 0
  let top = 0
  const width = dom.offsetWidth
  const height = dom.offsetHeight
  while (dom && dom !== parentDom) {
    
    left += dom.offsetLeft
    top += dom.offsetTop
    dom = dom.offsetParent as HTMLElement
    
  }

  return { width, height, left, top }

}

export const getOffsetFromBody: (dom: HTMLElement) => HTMLElementPosition 
  = curry(getOffset, document.body)