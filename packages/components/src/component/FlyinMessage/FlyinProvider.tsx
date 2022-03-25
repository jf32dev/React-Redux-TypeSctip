import React from 'react';
import { uniqueId } from 'lodash';
import { FlyinMessageContext } from './FlyinMessageContext';
import FlyinContainer from './container';
import { TFlyinMessage, TOption } from './type';

type Props = {
  isMobile?: boolean;
} & React.PropsWithChildren<{}>;

const FlyinProvider = ({ children, isMobile }: Props) => {
  const [list, setList] = React.useState<TFlyinMessage[]>([]);
  // const { isMobile } = React.useContext(BreakpointContext);

  const addFlyin = React.useCallback(
    (message: string, options?: TOption) => {
      // if there same id is provided then dont add again
      if (list.find((item) => item.id === options?.id)) {
        return;
      }
      setList((state) => {
        // basically in mobile append to the top
        // while in desktop / tablet append to the bottom
        if (isMobile) {
          return [
            {
              action: options?.action,
              actionText: options?.actionText,
              closeIcon: options?.closeIcon,
              dismissTimeout: options?.dismissTimeout || 3000,
              id: options?.id || uniqueId('flyin_'),
              type: options?.type || 'info',
              message,
              title: options?.title,
            },
            ...state,
          ];
        }
        return [
          ...state,
          {
            action: options?.action,
            actionText: options?.actionText,
            closeIcon: options?.closeIcon,
            dismissTimeout: options?.dismissTimeout || 3000,
            id: options?.id || uniqueId('flyin_'),
            type: options?.type || 'info',
            message,
            title: options?.title,
          },
        ];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const removeFlyin = React.useCallback(
    (id: string) => {
      setList((state) => state.filter((item: TFlyinMessage) => item.id !== id));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <FlyinMessageContext.Provider
      value={{
        addFlyin,
        removeFlyin,
      }}
    >
      <FlyinContainer list={list} />
      {children}
    </FlyinMessageContext.Provider>
  );
};

export default FlyinProvider;
