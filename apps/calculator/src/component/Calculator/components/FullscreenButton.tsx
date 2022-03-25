import React from 'react';
import cx from 'classnames';

import { Button, EButtonSize, EButtonVariant } from '@redbull/components';
import { ReactComponent as Fullscreen } from '@redbull/common/icons/fullscreen.svg';

import { useTranslation } from 'react-i18next';
import style from './FullscreenButton.module.scss';

type Props = {
  className: string;
  onClick: () => void;
};
const FullscreenButton = ({ className, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <Button
      className={cx(style.fullscreen, className)}
      size={EButtonSize.SMALL}
      variant={EButtonVariant.SECONDARY_WHITE}
      onClick={onClick}
    >
      <span className="icon">
        <Fullscreen />
      </span>
      {t('navigation.fullscreen')}
    </Button>
  );
};

export default FullscreenButton;
