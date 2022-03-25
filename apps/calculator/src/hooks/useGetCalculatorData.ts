import React from 'react';
import { EHttpMethod, File } from '@redbull/services';
import { CountryCode } from '@redbull/common';

import envConfig from '../config';
import bridgeServices from '../api/service';

import {
  CalculatorAPIResponse,
  Config,
} from '../component/Calculator/shared/type';
import { ECalculatorType } from '../component/Calculator/shared/config';
import useGetProductImages from './useGetProductImages';

type TUseCalculatorData<T> = {
  data: T[];
  config: Config[];
  loading: boolean;
  error: string;
  images: File[];
  imgsError: string;
  getData: (
    country: CountryCode,
    type: ECalculatorType,
    withImages: boolean,
    updateStorage?: boolean
  ) => void;
};

const useGetCalculatorData = <T>(): TUseCalculatorData<T> => {
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<T[]>([]);
  const [config, setConfig] = React.useState<Config[]>([]);

  const [images, imgsError, getImages] = useGetProductImages();

  const getData = React.useCallback(
    async (
      country: CountryCode,
      type: ECalculatorType,
      withImages: boolean,
      updateStorage: boolean = true
    ) => {
      setLoading(true);
      setError('');

      if (withImages) {
        getImages(country, type);
      }

      const unsafeToken = await bridgeServices.getAccessToken();
      if (unsafeToken.hasError) {
        setError(JSON.stringify(unsafeToken.error));
      }

      // whether it is online or offline, try to grab data from the API
      // proxy request will return error either way
      // when it happens, try to use the cache data.
      // currently using proxy request instead of 3rd party http request provider for mobile.
      const response = await bridgeServices.proxyRequest({
        url: `${envConfig.apiBase}/api/v1/generic-calculator/${type}/${country}`,
        method: EHttpMethod.GET,
        headers: {
          authorization: `Bearer ${unsafeToken.value.accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      // on devices 401 is being returned as a response value rather than error
      // TODO:
      // @ts-ignore
      if (response?.status === 401 || response?.value?.status === 401) {
        setError('Error: Unauthorized access to Calculator data.');
        setLoading(false);
        return;
      }

      const calculatorData = response.hasError
        ? null
        : (response.value as CalculatorAPIResponse<T>);

      if (calculatorData) {
        // Set Calculator data to a local storage every time it fetches a new data
        updateStorage &&
          localStorage.setItem(type, JSON.stringify(calculatorData));
        setData(calculatorData.data);
        setConfig(calculatorData.sliders);
        setLoading(false);
        return;
      }

      // if browser is offline or the api / network is error then use the previously set local storage data
      const serialisedData = localStorage.getItem(type);
      if (serialisedData) {
        const parsedData = JSON.parse(serialisedData) as CalculatorAPIResponse<
          T
        >;
        if (parsedData.calculator.countryCode === country) {
          setData(parsedData.data);
          setConfig(parsedData.sliders);
          setLoading(false);
          return;
        }
      }

      setError('Error: Failed to get the Calculator data.');
      setLoading(false);
    },
    [getImages]
  );

  return { data, config, loading, error, images, imgsError, getData };
};

export default useGetCalculatorData;
