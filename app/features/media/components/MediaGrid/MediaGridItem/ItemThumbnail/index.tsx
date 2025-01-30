import {
   type FC,
   memo,
   type ReactElement,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { Flex, Spinner } from '@radix-ui/themes';
import { LinkBreak1Icon } from '@radix-ui/react-icons';
import type { MediaItem } from '~/features/media/types/media-item';

import { cn } from '~/utils/cn';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { Gif, PlayFilled } from '~/components/icons';

export interface ItemThumbnailProps {
   item: MediaItem;
   isSelected: boolean;
}

const playIconMap: Record<MediaItemType, ReactElement> = {
   [MediaItemType.IMAGE]: <></>,
   [MediaItemType.VIDEO]: (
      <div className="p-1.5 rounded-full bg-black/60 absolute">
         <PlayFilled className="fill-white" />
      </div>
   ),
   [MediaItemType.GIF]: (
      <div className="p-1.5 rounded-full bg-black/60 absolute">
         <Gif className="fill-white" />
      </div>
   ),
};

const ItemThumbnail: FC<ItemThumbnailProps> = ({ item, isSelected }) => {
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
   }, [item.url]);

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

         {thumbnailLoaded && playIconMap[item.type]}

         <img
            ref={ref}
            src={item.url}
            alt={item.name}
            className="w-auto h-auto max-w-full max-h-full duration-100 border-2 border-secondary/20 group-hover:border-secondary/30 rounded-md"
         />
      </Flex>
   );
};

export default memo(ItemThumbnail);
