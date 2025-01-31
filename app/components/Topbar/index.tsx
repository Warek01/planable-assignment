import { type FC, useMemo } from 'react';
import {
   Button,
   Checkbox,
   type CheckboxProps,
   Flex,
   Text,
} from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import { FolderSelector, UploadFileInput } from '~/features/media/components';
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
import { AppTooltip } from '~/components';

const Topbar: FC = () => {
   const selectedFolder = useAppSelector(selectSelectedFolder);
   const selectedItemIds = useAppSelector(selectSelectedItemIds);
   const dispatch = useAppDispatch();

   const handleFolderSelect = (folder: Folder) => {
      if (!selectedFolder) {
         return;
      }
      dispatch(clearItemSelection());

      if (selectedFolder.id === folder.id) {
         return;
      }

      dispatch(
         moveItems({
            itemIds: selectedItemIds,
            srcFolderId: selectedFolder.id,
            dstFolderId: folder.id,
         }),
      );
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
      <Flex
         flexShrink="0"
         align="center"
         height="64px"
         gapX="6"
         mr="2"
         className="border-b border-b-secondary/10"
      >
         <label>
            <Flex align="center" gapX="2">
               <Checkbox
                  onClick={handleAllItemsSelectClick}
                  checked={checkboxState}
               />
               <Text className="text-secondary/60">
                  {selectedItemIds.length} selected
               </Text>
            </Flex>
         </label>
         <Flex gapX="3">
            {!!selectedItemIds.length && (
               <>
                  <FolderSelector
                     onSelect={handleFolderSelect}
                     disabled={!selectedItemIds.length}
                     selected={selectedFolder!}
                     tooltip="Move items to"
                  />
                  <AppTooltip
                     content={`Delete ${selectedItemIds.length} items`}
                  >
                     <Button
                        disabled={!selectedItemIds.length}
                        onClick={handleDelete}
                     >
                        <TrashIcon />
                     </Button>
                  </AppTooltip>
               </>
            )}
            <UploadFileInput />
         </Flex>
      </Flex>
   );
};

export default Topbar;
