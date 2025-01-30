import { type FC } from 'react';
import { Flex } from '@radix-ui/themes';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { selectFolders } from '~/features/media/slices/media-data-slice';

import FolderItem from './FolderItem';

const FoldersList: FC = () => {
   const folders = useAppSelector(selectFolders);
   const dispatch = useAppDispatch();

   return (
      <Flex direction="column" gapY="1">
         {folders.map((folder) => (
            <FolderItem folder={folder} key={folder.name} />
         ))}
      </Flex>
   );
};

export default FoldersList;
