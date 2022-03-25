import React from 'react';
import cx from 'classnames';
import { IndicatorProps } from 'react-select';
import { ReactComponent as Cross } from '@redbull/common/icons/cross.svg';

import buttonStyles from '../../Button/Button.module.scss';
import styles from './ClearButton.module.scss';

import { EButtonVariant } from '../../Button/enum';

const ClearButton = (props: IndicatorProps<any>) => {
  const {
    innerProps: { ref, ...restInnerProps },
    selectProps: { isMulti },
  } = props;

  if (isMulti) {
    return null;
  }
  return (
    <div
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restInnerProps}
      className={cx(
        buttonStyles.button,
        buttonStyles[EButtonVariant.SECONDARY_WHITE],
        styles.clear
      )}
    >
      <Cross />
    </div>
  );
};

export default ClearButton;
