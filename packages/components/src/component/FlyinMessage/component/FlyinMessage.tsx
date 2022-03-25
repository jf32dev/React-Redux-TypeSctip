import cx from 'classnames';
import React from 'react';

import { useTimeout } from '@redbull/common';
import { ReactComponent as Cross } from '@redbull/common/icons/cross.svg';
import { ReactComponent as Tick } from '@redbull/common/icons/tick.svg';
import { ReactComponent as Warning } from '@redbull/common/icons/warning.svg';
import { TFlyinMessage } from '../type';
import { useFlyin } from '../FlyinMessageContext';
import { Button, EButtonVariant, EButtonSize } from '../../Button';

import styles from './FlyinMessage.module.scss';

const FlyinMessage = ({
  action,
  actionText,
  closeIcon,
  dismissTimeout,
  id,
  message,
  title,
  type,
}: TFlyinMessage) => {
  const { addFlyin, removeFlyin } = useFlyin();
  const handleRemove = () => removeFlyin(id);
  const cancelTimeout = useTimeout(
    closeIcon ? () => null : handleRemove,
    dismissTimeout,
    [id]
  );

  const handleOnActionClick = () => {
    if (action) {
      action();
    }
    cancelTimeout();
    removeFlyin(id);
    addFlyin('Triggered action', { type: 'success' });
  };

  return (
    <>
      {type === 'description' && <div className={styles.overlay} />}
      <div
        className={cx(
          styles.flyin,
          styles[type],
          actionText && styles.actionable
        )}
      >
        {type !== 'info' && type !== 'description' && (
          <div className={styles.icon}>
            {type === 'success' && <Tick />}
            {type === 'danger' && <Cross />}
            {type === 'warning' && <Warning />}
          </div>
        )}
        <div className={styles.content}>
          {closeIcon && (
            <Cross className={styles.close} onClick={handleRemove} />
          )}
          <div className={styles.message}>
            {title && <h2>{title}</h2>}
            {message}
          </div>
          {actionText && (
            <Button
              className={styles.action}
              size={EButtonSize.BIG}
              type="button"
              variant={EButtonVariant.BUTTON_HIDDEN}
              onClick={handleOnActionClick}
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FlyinMessage;
