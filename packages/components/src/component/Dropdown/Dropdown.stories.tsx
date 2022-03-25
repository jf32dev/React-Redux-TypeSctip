import * as React from 'react';
import Dropdown from './Dropdown';
import {
  Button,
  EButtonVariant,
  EUserProfileSize,
  UserProfile,
} from '../index';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

export const Default = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <Dropdown
        menuWidth={350}
        toggle={
          <UserProfile
            size={EUserProfileSize.LARGE}
            imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
          />
        }
        direction="right"
      >
        <Dropdown.Item link={'/'} disabled>
          Katryn Murphy
        </Dropdown.Item>
        <Dropdown.Item link={'/'}>Log Out</Dropdown.Item>
      </Dropdown>
    </div>
    <div>
      <div>
        <Dropdown
          menuWidth={400}
          toggle={<div>something super super super super looooooong</div>}
          direction="center"
        >
          <Dropdown.Item link={'/'} disabled>
            Katryn Murphy
          </Dropdown.Item>
          <Dropdown.Item link={'/'}>Log Out</Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <Dropdown
          toggle={<Button variant={EButtonVariant.PRIMARY}>Primary</Button>}
          direction="center"
        >
          <Dropdown.Item link={'/'} disabled>
            Katryn Murphy
          </Dropdown.Item>
          <Dropdown.Item link={'/'}>Log Out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
    <div>
      <Dropdown
        toggle={<div style={{ display: 'inline-block' }}>DROP</div>}
        direction="left"
      >
        <Dropdown.Item link={'/'} disabled>
          Katryn Murphy
        </Dropdown.Item>
        <Dropdown.Item link={'/'}>Log Out</Dropdown.Item>
      </Dropdown>
    </div>
  </div>
);

Default.story = {
  name: 'Dropdown',
};
