import { Action } from 'redux';
import { SearchFile, SearchStory, UCSearchResult } from '@redbull/services';

export interface SearchState {
  term: string;
  files: SearchFile[];
  stories: SearchStory[];
  zunos: UCSearchResult[];
  loading: boolean;
  error?: any;
}

export const LOCAL_TERMS_KEY = 'searchTerms';

export const SET_SEARCH_TERM = 'search/setTerm';
export const SEARCH_REQUEST = 'search/searchRequest';
export const SEARCH_SUCCESS = 'search/searchSuccess';
export const SEARCH_FAIL = 'search/searchFail';

interface SearchSetTermAction extends Action<typeof SET_SEARCH_TERM> {
  payload: string;
}

interface SearchRequestAction {
  type: typeof SEARCH_REQUEST;
}

interface SearchSuccessAction extends Action<typeof SEARCH_SUCCESS> {
  payload: {
    files: SearchFile[];
    stories: SearchStory[];
    zunos: UCSearchResult[];
  };
}

interface SearchFailAction extends Action<typeof SEARCH_FAIL> {
  payload: any;
}

export type SearchActionTypes =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchFailAction
  | SearchSetTermAction;
