import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

import {
  Tile,
  Thumbnail,
  ContentLayout,
  Loader,
  NoDataError,
} from '@redbull/components';
import { Channel, Story } from '@redbull/services';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getStoryNavigation } from '../../store/navigation/action';
import { TVirtualPageName } from '../../store/navigation/type';
import { useTypedSelector } from '../../store';
import { getBannerImages } from '../../utils/bannerImages';
import useThumbnailLibrary from '../../hooks/useThumbnailLibrary';
import { getNameWithoutCountry } from '../../utils/formatter';
import envConfig from '../../config';

import styles from './LandingPage.module.scss';

type TPage = 'learn' | 'sell' | 'execute';
interface IParams {
  page: TPage;
  channelId: string;
}

const LandingPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, channelId } = useParams<IParams>();
  const { url } = useRouteMatch();
  const [, getThumbnailUrl] = useThumbnailLibrary();

  const [listToDisplay, setListToDisplay] = React.useState<
    (Story | Channel)[] | null
  >(null);
  const [pageName, setPageName] = React.useState<string>(page);
  const [pageDescription, setPageDescription] = React.useState('');

  const { nav: channelNav, loading: channelLoading } = useTypedSelector(
    (state) => state.navigation.channels
  );
  const { nav: storyNav, loading: storyLoading } = useTypedSelector(
    (state) => state.navigation.stories
  );
  const langMap = useTypedSelector((state) => state.files.languageMap);

  const image = getBannerImages(page);
  const pageId = Number(envConfig.navigation[page] || '0');
  const loading = storyLoading || channelLoading;

  React.useEffect(() => {
    if (channelId) {
      dispatch(
        getStoryNavigation(Number(channelId), {
          langMap,
          sort: 'fixed',
          fixedListKey: langMap[
            getNameWithoutCountry(pageName).toLowerCase()
          ].toLowerCase(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName]);

  React.useEffect(() => {
    // if it has channelId and story navigations item exist then display it
    // if it doesnt have a channelId and channel navigation item exist the display it
    if (channelId && storyNav[Number(channelId)]) {
      setListToDisplay(storyNav[Number(channelId)]);
    } else if (!channelId && channelNav[pageId]) {
      setListToDisplay(channelNav[pageId]);
    }
  }, [channelNav, storyNav, pageId, channelId, loading]);

  React.useEffect(() => {
    if (channelId && channelNav[pageId]) {
      const channel = channelNav[pageId].find(
        (c) => c.id === Number(channelId)
      );
      if (channel) {
        setPageName(channel.name);
        setPageDescription(channel.description);
      }
    } else {
      setPageName(page);
      setPageDescription('');
    }
    return () => {
      setListToDisplay(null);
    };
  }, [pageId, channelId, channelNav, page, t]);

  const englishPageName =
    langMap[getNameWithoutCountry(pageName).toLowerCase()];

  return (
    <ContentLayout
      background={image}
      className={styles.landing}
      description={pageDescription}
      title={pageName}
      withSideMenu
    >
      {!listToDisplay && loading && <Loader />}

      {listToDisplay &&
        (listToDisplay.length > 0 ? (
          <div className={styles.row}>
            {listToDisplay.map((item: Story | Channel) => {
              if (item.type === 'story') {
                const englishStoryTitle =
                  langMap[getNameWithoutCountry(item.title).toLowerCase()];

                return (
                  <div key={item.id} className={styles.tile}>
                    <Tile
                      className={styles.navigation}
                      icon={
                        <Thumbnail
                          name={item.title}
                          url={
                            getThumbnailUrl(
                              `${englishStoryTitle}-${englishPageName}`,
                              englishStoryTitle
                            ) || item.thumbnail
                          }
                        />
                      }
                      linkTo={`${url}/${item.type}/${item.id}`}
                      title={item.title}
                      type="navigation"
                    />
                  </div>
                );
              }

              const englishChannelTitle =
                langMap[getNameWithoutCountry(item.name).toLowerCase()];

              return (
                <div key={item.id} className={styles.tile}>
                  <Tile
                    className={styles.navigation}
                    icon={
                      <Thumbnail
                        name={item.name}
                        url={
                          getThumbnailUrl(
                            `${englishChannelTitle}-${englishPageName}`,
                            englishChannelTitle
                          ) || item.thumbnail
                        }
                      />
                    }
                    linkTo={`${url}/${item.type}/${item.id}`}
                    title={
                      item.name.toLowerCase() === 'accounts'
                        ? t(
                            `sections.${
                              item.name.toLowerCase() as TVirtualPageName
                            }` as const
                          )
                        : item.name
                    }
                    type="navigation"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <NoDataError
            className={styles['no-result']}
            title={t('errorMessages.noContent')}
          >
            {t('errorMessages.noContentFound')}
          </NoDataError>
        ))}
    </ContentLayout>
  );
};

export default LandingPage;
