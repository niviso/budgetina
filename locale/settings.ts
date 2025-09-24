import sv from './sv.json';
import en from './en.json';

export interface LocaleProps{
    locales: Record<string,any>
    lang: string;
    fallbackLang: string;
}

const locale: LocaleProps = {
  locales: {
    sv: sv,
    en: en,
  },
  lang: 'sv',
  fallbackLang: 'en',
} as const;

export default locale;