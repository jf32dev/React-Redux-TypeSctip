import * as React from 'react';
import { ECloseFileViewer } from '@redbull/services';
import bridgeServices from '../api/service';

type TReturn = [() => void, boolean, string | null];
const useCloseCalculator = (): TReturn => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const close = React.useCallback(async () => {
    setLoading(true);

    // TODO: move this to currentTab, on iOS it seems like the closing currentTab doesnt work on iOS
    const response = await bridgeServices.closeFileViewer({
      option: ECloseFileViewer.ALL,
    });
    if (response.hasError) {
      setError(JSON.stringify(response.error));
    }
    setLoading(false);
  }, []);

  return [close, loading, error];
};

export default useCloseCalculator;
