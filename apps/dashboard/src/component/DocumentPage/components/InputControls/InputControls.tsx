import React from 'react';
import cx from 'classnames';
import {
  Input,
  Select as CustomSelect,
  SingleDatePicker,
} from '@redbull/components';
import { ReactComponent as FilterIcon } from '@redbull/common/icons/filter.svg';
import { ValueType } from 'react-select';
import { useTranslation } from 'react-i18next';
import { filter } from '../../config';

import styles from './InputControls.module.scss';
import { BreakpointContext } from '../../../App/BreakpointContext';

type TInputControls = {
  clearFilters?: boolean;
  dateFilterAvailable?: boolean;
  onFilter: (value: string) => void;
  onFilterReset: () => void;
  onSort: (value: string | null) => void;
  onDateChange?: (from: moment.Moment | null, to: moment.Moment | null) => void;
};
const InputControls = ({
  clearFilters,
  dateFilterAvailable = false,
  onFilter,
  onFilterReset,
  onSort,
  onDateChange,
}: TInputControls) => {
  const { t } = useTranslation();
  const section = React.useRef<HTMLDivElement | null>(null);
  const [sortValue, setSortValue] = React.useState<ValueType<{
    label: string;
    value: string;
  }> | null>(null);
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [fromDate, setFromDate] = React.useState<moment.Moment | null>(null);
  const [fromDateError, setFromDateError] = React.useState('');
  const [toDate, setToDate] = React.useState<moment.Moment | null>(null);
  const [toDateError, setToDateError] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { isMobile, viewport } = React.useContext(BreakpointContext);

  const handleFilterToogle = () => setExpanded((state) => !state);
  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFilterValue(e.currentTarget.value);

  const handleFilterResults = () => {
    onFilter(filterValue);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onFilter(filterValue);
    } else if (e.keyCode === 27) {
      handleResetFilter();
    }
  };

  const handleResetFilter = () => {
    setFilterValue('');
    onFilterReset();
  };

  const handleFromChange = (date: moment.Moment | null) => {
    setFromDate(date);

    if (onDateChange) {
      // TODO: add a fly-in message for this error once it is available
      if (date?.isAfter(toDate)) {
        setFromDateError(t('errorMessages.fromNoGreaterThanTo'));
      } else {
        onDateChange(date, toDate);
      }
    }
  };

  const handleToChange = (date: moment.Moment | null) => {
    setToDate(date);

    if (onDateChange) {
      // TODO: add a fly-in message for this error once it is available
      if (date?.isBefore(fromDate)) {
        setToDateError(t('errorMessages.toNoLessThanFrom'));
      } else {
        onDateChange(fromDate, date);
      }
    }
  };

  const handleSort = (
    val: ValueType<{
      label: string;
      value: string;
    }>
  ) => {
    setSortValue(val);
    val &&
    (val as {
      label: string;
      value: string;
    }).value
      ? onSort(
          (val as {
            label: string;
            value: string;
          }).value
        )
      : onSort(null);
  };

  React.useEffect(() => {
    if (section && section.current && isInitialized) {
      const element = section.current;
      const actualHeight = element.scrollHeight;
      if (expanded) {
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
            if (isMobile) {
              element.style.height = '0';
            } else {
              element.style.height = '';
            }
          });
        });
      }
    }
  }, [expanded, isInitialized, isMobile]);

  React.useEffect(() => {
    if (section.current) {
      const element = section.current;
      if (isMobile) {
        element.style.height = '0';
      } else {
        element.style.height = '';
      }
      setIsInitialized(true);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (clearFilters) {
      setFilterValue('');
      setSortValue(null);
    }
  }, [clearFilters]);

  return (
    <>
      {isMobile && (
        <FilterIcon
          className={styles.filterToogle}
          onClick={handleFilterToogle}
        />
      )}
      <section
        ref={section}
        className={cx(styles.controlGroup, expanded && styles.expanded)}
      >
        <div className={styles.controls}>
          <Input
            containerClassName={styles.filterInput}
            icon={<FilterIcon />}
            placeholder={t('utils.filterResults')}
            resetActive={filterValue.length > 0}
            value={filterValue}
            useIcon
            onIconClick={handleFilterResults}
            onInput={handleFilterChange}
            onKeyUp={handleKeyUp}
            onResetClick={handleResetFilter}
          />
          {viewport !== 'sm' && dateFilterAvailable && (
            <SingleDatePicker
              error={!!fromDateError}
              label={t('utils.from')}
              placeholder={t('utils.dateFormat')}
              value={fromDate}
              onDateChange={handleFromChange}
            />
          )}
          {viewport !== 'sm' && dateFilterAvailable && (
            <SingleDatePicker
              error={!!toDateError}
              label={t('utils.to')}
              placeholder={t('utils.dateFormat')}
              value={toDate}
              onDateChange={handleToChange}
            />
          )}
          <CustomSelect
            isSearchable={false}
            label={t('utils.sortResultsBy')}
            options={filter()}
            placeholder={t('utils.select')}
            value={sortValue}
            isClearable
            onChange={handleSort}
          />
        </div>
        {viewport === 'sm' && (
          <div className={styles.controls}>
            {dateFilterAvailable && (
              <SingleDatePicker
                error={!!fromDateError}
                label={t('utils.from')}
                placeholder={t('utils.dateFormat')}
                value={fromDate}
                onDateChange={handleFromChange}
              />
            )}
            {dateFilterAvailable && (
              <SingleDatePicker
                error={!!toDateError}
                label={t('utils.to')}
                placeholder={t('utils.dateFormat')}
                value={toDate}
                onDateChange={handleToChange}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default InputControls;
