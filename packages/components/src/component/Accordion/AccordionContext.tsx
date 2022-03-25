import React from 'react';

type TContext = {
  expanded: string[];
  setExpanded: (id: string[]) => void;
  multiExpand: boolean;
};
const AccordionContext = React.createContext<TContext>({
  expanded: [],
  setExpanded: () => {},
  multiExpand: false,
});

export const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component.'
    );
  }

  return context;
};
export default AccordionContext;
