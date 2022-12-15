import translationEN from './assets/locales/en/translation.json';
import translationVI from './assets/locales/vi/translation.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n
  .use(Backend) // load translations using http (default assets/locals/vi/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng, // fallback language is vi.
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });
export default i18n;
