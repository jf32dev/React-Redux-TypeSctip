import * as React from 'react';
import Search from '../Search';
import styles from './SecondaryMenu.module.scss';

const SecondaryMenu = () => {
  const dropdown = React.useRef<HTMLDivElement>(null);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleClickAway = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (dropdown.current && !dropdown.current.contains(target)) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickAway);
    return () => window.removeEventListener('click', handleClickAway);
  }, []);

  return (
    <div className={styles.container}>
      {dropdownOpen && <div className={styles.overlay} />}
      <span className={styles.search}>
        <Search />
      </span>
    </div>
  );
};

export default SecondaryMenu;
