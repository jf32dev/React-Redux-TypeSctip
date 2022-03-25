import { Action } from 'redux';
import { CalculatorData } from '../../api/services/calculator/type';
import { TStatus } from '../sharedType';

export interface CalculatorState {
  list: {
    status: TStatus;
    data: CalculatorData[];
    hasMore: boolean;
    error?: string | null;
  };
}

export const GET_CALCULATOR_LIST_REQUEST =
  'calculator/getCalculatorListRequest';
export const GET_CALCULATOR_LIST_SUCCESS =
  'calculator/getCalculatorListSuccess';
export const GET_CALCULATOR_LIST_FAIL = 'calculator/getCalculatorListFail';

interface GetCalculatorListRequestAction
  extends Action<typeof GET_CALCULATOR_LIST_REQUEST> {}
interface GetCalculatorListRequestSuccessAction
  extends Action<typeof GET_CALCULATOR_LIST_SUCCESS> {
  payload: {
    data: CalculatorData[];
    hasMore: boolean;
  };
}

interface GetCalculatorListRequestFailAction
  extends Action<typeof GET_CALCULATOR_LIST_FAIL> {
  error?: string;
}

export type CalculatorActionTypes =
  | GetCalculatorListRequestAction
  | GetCalculatorListRequestSuccessAction
  | GetCalculatorListRequestFailAction;
