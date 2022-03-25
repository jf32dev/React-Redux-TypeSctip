import React from 'react';
import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
};

export const LongContent = () => {
  const [isOpen, setOpen] = React.useState(false);

  const openModal = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal closeModal={closeModal} isOpen={isOpen} title="Modal Title">
        {[...new Array(100)].map(() => (
          <p>Some really long modal content</p>
        ))}
      </Modal>
      <button onClick={openModal}>Toggle Modal</button>
    </>
  );
};

export const ShortContent = () => {
  const [isOpen, setOpen] = React.useState(false);

  const openModal = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal closeModal={closeModal} isOpen={isOpen} title="Modal Title">
        <p>Some really short modal content</p>
      </Modal>
      <button onClick={openModal}>Toggle Modal</button>
    </>
  );
};
