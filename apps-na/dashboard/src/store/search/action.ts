import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import ucs from '../../api/ucs';
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
  const [stories, files, zunos] = await Promise.all([
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
    ucs.search({
      query: term,
      target: 'zunos',
      filter: {
        types: ['achievement', 'course'],
      },
      options: {
        thumbnailSizeHint: 'medium',
      },
    }),
  ]);

  if (stories.hasError || files.hasError || zunos.hasError) {
    dispatch({
      type: SEARCH_FAIL,
      payload: JSON.stringify(
        stories.error || files.error || zunos.error?.message
      ),
    });
  }

  if (files.value || stories.value || zunos.value) {
    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        files: files.value,
        stories: stories.value,
        zunos: zunos.value?.data.data.items || [],
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
