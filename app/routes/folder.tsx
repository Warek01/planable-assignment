import { type FC, useEffect } from 'react';
import { Box, Heading } from '@radix-ui/themes';

import type { Route } from './+types/folder';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { selectFolder, setActiveFolder } from '~/features/media/slice';
import { MediaGrid } from '~/features/media/components';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   const { folderId } = params;
   const folder = useAppSelector((state) => selectFolder(state, folderId));
   const dispatch = useAppDispatch();

   // Sync selected folder with store
   useEffect(() => {
      dispatch(setActiveFolder({ folderId: folder?.id }));

      return () => {
         dispatch(setActiveFolder({ folderId: undefined }));
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
