import { type FC, useMemo } from 'react';
import {
   Button,
   Checkbox,
   type CheckboxProps,
   Flex,
   Text,
} from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import { FolderSelector } from '~/features/media/components';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   deleteItems,
   moveItems,
} from '~/features/media/slices/media-data-slice';
import type { Folder } from '~/features/media/types/folder';
import {
   clearItemSelection,
   selectSelectedFolder,
   selectSelectedItemIds,
   setItemSelection,
} from '~/features/media/slices/media-ui-state-slice';

const Topbar: FC = () => {
   const selectedFolder = useAppSelector(selectSelectedFolder);
   const selectedItemIds = useAppSelector(selectSelectedItemIds);
   const dispatch = useAppDispatch();

   const handleFolderSelect = (folder: Folder) => {
      if (!selectedFolder) {
         return;
      }

      dispatch(
         moveItems({
            itemIds: selectedItemIds,
            srcFolderId: selectedFolder.id,
            dstFolderId: folder.id,
         }),
      );
      dispatch(clearItemSelection());
   };

   const handleAllItemsSelectClick = () => {
      if (!selectedFolder) {
         return;
      }

      const action = selectedItemIds.length
         ? clearItemSelection()
         : setItemSelection({
              itemIds: selectedFolder.itemIds,
           });
      dispatch(action);
   };

   const handleDelete = () => {
      if (!selectedFolder) {
         return;
      }

      dispatch(
         deleteItems({
            itemIds: selectedItemIds,
            folderId: selectedFolder.id,
         }),
      );
      dispatch(clearItemSelection());
   };

   const checkboxState = useMemo<CheckboxProps['checked']>(() => {
      if (!selectedItemIds.length) {
         return false;
      }

      if (selectedItemIds.length === selectedFolder?.itemIds.length) {
         return true;
      }

      return 'indeterminate';
   }, [selectedItemIds.length, selectedFolder?.itemIds.length]);

   return (
      <Flex flexShrink="0" height="64px">
         <label>
            <Flex>
               <Checkbox
                  onClick={handleAllItemsSelectClick}
                  checked={checkboxState}
               />
               <Text>{selectedItemIds.length} selected</Text>
            </Flex>
         </label>
         <FolderSelector
            onSelect={handleFolderSelect}
            disabled={!selectedItemIds.length}
            selected={selectedFolder}
         />
         <Button disabled={!selectedItemIds.length} onClick={handleDelete}>
            <TrashIcon />
         </Button>
      </Flex>
   );
};

export default Topbar;
