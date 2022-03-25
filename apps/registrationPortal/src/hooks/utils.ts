import { TData } from './type';

export const mapFieldOptions = (data: TData[]) =>
  data.map((cur) => ({
    label: cur.name,
    value: cur.id,
  }));
