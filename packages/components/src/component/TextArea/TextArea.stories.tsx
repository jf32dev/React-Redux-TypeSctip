import React from 'react';
import TextArea from './TextArea';

export default {
  title: 'Text Area',
  component: TextArea,
};

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
    <div>
      <TextArea
        label="Simple textarea"
        placeholder="simple textarea"
      ></TextArea>
    </div>
    <br></br>
    <div>
      <TextArea label="Simple textarea required" required></TextArea>
    </div>
    <br></br>
    <div>
      <TextArea label="Simple textarea 6 columns" required cols={6}></TextArea>
    </div>
  </div>
);

export const state = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
    <div>
      <TextArea
        label="Simple textarea error"
        value="this is not valid"
        required
        error
      ></TextArea>
    </div>
    <br></br>
    <div>
      <TextArea
        label="Simple textarea error with message"
        value="this is not valid"
        message="invalid value"
        required
        error
      ></TextArea>
    </div>
    <br></br>
    <div>
      <TextArea label="Simple textarea disabled" value="this is not valid" disabled></TextArea>
    </div>
    <br></br>
    <div>
      <TextArea label="Simple textarea readonly" value="this is not valid" readOnly></TextArea>
    </div>
  </div>
);
