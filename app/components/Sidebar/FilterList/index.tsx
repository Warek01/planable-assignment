import type { FC } from 'react';
import { Flex } from '@radix-ui/themes';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   applyFilter,
   removeFilter,
   selectActiveFilters,
   selectItems,
   selectSelectedFolder,
} from '~/features/media/slice';
import { Accordion } from '~/components';
import { MediaItemType } from '~/features/media/config/media-item-type';

import FilterListItem from './FilterListItem';
import { useSelector } from 'react-redux';

export interface FilterListProps {}

const allFilters: MediaItemType[] = [
   MediaItemType.IMAGE,
   MediaItemType.VIDEO,
   MediaItemType.GIF,
];

const FilterList: FC<FilterListProps> = ({}) => {
   const appliedFilters = useAppSelector(selectActiveFilters);
   const selectedFolder = useSelector(selectSelectedFolder);
   const allItems = useAppSelector(selectItems);
   const dispatch = useAppDispatch();

   const handleSelect = (filter: MediaItemType) => {
      const action = appliedFilters.includes(filter)
         ? removeFilter({ filter })
         : applyFilter({ filter });

      dispatch(action);
   };

   const filterListItemElements = allFilters.map((filter) => (
      <FilterListItem
         key={filter}
         type={filter}
         selected={appliedFilters.includes(filter)}
         onSelect={handleSelect}
         count={
            allItems.filter(
               (item) =>
                  selectedFolder?.itemIds.includes(item.id) &&
                  item.type === filter,
            ).length ?? 0
         }
      />
   ));

   return (
      <Flex>
         <Accordion defaultOpened>{filterListItemElements}</Accordion>
      </Flex>
   );
};

export default FilterList;
