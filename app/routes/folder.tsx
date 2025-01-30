import { type FC, useEffect } from 'react';
import { Box, Heading } from '@radix-ui/themes';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { MediaGrid } from '~/features/media/components';
import { selectFolder } from '~/features/media/slices/media-data-slice';
import {
   clearItemSelection,
   setActiveFolder,
} from '~/features/media/slices/media-ui-state-slice';

import type { Route } from './+types/folder';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   const { folderId } = params;
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
   }, [folderId]);

   if (!folder) {
      return (
         <Box>
            <Heading>No such folder {folderId}</Heading>
         </Box>
      );
   }

   return (
      <Box>
         <MediaGrid folder={folder} />
      </Box>
   );
};

export default FolderPage;
