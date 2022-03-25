import { startCase } from 'lodash';
import * as React from 'react';
import applicationService from '../api/services/application';
import { IApplication } from '../api/services/application/type';
import { TStatus } from './type';

type ReturnValue = {
  createApplication: (data: IApplication) => void;
  status: TStatus;
  error: string | null;
};

const useCreateApplication = (): ReturnValue => {
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<TStatus>('idle');

  const createApplication = React.useCallback(async (data: IApplication) => {
    setStatus('loading');

    const appResponse = await applicationService.createApplication(data);

    if (appResponse.error) {
      setError(
        startCase(
          appResponse.error.responseMessage || appResponse.error.message
        )
      );
      setStatus('failed');
    } else if (appResponse.value?.data) {
      setStatus('succeeded');
    }
  }, []);

  return { createApplication, status, error };
};

export default useCreateApplication;
