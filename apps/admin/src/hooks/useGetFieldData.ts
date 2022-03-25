import * as React from 'react';
import fieldsService from '../api/services/fields';
import { EFieldDataType, IFieldSelect } from '../api/services/fields/type';
import { TStatus } from '../store/sharedType';

type ReturnValue = {
  status: TStatus;
  select: IFieldSelect[];
  input: { name: string; label: string }[];
  error: string | null;
};

const useGetFieldData = (calcId: string): ReturnValue => {
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [select, setSelect] = React.useState<IFieldSelect[]>([]);
  const [input, setInput] = React.useState<{ name: string; label: string }[]>(
    []
  );

  const getFields = React.useCallback(async (calculatorId: string) => {
    setStatus('loading');

    const fields = await fieldsService.getFieldsByCalculatorId(calculatorId);

    if (fields.error) {
      setError(fields.error.message);
      setStatus('failed');
    } else if (fields.value) {
      const selectFields: IFieldSelect[] = fields.value.data.data
        .filter((field) => field.dataType === EFieldDataType.OPTION)
        .map<IFieldSelect>((field) => {
          const { id, name, displayName, fieldValues } = field;
          const options = fieldValues.map((fieldValue) => ({
            label: `${fieldValue.value}${name === 'size' ? 'ml' : ''}`,
            value: fieldValue.id,
          }));
          return {
            id,
            label: displayName,
            name,
            options,
          };
        });
      const inputFields: {
        name: string;
        label: string;
      }[] = fields.value.data.data
        .filter(
          (field) =>
            (field.dataType === EFieldDataType.STRING ||
              field.dataType === EFieldDataType.NUMBER) &&
            field.name !== 'backgroundColor'
        )
        .map<{ name: string; label: string }>((field) => ({
          name: field.name,
          label: field.displayName,
        }));

      setInput(inputFields);
      setSelect(selectFields);
      setStatus('succeeded');
    }
  }, []);

  React.useEffect(() => {
    if (calcId) {
      getFields(calcId);
    }
  }, [calcId, getFields]);

  return { status, input, select, error };
};

export default useGetFieldData;
