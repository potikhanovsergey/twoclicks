import { createContext, Dispatch, SetStateAction } from 'react';

export interface IModalContextValue {
  canvasComponentsModal: boolean;
  canvasSectionsModal: boolean;
}

export const ModalContext = createContext<
[IModalContextValue, Dispatch<SetStateAction<IModalContextValue>>] | []
>([]);
