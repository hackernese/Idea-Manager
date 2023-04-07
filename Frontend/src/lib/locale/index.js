import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import vn from './vn.json';
import en from './en.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        vn: {
            translation: vn,
        },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
});

export default useTranslation;
