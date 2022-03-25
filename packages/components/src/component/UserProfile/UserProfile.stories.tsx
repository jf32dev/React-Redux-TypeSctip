import React from 'react';
import UserProfile from './UserProfile';
import UserProfileWrapper from './UserProfile';
import { EUserProfileColor, EUserProfileSize } from './enum';

export default {
  title: 'User Profile',
  component: UserProfileWrapper,
};

export const Sizes = () => (
  <div
    style={{ display: 'flex', justifyContent: 'space-around', height: '100px' }}
  >
    <div>
      <UserProfile
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="USA President"
        size={EUserProfileSize.LARGE}
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="United States of America President"
        size={EUserProfileSize.MEDIUM}
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="45th and current president of the United States asfsadfasdfasdf"
        size={EUserProfileSize.SMALL}
        statusIcon="pho-preview"
        roleIcon="pho-preview"
      />
    </div>
  </div>
);

export const Colors = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div>
      <UserProfile
        color={EUserProfileColor.RED}
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="45th and current president of the United States asfsadfasdfasdf"
        size={EUserProfileSize.SMALL}
        roleIcon="pho-preview"
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        color={EUserProfileColor.GREEN}
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="45th and current president of the United States asfsadfasdfasdf"
        size={EUserProfileSize.SMALL}
        roleIcon="pho-preview"
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        color={EUserProfileColor.YELLOW}
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        name="Donald Trump"
        position="45th and current president of the United States asfsadfasdfasdf"
        size={EUserProfileSize.SMALL}
        roleIcon="pho-preview"
        statusIcon="pho-preview"
      />
    </div>
  </div>
);

export const NoImage = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div>
      <UserProfile
        name="Donald Trump"
        size={EUserProfileSize.LARGE}
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        name="Donald Trump"
        size={EUserProfileSize.MEDIUM}
        statusIcon="pho-preview"
      />
    </div>
    <div>
      <UserProfile
        name="Donald Trump"
        size={EUserProfileSize.SMALL}
        statusIcon="pho-preview"
      />
    </div>
  </div>
);

export const NoData = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <UserProfile
      size={EUserProfileSize.LARGE}
      imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
    />
    <strong
      style={{
        fontSize: '36px',
        paddingLeft: '10px',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontFamily: `"Bull Text Bold", Helvetica, sans-serif`,
      }}
    >
      Welcome, Donald Trump!
    </strong>
  </div>
);

NoData.story = {
  name: 'No Data Custom Text',
};
