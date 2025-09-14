import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Import translation files
import enTranslations from "./locales/en.json";

export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
}

export const supportedLanguages: SupportedLanguage[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
];

const resources = {
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    backend: {
      loadPath: "/locales/{{lng}}.json",
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
