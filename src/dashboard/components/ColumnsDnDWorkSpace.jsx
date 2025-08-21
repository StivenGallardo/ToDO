import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {SortableList, SortableItem} from './SortableDnDHelpers';

const initialColumns = [
  {
    id: 'col-1',
    title: 'Por hacer',
    items: [
      { id: 'item-1', text: 'Lista 1' },
      { id: 'item-2', text: 'Lista 2' }
    ]
  },
  {
    id: 'col-2',
    title: 'Haciendo',
    items: [
      { id: 'item-3', text: 'Lista 1' },
      { id: 'item-4', text: 'Lista 2' }
    ]
  }
];

export default function ColumnsDnDWorkSpace() {
  const [columns, setColumns] = useState(initialColumns);
  const [activeColumn, setActiveColumn] = useState(null);

  // Drag columns
  const handleColumnDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columns.findIndex(col => col.id === active.id);
      const newIndex = columns.findIndex(col => col.id === over.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  // Drag items within a column
  const handleItemDragEnd = (colIndex) => (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const items = columns[colIndex].items;
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      const newColumns = [...columns];
      newColumns[colIndex].items = newItems;
      setColumns(newColumns);
    }
  };

  return (
    <div className="w-full px-7 py-3 cols-12 flex flex-wrap gap-4 items-start bg-blue-400 min-h-screen">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleColumnDragEnd}>
        <SortableContext items={columns.map(col => col.id)} strategy={verticalListSortingStrategy}>
          {columns.map((col, colIdx) => (
            <div key={col.id} className="w-2/12 bg-gray-100 p-3 rounded-lg shadow-md">
              <SortableItem id={col.id}>
                <p className="text-blue-950 font-semibold">{col.title}</p>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleItemDragEnd(colIdx)}>
                  <SortableContext items={col.items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {col.items.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        <li className="flex items-center px-3 w-full h-10 bg-white rounded-lg mt-2 cursor-pointer">
                          <span className="text-blue-950 font-semibold">{item.text}</span>
                        </li>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
              </SortableItem>
            </div>
          ))}
        </SortableContext>
      </DndContext>
        <div className='flex flex-wrap w-2/12 bg-blue-500 p-3 cursor-pointer rounded-lg shadow-md'>
            <p className='text-white font-semibold'> + Añadir lista</p>
        </div>
    </div>
  );
}
