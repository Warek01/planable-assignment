import type { FC } from 'react';

import type { Route } from './+types/folder';

const FolderPage: FC<Route.ComponentProps> = ({ params }) => {
   console.log(params.folder);
   return <div>Folder</div>;
};

export default FolderPage;
