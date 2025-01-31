import {
   type ChangeEventHandler,
   type FC,
   memo,
   useEffect,
   useMemo,
   useState,
} from 'react';
import {
   Button,
   Dialog,
   Flex,
   Select,
   Text,
   TextField,
} from '@radix-ui/themes';
import {
   FilePlusIcon,
   HeightIcon,
   Pencil1Icon,
   StarIcon,
   WidthIcon,
} from '@radix-ui/react-icons';
import * as uuid from 'uuid';

import { AppTooltip } from '~/components';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { FolderSelector } from '~/features/media/components';
import { selectSelectedFolder } from '~/features/media/slices/media-ui-state-slice';
import type { Folder } from '~/features/media/types/folder';
import { MediaItemType } from '~/features/media/config/media-item-type';
import { allMediaTypes } from '~/features/media/config/all-media-types';
import { addItems } from '~/features/media/slices/media-data-slice';
import type { MediaItem } from '~/features/media/types/media-item';

interface CreateFileProps {
   width: number;
   height: number;
   name: string;
   loremPicsumId: string;
   folder: Folder;
   type: MediaItemType;
}

const UploadFileInput: FC = () => {
   const dispatch = useAppDispatch();
   const selectedFolder = useAppSelector(selectSelectedFolder);

   const initialDormData = useMemo<Partial<CreateFileProps>>(
      () => ({
         width: 400,
         height: 400,
         loremPicsumId: '1',
         folder: selectedFolder,
         type: MediaItemType.IMAGE,
         name: 'test.png',
      }),
      [selectedFolder],
   );

   const [formData, setFormData] = useState({
      ...initialDormData,
   });

   useEffect(() => {
      if (selectedFolder) {
         setFormData((fd) => ({ ...fd, folder: selectedFolder }));
      }
   }, [selectedFolder]);

   const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   };

   const handleCreate = () => {
      const folderId = formData.folder!.id;
      const url = `https://picsum.photos/id/${formData.loremPicsumId}/${formData.width}/${formData.height}`;
      const newItem: MediaItem = {
         url,
         id: uuid.v4(),
         name: formData.name!,
         type: formData.type!,
         thumbnailUrl: url,
      };
      dispatch(addItems({ items: [newItem], folderId }));
      setFormData({ ...initialDormData });
   };

   return (
      <Dialog.Root>
         <AppTooltip content="Upload a file">
            <Dialog.Trigger>
               <Button>
                  <FilePlusIcon />
               </Button>
            </Dialog.Trigger>
         </AppTooltip>
         <Dialog.Content>
            <Dialog.Title>Upload a file</Dialog.Title>
            <Dialog.Description>
               <Text>Mock a file as being uploaded to server</Text>
            </Dialog.Description>
            <Flex direction="column" gapY="2" pt="5" pb="2">
               <FolderSelector
                  width="200px"
                  selected={formData.folder ?? selectedFolder!}
                  onSelect={(folder) =>
                     setFormData((fd) => ({ ...fd, folder }))
                  }
               />
               <TextField.Root
                  placeholder="Width"
                  name="width"
                  type="number"
                  className="w-[200px]"
                  min="0"
                  onChange={handleChange}
               >
                  <TextField.Slot>
                     <WidthIcon />
                  </TextField.Slot>
               </TextField.Root>
               <TextField.Root
                  placeholder="Height"
                  name="height"
                  type="number"
                  className="w-[200px]"
                  min="0"
                  onChange={handleChange}
               >
                  <TextField.Slot>
                     <HeightIcon />
                  </TextField.Slot>
               </TextField.Root>
               <Select.Root defaultValue={MediaItemType.IMAGE}>
                  <Select.Trigger className="!w-[200px]" />
                  <Select.Content>
                     {allMediaTypes.map((type) => (
                        <Select.Item value={type} key={type}>
                           {type}
                        </Select.Item>
                     ))}
                  </Select.Content>
               </Select.Root>
               <TextField.Root
                  placeholder="File name"
                  name="name"
                  className="w-[200px]"
                  onChange={handleChange}
               >
                  <TextField.Slot>
                     <Pencil1Icon />
                  </TextField.Slot>
               </TextField.Root>
               <TextField.Root
                  placeholder="Lorem picsum ID"
                  name="loremPicsumId"
                  className="w-[200px]"
                  onChange={handleChange}
               >
                  <TextField.Slot>
                     <StarIcon />
                  </TextField.Slot>
               </TextField.Root>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
               <Dialog.Close>
                  <Button variant="soft" color="gray">
                     Cancel
                  </Button>
               </Dialog.Close>
               <Dialog.Close>
                  <Button onClick={handleCreate}>Save</Button>
               </Dialog.Close>
            </Flex>
         </Dialog.Content>
      </Dialog.Root>
   );
};

export default memo(UploadFileInput);
