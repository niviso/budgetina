import locale from './settings';

function lookForKeyInObj(key: string, obj: any): any {
  return key.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part];
    }
    return null;
  }, obj);
}

function t(key: string, variables?: Record<string, any>): string {
  let localeStr =
    lookForKeyInObj(key, locale.locales[locale.lang]) ||
    lookForKeyInObj(key, locale.locales[locale.fallbackLang]) ||
    key;

  if (variables) {
    for (const [name, value] of Object.entries(variables)) {
      localeStr = localeStr.replace(`@${name}`, String(value));
    }
  }

  return localeStr;
}

function setLocale(lang: string): boolean {
  if (locale.locales[lang]) {
    locale.lang = lang;
    return true;
  }
  return false;
}

function getLocale(): string {
  return locale.lang || locale.fallbackLang;
}

export { t, getLocale, setLocale };
