import { type FC, memo, useEffect, useRef, useState } from 'react';
import { Flex, Spinner } from '@radix-ui/themes';
import { LinkBreak1Icon } from '@radix-ui/react-icons';

import { cn } from '~/utils/cn';

export interface ItemThumbnailProps {
   src: string;
   isSelected: boolean;
}

const ItemThumbnail: FC<ItemThumbnailProps> = ({ src, isSelected }) => {
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
      <Flex
         align="center"
         justify="center"
         p="1"
         className={cn(
            'aspect-square relative rounded-lg duration-100 border',
            isSelected
               ? 'bg-primary/10 border-primary'
               : 'border-transparent group-hover:bg-secondary/20',
         )}
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
            ref={ref}
            src={src}
            alt="image thumbnail"
            className="w-auto h-auto max-w-full max-h-full duration-100 border-2 border-secondary/20 group-hover:border-secondary/30 rounded-md"
         />
      </Flex>
   );
};

export default memo(ItemThumbnail);
