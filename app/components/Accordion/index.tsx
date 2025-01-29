import { type FC, type PropsWithChildren, useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';

export interface AccordionProps {
   defaultOpened?: boolean;
}

const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
   children,
   defaultOpened = true,
}) => {
   const [opened, setOpened] = useState(defaultOpened);

   return (
      <Flex>
         <Box>{children}</Box>
      </Flex>
   );
};

export default Accordion;
