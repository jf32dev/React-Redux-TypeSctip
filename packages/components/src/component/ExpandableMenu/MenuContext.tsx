import * as React from 'react';

interface IMenuContext {}

export const MenuContext = React.createContext<IMenuContext>({});

/**
 * Context is currently not in use for Menu component
 * I am keeping it here in case it's needed for further
 * implementation / integration with the API etc.
 */
export const useMenuContext = () => {
  const context = React.useContext(MenuContext);

  if (!context) {
    throw new Error(
      'Menu compound components cannot be rendered outside the Menu component.'
    );
  }

  return context;
};
