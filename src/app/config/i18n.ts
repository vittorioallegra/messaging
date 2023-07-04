import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en, it } from '../translations';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    it: {
      translation: it,
    },
  },
  lng: 'en',
  fallbackLng: ['en'],
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
