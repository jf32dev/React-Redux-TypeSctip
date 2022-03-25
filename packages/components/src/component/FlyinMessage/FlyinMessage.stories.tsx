import React from 'react';
import { FlyinProvider, useFlyin } from '.';
import { Button } from '../Button';

export default {
  title: 'Flyin Message',
  component: FlyinProvider,
  decorators: [
    (Story: any) => (
      <FlyinProvider>
        <Story />
      </FlyinProvider>
    ),
  ],
};

export const Default = () => {
  const { addFlyin } = useFlyin();
  const handleInfoMessage = () => {
    addFlyin('This is an info message', {
      dismissTimeout: 3000,
    });
  };
  const handleSuccessMessage = () => {
    addFlyin('This is an success message', {
      dismissTimeout: 3000,
      type: 'success',
    });
  };
  const handleWarningMessage = () => {
    addFlyin('This is an warning message', {
      dismissTimeout: 3000,
      type: 'warning',
    });
  };
  const handleDangerMessage = () => {
    addFlyin('This is an danger message', {
      dismissTimeout: 3000,
      type: 'danger',
    });
  };
  return (
    <div>
      <Button onClick={handleInfoMessage}>Click me for Info!</Button>
      <br />
      <br />
      <Button onClick={handleSuccessMessage}>Click me for Success!</Button>
      <br />
      <br />
      <Button onClick={handleDangerMessage}>Click me for Danger!</Button>
      <br />
      <br />
      <Button onClick={handleWarningMessage}>Click me for Warning!</Button>
    </div>
  );
};

export const WithAction = () => {
  const { addFlyin } = useFlyin();
  const handleInfoMessage = () => {
    addFlyin('This is an info message', {
      dismissTimeout: 3000,
      actionText: 'info',
      action: () => alert('info'),
    });
  };
  const handleSuccessMessage = () => {
    addFlyin('This is an success message', {
      dismissTimeout: 3000,
      type: 'success',
      actionText: 'success',
      action: () => alert('success'),
    });
  };
  const handleWarningMessage = () => {
    addFlyin('This is an warning message', {
      dismissTimeout: 3000,
      type: 'warning',
      actionText: 'warning',
      action: () => alert('warning'),
    });
  };
  const handleDangerMessage = () => {
    addFlyin('This is an danger message', {
      dismissTimeout: 3000,
      type: 'danger',
      actionText: 'danger',
      action: () => alert('danger'),
    });
  };
  return (
    <div>
      <Button onClick={handleInfoMessage}>Click me for Info!</Button>
      <br />
      <br />
      <Button onClick={handleSuccessMessage}>Click me for Success!</Button>
      <br />
      <br />
      <Button onClick={handleDangerMessage}>Click me for Danger!</Button>
      <br />
      <br />
      <Button onClick={handleWarningMessage}>Click me for Warning!</Button>
    </div>
  );
};
