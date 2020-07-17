import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from "../public/locales/ru/translations.json"
import en from "../public/locales/en/translations.json"

// const resources = {
//     ru: {
//         translation: {
//             "List of employees": "Список сотрудников"
//         }
//     }
// };

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)

    .init({
        lng: "en",
        fallbackLng: 'ru',
        debug: true,
        resources: {
            ru: {
                translation: ru
            },
            en: {
                translation: en
            },
        },
        // keySeparator:false,
        // saveMissing:true,
        interpolation: {
            escapeValue: false
        },
        react: {
         useSuspense: false
        }
    });

export default i18n;
