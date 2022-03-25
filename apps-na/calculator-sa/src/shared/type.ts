import { CountryCode } from '@redbull/common';

export type SelectField = {
  name: string;
  options: SelectOption[];
};

export type SelectOption = {
  label: string;
  value: React.ReactText;
};

export type PdfData = {
  blob: Blob | null;
  title: string;
  channelId: number;
};

export type TSetValue<T, V = number | { label: string; value: string }> = (
  field: keyof T,
  value: V | null
) => void;

export type WizardPageRenderProps<
  T,
  V = number | { label: string; value: string }
> = {
  setValue: TSetValue<T, V>;
  values: T;
};

export type WizardHeadingRenderProps<T, V = string> = {
  activePage: number;
  resetForm: () => void;
  setValue: (field: keyof T, value: V | null) => void;
  values: T;
};

export interface CalculatorAPIResponse<T> {
  calculator: {
    id: string;
    country: string;
    countryCode: CountryCode;
    name: string;
  };
  fields: { name: string }[];
  sliders: Config[];
  data: T[];
}
export interface Config {
  [key: string]: any;
  name: string;
  min: number;
  max: number;
  step: number;
  default: number;
  units: 'currency' | 'percentage' | 'units';
}
