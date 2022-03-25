import React from 'react';
import ProgressBar from './ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

const steps = [
  { label: 'Enter Details', id: 1 },
  { label: 'Enter Pricing', id: 2 },
  { label: 'Summary', id: 3 },
  { label: 'Picture it', id: 4 },
  { label: 'Test it', id: 5 },
];

export const Default = () => <ProgressBar activeStepId={1} steps={steps} />;
