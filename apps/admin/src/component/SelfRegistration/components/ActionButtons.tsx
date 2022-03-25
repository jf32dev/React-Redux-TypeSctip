import * as React from 'react';
import cx from 'classnames';
import {
  Button,
  EButtonVariant,
  ELoaderSize,
  Loader,
  useFlyin,
} from '@redbull/components';
import { ReactComponent as ApprovedIcon } from '@redbull/common/icons/approved.svg';
import { ReactComponent as DeniedIcon } from '@redbull/common/icons/denied.svg';

import { useTypedSelector } from '../../../store';
import {
  EApplicationAction,
  EApplicationStatus,
} from '../../../api/services/application/type';

import styles from './ActionButtons.module.scss';

type Props = {
  applicationId: string;
  applicationResult: EApplicationStatus;
  direction: 'horizontal' | 'vertical';
  onClick: (action: EApplicationAction) => void;
};

const ActionButtons = ({
  applicationId,
  applicationResult,
  direction,
  onClick,
}: Props) => {
  const { addFlyin } = useFlyin();

  const isUpdating = useTypedSelector((state) => state.application.isUpdating);
  const updatingError = useTypedSelector(
    (state) => state.application.updatingError
  );

  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    const { action } = target.dataset;
    if (action) {
      onClick && onClick(action as EApplicationAction);
    }
  };

  React.useEffect(() => {
    if (updatingError) {
      addFlyin('There was an error updating this application.', {
        type: 'danger',
        id: 'update-app-error',
      });
    }
  }, [addFlyin, updatingError]);

  return (
    <div className={styles.action}>
      {applicationResult === EApplicationStatus.APPROVED && (
        <div className={cx(styles.status, direction && styles[direction])}>
          <ApprovedIcon />
          <span>Approved</span>
        </div>
      )}
      {applicationResult === EApplicationStatus.DECLINED && (
        <div className={cx(styles.status, direction && styles[direction])}>
          <DeniedIcon />
          <span>Denied</span>
        </div>
      )}
      {isUpdating === applicationId && !updatingError && (
        <Loader className={styles.loader} size={ELoaderSize.SMALL} />
      )}
      {isUpdating !== applicationId &&
        applicationResult === EApplicationStatus.NONE && (
          <>
            <Button
              className={styles.button}
              data-action={EApplicationAction.APPROVE}
              variant={EButtonVariant.PRIMARY}
              onClick={handleActionClick}
            >
              Approve
            </Button>
            <Button
              className={styles.button}
              data-action={EApplicationAction.DECLINE}
              variant={EButtonVariant.SECONDARY_RED}
              onClick={handleActionClick}
            >
              Deny
            </Button>
          </>
        )}
    </div>
  );
};

export default ActionButtons;
