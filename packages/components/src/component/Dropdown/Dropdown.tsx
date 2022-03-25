import * as React from 'react';
import cx from 'classnames';
import DropdownItem from './DropdownItem';
import styles from './Dropdown.module.scss';

type Props = {
  dropdownOpenClass?: string;
  initialValue?: string;
  menuWidth?: number;
  direction: 'left' | 'right' | 'center';
  toggle: React.ReactNode;
};

const Dropdown = ({
  direction,
  toggle,
  menuWidth,
  children,
}: React.PropsWithChildren<Props>) => {
  const dropdown = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [toggleWidth, setToggleWidth] = React.useState<number>(0);
  const [dropdownWidth, setDropdownWidth] = React.useState<number>(0);

  const handleClickAway = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const element = dropdown.current;
    if (element && !element.contains(target)) {
      setOpen(false);
    }
  };

  const toggleDropdown = () => {
    setOpen((o) => !o);
  };

  const toggleRef = React.useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setToggleWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const dropdownRef = React.useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setDropdownWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const getPosition = () => {
    if (dropdownWidth > toggleWidth) {
      return -((dropdownWidth - toggleWidth) / 2);
    }
    return (toggleWidth - dropdownWidth) / 2;
  };

  const validChildren = React.Children.toArray(children).filter((child) => {
    const { displayName } = (child as React.ReactElement).type as any;
    if (displayName) {
      if (displayName === 'DropdownItem') {
        return true;
      }
    }
    return false;
  });

  if (!validChildren) {
    throw new Error(
      'Dropdown component can render only Dropdown.Item component as a child. There are no valid children.'
    );
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, []);

  return (
    <div ref={dropdown} className={styles.dropdown}>
      <div ref={toggleRef} className={styles.toggle} onClick={toggleDropdown}>
        {toggle}
      </div>
      {open && (
        <div
          ref={dropdownRef}
          className={cx(styles.wrapper, styles[direction])}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(direction === 'center' && {
            style: { left: `${getPosition()}px` },
          })}
        >
          <ul
            className={cx(styles.menu)}
            style={{ width: menuWidth ? `${menuWidth}px` : 'auto' }}
          >
            {validChildren}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
