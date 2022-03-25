import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import { getTermError } from '../../component/SearchResultsPage/config';
import {
  LOCAL_TERMS_KEY,
  SearchActionTypes,
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SET_SEARCH_TERM,
  SEARCH_SUCCESS,
} from './type';

export const search = (
  term: string
): AppThunkAction<SearchActionTypes> => async (dispatch) => {
  const termError = getTermError();

  if (term.length < 2) {
    dispatch({
      type: SEARCH_FAIL,
      payload: termError.tooShort,
    });
  }

  // Set loading
  dispatch({
    type: SEARCH_REQUEST,
  });

  // Search stories and files
  const [stories, files] = await Promise.all([
    bridgeServices.searchStories({
      q: term,
      limit: 50,
      hidden: false,
    }),
    bridgeServices.searchFiles({
      q: term,
      limit: 50,
      hidden: false,
    }),
  ]);

  if (stories.hasError || files.hasError) {
    dispatch({
      type: SEARCH_FAIL,
      payload: stories.error
        ? JSON.stringify(stories.error)
        : JSON.stringify(files.error),
    });
  } else {
    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        files: files.value,
        stories: stories.value,
      },
    });
  }
};

export const setTerm = (term: string): SearchActionTypes => {
  const localTerms = localStorage.getItem(LOCAL_TERMS_KEY);
  const suggestions = localTerms ? (JSON.parse(localTerms) as string[]) : [];

  localStorage.setItem(
    LOCAL_TERMS_KEY,
    JSON.stringify([term, ...suggestions.filter((s) => s !== term)].slice(0, 5))
  );

  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};
