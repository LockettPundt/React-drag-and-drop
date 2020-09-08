import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { ItemTypes } from '../ItemTypes'





export default function ListItem({ color, name, id, index, moveItem }) {
  const ref = useRef(null)
  
  console.log({
    id,
    name,
    color,
    index,
  })
  
  const [, drop] = useDrop({
    accept: ItemTypes.LIST_ITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.LIST_ITEM, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  
  
  drag(drop(ref))
  return (
    <StyledDiv
      isDragging={isDragging}
      color={color}
      ref={ref}
    > 
      My name is {name}. I'm a {color} div.
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: ${p => p.isDragging ? 'yellow' : p.color};
  width: 30%;
  margin: auto;
`