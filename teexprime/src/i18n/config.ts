import en from './locales/en';
import zh from './locales/zh';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';

export const locales = ['en', 'zh', 'es', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-Hans',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, zh, es, fr, de };

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** Build a path inside a locale, e.g. path('fr', 'services') -> /fr/services/ */
export const path = (locale: Locale, slug = '') =>
  `/${locale}/${slug.replace(/^\/|\/$/g, '')}${slug ? '/' : ''}`;

/** Swap the locale segment of the current path, keeping the rest. */
export const switchLocalePath = (pathname: string, to: Locale) => {
  const parts = pathname.split('/').filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return path(to, parts.join('/'));
};

export const staticLocalePaths = () => locales.map((lang) => ({ params: { lang } }));
