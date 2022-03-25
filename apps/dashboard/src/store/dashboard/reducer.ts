import {
  DashboardActionTypes,
  SET_DASHBOARD_SELECTED_TAB,
  DashboardState,
} from './type';

const initialState: DashboardState = {
  selectedTab: null,
};

const reducer = (
  state: DashboardState = initialState,
  action: DashboardActionTypes
) => {
  switch (action.type) {
    case SET_DASHBOARD_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
