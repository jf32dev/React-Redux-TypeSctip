import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as GroupIcon } from '@redbull/common/icons/group.svg';
import { IUserGroup } from '../../../../api/services/application/type';
import styles from './Group.module.scss';

type Props = {
  disabled?: boolean;
  group: IUserGroup;
  onClick: (id: string) => void;
  selected: boolean;
};

const Group = ({ disabled = false, group, onClick, selected }: Props) => {
  const handleClick = () => {
    onClick(group.id);
  };

  return (
    <div
      className={cx(
        styles.group,
        selected && styles.selected,
        disabled && styles.disabled
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(!disabled && {
        onClick: handleClick,
      })}
    >
      <div className={styles.icon}>
        <GroupIcon />
      </div>
      <div className={styles.name}>{group.name}</div>
    </div>
  );
};

export default Group;
