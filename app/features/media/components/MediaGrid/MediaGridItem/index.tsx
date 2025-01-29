import { type FC, useEffect, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@radix-ui/themes';
import { LinkBreak1Icon } from '@radix-ui/react-icons';

import type { MediaItem } from '~/features/media/types/media-item';
import { cn } from '~/utils/cn';

export interface MediaGridItemProps {
   item: MediaItem;
}

const MediaGridItem: FC<MediaGridItemProps> = ({ item }) => {
   const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
   const [isError, setIsError] = useState(false);

   const handleLoad = () => {
      setThumbnailLoaded(true);
   };

   const handleError = () => {
      setThumbnailLoaded(true);
      setIsError(true);
   };

   useEffect(() => {
      const img = new Image();
      img.src = item.thumbnailUrl;
      img.onload = handleLoad;
      img.onerror = handleError;
   }, [item.thumbnailUrl]);

   return (
      <Box width="100%">
         <Flex
            align="center"
            justify="center"
            className="aspect-square relative"
         >
            {!thumbnailLoaded && (
               <Flex align="center" justify="center" position="absolute">
                  <Spinner size={{ initial: '1', md: '2', lg: '3' }} />
               </Flex>
            )}

            {isError && (
               <Flex align="center" justify="center" position="absolute">
                  <LinkBreak1Icon />
               </Flex>
            )}

            <img
               src={item.thumbnailUrl}
               alt={item.name}
               className={cn(
                  'w-auto h-auto max-w-full max-h-full transition-opacity duration-200',
                  thumbnailLoaded && !isError ? 'opacity-100' : 'opacity-0',
               )}
            />
         </Flex>
         <Flex justify="center">
            <Text>{item.name}</Text>
         </Flex>
      </Box>
   );
};

export default MediaGridItem;
