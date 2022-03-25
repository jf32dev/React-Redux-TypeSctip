import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  CardContainer,
  Loader,
  DocumentList,
  ContentLayout,
} from '@redbull/components';
import { decode } from '@redbull/common';
import { EEntityType } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import bridgeServices from '../../api/service';
import { useTypedSelector } from '../../store';
import { getStoryNavigation } from '../../store/navigation/action';
import { getBannerImages } from '../../utils/bannerImages';
import { getStoryDetail, clearStory } from '../../store/stories/action';

import styles from './StoryPage.module.scss';

const StoryPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, channelId, storyId } = useParams() as any;
  const [pageName, setPageName] = React.useState('');
  const [pageDescription, setPageDescription] = React.useState('');
  const story = useTypedSelector((state) => state.stories.story);
  const loading = useTypedSelector((state) => state.stories.loading);
  const stories = useTypedSelector((state) => state.navigation.stories.nav);
  const image = getBannerImages(page);

  const handleFileClick = (id: number) => {
    bridgeServices.openEntity({
      entityName: EEntityType.FILE,
      id,
      disableLegacyRouting: true,
    });
  };

  // NOTE: theoretically if the user can navigate here, the story navigation should exist
  // so instead of loading the whole lot of its detail, take the name from the store.
  React.useEffect(() => {
    if (!stories[channelId]) {
      dispatch(getStoryNavigation(+channelId));
    }
  }, [channelId, dispatch, stories]);

  React.useEffect(() => {
    if (storyId) {
      dispatch(clearStory());
      dispatch(getStoryDetail(+storyId));
      setPageDescription('');
    }
  }, [dispatch, storyId]);

  React.useEffect(() => {
    if (stories[channelId] && storyId) {
      const storyNav = stories[channelId].find((s) => s.id === +storyId);
      if (storyNav) {
        setPageName(storyNav.title);
        if (story && story.id === +storyId) {
          setPageDescription(decode(story.message, true));
        }
      }
    }
  }, [channelId, stories, story, storyId]);

  return (
    <ContentLayout
      background={image}
      description={pageDescription}
      title={pageName}
      withSideMenu
    >
      <CardContainer className={styles.card}>
        {!loading && story && story.id === +storyId ? (
          <DocumentList
            className={styles.content}
            items={story.files || []}
            loadingText={t('utils.loadingMore')}
            noDataDescription={t('errorMessages.noContentFound')}
            noDataText={t('errorMessages.noContent')}
            wrap
            onDocumentClick={handleFileClick}
          />
        ) : (
          <Loader />
        )}
      </CardContainer>
    </ContentLayout>
  );
};

export default StoryPage;
