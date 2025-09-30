import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Import translation files
import commonTranslations from "./locales/common.json";
import navigationTranslations from "./locales/components/navigation.json";
import languageTranslations from "./locales/components/language.json";
import homeTranslations from "./locales/pages/home.json";
import policiesTranslations from "./locales/pages/policies.json";
import devicesTranslations from "./locales/pages/devices.json";

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
    common: commonTranslations,
    navigation: navigationTranslations,
    language: languageTranslations,
    home: homeTranslations,
    policies: policiesTranslations,
    devices: devicesTranslations,
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

    ns: ["common", "navigation", "language", "home", "policies", "devices"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    backend: {
      loadPath: "/locales/{{ns}}.json",
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
