import * as React from 'react';
import fieldsService from '../api/services/fields';
import { TStatus, ISelectOption } from './type';
import { mapFieldOptions } from './utils';

type ReturnValue = {
  status: TStatus;
  data: ISelectOption[] | null;
  error: string | null;
};

/**
 * Gets filtered region options by selected country
 * @param countryId
 */
const useFilterRegion = (countryId: string): ReturnValue => {
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [data, setData] = React.useState<ISelectOption[] | null>(null);

  const getFields = React.useCallback(async (id: string) => {
    setStatus('loading');

    const region = await fieldsService.getRegionByCountryId(id);

    if (region.error) {
      setError('There was an error fetching fields.');
      setStatus('failed');
    } else if (region.value) {
      const regionData = region.value.data.data;
      const regionOptions = mapFieldOptions(regionData);

      setData(regionOptions);
      setStatus('succeeded');
    }
  }, []);

  React.useEffect(() => {
    if (countryId) {
      getFields(countryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);

  return { status, data, error };
};

export default useFilterRegion;
