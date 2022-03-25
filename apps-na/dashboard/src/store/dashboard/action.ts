import { SET_DASHBOARD_SELECTED_TAB } from './type';

export const setDashboardSelectedTab = (tabname: string) => {
  return {
    type: SET_DASHBOARD_SELECTED_TAB,
    payload: tabname,
  };
};
