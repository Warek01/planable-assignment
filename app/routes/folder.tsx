import { type FC, useEffect, useMemo } from 'react';
import { Box } from '@radix-ui/themes';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { FolderHero, MediaGrid } from '~/features/media/components';
import {
   selectFolder,
   selectFolders,
} from '~/features/media/slices/media-data-slice';
import {
   clearItemSelection,
   setActiveFolder,
} from '~/features/media/slices/media-ui-state-slice';

import type { Route } from './+types/folder';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   const { folderId } = params;
   const allFolders = useAppSelector(selectFolders);
   const folder = useAppSelector((state) => selectFolder(state, folderId));
   const dispatch = useAppDispatch();

   useEffect(() => {
      // Sync selected folder with store
      dispatch(setActiveFolder({ folderId: folder?.id }));
      dispatch(clearItemSelection());

      return () => {
         dispatch(setActiveFolder({ folderId: undefined }));
         dispatch(clearItemSelection());
      };
   }, [folderId, allFolders]);

   const content = useMemo(() => {
      if (!folder) {
         return <FolderHero title="404 Folder not found" />;
      }
      if (!folder.itemIds.length) {
         return (
            <FolderHero
               title="This folder is empty"
               subtitle="Add images, videos and GIFs."
            />
         );
      }
      return <MediaGrid folder={folder} />;
   }, [folder]);

   return (
      <Box width="100%" minHeight="100%" position="relative">
         {content}
      </Box>
   );
};

export default FolderPage;
