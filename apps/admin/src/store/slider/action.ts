import { push, RouterAction } from 'connected-react-router';
import { AppThunkAction } from '../index';
import {
  SliderActionTypes,
  GET_SLIDER_DATA_REQUEST,
  GET_SLIDER_DATA_FAIL,
  GET_SLIDER_DATA_SUCCESS,
  SAVE_SLIDER_DATA_REQUEST,
  SAVE_SLIDER_DATA_FAIL,
  SAVE_SLIDER_DATA_SUCCESS,
  CLEAR_SLIDER_DATA,
} from './type';
import { SliderDataUpdate } from '../../api/services/slider/type';
import sliderService from '../../api/services/slider';

export const getSliderList = (
  calcId: string
): AppThunkAction<SliderActionTypes> => async (dispatch) => {
  dispatch({
    type: GET_SLIDER_DATA_REQUEST,
  });

  const sliders = await sliderService.getSliderByCalculatorId(calcId);

  if (sliders.value) {
    dispatch({
      type: GET_SLIDER_DATA_SUCCESS,
      payload: sliders.value.data.data,
    });
    return;
  }
  dispatch({
    type: GET_SLIDER_DATA_FAIL,
    error: sliders.error?.message,
  });
};

export const saveSlider = (
  sliderData: SliderDataUpdate
): AppThunkAction<SliderActionTypes | RouterAction> => async (dispatch) => {
  dispatch({
    type: SAVE_SLIDER_DATA_REQUEST,
  });

  const sliderResponse = await sliderService.updateSlider(sliderData);

  if (sliderResponse.value) {
    dispatch({
      type: SAVE_SLIDER_DATA_SUCCESS,
    });
    dispatch(push('/calculator'));
    return;
  }

  dispatch({
    type: SAVE_SLIDER_DATA_FAIL,
    error: sliderResponse.error?.message,
  });
};

export const clearSliderData = () => ({
  type: CLEAR_SLIDER_DATA,
});
