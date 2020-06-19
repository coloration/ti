import React, {useState, useCallback, useRef, useMemo, useEffect, CSSProperties, useLayoutEffect} from 'react'
import { throttle } from 'lodash'
const POSITION = {x: 0, y: 0}



export const Draggable = ({children, id, onDrag, onDragEnd}) => {

  const [state, setState] = useState({
    isPressing: false,
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  })
    
  const handleMouseDown = useCallback(({clientX, clientY}) => {
    setState(state => ({
      ...state,
      isPressing: true,
      origin: {x: clientX, y: clientY}
    }))
  }, [])
    
  const handleMouseMove = useCallback(throttle(({clientX, clientY} : any) => {

    if (!state.isPressing) return

    const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y}
    
    if (Math.abs(translation.x) < 20 && Math.abs(translation.y) < 20) return

    setState(state => ({
      ...state,
      translation,
      isDragging: true
    }))
        
    onDrag && onDrag({translation, id})
  }, 100), [state.origin, onDrag, id, state.isPressing])
    
  const handleMouseUp = useCallback(() => {
    if (!state.isPressing) return
    setState(state => ({
      ...state,
      isPressing: false,
      isDragging: false
    }))
        
    onDragEnd && onDragEnd()
  }, [onDragEnd, state.isPressing])
  

  useEffect(() => {
    if (state.isDragging) return
    setState(state => ({...state, translation: {x: 0, y: 0}}))
  }, [state.isDragging])

  useLayoutEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useLayoutEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => window.removeEventListener('mouseup', handleMouseUp)

  }, [handleMouseUp])


    
  const styles = useMemo<CSSProperties>(() => ({
    cursor: state.isPressing ? '-webkit-grabbing' : '-webkit-grab',
    transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
    transition: state.isPressing ? 'none' : 'transform 500ms',
    zIndex: state.isPressing ? 2 : 1,
    position: state.isPressing ? 'fixed' : 'static',
    userSelect: 'none',
    // display: 'inline-block'
  }), [state.isDragging, state.translation])
    
  return (
    <div style={styles} data-isDragging={state.isDragging} onMouseDown={handleMouseDown}>
      {children}
    </div>
  )
}