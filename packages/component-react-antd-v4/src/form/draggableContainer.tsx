import React, {useState, useCallback} from 'react'
import {range, inRange} from 'lodash'
import { Draggable } from './draggable'
import { Tag } from 'antd'

const MAX = 5
const HEIGHT = 80

export const DraggableContainer = ({
  component
}) => {
  const items = range(MAX)
  const [state, setState] = useState({
    order: items,
    dragOrder: items, // items order while dragging
    draggedIndex: null
  })
    
  const handleDrag = useCallback(({translation, id}) => {

    console.log(translation, id)
    const delta = Math.round(translation.y / HEIGHT)
    const index = state.order.indexOf(id)
    const dragOrder = state.order.filter(index => index !== id)
        
    if (!inRange(index + delta, 0, items.length)) {
      return
    }
        
    dragOrder.splice(index + delta, 0, id)
        
    setState(state => ({
      ...state,
      draggedIndex: id,
      dragOrder
    }))
  }, [state.order, items.length])
    
  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }))
  }, [])

  const Component = component || Tag
    
  return (
    <div>
      {items.map(index => {
        const isDragging = state.draggedIndex === index
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10)
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10)
                
        return (
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Component>{ index }</Component>
          </Draggable>
        )
      })}
    </div>
  )
}