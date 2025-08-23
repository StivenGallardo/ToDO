import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableDnDHelpers';
import { useWorkSpaceStore } from '../../hooks/useWorkSpaceStore';


const isColumn = (id) => typeof id === 'string' && id.startsWith('col-');
const isItem   = (id) => typeof id === 'string' && id.startsWith('item-');

export default function ColumnsDnDWorkSpace() {

  const {workSpaceLists} = useWorkSpaceStore();

  const [columns, setColumns] = useState(workSpaceLists);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const findContainer = (id) => {
    if (!id) return null;
    if (isColumn(id)) return id;
    return columns.find(col => col.items.some(item => item.id === id))?.id ?? null;
  };

  const getActiveEntity = () => {
    if (!activeId) return null;
    if (isColumn(activeId)) return columns.find(c => c.id === activeId);
    for (const col of columns) {
      const found = col.items.find(i => i.id === activeId);
      if (found) return found;
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (!over) {
      setOverId(null);
      return;
    }

    // Si arrastro una columna, solo considero "over" como columna (o lo mapeo a su columna contenedora)
    if (isColumn(activeId)) {
      const overCol = isColumn(over.id) ? over.id : findContainer(over.id);
      setOverId(overCol ?? null);
      return;
    }

    // Si arrastro un item, permito item o columna (columna = insertar al final)
    setOverId(over.id);
  };

const handleDragEnd = (event) => {
  const { active, over } = event;
  setActiveId(null);
  setOverId(null);

  if (!over) return;
  if (active.id === over.id) return; // soltaste sobre el mismo elemento

  // --- REORDENAR COLUMNAS ---
  if (isColumn(active.id)) {
    const targetColId = isColumn(over.id) ? over.id : findContainer(over.id);
    if (!targetColId || targetColId === active.id) return;

    const oldIndex = columns.findIndex(c => c.id === active.id);
    const newIndex = columns.findIndex(c => c.id === targetColId);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    setColumns(arrayMove(columns, oldIndex, newIndex));
    return;
  }

  // --- MOVER ITEMS ---
  if (isItem(active.id)) {
    const sourceColId = findContainer(active.id);
    const targetColId = isItem(over.id) ? findContainer(over.id) : (isColumn(over.id) ? over.id : null);
    if (!sourceColId || !targetColId) return;

    const sourceIdx = columns.findIndex(c => c.id === sourceColId);
    const targetIdx = columns.findIndex(c => c.id === targetColId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    // Reordenar dentro de la MISMA columna -> usar arrayMove
    if (sourceColId === targetColId) {
      const items = columns[sourceIdx].items;
      const oldIndex = items.findIndex(i => i.id === active.id);

      // Si "over" es item, tomamos su índice; si es columna, queremos mover al final
      const newIndex = isItem(over.id)
        ? items.findIndex(i => i.id === over.id)
        : items.length - 1;

      // Si el índice no cambia, no tocar el estado
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const next = [...columns];
      next[sourceIdx] = { ...next[sourceIdx], items: arrayMove(items, oldIndex, newIndex) };
      setColumns(next);
      return;
    }

    // Mover ENTRE columnas
    const sourceItems = [...columns[sourceIdx].items];
    const targetItems = [...columns[targetIdx].items];

    const movingIndex = sourceItems.findIndex(i => i.id === active.id);
    if (movingIndex === -1) return;

    const [movingItem] = sourceItems.splice(movingIndex, 1);

    // Si "over" es item => insert antes de ese item; si es columna => al final
    const insertIndex = isItem(over.id)
      ? Math.max(0, targetItems.findIndex(i => i.id === over.id))
      : targetItems.length;

    targetItems.splice(insertIndex < 0 ? targetItems.length : insertIndex, 0, movingItem);

    const next = [...columns];
    next[sourceIdx] = { ...next[sourceIdx], items: sourceItems };
    next[targetIdx] = { ...next[targetIdx], items: targetItems };
    setColumns(next);
  }
};
  const activeEntity = getActiveEntity();

  return (
    <div className="w-full px-7 py-3 flex gap-4 items-start bg-blue-400 min-h-screen">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Contexto de columnas (horizontal) */}
        <SortableContext
          items={columns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((col) => (
            <React.Fragment key={col.id}>
              {/* Placeholder ENTRE columnas mientras arrastro una columna */}
              {isColumn(activeId) && overId === col.id && activeId !== col.id && (
                <div className="w-2/12 h-24 rounded-2xl border-2 border-dashed border-blue-500/70 bg-blue-200/30 shrink-0" />
              )}

              <div className="w-2/12 bg-gray-100 p-3 rounded-2xl shadow-md shrink-0">
                <SortableItem id={col.id}>
                  <p className="text-blue-950 font-semibold">{col.title}</p>

                  {/* Contexto de items (vertical) */}
                  <SortableContext
                    items={col.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {col.items.map((item) => (
                      <React.Fragment key={item.id}>
                        {/* Placeholder de items SOLO si arrastro un item */}
                        {isItem(activeId) && overId === item.id && activeId !== item.id && (
                          <div className="h-10 rounded-lg border-2 border-dashed border-blue-500/70 bg-blue-200/30 mb-2" />
                        )}

                        <SortableItem id={item.id}>
                          <li
                            className={`flex items-center px-3 w-full h-10 bg-white rounded-lg mt-2 cursor-pointer transition
                              ${activeId === item.id ? 'opacity-50' : ''}`}
                          >
                            <span className="text-blue-950 font-semibold">
                              {item.text}
                            </span>
                          </li>
                        </SortableItem>
                      </React.Fragment>
                    ))}

                    {/* Placeholder al final de la columna cuando arrastro item sobre la columna */}
                    {isItem(activeId) &&
                      isColumn(overId) &&
                      overId === col.id && (
                        <div className="h-10 rounded-lg border-2 border-dashed border-blue-500/70 bg-blue-200/30 mt-2" />
                      )}
                  </SortableContext>
                </SortableItem>
              </div>
            </React.Fragment>
          ))}
        </SortableContext>

        {/* Overlay del elemento en movimiento */}
        <DragOverlay>
          {activeEntity ? (
            <div className="px-3 py-2 bg-white shadow-2xl rounded-lg border border-gray-300">
              {activeEntity.title || activeEntity.text}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="flex flex-wrap w-2/12 bg-blue-500 p-3 cursor-pointer rounded-2xl shadow-md shrink-0">
        <p className="text-white font-semibold"> + Añadir lista</p>
      </div>
    </div>
  );
}
