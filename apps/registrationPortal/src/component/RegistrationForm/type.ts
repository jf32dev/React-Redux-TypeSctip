import { ISelectOption } from '../../hooks/type';

export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  country: ISelectOption;
  region: ISelectOption;
  language: ISelectOption;
  agency: string;
}
