import type { FC, MouseEventHandler } from 'react';
import { Box, Checkbox, Flex, Text } from '@radix-ui/themes';

import { MediaItemType } from '~/features/media/config/media-item-type';
import type { IconComponent } from '~/types/icon-component';
import { Picture, Play, Gif } from '~/components/icons';

export interface FilterListProps {
   type: MediaItemType;
   onSelect: (type: MediaItemType) => void;
   count: number;
   selected: boolean;
}

const mediaTypeMap: Record<
   MediaItemType,
   { Icon: IconComponent; text: string }
> = {
   [MediaItemType.IMAGE]: {
      Icon: Picture,
      text: 'Images',
   },
   [MediaItemType.VIDEO]: {
      Icon: Play,
      text: 'Videos',
   },
   [MediaItemType.GIF]: {
      Icon: Gif,
      text: 'GIFs',
   },
};

const FilterListItem: FC<FilterListProps> = ({
   type,
   onSelect,
   count,
   selected,
}) => {
   const item = mediaTypeMap[type];

   const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
      onSelect(type);
   };

   return (
      <label>
         <Flex
            justify="between"
            align="center"
            px="2"
            py="1"
            className="cursor-pointer hover:bg-secondary/10 rounded-md duration-100"
         >
            <Flex align="center" gapX="2">
               <item.Icon />
               <Text className="text-secondary">{item.text}</Text>
               <Text className="text-secondary/40">{count}</Text>
            </Flex>
            <Checkbox checked={selected} onClick={handleClick} />
         </Flex>
      </label>
   );
};

export default FilterListItem;
