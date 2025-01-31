import type { FC } from 'react';
import { Flex, Heading, Text } from '@radix-ui/themes';

export interface FolderHeroProps {
   title?: string;
   subtitle?: string;
}

const FolderHero: FC<FolderHeroProps> = ({ title, subtitle }) => {
   return (
      <Flex
         align="center"
         justify="center"
         width="100%"
         position="absolute"
         top="0"
         bottom="0"
      >
         <Flex align="center" direction="column" gap="2">
            <img alt="media gallery" src="/empty-folder-hero.png" />
            {title && (
               <Heading weight="medium" mt="4" style={{ fontSize: '30px' }}>
                  {title}
               </Heading>
            )}
            {subtitle && <Text>{subtitle}</Text>}
         </Flex>
      </Flex>
   );
};

export default FolderHero;
