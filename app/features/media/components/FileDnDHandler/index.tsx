import type { FC, PropsWithChildren } from 'react';
import { DndContext, type DragEndEvent, pointerWithin } from '@dnd-kit/core';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { moveItems } from '~/features/media/slices/media-data-slice';
import {
   removeItemFromSelection,
   selectSelectedFolder,
} from '~/features/media/slices/media-ui-state-slice';

const FileDnDHandler: FC<PropsWithChildren> = ({ children }) => {
   const dispatch = useAppDispatch();
   const selectedFolder = useAppSelector(selectSelectedFolder);

   // Hide scrollbars for parents of droppables since they cause problems
   // Use custom class to not accidentally delete initial tailwind overflow-hidden
   const resetScrollbars = () => {
      document
         .querySelectorAll('.hide-overflow-on-dnd')
         .forEach((el) => el.classList.remove('dnd-overflow-hidden'));
   };

   const hideScrollbars = () => {
      document
         .querySelectorAll('.hide-overflow-on-dnd')
         .forEach((el) => el.classList.add('dnd-overflow-hidden'));
   };

   const handleDragEnd = (event: DragEndEvent) => {
      resetScrollbars();

      const itemId = event.active.id.toString();
      const dstFolderId = event.over?.id.toString();

      if (
         !itemId ||
         !dstFolderId ||
         !selectedFolder ||
         dstFolderId === selectedFolder.id
      ) {
         return;
      }

      dispatch(
         moveItems({
            itemIds: [itemId],
            srcFolderId: selectedFolder.id,
            dstFolderId: dstFolderId,
         }),
      );
      dispatch(removeItemFromSelection({ itemId }));
   };

   const handleDragStart = () => {
      hideScrollbars();
   };

   const handleDragAbort = () => {
      resetScrollbars();
   };

   const handleDragCancel = () => {
      resetScrollbars();
   };

   return (
      <DndContext
         collisionDetection={pointerWithin}
         onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}
         onDragAbort={handleDragAbort}
         onDragCancel={handleDragCancel}
      >
         {children}
      </DndContext>
   );
};

export default FileDnDHandler;
