import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Thumbnail,
  Tile,
  ContentLayout,
  DocumentList,
  CardContainer,
  Loader,
  NoDataError,
} from '@redbull/components';
import { findUniqueSet, slug, unslug } from '@redbull/common';
import { EEntityType, File, Story } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import { sortFixedList } from '../../utils';
import bridgeServices from '../../api/service';
import { useTypedSelector } from '../../store';
import { getStoryNavigation } from '../../store/navigation/action';
import {
  getFilterLogo,
  groupNameToLower,
  isType,
  prettifyFileDescription,
} from './utils';
import { getBannerImages, TPage } from '../../utils/bannerImages';
import useThumbnailLibrary from '../../hooks/useThumbnailLibrary';
import useGetAccountStory from '../../hooks/useGetAccountStory';

import styles from './AccountDetailPage.module.scss';

const order = ['agreements', 'planograms', 'promo calendar', 'presentations'];

type TParams = {
  page: TPage;
  virtualId: string;
  channelId: string;
  type: 'planograms' | 'agreements' | 'promo calendar' | 'presentations';
};

const AccountDetailPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, virtualId, channelId, type } = useParams<TParams>();
  const { url } = useRouteMatch();

  const [files, setFiles] = React.useState<File[]>([]);
  const [tiles, setTiles] = React.useState<(string | Story)[] | null>(null);
  const [pageName, setPageName] = React.useState('');
  const [pageDescription, setPageDescription] = React.useState('');

  const [, getThumbnailUrl] = useThumbnailLibrary();
  const [account, getAccount, loading] = useGetAccountStory();

  const channelNav = useTypedSelector((state) => state.navigation.channels.nav);
  const storyNav = useTypedSelector((state) => state.navigation.stories.nav);
  const langMap = useTypedSelector((state) => state.files.languageMap);

  const image = getBannerImages(page);

  const handleFileClick = (id: number) => {
    bridgeServices.openEntity({
      entityName: EEntityType.FILE,
      id,
      disableLegacyRouting: true,
    });
  };

  React.useEffect(() => {
    if (account && account.files && Object.keys(langMap).length) {
      if (type) {
        const selectedFileType = account.files.filter(isType(unslug(type)));
        const fileList = selectedFileType.map(prettifyFileDescription(type));
        setFiles(fileList);
      } else {
        setFiles(account.files);
        setTiles([
          ...Array.from(
            findUniqueSet<string>(account.files.map(groupNameToLower))
          ).sort(sortFixedList(order, langMap)),
          ...(storyNav[Number(channelId)]
            ? storyNav[Number(channelId)].filter((s) => s.id !== account.id)
            : []),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, type, langMap]);

  React.useEffect(() => {
    if (channelNav && channelNav[Number(virtualId)]) {
      const channel = channelNav[Number(virtualId)].find(
        (c) => c.id === Number(channelId)
      );
      if (channel) {
        setPageName(channel.name);
        setPageDescription(channel.description);

        if (channel.storyCount > 0) {
          setTiles(null);
          getAccount(channel);
          dispatch(getStoryNavigation(channel.id));
        }
      }
    }
  }, [channelId, channelNav, virtualId, dispatch, getAccount]);

  return (
    <ContentLayout
      background={image}
      data-test="component"
      description={pageDescription}
      title={pageName}
      withSideMenu
    >
      {!type && !tiles && loading && <Loader data-test="loader" />}
      {!type && !tiles && !loading && (
        <NoDataError
          className={styles['no-content']}
          data-test="no-data-message"
          title={t('errorMessages.noContent')}
        >
          {t('errorMessages.noContentFound')}
        </NoDataError>
      )}
      {type && (
        <CardContainer className={styles.fileCard}>
          <h2>{unslug(type)}</h2>
          <DocumentList
            className={styles.content}
            data-test="document-list"
            items={files}
            loadingText={t('utils.loadingMore')}
            noDataDescription={t('errorMessages.noContentFound')}
            noDataText={t('errorMessages.noContent')}
            wrap
            onDocumentClick={handleFileClick}
          />
        </CardContainer>
      )}
      {!type && tiles && (
        <div className={styles.tiles}>
          {tiles.map((item) => {
            if (typeof item === 'string') {
              const englishItem = langMap[item];
              return (
                <div key={item} className={styles.tile}>
                  <Tile
                    className={styles.type}
                    icon={
                      <Thumbnail
                        name={item}
                        url={
                          getThumbnailUrl(englishItem) ||
                          getFilterLogo(englishItem)
                        }
                      />
                    }
                    linkTo={`${url}/${slug(item)}`}
                    title={item}
                    type="navigation"
                  />
                </div>
              );
            }

            const englishTitle = langMap[item.title];
            return (
              <div key={item.id} className={styles.tile}>
                <Tile
                  className={styles.type}
                  icon={
                    <Thumbnail
                      name={item.title}
                      url={getThumbnailUrl(englishTitle) || item.thumbnail}
                    />
                  }
                  linkTo={`${url}/story/${item.id}`}
                  title={item.title}
                  type="navigation"
                />
              </div>
            );
          })}
        </div>
      )}
    </ContentLayout>
  );
};

export default AccountDetailPage;
