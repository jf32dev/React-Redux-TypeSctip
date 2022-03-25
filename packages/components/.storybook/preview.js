import '!style-loader!css-loader!sass-loader!../src/style/global.scss';

import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

addDecorator((story) => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));
