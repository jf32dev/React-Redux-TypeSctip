import * as React from 'react';
import { useFormState } from 'react-final-form';
import useFilterRegion from '../../hooks/useFilterRegion';
import { FieldSelect } from './components';

const Region = () => {
  const { country } = useFormState().values;

  const { status, data, error } = useFilterRegion(country?.value);

  const getPlaceholder = () => {
    switch (status) {
      case 'succeeded':
        if (data?.length === 0) return 'No regions available';
        return undefined;
      case 'failed':
        if (error) return error;
        return undefined;
      case 'loading':
        return 'Loading...';
      default:
        return undefined;
    }
  };

  return (
    <FieldSelect
      disabled={!country || !data || data?.length === 0}
      errorMessage="Please enter Region/City"
      label="Region/City"
      name="region"
      options={data || []}
      placeholder={getPlaceholder()}
      required={!(data?.length === 0)}
      searchable={!!(data && data?.length > 5)}
    />
  );
};

export default Region;
