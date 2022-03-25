import React from 'react';
import cx from 'classnames';
import { ReactComponent as Close } from '@redbull/common/icons/cross.svg';
import styles from './Modal.module.scss';

type Props = {
  autoHeight?: boolean;
  className?: string;
  closeModal: () => void;
  isMobile?: boolean;
  isOpen: boolean;
  title?: string;
  wider?: boolean;
};

const Modal = ({
  autoHeight,
  children,
  closeModal,
  isOpen,
  isMobile,
  className,
  title,
  wider,
}: React.PropsWithChildren<Props>) => {
  const [wrapperHeight, setWrapperHeight] = React.useState(0);
  const [contentHeight, setContentHeight] = React.useState(0);

  const contentRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (isMobile) {
        setContentHeight(0);
        return;
      }
      if (node !== null) {
        setContentHeight(node.getBoundingClientRect().height);
      }
    },
    [isMobile]
  );

  const wrapperRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (isMobile) {
        setWrapperHeight(0);
        return;
      }
      if (node !== null) {
        setWrapperHeight(node.getBoundingClientRect().height);
      }
    },
    [isMobile]
  );

  // React.useEffect(() => {
  //   const scrollTop = () => {
  //     window.scrollTo(0, 0);
  //     document.body.scrollTop = 0;
  //   };
  //   document.addEventListener('focusout', scrollTop);
  //   return () => document.removeEventListener('focusout', scrollTop);
  // }, []);

  return isOpen ? (
    <div className={cx(styles.container, className)}>
      <div className={styles.overlay} onClick={closeModal} />
      <div
        ref={wrapperRef}
        className={cx(styles.wrapper, wider && styles.wider)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(!autoHeight && {
          style: { height: wrapperHeight ? `${wrapperHeight}px` : 'auto' },
        })}
      >
        <Close className={styles.close} onClick={closeModal} />
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={cx(styles.inner, autoHeight && styles.autoheight)}>
          <div
            ref={contentRef}
            className={cx(styles.content, autoHeight && styles.autoheight)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(!autoHeight && {
              style: {
                height: contentHeight ? `${contentHeight}px` : 'auto',
              },
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
