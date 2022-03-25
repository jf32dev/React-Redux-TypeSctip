import { LOCAL_TERMS_KEY } from '../../store/search/type';

export const getLocalSuggestions = () => {
  const localTerms = localStorage.getItem(LOCAL_TERMS_KEY);
  return localTerms ? (JSON.parse(localTerms) as string[]) : [];
};
