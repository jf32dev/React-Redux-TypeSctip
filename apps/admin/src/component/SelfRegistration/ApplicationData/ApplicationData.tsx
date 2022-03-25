import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Loader, NoDataError, Select } from '@redbull/components';
import { ValueType } from 'react-select';
import {
  clearApplicationList,
  getApplicationList,
  getUserGroups,
} from '../../../store/application/action';
import { useTypedSelector } from '../../../store';

import SelfRegistrationLayout from '../SelfRegistrationLayout';
import ApplicationList from '../components/ApplicationList';

import { EApplicationFilter } from '../../../api/services/application/type';
import styles from './ApplicationData.module.scss';
import { statusOptions } from './config';

const ApplicationData = () => {
  const dispatch = useDispatch();

  const [selectedFilter, setSelectedFilter] = React.useState<
    ValueType<{ label: string; value: string }>
  >(null);

  const { data, error, status, hasMore } = useTypedSelector(
    (state) => state.application.list
  );
  const userGroups = useTypedSelector(
    (state) => state.application.userGroups.data
  );

  const isFirstLoad = data.length === 0 && status === 'loading';

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      dispatch(
        getApplicationList(
          20,
          (selectedFilter as { label: string; value: string })
            ?.value as EApplicationFilter
        )
      );
    }
  };

  const handleApplicationFilter = (
    option: ValueType<{ label: string; value: string }>
  ) => {
    setSelectedFilter(option);
    dispatch(clearApplicationList());
    dispatch(
      getApplicationList(
        20,
        (option as { label: string; value: string })
          ?.value as EApplicationFilter
      )
    );
  };

  React.useEffect(() => {
    if (!data.length) {
      dispatch(getApplicationList());
    }
    if (!userGroups.length) {
      dispatch(getUserGroups());
    }
    return () => {
      dispatch(clearApplicationList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelfRegistrationLayout>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h3 className={styles.title}>Pending Application</h3>
          <Select
            className={styles.filter}
            options={statusOptions}
            isClearable
            onChange={handleApplicationFilter}
          />
        </div>
        {status === 'loading' && isFirstLoad && (
          <Loader className={styles.loader} />
        )}
        {status === 'failed' && (
          <NoDataError title="Error Loading Applications">
            There was an error loading applications.
            <br />
            {error && (
              <>
                {error}
                <br />
              </>
            )}
            Please try again.
          </NoDataError>
        )}
        {status === 'succeeded' && data.length === 0 && (
          <NoDataError
            className={styles.nodata}
            title={`No ${
              (selectedFilter as { label: string; value: string })?.value || ''
            } Application Found`}
          />
        )}
        {data.length > 0 && (
          <ApplicationList onScrollEnd={handleLoadMore}>
            {data.map((item) => (
              <ApplicationList.Item key={item.id} application={item} />
            ))}
            {status === 'loading' && !isFirstLoad && (
              <ApplicationList.Item loader />
            )}
          </ApplicationList>
        )}
      </div>
    </SelfRegistrationLayout>
  );
};

export default ApplicationData;
