import * as React from 'react';
import { useIsMounted } from '@redbull/common';
import { useFlyin } from '@redbull/components';
import { UCLinkParams } from '@redbull/services';
import ucs from '../api/ucs';

type Params = UCLinkParams & {
  enabled?: boolean;
};

type ReturnType = {
  src: string | null;
  isLoading: boolean;
  error: string;
  embed: () => void;
  reset: () => void;
};

export const useUCSLink = ({
  btcUrn,
  userInterfaceMode,
  authenticationMode,
  enabled = true,
}: Params): ReturnType => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [src, setSrc] = React.useState<string | null>(null);

  const isMounted = useIsMounted();

  const fly = useFlyin();

  const embed = React.useCallback(async () => {
    setIsLoading(true);

    const link = await ucs.generateLink({
      btcUrn,
      userInterfaceMode,
      authenticationMode,
    });

    if (isMounted.current) {
      if (link.value && link.value.data.data.url && !link.hasError) {
        setSrc(link.value.data.data.url);
      } else {
        setError(
          JSON.stringify(link.error || 'failed to get zunos object url')
        );
      }
      setIsLoading(false);
    }
  }, [btcUrn, userInterfaceMode, authenticationMode, isMounted]);

  React.useEffect(() => {
    if (error) {
      fly.addFlyin(error, {
        type: 'danger',
        id: error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  React.useEffect(() => {
    if (enabled) {
      embed();
    }
  }, [embed, enabled]);

  const reset = React.useCallback(() => {
    setSrc(null);
    setIsLoading(false);
    setError('');
  }, []);

  return {
    src,
    error,
    isLoading,
    embed,
    reset,
  };
};
