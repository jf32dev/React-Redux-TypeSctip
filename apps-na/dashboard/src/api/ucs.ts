import { UniversalContentServices } from '@redbull/services';
import envConfig from '../config';
import bridgeServices from './service';

const ucs = new UniversalContentServices(envConfig.ucs.baseUrl);

ucs.configure().interceptors.request.use(async (config) => {
  /**
   * * Not gonna put access token to any form of storage because
   * 1. It's been in the storage of the parent(hub), so we don't need to put it again into our own one.
   * 2. Since it's already in the hub, calling `getAccessToken` won't go through the network, which is technically just a sync-call.
   * 3. We don't have the control to refresh the token from the btca, it's all relying on the hub.
   *    - which means if we store it, it's more likely to be expired than calling the hub one everytime.
   */
  const token = await bridgeServices.getAccessToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      ...(token.value?.accessToken && {
        Authorization: `Bearer ${token.value.accessToken}`,
      }),
    },
  };
});

export default ucs;
