import { type FC, useState } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   deleteFolder,
   selectFolders,
   createFolder,
} from '~/features/media/slice';
import { cn } from '~/utils/cn';

const Sidebar: FC = () => {
   const folders = useAppSelector(selectFolders);
   const dispatch = useAppDispatch();
   const [newFolderName, setNewFolderName] = useState('');

   return (
      <div>
         <ul>
            {folders.map((folder) => (
               <li key={folder.name}>
                  <NavLink
                     to={'/' + folder.name}
                     className={({ isActive }) =>
                        cn(isActive && 'text-red-500')
                     }
                  >
                     {folder.name}
                  </NavLink>
                  <button
                     onClick={() =>
                        dispatch(deleteFolder({ folderName: folder.name }))
                     }
                  >
                     Del
                  </button>
               </li>
            ))}
         </ul>
         <input
            onChange={(e) => setNewFolderName(e.target.value)}
            value={newFolderName}
            placeholder="Create"
         />
         <button
            onClick={() =>
               dispatch(createFolder({ folderName: newFolderName }))
            }
         >
            Create
         </button>
      </div>
   );
};

export default Sidebar;
