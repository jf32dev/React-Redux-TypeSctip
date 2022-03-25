import { Mutator } from 'final-form';
import { IApplication } from '../../api/services/application/type';
import { ISelectOption } from '../../hooks/type';
import { IRegistrationForm } from './type';

export const setValue: Mutator<IRegistrationForm> = (
  [field, value],
  state,
  { changeValue }
) => {
  changeValue(state, field, () => value);
};

export const validateEmail = (val: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
};

export const mapFormStateToDataObject = (values: IRegistrationForm) => {
  const selectFields = ['language', 'country', 'region'];
  const fieldMap = {
    partner: 'agency',
  };
  const dataObject: IApplication = {} as IApplication;

  Object.keys(values).forEach((key) => {
    const value = values[key as keyof IApplication];
    const fieldName = (fieldMap[key as keyof typeof fieldMap] ||
      key) as keyof IApplication;

    if (selectFields.includes(key)) {
      dataObject[fieldName] = (value as ISelectOption)?.value;
    } else {
      dataObject[fieldName] = value as string;
    }
  });

  return dataObject;
};
