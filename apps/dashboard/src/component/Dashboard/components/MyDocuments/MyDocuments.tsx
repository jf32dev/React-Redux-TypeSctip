import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Tabs } from '@redbull/components';
import { EEntityType } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import ThumbnailDocuments from './ThumbnailDocuments';

import bridgeServices from '../../../../api/service';
import { getBookmarkList } from '../../../../store/bookmark/action';
import { useTypedSelector } from '../../../../store';
import { getStories, getPopular } from '../../../../store/stories/action';
import { setDashboardSelectedTab } from '../../../../store/dashboard/action';

import styles from './MyDocuments.module.scss';

const MyDocuments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const personalTab = useTypedSelector((state) => state.tabs.personalTab);
  const selectedTab = useTypedSelector((state) => state.dashboard.selectedTab);
  const stories = useTypedSelector((state) => state.stories.list);
  const storiesLoading = useTypedSelector((state) => state.stories.loading);
  const { loading: bookmarkLoading, collection: bookmark } = useTypedSelector(
    (state) => state.bookmark
  );

  const handleTabChange = (activeTab: string) => {
    dispatch(setDashboardSelectedTab(activeTab));
    if (selectedTab !== activeTab) {
      switch (activeTab) {
        case 'bookmarks':
          dispatch(getBookmarkList(10, 10));
          break;
        case 'my-files':
          if (personalTab) {
            dispatch(
              getStories({
                peid: personalTab,
                parentEntityName: EEntityType.TAB,
                limit: 10,
              })
            );
          }
          break;
        case 'popular':
          dispatch(getPopular(10, 10));
          break;
        case 'latest-updates':
          dispatch(
            getStories({
              sortBy: 'createDate',
              limit: 10,
            })
          );
          break;
      }
    }
  };

  const handleDocumentClick = (id: number, type: string) => {
    const entityName =
      type === EEntityType.STORY ? EEntityType.STORY : EEntityType.FILE;
    bridgeServices.openEntity({
      entityName,
      id,
      disableLegacyRouting: true,
    });
  };

  return (
    <Tabs
      className={styles.documents}
      data-test="tabs-component"
      defaultActiveId={selectedTab || 'bookmarks'}
      onSelect={handleTabChange}
    >
      <Tabs.Label
        key={0}
        id="bookmarks"
        label={t('dashboard.documents.bookmarks')}
      />
      <Tabs.Label
        key={1}
        id="my-files"
        label={t('dashboard.documents.myFiles')}
      />
      <Tabs.Label
        key={2}
        id="popular"
        label={t('dashboard.documents.popular')}
      />
      <Tabs.Label
        key={3}
        id="latest-updates"
        label={t('dashboard.documents.latestUpdates')}
      />

      <Tabs.Content id="bookmarks">
        <div className={styles['horizontal-scroll']}>
          <ThumbnailDocuments
            id="my-favourites"
            items={bookmark}
            loading={bookmarkLoading}
            noDataText={t('errorMessages.noBookmarks')}
            alwaysFirstLoad
            onItemClick={handleDocumentClick}
          />
        </div>
      </Tabs.Content>
      <Tabs.Content id="my-files">
        <div className={styles['horizontal-scroll']}>
          <ThumbnailDocuments
            id="my-files"
            items={stories}
            loading={storiesLoading}
            alwaysFirstLoad
            onItemClick={handleDocumentClick}
          />
        </div>
      </Tabs.Content>
      <Tabs.Content id="popular">
        <div className={styles['horizontal-scroll']}>
          <ThumbnailDocuments
            id="popular"
            items={stories}
            loading={storiesLoading}
            noDataText={t('errorMessages.noPopularStories')}
            alwaysFirstLoad
            onItemClick={handleDocumentClick}
          />
        </div>
      </Tabs.Content>
      <Tabs.Content id="latest-updates">
        <div className={styles['horizontal-scroll']}>
          <ThumbnailDocuments
            id="latest-updates"
            items={stories}
            loading={storiesLoading}
            alwaysFirstLoad
            onItemClick={handleDocumentClick}
          />
        </div>
      </Tabs.Content>
    </Tabs>
  );
};

export default MyDocuments;
