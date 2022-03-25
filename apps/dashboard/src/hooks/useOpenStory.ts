import React from 'react';
import { EEntityType } from '@redbull/services';
import bridgeServices from '../api/service';

type TOpenStoryReturn = [
  (id: number, disableLegacyRouting?: boolean) => Promise<void>,
  string,
  () => void
];
const useOpenStory = (): TOpenStoryReturn => {
  const [error, setError] = React.useState('');
  const open = React.useCallback(
    async (id: number, disableLegacyRouting = true) => {
      const value = await bridgeServices.openEntity({
        entityName: EEntityType.STORY,
        id,
        disableLegacyRouting,
      });
      if (value.hasError) {
        setError(JSON.stringify(value.error));
      }
    },
    []
  );

  const resetError = React.useCallback(() => setError(''), []);
  return [open, error, resetError];
};

export default useOpenStory;
