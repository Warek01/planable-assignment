import type { FC } from 'react';
import { Tooltip } from '@radix-ui/themes';
import type { TooltipProps } from '@radix-ui/themes';

const AppTooltip: FC<TooltipProps> = (props) => {
   return !!props.content ? (
      <Tooltip {...props}>{props.children}</Tooltip>
   ) : (
      props.children
   );
};

export default AppTooltip;
