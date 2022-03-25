import React from 'react';
import Banner from '.';
import { UserProfile } from '../UserProfile';
import { EUserProfileSize } from '../UserProfile/enum';

export default {
  title: 'Banner',
  component: Banner,
};

export const Default = () => (
  <Banner image="https://images.unsplash.com/photo-1580859297781-f74127f11ca6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80">
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UserProfile
        imageSrc="https://www.motherjones.com/wp-content/uploads/2020/04/20200425-trump-face-2000.jpg?w=990"
        size={EUserProfileSize.MEDIUM}
      />
      <strong
        style={{
          fontSize: '24px',
          paddingLeft: '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          fontFamily: '"Bull Text Bold", Helvetica, sans-serif',
        }}
      >
        Welcome, Donald Trump!
      </strong>
    </div>
  </Banner>
);
