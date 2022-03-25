import React from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import cx from 'classnames';

import {
  Button,
  EButtonSize,
  EButtonVariant,
  Loader,
  Input,
  Tabs,
  useFlyin,
} from '@redbull/components';
import { ReactComponent as IconSearch } from '@redbull/common/icons/search.svg';
import { useTranslation } from 'react-i18next';
import FileBlock from './components/FileBlock';
import StoryBlock from './components/StoryBlock';
import NoResult from './components/NoResult';

import { BreakpointContext } from '../App/BreakpointContext';
import {
  FILES_LIMIT,
  getTabLabels,
  STORIES_LIMIT,
  getTermError,
} from './config';
import { getLocalSuggestions } from './utils';
import { useTypedSelector } from '../../store';
import { search, setTerm } from '../../store/search/action';

import styles from './SearchResultsPage.module.scss';

const SearchResultsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tabLabel = getTabLabels();
  const termError = getTermError();

  const { term, stories, files, loading, error } = useTypedSelector(
    (state) => state.search
  );

  const resultSize = stories.length + files.length;

  const [active, setActive] = React.useState<string>(tabLabel.all.id);

  const { isMobile } = React.useContext(BreakpointContext);

  const fly = useFlyin();

  React.useEffect(() => {
    if (!term) {
      // If no term, normally because of refreshing, set the first term in local storage as the current term.
      const suggestions = getLocalSuggestions();
      if (suggestions.length) {
        dispatch(setTerm(suggestions[0]));
      }
    } else {
      dispatch(search(term));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  React.useEffect(() => {
    if (error) {
      fly.addFlyin(error, {
        type: 'danger',
        id: error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleAllFileClick = () => {
    setActive(tabLabel.files.id);
  };

  const handleAllStoryClick = () => {
    setActive(tabLabel.stories.id);
  };

  const handleSearchReset = (input: HTMLInputElement | null) => {
    if (input) {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      handleSearch(event.currentTarget.value, () => {
        event.currentTarget.blur();
      });
    }
  };

  const handleSearchIconClick = (_: any, value: string) => {
    handleSearch(value);
  };

  const handleSearch = (value: string, onSuccess?: () => void) => {
    if (value && value.length >= 2) {
      dispatch(setTerm(value));
      onSuccess && onSuccess();
    } else {
      fly.addFlyin(termError.tooShort, {
        type: 'warning',
        id: termError.tooShort,
      });
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <Input
            key={term}
            containerClassName={styles.searchInput}
            defaultValue={term}
            icon={<IconSearch />}
            resetActive
            reverse
            useIcon
            onIconClick={handleSearchIconClick}
            onKeyUp={handleKeyUp}
            onResetClick={handleSearchReset}
          />
        </div>

        {/* Passing in an uniqueId as key every single time, forcing it to refresh so that the dynamic label suffix can be properly displayed.
          Best way would be making the Tabs component natively supporting dynamic labels to eliminate unnecessary re-render inside the Tabs.
          But this is not happening at this stage because it may lead to some amount of code refactoring on some other components that are using
          this Tabs component.
        */}
        <Tabs
          key={uniqueId()}
          className={styles.results}
          defaultActiveId={active}
          onSelect={setActive}
        >
          <Tabs.Label
            key={0}
            id={tabLabel.all.id}
            label={tabLabel.all.label}
            suffix={` (${resultSize})`}
          />
          <Tabs.Label
            key={1}
            id={tabLabel.files.id}
            label={tabLabel.files.label}
            suffix={` (${files.length})`}
          />
          <Tabs.Label
            key={2}
            id={tabLabel.stories.id}
            label={tabLabel.stories.label}
            suffix={` (${stories.length})`}
          />

          <Tabs.Content className={styles.tabContent} id={tabLabel.all.id}>
            <div className={styles.tab}>
              {loading && (
                <div className={styles.loading}>
                  <Loader />
                </div>
              )}
              {!loading && (
                <>
                  <p className={styles.tips}>
                    {`${resultSize} ${t('utils.resultMatch')} `}
                    <strong>{`'${term}'`}</strong>
                  </p>
                  {resultSize > 0 ? (
                    <>
                      <div className={styles.section}>
                        <FileBlock files={files.slice(0, FILES_LIMIT)} />
                        {files.length > 0 && (
                          <div className={styles.action}>
                            <Button
                              size={EButtonSize.BIG}
                              variant={EButtonVariant.PRIMARY}
                              onClick={handleAllFileClick}
                            >
                              {t('utils.allFiles')}
                            </Button>
                          </div>
                        )}
                      </div>

                      <div
                        className={cx(styles.section, styles['section-story'])}
                      >
                        <StoryBlock
                          nowrap={isMobile}
                          stories={stories.slice(0, STORIES_LIMIT)}
                        />
                        {stories.length > 0 && (
                          <div className={styles.action}>
                            <Button
                              size={EButtonSize.BIG}
                              variant={EButtonVariant.PRIMARY}
                              onClick={handleAllStoryClick}
                            >
                              {t('utils.allStories')}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <NoResult />
                  )}
                </>
              )}
            </div>
          </Tabs.Content>

          <Tabs.Content className={styles.tabContent} id={tabLabel.files.id}>
            <div className={styles.tab}>
              <p className={styles.tips}>
                {`${files.length} ${t('utils.fileMatch')} `}
                <strong>{`'${term}'`}</strong>
              </p>
              <div className={styles.section}>
                <FileBlock files={files} loading={loading} />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content className={styles.tabContent} id={tabLabel.stories.id}>
            <div className={styles.tab}>
              <p className={styles.tips}>
                {`${stories.length} ${t('utils.storyMatch')} `}
                <strong>{`'${term}'`}</strong>
              </p>
              <div className={styles.section}>
                <StoryBlock
                  className={styles.stories}
                  loading={loading}
                  stories={stories}
                />
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchResultsPage;
