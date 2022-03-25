import React from 'react';
import TabsWrapper from './Tabs';
import Tabs from './Tabs';

export default {
  title: 'Tabs',
  component: TabsWrapper,
};

export const Horizontal = () => (
  <Tabs defaultActiveId="one">
    <Tabs.Label label="One" id="one" key={0} />
    <Tabs.Label label="Two" id="two" key={1} />
    <Tabs.Label label="Three" id="three" key={2} />
    <Tabs.Label label="Four" id="four" key={3} />
    <Tabs.Label label="Five" id="five" key={4} />

    <Tabs.Content id="one">
      <p>One</p>
    </Tabs.Content>
    <Tabs.Content id="two">
      <p>Two</p>
    </Tabs.Content>
    <Tabs.Content id="three">
      <p>Three</p>
    </Tabs.Content>
    <Tabs.Content id="four">
      <p>Four</p>
    </Tabs.Content>
    <Tabs.Content id="five">
      <p>Five</p>
    </Tabs.Content>
  </Tabs>
);
