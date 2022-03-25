import * as React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { uniqueId } from 'lodash';

import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';
import { ReactComponent as Calendar } from '@redbull/common/icons/calendar.svg';

import { Button, EButtonVariant } from '../Button';

import 'react-dates/lib/css/_datepicker.css';
import './_datePickerCustom.scss';
import styles from './DatePicker.module.scss';

type Props = {
  id?: string;
  onDateChange?: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => void;
};

const DatePicker = ({ id, onDateChange }: Props) => {
  const [genId] = React.useState(uniqueId());
  const [
    selectedStartDate,
    setStartDate,
  ] = React.useState<moment.Moment | null>(null);
  const [selectedEndDate, setEndDate] = React.useState<moment.Moment | null>(
    null
  );
  const [focused, setFocused] = React.useState<'startDate' | 'endDate' | null>(
    null
  );

  const handleChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onDateChange && onDateChange(startDate, endDate);
  };

  const setFocusedInput = (focusedInput: 'startDate' | 'endDate' | null) => {
    setFocused(focusedInput);
  };

  return (
    <DateRangePicker
      customInputIcon={
        <Button variant={EButtonVariant.BUTTON_HIDDEN} iconOnly>
          <Calendar />
        </Button>
      }
      endDate={selectedEndDate}
      endDateId={`${id || genId}_endDate`}
      focusedInput={focused}
      inputIconPosition="after"
      isOutsideRange={() => false}
      navNext={<Chevron className={styles.next} />}
      navPrev={<Chevron className={styles.prev} />}
      numberOfMonths={1}
      startDate={selectedStartDate}
      startDateId={`${id || genId}_startDate`}
      hideKeyboardShortcutsPanel
      showClearDates
      showDefaultInputIcon
      onDatesChange={handleChange}
      onFocusChange={setFocusedInput}
    />
  );
};

export default DatePicker;
