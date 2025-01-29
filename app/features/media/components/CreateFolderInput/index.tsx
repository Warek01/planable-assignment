import { type ChangeEventHandler, type FC, useState } from 'react';
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes';

import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { createFolder, selectAllFolderNames } from '~/features/media/slice';

const CreateFolderInput: FC = () => {
   const dispatch = useAppDispatch();
   const allFolderNames = useAppSelector(selectAllFolderNames);
   const [newFolderName, setNewFolderName] = useState('');

   const isValid = !!newFolderName.trim();
   const folderExists = allFolderNames.includes(newFolderName);

   const handleSubmit = () => {
      if (folderExists || !isValid) {
         return;
      }

      dispatch(createFolder({ folderName: newFolderName.trim() }));
      setNewFolderName('');
   };

   const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setNewFolderName(event.target.value);
   };

   return (
      <Box>
         <Flex align="center" gap="1">
            <TextField.Root
               placeholder="Folder name"
               size="1"
               value={newFolderName}
               onChange={handleChange}
            />
            <Button onClick={handleSubmit} size="1" disabled={folderExists}>
               Create
            </Button>
         </Flex>
         {folderExists && isValid && (
            <Text>{newFolderName} already exists</Text>
         )}
      </Box>
   );
};

export default CreateFolderInput;
