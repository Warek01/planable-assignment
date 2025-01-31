import type { FC } from 'react';
import { Box } from '@radix-ui/themes';

import { FolderHero } from '~/features/media/components';

import type { Route } from './+types/home';

const Home: FC<Route.ComponentProps> = () => {
   return <Box width="100%" minHeight="100%" position="relative">
      <FolderHero title="Select a folder to begin" />
   </Box>;
};

export default Home;
