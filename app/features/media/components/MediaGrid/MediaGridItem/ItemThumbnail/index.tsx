import { type FC, memo, useEffect, useRef, useState } from 'react';
import { Flex, Spinner } from '@radix-ui/themes';
import { LinkBreak1Icon } from '@radix-ui/react-icons';

import { cn } from '~/utils/cn';

export interface ItemThumbnailProps {
   src: string;
}

const ItemThumbnail: FC<ItemThumbnailProps> = ({ src }) => {
   const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
   const [isError, setIsError] = useState(false);
   const ref = useRef<HTMLImageElement>(null);

   const handleLoad = () => {
      setThumbnailLoaded(true);
   };

   const handleError = () => {
      setThumbnailLoaded(true);
      setIsError(true);
   };

   useEffect(() => {
      if (!ref.current) {
         return;
      }

      if (ref.current.complete) {
         handleLoad();
      }

      ref.current.onload = handleLoad;
      ref.current.onerror = handleError;
   }, [src]);

   return (
      <Flex align="center" justify="center" className="aspect-square relative">
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
            ref={ref}
            src={src}
            alt="image thumbnail"
            className={cn(
               'w-auto h-auto max-w-full max-h-full transition-opacity duration-200',
            )}
         />
      </Flex>
   );
};

export default memo(ItemThumbnail);
