import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Input, Loader, NoDataError } from '@redbull/components';
import { ReactComponent as FilterIcon } from '@redbull/common/icons/filter.svg';

import { useTypedSelector } from '../../../../store';
import { getUserGroups } from '../../../../store/application/action';
import {
  EApplicationStatus,
  IUserGroup,
} from '../../../../api/services/application/type';
import { TUserGroupMap } from '../type';

import styles from './UserGroups.module.scss';
import Group from './Group';

type Props = {
  applicationStatus: EApplicationStatus;
  selectedGroups: TUserGroupMap;
  setSelectedGroups: (groups: TUserGroupMap) => void;
};

const UserGroups = ({
  applicationStatus,
  selectedGroups,
  setSelectedGroups,
}: Props) => {
  const dispatch = useDispatch();

  const {
    data: userGroups,
    status: userGroupsStatus,
    error: userGroupsError,
  } = useTypedSelector((state) => state.application.userGroups);

  const [selectAll, setSelectAll] = React.useState(false);
  const [filteredGroups, setFilteredGroups] = React.useState<IUserGroup[]>([]);
  const [filterInputValue, setFilterInputValue] = React.useState<string>('');
  const isGroupDisabled =
    EApplicationStatus.APPROVED === applicationStatus ||
    EApplicationStatus.DECLINED === applicationStatus;

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll((all) => !all);

    const groups = { ...selectedGroups };

    filteredGroups.forEach((g) => {
      groups[g.id] = e.target.checked;
    });

    setSelectedGroups(groups);
  };

  const filterGroups = React.useCallback(
    (val: string) => {
      if (!isGroupDisabled) {
        // NOTE: this needs to change, currently it grabs the login user's group
        // for the detail of the group, it won't work if the user doesn't have the group.
        const filteredByName = userGroups.filter((group) =>
          group.name?.toLowerCase().includes(val.toLowerCase())
        );
        setFilteredGroups(filteredByName);
      } else {
        const selectedIds = Object.keys(selectedGroups);
        const filteredByName = userGroups.filter(
          (group) =>
            group.name?.toLowerCase().includes(val.toLowerCase()) &&
            selectedIds.includes(group.id)
        );
        setFilteredGroups(filteredByName);
      }
    },
    [isGroupDisabled, selectedGroups, userGroups]
  );

  const toggleGroup = (id: string) => {
    const groups = {
      ...selectedGroups,
      [id]: !selectedGroups[id],
    };
    setSelectedGroups(groups);
  };

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFilterInputValue(val);
  };

  const resetFilterInput = () => {
    setFilterInputValue('');
  };
  React.useEffect(() => {
    if (userGroups.length && !isGroupDisabled) {
      const groupMap: TUserGroupMap = {};
      userGroups.forEach((group) => {
        groupMap[group.id] = false;
      });

      setSelectedGroups(groupMap);
      setFilteredGroups(userGroups);
    }
    // NOTE: same goes here as above
    if (userGroups.length && isGroupDisabled) {
      const selectedIds = Object.keys(selectedGroups);
      const availableGroups = userGroups.filter((g) =>
        selectedIds.includes(g.id)
      );
      setFilteredGroups(availableGroups);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupDisabled, userGroups]);

  React.useEffect(() => {
    if (!isGroupDisabled) {
      const selected = Object.keys(selectedGroups).reduce(
        (acc, g) => (selectedGroups[g] ? acc + 1 : acc),
        0
      );
      if (selected === userGroups.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroups, userGroups]);

  React.useEffect(() => {
    filterGroups(filterInputValue);
  }, [filterGroups, filterInputValue]);

  React.useEffect(() => {
    if (!userGroups.length) {
      dispatch(getUserGroups());
    }
  }, [dispatch, userGroups.length]);

  return (
    <>
      <div className={styles['groups-heading']}>
        <h3 className={styles.title}>Groups</h3>
        <div className={styles.actions}>
          <Checkbox
            checked={selectAll}
            className={styles.checkbox}
            disabled={isGroupDisabled}
            label="Select All"
            onChange={toggleSelectAll}
          />
          <Input
            icon={<FilterIcon />}
            value={filterInputValue}
            resetActive
            useIcon
            onChange={handleFilterInput}
            onResetClick={resetFilterInput}
          />
        </div>
      </div>
      <div className={styles['groups-wrapper']}>
        {userGroupsStatus === 'loading' && <Loader />}
        {userGroupsStatus === 'failed' && (
          <NoDataError title="Error Loading User Groups">
            There was an error loading user groups.
            <br />
            {userGroupsError && (
              <>
                {userGroupsError}
                <br />
              </>
            )}
            Please refresh page to try again.
          </NoDataError>
        )}
        {userGroupsStatus === 'succeeded' &&
          filteredGroups.map((group) => (
            <Group
              key={group.id}
              disabled={isGroupDisabled}
              group={group}
              selected={selectedGroups[group.id]}
              onClick={toggleGroup}
            />
          ))}
      </div>
    </>
  );
};

export default UserGroups;
