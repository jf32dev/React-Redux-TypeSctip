import 'react-i18next';
import ns1 from '../i18n/en/translation.json';

declare module 'react-i18next' {
  interface Resources {
    ns1: typeof ns1;
  }
}
