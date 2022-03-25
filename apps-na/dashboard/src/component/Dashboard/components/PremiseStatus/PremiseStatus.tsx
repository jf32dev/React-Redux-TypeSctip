/* eslint-disable no-nested-ternary */
import * as React from 'react';
import cx from 'classnames';
import { Button, EButtonSize, EButtonVariant } from '@redbull/components';
import { useDispatch } from 'react-redux';
import { RedBullPremise } from '../../../../store/system/type';
import styles from './PremiseStatus.module.scss';
import { useBreakpointContext } from '../../../../context/Breakpoint';
import { selectPremise } from '../../../../store/system/action';

type PremiseStatusProps = {
  premise: RedBullPremise;
  disabled?: boolean;
  active?: boolean;
  inverted?: boolean;
};

const PremiseStatus = ({
  premise,
  disabled,
  active,
  inverted,
}: PremiseStatusProps) => {
  const { viewport } = useBreakpointContext();
  const isSmallScreen = viewport === 'xs';

  const dispatch = useDispatch();

  const handlePremiseClick = () => dispatch(selectPremise(premise));

  return (
    <Button
      className={cx(disabled && styles.disabled, inverted && styles.inverted)}
      disabled={disabled}
      size={EButtonSize.NORMAL}
      variant={
        disabled
          ? EButtonVariant.BUTTON_LINK
          : active
          ? EButtonVariant.PRIMARY
          : EButtonVariant.SECONDARY
      }
      onClick={handlePremiseClick}
    >
      {isSmallScreen
        ? premise
        : premise === 'ONP'
        ? 'On Premise'
        : 'Off Premise'}
    </Button>
  );
};

export default PremiseStatus;
