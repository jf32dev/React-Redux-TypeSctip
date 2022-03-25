import i18n from '../../i18n';

export const FILES_LIMIT = 5; // The max num of files to show in the search result page
export const STORIES_LIMIT = 4; // The max num of stories to show in the search result page
export const INCENTIVES_LIMIT = 4; // The max num of INCENTIVES to show in the search result page

export const getTabLabels = () =>
  ({
    all: {
      label: i18n.t('utils.allResults'),
      id: 'all',
    },
    files: {
      label: i18n.t('utils.files'),
      id: 'files',
    },
    stories: {
      label: i18n.t('utils.stories'),
      id: 'stories',
    },
    incentives: {
      label: 'Incentives',
      id: 'incentives',
    },
  } as const);

export const getTermError = () => ({
  tooShort: i18n.t('errorMessages.searchTermTooShort'),
});
