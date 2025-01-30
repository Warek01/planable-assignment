import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children }) => {
   return createPortal(children, document.body);
};

export default Modal;
