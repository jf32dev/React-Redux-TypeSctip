import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Button, Loader, NoDataError, useFlyin } from '@redbull/components';

import {
  IUpdateApplicationStatus,
  EApplicationAction,
} from '../../../api/services/application/type';
import { useTypedSelector } from '../../../store';
import {
  getApplicationData,
  updateApplicationStatus,
} from '../../../store/application/action';
import { ApplicationDetailParams, TUserGroupMap } from './type';

import SelfRegistrationLayout from '../SelfRegistrationLayout';
import ApplicationRowDetail from '../components/ApplicationRowDetail';
import UserGroups from './components/UserGroups';
import ActionButtons from '../components/ActionButtons';

import { APP_ERRORS } from './config';

import styles from './ApplicationDetail.module.scss';

const ApplicationDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addFlyin } = useFlyin();

  const { applicationId } = useParams<ApplicationDetailParams>();

  const {
    data: applicationData,
    status: applicationStatus,
    error: applicationError,
  } = useTypedSelector((state) => state.application.application);

  const [selectedGroups, setSelectedGroups] = React.useState<TUserGroupMap>({});

  const handleActionClick = (action: EApplicationAction) => {
    const appData: IUpdateApplicationStatus = {
      action,
    };
    if (action === EApplicationAction.APPROVE) {
      const assignedGroups = Object.keys(selectedGroups).filter(
        (groupId) => !!selectedGroups[groupId]
      );
      if (assignedGroups.length === 0) {
        addFlyin(APP_ERRORS.noGroup, {
          type: 'danger',
        });
        return;
      }
      appData.groupIds = assignedGroups;
    }
    dispatch(updateApplicationStatus(applicationId, appData));
  };

  const handleBack = () => {
    history.push('/self-registration');
  };

  React.useEffect(() => {
    if (applicationId) {
      dispatch(getApplicationData(applicationId));
    }
  }, [applicationId, dispatch]);

  React.useEffect(() => {
    if (
      applicationData &&
      applicationData.groups &&
      applicationData.groups.length > 0
    ) {
      const groups = applicationData.groups.reduce(
        (selected, g) => ({ ...selected, [g]: true }),
        {}
      );
      setSelectedGroups(groups);
    }
  }, [applicationData]);

  return (
    <SelfRegistrationLayout>
      <div className={styles.content}>
        <h3 className={styles.title}>User Profile</h3>
        <div className={styles.application}>
          {applicationStatus === 'loading' && <Loader />}
          {applicationStatus === 'failed' && (
            <NoDataError title="Error loading application">
              There was an error loading this application details.
              <br />
              {applicationError && (
                <>
                  {applicationError}
                  <br />
                </>
              )}
              Please refresh page to try again.
            </NoDataError>
          )}
          {applicationStatus === 'succeeded' && applicationData && (
            <ApplicationRowDetail
              application={applicationData}
              className={styles.detail}
            />
          )}
          {applicationStatus === 'succeeded' && (
            <UserGroups
              applicationStatus={applicationData!.result}
              selectedGroups={selectedGroups}
              setSelectedGroups={setSelectedGroups}
            />
          )}
        </div>
        <div className={styles.footer}>
          <Button onClick={handleBack}>Back</Button>
          {applicationData && (
            <ActionButtons
              applicationId={applicationData.id}
              applicationResult={applicationData.result}
              direction="horizontal"
              onClick={handleActionClick}
            />
          )}
        </div>
      </div>
    </SelfRegistrationLayout>
  );
};

export default ApplicationDetail;
