import {
  SliderState,
  SliderActionTypes,
  GET_SLIDER_DATA_SUCCESS,
  GET_SLIDER_DATA_REQUEST,
  GET_SLIDER_DATA_FAIL,
  SAVE_SLIDER_DATA_SUCCESS,
  SAVE_SLIDER_DATA_REQUEST,
  SAVE_SLIDER_DATA_FAIL,
  CLEAR_SLIDER_DATA,
} from './type';

const initialState: SliderState = {
  status: 'idle',
  data: [],
  error: null,
  isSaving: false,
  savingError: null,
};

const reducer = (
  state: SliderState = initialState,
  action: SliderActionTypes
): SliderState => {
  switch (action.type) {
    case GET_SLIDER_DATA_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case GET_SLIDER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'succeeded',
      };
    case GET_SLIDER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        status: 'failed',
      };
    case SAVE_SLIDER_DATA_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case SAVE_SLIDER_DATA_SUCCESS:
      return {
        ...state,
        isSaving: false,
        savingError: null,
      };
    case SAVE_SLIDER_DATA_FAIL:
      return {
        ...state,
        isSaving: false,
        savingError: action.error,
      };
    case CLEAR_SLIDER_DATA:
      return {
        error: null,
        status: 'idle',
        data: [],
        isSaving: false,
        savingError: null,
      };
    default:
      return state;
  }
};

export default reducer;
