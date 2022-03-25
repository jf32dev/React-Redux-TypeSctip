import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';

import { Loader, ELoaderSize } from '../Loader';

import styles from './MenuHeading.module.scss';

type Props = {
  children?: React.ReactNode;
  contentLoading?: boolean;
  id: number;
  label: string;
  openDefault?: boolean;
  onToggle?: (id: number, isOpen: boolean) => void;
};

/** Displays MenuHeading for expandable SubMenu (children)
 *  - takes Menu.SubMenu as the only child
 */
const MenuHeading = ({
  children,
  contentLoading,
  id,
  label,
  openDefault,
  onToggle,
}: Props) => {
  const submenu = React.useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);

  const toggle = () => {
    setOpen((open) => !open);
    if (onToggle) {
      onToggle(id, !isOpen);
    }
  };

  React.useEffect(() => {
    if (submenu.current && isInitialized) {
      const element = submenu.current;
      const actualHeight = element.scrollHeight;
      if (isOpen) {
        requestAnimationFrame(() => {
          element.style.height = `${actualHeight}px`;
          setTimeout(
            () =>
              requestAnimationFrame(() => {
                element.style.height = '';
              }),
            200
          );
        });
      } else {
        requestAnimationFrame(() => {
          element.style.height = `${actualHeight}px`;
          requestAnimationFrame(() => {
            element.style.height = '0';
          });
        });
      }
    }
  }, [isInitialized, isOpen, submenu]);

  React.useEffect(() => {
    if (submenu.current) {
      const element = submenu.current;
      element.style.height = '0';
      setIsInitialized(true);
    }
  }, [submenu]);

  React.useEffect(() => {
    if (openDefault !== undefined) {
      setOpen(openDefault);
    }
  }, [openDefault]);

  if (children && (children as any)?.type?.displayName !== 'SubMenu') {
    throw new Error(
      'Menu.Heading component can render only Menu.SubMenu component as the only child.'
    );
  }

  return (
    <li className={styles.container}>
      <span
        className={cx(styles.label, isOpen && styles.open, 'label')}
        onClick={toggle}
      >
        {label}
        <Chevron className={styles.icon} />
      </span>
      <div ref={submenu} className={cx(styles.content, isOpen && styles.open)}>
        {contentLoading ? <Loader size={ELoaderSize.SMALL} /> : children}
      </div>
    </li>
  );
};

MenuHeading.displayName = 'MenuHeading';

export default MenuHeading;
