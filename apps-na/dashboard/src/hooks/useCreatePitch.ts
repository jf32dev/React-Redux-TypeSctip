import React from 'react';
import bridgeServices from '../api/service';

type TCreatePitchReturn = [() => Promise<void>, string];
const useCreatePitch = (): TCreatePitchReturn => {
  const [error, setError] = React.useState('');
  const create = React.useCallback(async () => {
    const value = await bridgeServices.createPitch({ visual: true });
    if (value.hasError) {
      setError(JSON.stringify(value.error));
    }
  }, []);

  return [create, error];
};

export default useCreatePitch;
