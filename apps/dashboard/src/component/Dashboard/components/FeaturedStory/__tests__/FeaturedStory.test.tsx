import * as React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute } from '../../../../../utils/testUtils';
import FeaturedStory, { FeaturedStoryProps } from '../FeaturedStory';

/**
 * Factory function that returns ShallowWrapper for the component
 * @function setup
 * @param component Takes React Component
 * @returns {ShallowWrapper}
 */
export const setup = (props: FeaturedStoryProps) =>
  shallow<React.Component>(<FeaturedStory {...props} />);

const onClickFn = jest.fn();

const defaultProps: FeaturedStoryProps = {
  item: {
    id: 0,
    title: 'Test Story',
    image: 'img url',
    description: 'Story description',
  },
};

test('renders without errors', () => {
  const wrapper = setup(defaultProps);
  const storyComponent = findByTestAttribute(
    wrapper,
    'component-featured-story'
  );
  expect(storyComponent.length).toBe(1);
});

test('component is clickable when onClick function is passed', () => {
  const wrapper = setup({ ...defaultProps, onClick: onClickFn });
  const storyComponent = findByTestAttribute(
    wrapper,
    'component-featured-story'
  );
  storyComponent.simulate('click');
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
