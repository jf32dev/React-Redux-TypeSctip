import React from 'react';
import { TOption } from './type';

type TFlyinContext = {
  addFlyin: (message: string, options?: TOption) => void;
  removeFlyin: (id: string) => void;
};

export const FlyinMessageContext = React.createContext<TFlyinContext>({
  addFlyin: () => {},
  removeFlyin: () => {},
});

export const useFlyin = () => {
  const context = React.useContext<TFlyinContext>(FlyinMessageContext);

  if (!context) {
    throw new Error('No Flyin Context');
  }
  return context;
};
