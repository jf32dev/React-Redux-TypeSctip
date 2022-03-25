import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { camelCase } from 'lodash';

import { EEntityType, Story, File } from '@redbull/services';
import {
  EButtonVariant,
  ContentLayout,
  DocumentList,
  CardContainer,
} from '@redbull/components';
import buttonStyle from '@redbull/components/src/component/Button/Button.module.scss';
import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';

import { useTranslation } from 'react-i18next';
import bridgeServices from '../../api/service';
import InputControls from './components/InputControls';

import { useTypedSelector } from '../../store';
import { getStories, getPopular } from '../../store/stories/action';
import { getBookmarkList } from '../../store/bookmark/action';

import { getBannerImages, TPage } from '../../utils/bannerImages';
import { sortAlpha, sortRecent, filterByName } from '../../utils/utils';

import styles from './DocumentPage.module.scss';

type TPageName =
  | 'bookmarks'
  | 'myFavourites'
  | 'myFiles'
  | 'popular'
  | 'latestUpdates';

const DocumentPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page } = useParams<{ page: TPage }>();

  const [list, setList] = React.useState<(Story | File)[]>([]);
  const [filterDate, setFilterDate] = React.useState<{
    from: moment.Moment | null;
    to: moment.Moment | null;
  }>({ from: null, to: null });

  const personalTab = useTypedSelector((state) => state.tabs.personalTab);

  const stories = useTypedSelector((state) => state.stories.list);
  const hasListFileMore = useTypedSelector(
    (state) => state.stories.listFile.hasMore
  );
  const hasListStorySMore = useTypedSelector(
    (state) => state.stories.listStory.hasMore
  );
  const storiesLoading = useTypedSelector((state) => state.stories.loading);
  const hasMore = useTypedSelector((state) => state.stories.hasMore);

  const {
    file: { hasMore: hasFileBookmarkMore },
    story: { hasMore: hasStoryBookmarkMore },
    loading: bookmarkLoading,
    collection: bookmark,
  } = useTypedSelector((state) => state.bookmark);

  const image = getBannerImages(page);
  const isDatePickerAvailable = page !== 'my-favourites' && page !== 'popular';
  const loading = bookmarkLoading || storiesLoading;

  const handleDocumentClick = (id: number, type: string) => {
    const entityName =
      type === EEntityType.STORY ? EEntityType.STORY : EEntityType.FILE;
    bridgeServices.openEntity({
      entityName,
      id,
      disableLegacyRouting: true,
    });
  };

  const handleFilter = (value: string) => {
    const documentList = getDocuments();
    if (documentList) {
      if (value) {
        const filtered = documentList.filter(filterByName(value));
        setList(filtered);
      } else {
        setList(documentList);
      }
    }
  };

  const handleFilterReset = () => {
    const documentList = getDocuments();
    if (documentList) {
      setList(documentList);
    }
  };

  const handleSort = (value: string | null) => {
    if (value) {
      switch (value) {
        case 'alpha':
          setList([...list].sort(sortAlpha()));
          break;
        case 'reverse-alpha':
          setList([...list].sort(sortAlpha(true)));
          break;
        case 'recent':
          setList([...list].sort(sortRecent));
          break;
        default:
          break;
      }
    } else {
      handleFilterReset();
    }
  };
  const handleDateChange = (
    from: moment.Moment | null,
    to: moment.Moment | null
  ) => {
    setFilterDate({ from, to });
  };

  const getDocuments = React.useCallback(() => {
    switch (page) {
      case 'my-files':
      case 'popular':
      case 'latest-updates':
        return stories;
      case 'my-favourites':
        return bookmark;
      default:
        return null;
    }
  }, [bookmark, page, stories]);

  const fetchDocumentList = React.useCallback(
    (
      from?: moment.Moment | null,
      to?: moment.Moment | null,
      getMore?: boolean
    ) => {
      switch (page) {
        case 'my-files':
          if (personalTab) {
            dispatch(
              getStories(
                {
                  peid: personalTab,
                  parentEntityName: EEntityType.TAB,
                  ...(from && { createDateSince: from.valueOf() }),
                  ...(to && { createDateTo: to.valueOf() }),
                },
                getMore
              )
            );
          }
          break;
        case 'my-favourites':
          if (
            bookmark.length === 0 ||
            hasStoryBookmarkMore ||
            hasFileBookmarkMore
          ) {
            dispatch(getBookmarkList());
          }
          break;
        case 'popular':
          if (stories.length === 0 || hasListStorySMore || hasListFileMore) {
            dispatch(getPopular());
          }
          break;
        case 'latest-updates':
          dispatch(
            getStories(
              {
                sortBy: 'createDate',
                ...(from && { createDateSince: from.valueOf() }),
                ...(to && { createDateTo: to.valueOf() }),
              },
              getMore
            )
          );
          break;
        default:
          break;
      }
    },
    [
      bookmark.length,
      dispatch,
      hasFileBookmarkMore,
      hasListFileMore,
      hasListStorySMore,
      hasStoryBookmarkMore,
      page,
      personalTab,
      stories.length,
    ]
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const { from, to } = filterDate;
      fetchDocumentList(from, to, hasMore);
    }
  };

  React.useEffect(() => {
    if (personalTab) {
      fetchDocumentList(null, null, hasMore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalTab]);

  React.useEffect(() => {
    const documentList = getDocuments();
    if (documentList) {
      setList(documentList);
    }
  }, [getDocuments]);

  React.useEffect(() => {
    const { from, to } = filterDate;
    if (from && to) {
      fetchDocumentList(from, to);
    }
  }, [fetchDocumentList, filterDate]);

  return (
    <ContentLayout
      background={image}
      bannerClassName={styles['no-margin']}
      className={styles['document-layout']}
      title={t(`dashboard.documents.${camelCase(page) as TPageName}` as const)}
      onScrollEnd={handleLoadMore}
    >
      <div style={{ height: '100%' }}>
        <CardContainer className={styles.card}>
          <div className={styles['primary-control']}>
            <Link
              className={cx(
                buttonStyle.button,
                buttonStyle[EButtonVariant.BUTTON_TEXT],
                styles.button
              )}
              role="button"
              to="/"
            >
              <Chevron />
              {t('utils.back')}
            </Link>
          </div>
          <InputControls
            // NOTE: temporary solution - clears filters (sorting and word filter)
            // when fetching more items to avoid confusion until we have this
            // functionality available on the API and can filter there
            clearFilters={storiesLoading || bookmarkLoading}
            dateFilterAvailable={isDatePickerAvailable}
            onDateChange={handleDateChange}
            onFilter={handleFilter}
            onFilterReset={handleFilterReset}
            onSort={handleSort}
          />
          <DocumentList
            className={styles.list}
            items={list}
            loading={loading}
            loadingText={t('utils.loadingMore')}
            noDataDescription={t('errorMessages.noContentFound')}
            noDataText={t('errorMessages.noContent')}
            wrap
            onDocumentClick={handleDocumentClick}
          />
        </CardContainer>
      </div>
    </ContentLayout>
  );
};

export default DocumentPage;
