import React, { useState, useCallback } from 'react'
import update from 'immutability-helper'

import ListItem from './ListItem'




export default function List() {
  const [items, setItems] = useState([
    {
      id: '1',
      color: 'green',
      name: 'Lockett',
    },
    { 
      id: '2',
      color: 'salmon',
      name: 'Chauncey',
    },
    {
      id: '3',
      color: 'purple',
      name: 'Prince',
    },
    {
      id: '4',
      color: 'aquamarine',
      name: 'Biff',
    }
  ])
  
  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex]
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [items],
  )
  
  return (
    <div>
      {items.map((item, index) => {
        return (
          <ListItem
            key={index}
            index={index}
            {...item}
            moveItem={moveItem}
          />
        )
      })}
    </div>
  )
}
