import {
   type FC,
   type MouseEventHandler,
   type PropsWithChildren,
   useEffect,
   useRef,
} from 'react';

import { Modal } from '~/components';

export interface BackdropProps {
   onClose?: () => void;
   open?: boolean;
}

const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({
   children,
   onClose,
   open = true,
}) => {
   const backdropRef = useRef<HTMLDivElement>(null);

   const handleClick: MouseEventHandler = (event) => {
      if (event.target === backdropRef.current) {
         onClose?.();
      }
   };

   useEffect(() => {
      if (open) {
         document.body.classList.add('overflow-hidden');
      }
      return () => {
         document.body.classList.remove('overflow-hidden');
      };
   }, [open]);

   return (
      <Modal>
         <div
            ref={backdropRef}
            className="absolute flex items-center justify-center w-screen h-[100vh] max-w-screen max-h-[100vh]
            bg-black/50 cursor-default z-50 top-0 left-0"
            onClick={handleClick}
         >
            {children}
         </div>
      </Modal>
   );
};

export default Backdrop;
