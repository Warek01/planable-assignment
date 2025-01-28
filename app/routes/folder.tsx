import { type FC } from 'react';

import type { Route } from './+types/folder';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { selectFolder } from '~/features/media/slice';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   const folderName = params.folder;
   const folder = useAppSelector(selectFolder(folderName));
   const dispatch = useAppDispatch();

   if (!folder) {
      return (
         <div>
            <h1>No such folder "{folderName}"</h1>
         </div>
      );
   }

   return (
      <div>
         {folder.items.map((item) => (
            <div key={item.name}>{item.name}</div>
         ))}
      </div>
   );
};

export default FolderPage;
