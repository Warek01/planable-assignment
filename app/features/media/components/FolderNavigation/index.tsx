import { type FC, memo } from 'react';
import { generatePath, useNavigate } from 'react-router';

import { FolderList } from '~/features/media/components';
import { useAppSelector } from '~/hooks/redux';
import { selectSelectedFolder } from '~/features/media/slices/media-ui-state-slice';
import type { Folder } from '~/features/media/types/folder';
import { AppRoute } from '~/config/app-route';

const FolderNavigation: FC = () => {
   const selected = useAppSelector(selectSelectedFolder);
   const navigate = useNavigate();

   const handleSelect = (folder: Folder) => {
      navigate(generatePath(AppRoute.FOLDER, { folderId: folder.id }));
   };

   return <FolderList droppable selected={selected} onSelect={handleSelect} />;
};

export default memo(FolderNavigation);
