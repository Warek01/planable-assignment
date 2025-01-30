import {
   type ChangeEventHandler,
   type FC,
   memo,
   useMemo,
   useState,
} from 'react';
import {
   Checkbox,
   Flex,
   Text,
   type CheckboxProps,
   TextField,
} from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { Chevron } from '~/components/icons';
import { cn } from '~/utils/cn';
import { allMediaTypes } from '~/features/media/config/all-media-types';
import {
   addFilter,
   clearFilters,
   fillFilters,
   removeFilter,
   selectActiveFilters,
   selectSelectedFolder,
   setSearchString,
} from '~/features/media/slices/media-ui-state-slice';
import { selectItems } from '~/features/media/slices/media-data-slice';

import FilterListItem from './FilterListItem';
import { useDebouncedCallback } from 'use-debounce';

const FilterList: FC = () => {
   const appliedFilters = useAppSelector(selectActiveFilters);
   const selectedFolder = useSelector(selectSelectedFolder);
   const allItems = useAppSelector(selectItems);
   const dispatch = useAppDispatch();
   const [isOpen, setIsOpen] = useState(true);

   const handleSearchChange = useDebouncedCallback<
      ChangeEventHandler<HTMLInputElement>
   >((event) => {
      const searchString = event.target.value;
      dispatch(setSearchString({ searchString }));
   }, 250);

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
         : addFilter({ filter: type });

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
      <Flex direction="column" gapY="4">
         <Flex direction="column" gapY="2">
            <Flex justify="between" align="center" px="2">
               <Flex
                  align="center"
                  gap="2"
                  onClick={handleVisibilityToggle}
                  className="cursor-pointer"
               >
                  <Text wrap="nowrap" size="1" className="text-secondary/60">
                     Media type
                  </Text>
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
               className={cn('duration-100', isOpen ? 'max-h-full' : 'max-h-0')}
            >
               {filterListItemElements}
            </Flex>
         </Flex>

         <TextField.Root placeholder="Search" onChange={handleSearchChange}>
            <TextField.Slot>
               <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
         </TextField.Root>
      </Flex>
   );
};

export default memo(FilterList);
