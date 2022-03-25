import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  EUserProfileSize,
  CardContainer,
  Loader,
  List,
  UserProfile,
  ContentLayout,
} from '@redbull/components';

import { Channel } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../store';
import { getBannerImages, TPage } from '../../utils/bannerImages';
import { filterByName } from '../../utils/utils';

import envConfig from '../../config';

import AccountFilter from './AccountFilter';

import styles from './AccountListPage.module.scss';

type TParams = {
  page: TPage;
  virtualId: any;
};

const AccountListPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { page, virtualId } = useParams<TParams>();
  const { navigation } = envConfig;

  const [list, setList] = React.useState<Channel[]>([]);

  const channels = useTypedSelector((state) => state.navigation.channels.nav);
  const loading = useTypedSelector(
    (state) => state.navigation.channels.loading
  );

  const pageId = Number(navigation[page]);
  const image = getBannerImages(page);

  let pageName = '';
  if (channels && channels[pageId]) {
    const channel = channels[pageId].find((c) => c.id === +virtualId);
    if (channel) {
      if (channel.name === 'Accounts') {
        pageName = t('sections.accounts');
      } else {
        pageName = channel.name;
      }
    }
  }

  const handleFilter = (value: string) => {
    if (channels[virtualId]) {
      if (value) {
        const filtered = channels[virtualId].filter(filterByName(value));
        setList(filtered);
      } else {
        setList(channels[virtualId]);
      }
    }
  };

  const handleFilterReset = () => {
    if (channels[virtualId]) {
      setList(channels[virtualId]);
    }
  };

  const handleOpenAccount = (itemid: number) => {
    history.push(`/${page}/accounts/${virtualId}/channel/${itemid}`);
  };

  React.useEffect(() => {
    if (channels[virtualId]) {
      setList(channels[virtualId]);
    }
  }, [channels, virtualId]);

  return (
    <ContentLayout
      background={image}
      data-test="component"
      title={pageName}
      withSideMenu
    >
      <CardContainer className={styles.card}>
        <div className={styles.content}>
          {list && !loading ? (
            <List className={styles.list}>
              <List.Item className={styles.listHeading}>
                <List.ItemColumn className={styles.headingContent}>
                  <h3>{t('utils.account')}</h3>
                  <AccountFilter
                    onFilter={handleFilter}
                    onFilterReset={handleFilterReset}
                  />
                </List.ItemColumn>
              </List.Item>
              {list.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    className={styles.item}
                    onClick={() => handleOpenAccount(item.id)}
                  >
                    <List.ItemColumn className={styles.itemTitle}>
                      <UserProfile
                        imageSrc={item.thumbnail}
                        name={item.name}
                        size={EUserProfileSize.LARGE}
                      />
                    </List.ItemColumn>
                  </List.Item>
                );
              })}
            </List>
          ) : (
            <Loader />
          )}
        </div>
      </CardContainer>
    </ContentLayout>
  );
};

export default AccountListPage;
