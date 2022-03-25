import React from 'react';
import Input from './Input';
import { ReactComponent as FilterIcon } from '@redbull/common/icons/filter.svg';
import { ReactComponent as SearchIcon } from '@redbull/common/icons/search.svg';

export default {
  title: 'Input',
  component: Input,
};

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
    <div>
      <Input label="Simple input"></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input with value and reset"
        resetActive
        useIcon
        icon={<SearchIcon />}
      ></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input with value and reset and reversed"
        resetActive
        useIcon
        reverse
        icon={<FilterIcon />}
      ></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input required"
        resetActive
        useIcon
        reverse
        required
        icon={<FilterIcon />}
      ></Input>
    </div>
  </div>
);

export const state = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
    <div>
      <Input label="Simple input error" value="This is not valid" error></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input error with message"
        error
        resetActive
        useIcon
        icon={<SearchIcon />}
        errorMessage="Please fill this value"
      ></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input disabled"
        disabled
        useIcon
        reverse
        resetActive
      ></Input>
    </div>
    <br></br>
    <div>
      <Input
        label="Simple input read only"
        disabled
        useIcon
        reverse
        value="Read only"
        readOnly
      ></Input>
    </div>
  </div>
);
