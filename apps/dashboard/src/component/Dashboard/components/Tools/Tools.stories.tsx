import React from 'react';
import { Accordion, CardContainer } from '@redbull/components';
import Tools from './Tools';

export default {
  title: 'My Tools',
  component: Tools,
};

export const InCardContainer = () => (
  <CardContainer>
    <h3 style={{ padding: '15px 20px 0 20px', margin: 0 }}>MY TOOLS</h3>
    <Tools />
  </CardContainer>
);

export const InAccordion = () => (
  <Accordion>
    <Accordion.Item id="tools" title="MY TOOLS">
      <Tools />
    </Accordion.Item>
  </Accordion>
);
