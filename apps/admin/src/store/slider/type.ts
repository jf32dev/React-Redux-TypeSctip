import { Action } from 'redux';
import { SliderData } from '../../api/services/slider/type';
import { TStatus } from '../sharedType';

export interface SliderState {
  status: TStatus;
  data: SliderData[];
  error?: string | null;
  isSaving: boolean;
  savingError?: string | null;
}

export const GET_SLIDER_DATA_REQUEST = 'slider/getSliderDataRequest';
export const GET_SLIDER_DATA_SUCCESS = 'slider/getSliderDataSuccess';
export const GET_SLIDER_DATA_FAIL = 'slider/getSliderDataFail';

export const SAVE_SLIDER_DATA_REQUEST = 'slider/saveSliderDataRequest';
export const SAVE_SLIDER_DATA_SUCCESS = 'slider/saveSliderDataSuccess';
export const SAVE_SLIDER_DATA_FAIL = 'slider/saveSliderDataFail';

export const CLEAR_SLIDER_DATA = 'slider/clearSliderData';

interface GetSliderDataRequestAction
  extends Action<typeof GET_SLIDER_DATA_REQUEST> {}

interface GetSliderDataRequestSuccessAction
  extends Action<typeof GET_SLIDER_DATA_SUCCESS> {
  payload: SliderData[];
}
interface GetSliderDataRequestFailAction
  extends Action<typeof GET_SLIDER_DATA_FAIL> {
  error?: string;
}

interface SaveSliderDataRequestAction
  extends Action<typeof SAVE_SLIDER_DATA_REQUEST> {}
interface SaveSliderDataRequestSuccessAction
  extends Action<typeof SAVE_SLIDER_DATA_SUCCESS> {}

interface SaveSliderDataRequestFailAction
  extends Action<typeof SAVE_SLIDER_DATA_FAIL> {
  error?: string;
}

interface ClearSliderDataAction extends Action<typeof CLEAR_SLIDER_DATA> {}

export type SliderActionTypes =
  | GetSliderDataRequestAction
  | GetSliderDataRequestSuccessAction
  | GetSliderDataRequestFailAction
  | SaveSliderDataRequestAction
  | SaveSliderDataRequestSuccessAction
  | SaveSliderDataRequestFailAction
  | ClearSliderDataAction;
