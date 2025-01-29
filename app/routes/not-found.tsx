import type { FC } from 'react';

import type { Route } from './+types/not-found';

const NotFound: FC<Route.ComponentProps> = () => {
   return <div>404 Not Found</div>;
};

export default NotFound;
