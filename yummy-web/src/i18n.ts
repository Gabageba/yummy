import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common', 'validation'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: true,
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    load: 'languageOnly',
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.services?.formatter?.add('DATE_HUGE', (value, lng = 'ru') =>
  DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE),
);

export default i18n;
