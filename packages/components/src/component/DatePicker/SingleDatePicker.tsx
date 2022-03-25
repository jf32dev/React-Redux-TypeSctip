import * as React from 'react';
import cx from 'classnames';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { uniqueId } from 'lodash';

import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';
import { ReactComponent as Calendar } from '@redbull/common/icons/calendar.svg';

import { Button, EButtonVariant } from '../Button';

import 'react-dates/lib/css/_datepicker.css';
import './_datePickerCustom.scss';
import styles from './DatePicker.module.scss';

type Props = {
  id?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  value?: moment.Moment | null;
  onDateChange?: (date: moment.Moment | null) => void;
};

const DatePicker = ({
  id,
  label,
  error,
  errorMessage,
  placeholder = 'DD/MM/YYYY',
  value = null,
  onDateChange,
}: Props) => {
  const [genId] = React.useState(uniqueId('datepicker_'));

  const [selectedDate, setDate] = React.useState<moment.Moment | null>(value);
  const [focusedInput, setFocusedInput] = React.useState<boolean | null>(null);

  const handleChange = (date: moment.Moment | null) => {
    setDate(date);
    onDateChange && onDateChange(date);
  };

  const setFocused = ({ focused }: { focused: boolean | null }) => {
    setFocusedInput(focused);
  };

  return (
    <div className={cx(styles.datepicker, error && styles.error)}>
      {label && <label htmlFor={id || genId}>{label}</label>}
      <SingleDatePicker
        anchorDirection="right"
        customInputIcon={
          <Button variant={EButtonVariant.BUTTON_HIDDEN} iconOnly>
            <Calendar />
          </Button>
        }
        date={selectedDate}
        displayFormat={() => 'DD/MM/YYYY'}
        focused={focusedInput}
        id={id || genId}
        inputIconPosition="after"
        isOutsideRange={() => false}
        navNext={<Chevron className={styles.next} />}
        navPrev={<Chevron className={styles.prev} />}
        numberOfMonths={1}
        placeholder={placeholder}
        hideKeyboardShortcutsPanel
        showClearDate
        showDefaultInputIcon
        onDateChange={handleChange}
        onFocusChange={setFocused}
      />
      {errorMessage && <div className={styles.message}>{errorMessage}</div>}
    </div>
  );
};

export default DatePicker;
