import * as React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import usePortal from '@redbull/common/hooks/usePortal';
import styles from './Tooltip.module.scss';
import { calculateHorizontalPosition, calculateVerticalPosition } from './util';

type Tooltip = {
  text: string;
  position?: 'left' | 'bottom' | 'right' | 'top';
};

const Tooltip = ({
  children,
  text,
  position = 'bottom',
}: React.PropsWithChildren<Tooltip>) => {
  const [visible, setVisible] = React.useState(false);
  const [calculatedPosition, setCalculatedPosition] = React.useState<
    React.CSSProperties
  >({});
  const ref = React.useRef<HTMLDivElement | null>(null);
  const transitionRef = React.useRef(null);
  const target = usePortal('tooltip');

  const measureTooltip = React.useCallback(
    (el: HTMLSpanElement) => {
      if (el && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const tooltipRect = el.getBoundingClientRect();
        // NOTE: might be able to improve this to have 'auto' options that calculate based on
        // available space. currently if the space is not enough, the arrow is not in the middle
        const pos: React.CSSProperties = {
          top: calculateVerticalPosition(position, rect, tooltipRect),
          left: calculateHorizontalPosition(position, rect, tooltipRect),
        };

        setCalculatedPosition(pos);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setCalculatedPosition({});
    setVisible(false);
  };

  return (
    <div
      ref={ref}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible &&
        createPortal(
          <CSSTransition
            appear={visible}
            classNames={{
              appear: styles.transitionEnter,
              appearActive: styles.transitionEnterActive,
            }}
            in={visible}
            nodeRef={transitionRef}
            timeout={200}
            unmountOnExit
          >
            <span
              ref={transitionRef}
              className={styles['tooltip-container']}
              style={calculatedPosition}
            >
              <span
                ref={measureTooltip}
                className={cx(styles.tooltip, styles[position])}
              >
                {text}
              </span>
            </span>
          </CSSTransition>,
          target
        )}
    </div>
  );
};

export default Tooltip;
