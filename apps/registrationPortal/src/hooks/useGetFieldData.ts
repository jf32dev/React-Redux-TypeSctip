import * as React from 'react';
import fieldsService from '../api/services/fields';
import { TStatus, IFieldsData } from './type';
import { mapFieldOptions } from './utils';

type ReturnValue = {
  status: TStatus;
  data: IFieldsData | null;
  error: string | null;
};

/**
 * Gets fields options for Country and Language
 */
const useGetFieldData = (): ReturnValue => {
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [data, setData] = React.useState<IFieldsData | null>(null);

  const getFields = React.useCallback(async () => {
    setStatus('loading');

    const [country, language] = await Promise.all([
      fieldsService.getCountry(),
      fieldsService.getLanguage(),
    ]);

    const responseError = country.error || language.error;

    if (responseError) {
      setError('There was an error fetching fields.');
      setStatus('failed');
    } else if (country.value && language.value) {
      const countryFields = mapFieldOptions(country.value.data.data);
      const languageFields = mapFieldOptions(language.value.data.data);

      const allFieldsData = {
        country: countryFields,
        language: languageFields,
      };

      setData(allFieldsData);
      setStatus('succeeded');
    }
  }, []);

  React.useEffect(() => {
    getFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, data, error };
};

export default useGetFieldData;
