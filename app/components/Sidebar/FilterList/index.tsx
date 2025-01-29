import { type FC, useMemo, useState } from 'react';
import { Checkbox, Flex, Text, type CheckboxProps } from '@radix-ui/themes';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
   applyFilter,
   clearFilters,
   fillFilters,
   removeFilter,
   selectActiveFilters,
   selectItems,
   selectSelectedFolder,
} from '~/features/media/slice';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { Chevron } from '~/components/icons';
import { cn } from '~/utils/cn';
import { allMediaTypes } from '~/features/media/config/all-media-types';

import FilterListItem from './FilterListItem';

const FilterList: FC = () => {
   const appliedFilters = useAppSelector(selectActiveFilters);
   const selectedFolder = useSelector(selectSelectedFolder);
   const allItems = useAppSelector(selectItems);
   const dispatch = useAppDispatch();
   const [isOpen, setIsOpen] = useState(true);

   const allFiltersCheckmarkValue = useMemo<CheckboxProps['checked']>(() => {
      if (!appliedFilters.length) {
         return false;
      }
      if (appliedFilters.length === allMediaTypes.length) {
         return true;
      }
      return 'indeterminate';
   }, [appliedFilters]);

   const handleSelect = (type: MediaItemType) => {
      const action = appliedFilters.includes(type)
         ? removeFilter({ filter: type })
         : applyFilter({ filter: type });

      dispatch(action);
   };

   const handleAllFiltersClick = () => {
      const action = allFiltersCheckmarkValue ? clearFilters() : fillFilters();
      dispatch(action);
   };

   const handleVisibilityToggle = () => {
      setIsOpen((o) => !o);
   };

   const filterListItemElements = allMediaTypes.map((type) => (
      <FilterListItem
         key={type}
         type={type}
         selected={appliedFilters.includes(type)}
         onSelect={handleSelect}
         count={
            allItems.filter(
               (item) =>
                  selectedFolder?.itemIds.includes(item.id) &&
                  item.type === type,
            ).length ?? 0
         }
      />
   ));

   return (
      <Flex direction="column" gapY="2">
         <Flex justify="between" align="center">
            <Flex
               align="center"
               gap="2"
               onClick={handleVisibilityToggle}
               className="cursor-pointer"
            >
               <Text wrap="nowrap">Media type</Text>
               <Chevron
                  className={cn('duration-100', isOpen ? '' : 'rotate-180')}
               />
            </Flex>
            <Checkbox
               checked={allFiltersCheckmarkValue}
               onClick={handleAllFiltersClick}
            />
         </Flex>
         <Flex
            direction="column"
            overflow="hidden"
            className={cn('duration-100', isOpen ? 'max-h-[300px]' : 'max-h-0')}
         >
            {filterListItemElements}
         </Flex>
      </Flex>
   );
};

export default FilterList;
