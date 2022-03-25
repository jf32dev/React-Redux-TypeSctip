import * as React from 'react';
import cx from 'classnames';
import styles from './BurgerIcon.module.scss';

type Props = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const BurgerIcon = React.forwardRef(
  ({ className, isOpen, onClick }: Props, ref: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className={cx(styles.container, isOpen && styles.open, className)}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </div>
  )
);

BurgerIcon.displayName = 'MenuToggle';

export default BurgerIcon;
