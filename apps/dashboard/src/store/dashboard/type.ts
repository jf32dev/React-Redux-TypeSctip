export interface DashboardState {
  selectedTab: string | null;
}

export const SET_DASHBOARD_SELECTED_TAB = 'dashboard/setSelectedTab';

interface SetDashboardSelectedTabAction {
  type: typeof SET_DASHBOARD_SELECTED_TAB;
  payload: string;
}

export type DashboardActionTypes = SetDashboardSelectedTabAction;
