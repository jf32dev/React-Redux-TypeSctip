interface IDataBase {
  id: string;
  name: string;
  code: string;
}

export interface ICurrency extends IDataBase {}

export interface ICountry extends IDataBase {}

export interface IRegion extends IDataBase {
  countryId: string;
  status: number;
}

export interface ILanguage extends IDataBase {}
