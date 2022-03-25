import { ICountry, ILanguage, IRegion } from '../fields/type';

export enum EApplicationFilter {
  APPROVED = 'approved',
  DENIED = 'declined',
  PENDING = 'pending',
}

export enum EApplicationStatus {
  APPROVED = 'Approved',
  DECLINED = 'Declined',
  NONE = 'None',
}

export interface IApplication {
  id: string;
  submitted: string;
  actioned: string;
  processed: string;
  result: EApplicationStatus;
  firstName: string;
  lastName: string;
  email: string;
  country: ICountry;
  region: IRegion;
  language: ILanguage;
  agency: string;
  groups: string[] | null;
  processResult: string | null;
}

export interface IUserGroup {
  id: string;
  name: string;
}

export enum EApplicationAction {
  APPROVE = 'approve',
  DECLINE = 'decline',
}
export interface IUpdateApplicationStatus {
  action: EApplicationAction;
  groupIds?: string[];
}
