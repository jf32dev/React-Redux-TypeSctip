import * as React from 'react';
import { shallow } from 'enzyme';
import { Story } from '@redbull/services';
import { findByTestAttribute } from '../../../utils/testUtils';
import FeaturedStories from '../FeaturedStories';
import useFeaturedStories from '../../../hooks/useFeaturedStories';
import useOpenStory from '../../../hooks/useOpenStory';

// We need to mock services here to prevent BTCAClient throwing an error
jest.mock('@redbull/services');
jest.mock('../../../hooks/useFeaturedStories');
jest.mock('../../../hooks/useOpenStory');

const openStoryFn = jest.fn();
(useOpenStory as jest.Mock).mockReturnValue([openStoryFn]);

/**
 * Factory function that returns ShallowWrapper for the component
 * @function setup
 * @param component Takes React Component
 * @returns {ShallowWrapper}
 */
export const setup = () => shallow<React.Component>(<FeaturedStories />);

test('renders Loader when featured.length === 0 & loading: true', () => {
  (useFeaturedStories as jest.Mock).mockReturnValue([[], true]);
  const wrapper = setup();
  const loader = findByTestAttribute(wrapper, 'loader');
  expect(loader.length).toBe(1);
});

test('renders "No Data" message when featured.length === 0 & loading: false', () => {
  (useFeaturedStories as jest.Mock).mockReturnValue([[], false]);
  const wrapper = setup();
  const noData = findByTestAttribute(wrapper, 'no-data-message');
  expect(noData.length).toBe(1);
});

test('renders featured stories when featured.length > 0', () => {
  (useFeaturedStories as jest.Mock).mockReturnValue([
    Array(10).fill({ id: Math.random() } as Story),
    false,
  ]);
  const wrapper = setup();
  const featured = findByTestAttribute(wrapper, 'featured-story');
  expect(featured.length).toBe(10);
});

test('opens story on click', () => {
  (useFeaturedStories as jest.Mock).mockReturnValue([
    [{ id: Math.random() } as Story],
    false,
  ]);
  const wrapper = setup();
  const featured = findByTestAttribute(wrapper, 'featured-story');

  const onClick = featured.prop('onClick');

  onClick && onClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(openStoryFn).toHaveBeenCalledTimes(1);
});
