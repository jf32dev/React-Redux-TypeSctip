import * as React from 'react';
import { shallow } from 'enzyme';
import { Story } from '@redbull/services';
import { findByTestAttribute } from '../../../../../utils/testUtils';
import ThumbnailDocuments, {
  TThumbnailDocumentsProps,
} from '../ThumbnailDocuments';

/**
 * Factory function that returns ShallowWrapper for the component
 * @function setup
 * @param component Takes React Component
 * @returns {ShallowWrapper}
 */
export const setup = (props: TThumbnailDocumentsProps) =>
  shallow<React.Component>(<ThumbnailDocuments {...props} />);

const onClickFn = jest.fn();

const defaultProps: TThumbnailDocumentsProps = {
  items: [],
  loading: false,
  noDataText: '',
  onItemClick: onClickFn,
  id: 'test-id',
};

test('renders document list if items.length > 0', () => {
  const wrapper = setup({ ...defaultProps, items: [{} as Story] });
  const thumbnailDocuments = findByTestAttribute(
    wrapper,
    'thumbnail-documents'
  );
  expect(thumbnailDocuments.length).toBe(1);
});

test('renders "see more" link if items.length > 10', () => {
  const wrapper = setup({
    ...defaultProps,
    items: Array(10).fill({} as Story),
  });
  const seeMoreLink = findByTestAttribute(wrapper, 'see-more-link');
  expect(seeMoreLink.length).toBe(1);
});

test('renders no data message in items.length === 0', () => {
  const wrapper = setup(defaultProps);
  const noDataMessage = findByTestAttribute(wrapper, 'no-data-message');
  expect(noDataMessage.length).toBe(1);
});
