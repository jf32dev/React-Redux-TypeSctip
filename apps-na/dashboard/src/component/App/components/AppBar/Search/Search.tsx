import * as React from 'react';
import cx from 'classnames';

import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Button, EButtonVariant, List, useFlyin } from '@redbull/components';

import { ReactComponent as SearchIcon } from '@redbull/common/icons/search.svg';
import { ReactComponent as Cross } from '@redbull/common/icons/cross.svg';
import { ReactComponent as IconClock } from '@redbull/common/icons/clock.svg';

import { useTranslation } from 'react-i18next';
import { LOCAL_TERMS_KEY } from '../../../../../store/search/type';
import { setTerm } from '../../../../../store/search/action';
import { getTermError } from '../../../../SearchResultsPage/config';

import styles from './Search.module.scss';

const Search = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fly = useFlyin();

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isOpen, setOpen] = React.useState(false);

  const termError = getTermError();

  const localTerms = localStorage.getItem(LOCAL_TERMS_KEY);
  const suggestions = localTerms ? (JSON.parse(localTerms) as string[]) : [];

  const openSearch = () => {
    setOpen(true);
  };

  const closeSearch = () => {
    setOpen(false);
    clearInput();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    search();
  };

  const search = (value?: string) => {
    const term = value || inputRef.current?.value;
    // Search API only takes `q` that's length is >= 2
    if (term && term.length >= 2) {
      dispatch(setTerm(term));
      dispatch(push('/search'));
      closeSearch();
    } else {
      fly.addFlyin(termError.tooShort, {
        type: 'warning',
        id: termError.tooShort,
      });
    }
  };

  return (
    <>
      <SearchIcon onClick={openSearch} />
      <div className={cx(styles.overlay, isOpen && styles.open)} />
      <div className={cx(styles.container, isOpen && styles.open)}>
        <div className={styles.inner}>
          <form action="." onSubmit={handleSearch}>
            <SearchIcon className={styles.searchIcon} onClick={handleSearch} />
            <input
              ref={inputRef}
              autoComplete="off"
              id="search"
              name="search"
              placeholder={t('utils.search')}
              type="search"
            />
            <div className={styles.buttons}>
              <Button
                className={cx(styles.button, styles.clear)}
                type="button"
                variant={EButtonVariant.BUTTON_HIDDEN}
                onClick={clearInput}
              >
                {t('utils.clear')}
              </Button>
              <Button
                className={cx(styles.button, styles.cross)}
                type="button"
                variant={EButtonVariant.BUTTON_HIDDEN}
                onClick={closeSearch}
              >
                <Cross className={styles.crossIcon} />
              </Button>
            </div>
          </form>
        </div>

        {suggestions.length > 0 && (
          <div className={styles.suggestions}>
            <span>{t('utils.recentSearches')}</span>
            <List className={styles.list}>
              {suggestions.map((suggestion) => (
                <List.Item key={suggestion} className={styles.item}>
                  <List.ItemColumn>
                    <span onClick={() => search(suggestion)}>
                      <IconClock />
                      {suggestion}
                    </span>
                  </List.ItemColumn>
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
