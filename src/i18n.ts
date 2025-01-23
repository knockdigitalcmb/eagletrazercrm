import i18n from "i18next";
import XHR from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next"

import EN from "./locale/en.json";

const resources = {
    en: { common: EN }
}

const options = {
    order: ["querystring", "navigator"],
    lookupQuerystring: 'lng'
}

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'en',
        debug: true,
        fallbackLng: "en",
        detection: options,
        resources,
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        },
        supportedLngs: ['en'],
        react: {
            useSuspense: false
        }
    });

export default i18n;
