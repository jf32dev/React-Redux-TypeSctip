interface IDataBase {
  id: string;
  name: string;
  code: string;
}

export interface ICurrency extends IDataBase {}

export interface ICountry extends IDataBase {}

export interface IRegion extends IDataBase {
  country: ICountry;
  status: number;
}

export interface ILanguage extends IDataBase {}

interface FieldValue {
  id: string;
  value: string;
}

export enum EFieldDataType {
  OPTION = 'Option',
  STRING = 'String',
  NUMBER = 'Number',
}

export interface IFieldData {
  id: string;
  name: string;
  displayName: string;
  dataType: EFieldDataType;
  fieldValues: FieldValue[];
}

export interface IFieldSelect {
  id: string;
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
}
