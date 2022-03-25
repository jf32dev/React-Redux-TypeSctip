import i18n from '../../i18n';

export const filter = () => [
  { value: 'alpha', label: 'A-Z' },
  { value: 'reverse-alpha', label: 'Z-A' },
  { value: 'recent', label: i18n.t('utils.mostRecent') },
];
