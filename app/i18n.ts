import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../assets/i18n/en.json';
import fr from '../assets/i18n/fr.json';

const resources = {
  en: en,
  fr: fr,
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: Localization.locale.split('-')[0], // Use device language by default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 