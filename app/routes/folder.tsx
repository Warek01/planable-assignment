import type { FC } from 'react';

import type { Route } from './+types/folder';
import { useAppSelector } from '~/hooks/redux';
import { selectFolder } from '~/features/media/slice';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   const folder = useAppSelector(selectFolder(params.folder));
   console.log(folder);
   return <div>Folder</div>;
};

export default FolderPage;
