import React from 'react';
import { SingleDatePicker, DateRangePicker } from './index';

export default {
  title: 'Date Picker',
  component: SingleDatePicker,
};

export const SingleDate = () => (
  <div style={{ textAlign: 'right' }}>
    <SingleDatePicker id="date_picker_unique_id" />
  </div>
);

export const DateRange = () => (
  <div>
    <p>
      This date picker is currently not fully styled, can be styled further when
      needed.
    </p>
    <div style={{ textAlign: 'right' }}>
      <DateRangePicker id="date_range_unique_id" />
    </div>
  </div>
);
