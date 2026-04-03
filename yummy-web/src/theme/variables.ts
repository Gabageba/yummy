/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import toCapitalized from '@utils/toCapitalized';
import type { GlobalToken } from 'antd';

const BASE_KEY = 'base';

type PrefixedKeys<P extends string, T extends Record<string, string | number>> = {
  [K in keyof T as K extends typeof BASE_KEY ? P : `${P & string}${Capitalize<string & K>}`]: T[K];
};

function prepareToken<P extends string, T extends Record<string, string | number>>(
  prefix: P,
  token: T,
): PrefixedKeys<P, T> {
  const entries = Object.entries(token).map(([key, value]) => [
    key === BASE_KEY ? prefix : `${prefix}${toCapitalized(key)}`,
    value,
  ]);
  return Object.fromEntries(entries) as PrefixedKeys<P, T>;
}

export const COLORS = {
  light: {
    primary: '#F7A348',
    text: '#111827',
    bg: '#fff',
    textSecondary: 'rgba(0,0,0,.45)',
  },
  dark: {
    primary: '#F7A348',
    text: '#fefefe',
    bg: '#141414',
    textSecondary: 'rgba(255,255,255,.45)',
  },
};

export const ADDITIONAL_COLORS = {
  light: {
    iconSecondary: 'rgba(0,0,0,.25)',
    primaryLight: '#FEF6ED',
    primaryLightGradient: 'linear-gradient(180deg, #FFEDD5 0%, #FFF7ED 100%)',
    bgRoot: COLORS.light.bg,
  },
  dark: {
    iconSecondary: 'rgba(255,255,255,.25)',
    primaryLight: '#FEF6ED',
    primaryLightGradient: 'linear-gradient(180deg, #FFEDD5 0%, #FFF7ED 100%)',
    bgRoot: COLORS.dark.bg,
  },
  general: {
    textWhite: '#fff',
  },
};
export const _colorLightToken = prepareToken('color', ADDITIONAL_COLORS.light);
export const _colorDarkToken = prepareToken('color', ADDITIONAL_COLORS.dark);
export const _colorGeneralToken = prepareToken('color', ADDITIONAL_COLORS.general);

const SIZES = {
  avatar: 40,
} as const satisfies Record<string, number>;
export const _sizeToken = prepareToken('size', SIZES);

const BORDER_SIZES = {
  header: 1,
  avatar: 2,
} as const satisfies Record<string, number>;
export const _borderSizeToken = prepareToken('borderSize', BORDER_SIZES);

const FONT_SIZES = {
  XXS: 10,
  XS: 12,
  XXL: 32,
  XXXL: 48,
} as const satisfies Record<string, number>;
export const _fontSizeToken = prepareToken('fontSize', FONT_SIZES);

const HEIGHTS = {
  header: 64,
  dishCardImage: 192,
} as const satisfies Record<string, number>;
export const _heightToken = prepareToken('height', HEIGHTS);

const FONT_FAMILY = {
  root: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-code: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
};
export const _fontFamilyToken = prepareToken('fontFamily', FONT_FAMILY);

export type ThemeToken = GlobalToken &
  PrefixedKeys<'color', typeof ADDITIONAL_COLORS.light> &
  PrefixedKeys<'color', typeof ADDITIONAL_COLORS.dark> &
  PrefixedKeys<'color', typeof ADDITIONAL_COLORS.general> &
  PrefixedKeys<'size', typeof SIZES> &
  PrefixedKeys<'borderSize', typeof BORDER_SIZES> &
  PrefixedKeys<'height', typeof HEIGHTS> &
  PrefixedKeys<'fontSize', typeof FONT_SIZES> &
  PrefixedKeys<'fontFamily', typeof FONT_FAMILY>;
