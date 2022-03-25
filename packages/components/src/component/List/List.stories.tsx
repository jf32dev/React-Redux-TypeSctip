import React from 'react';
import List from './List';
import ListItem from './ListItem';
import ListItemColumn from './ListItemColumn';
import { UserProfile } from '../UserProfile';
import { EUserProfileSize } from '../UserProfile/enum';
import { Button } from '../Button';

export default {
  title: 'List',
  component: List,
};

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h3>Examples</h3>
    <List>
      <ListItem>
        <ListItemColumn>
          <UserProfile size={EUserProfileSize.MEDIUM} />
        </ListItemColumn>
        <ListItemColumn>
          <p>
            <b>Pablo Emilio Escobar Gaviria</b>
            <br />
            687-152-5233
          </p>
        </ListItemColumn>
        <ListItemColumn hAlign="right">
          <Button>Accept</Button>
        </ListItemColumn>
      </ListItem>
      <ListItem>
        <ListItemColumn>
          <UserProfile size={EUserProfileSize.MEDIUM} />
        </ListItemColumn>
        <ListItemColumn>
          <p>
            <b>George Michael</b>
            <br />
            687-152-5233
          </p>
        </ListItemColumn>
        <ListItemColumn hAlign="right">
          <Button>Accept</Button>
        </ListItemColumn>
      </ListItem>
      <ListItem>
        <ListItemColumn>
          <UserProfile size={EUserProfileSize.MEDIUM} />
        </ListItemColumn>
        <ListItemColumn>
          <p>
            <b>Philipp Bender</b>
            <br />
            687-152-5233
          </p>
        </ListItemColumn>
        <ListItemColumn hAlign="right">
          <Button>Accept</Button>
        </ListItemColumn>
      </ListItem>
    </List>
  </div>
);
