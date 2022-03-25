import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import french from './fr/translation.json';
import english from './en/translation.json';
import spanish from './es/translation.json';

export const resources = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
  es: {
    translation: spanish,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
