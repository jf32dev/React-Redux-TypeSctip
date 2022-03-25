import { ICountry, ILanguage, IRegion } from '../api/services/fields/type';

export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IFieldsData {
  country: ISelectOption[];
  language: ISelectOption[];
}

export type TData = ILanguage | ICountry | IRegion;
