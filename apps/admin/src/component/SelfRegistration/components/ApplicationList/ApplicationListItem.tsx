import * as React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { Loader } from '@redbull/components';
import {
  EApplicationAction,
  IApplication,
  IUpdateApplicationStatus,
} from '../../../../api/services/application/type';
import { useTypedSelector } from '../../../../store';
import { updateApplicationStatus } from '../../../../store/application/action';

import ApplicationRowDetail from '../ApplicationRowDetail';
import ActionButtons from '../ActionButtons';

import styles from './ApplicationList.module.scss';

type Props = {
  application?: IApplication;
  loader?: boolean;
};

const ApplicationListItem = ({ application, loader }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data: userGroups } = useTypedSelector(
    (state) => state.application.userGroups
  );

  const handleApplicationClick = () => {
    if (application) {
      history.push(`/self-registration/${application.id}`);
    }
  };

  const handleActionClick = (action: EApplicationAction) => {
    if (application) {
      const appData: IUpdateApplicationStatus = {
        action,
      };

      if (action === EApplicationAction.APPROVE) {
        const countryCode = application.country.code;

        const assignedGroups = userGroups
          .filter(({ name }) => name.includes(countryCode))
          .map(({ id }) => id);

        appData.groupIds = assignedGroups;
      }
      dispatch(updateApplicationStatus(application.id, appData));
    }
  };

  return (
    <li>
      {loader ? (
        <Loader text="loading more..." />
      ) : (
        application && (
          <div className={styles.wrapper} onClick={handleApplicationClick}>
            <div className={styles.item}>
              <ApplicationRowDetail application={application} />
            </div>
            <div className={styles['action-column']}>
              <ActionButtons
                applicationId={application.id}
                applicationResult={application.result}
                direction="vertical"
                onClick={handleActionClick}
              />
            </div>
          </div>
        )
      )}
    </li>
  );
};

ApplicationListItem.displayName = 'ApplicationListItem';
export default ApplicationListItem;
