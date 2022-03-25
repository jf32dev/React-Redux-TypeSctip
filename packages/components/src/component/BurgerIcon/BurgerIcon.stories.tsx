import React from 'react';
import BurgerIcon from './BurgerIcon';

export default {
  title: 'Burger Icon',
  component: BurgerIcon,
};

export const Default = () => {

  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(o => !o);
  }

  return <BurgerIcon onClick={toggle} isOpen={open} />

};
