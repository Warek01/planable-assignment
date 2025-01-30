import { type FC, useMemo } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

import { Backdrop } from '~/components';
import type { MediaItem } from '~/features/media/types/media-item';
import { MediaItemType } from '~/features/media/config/media-item-type';

export interface BackdropMediaPlayerProps {
   onClose?: () => void;
   item: MediaItem;
}

const BackdropMediaPlayer: FC<BackdropMediaPlayerProps> = ({
   onClose,
   item,
}) => {
   const mediaElement = useMemo(() => {
      switch (item.type) {
         case MediaItemType.IMAGE:
            return (
               <img
                  alt={item.name}
                  src={item.url}
                  className="w-[90vw] h-[90vh] object-contain rounded-md"
               />
            );
         case MediaItemType.VIDEO:
         case MediaItemType.GIF:
            return (
               <video
                  src="/mock-video.mp4"
                  className="max-w-[90vw] max-h-[90vh] rounded-md"
                  controls
                  autoPlay
                  muted
               />
            );
      }
   }, [item]);

   return (
      <Backdrop onClose={onClose}>
         <div className="flex items-center justify-center relative">
            {onClose && (
               <button
                  onClick={onClose}
                  className="absolute top-0 right-0 p-4 bg-white/10 hover:bg-white/30 rounded-full transition cursor-pointer z-50"
               >
                  <Cross1Icon color="white" />
               </button>
            )}
            {mediaElement}
         </div>
      </Backdrop>
   );
};

export default BackdropMediaPlayer;
